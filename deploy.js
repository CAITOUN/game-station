// This script sets environment variables and runs the build command
// for Vercel deployment to skip ESLint and TypeScript checks

const { spawn } = require('child_process');

// Set environment variables
process.env.NEXT_SKIP_LINT = 'true';
process.env.NEXT_SKIP_TYPE_CHECK = 'true';

console.log('Running build with linting and type checking disabled...');

// Run the build command with output streaming
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_SKIP_LINT: 'true',
    NEXT_SKIP_TYPE_CHECK: 'true'
  }
});

buildProcess.on('error', (error) => {
  console.error(`Failed to start build process: ${error.message}`);
  process.exit(1);
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Build process exited with code ${code}`);
    process.exit(code);
  }
  
  console.log('Build completed successfully!');
  
  // Run post-build script
  console.log('Generating sitemap...');
  const sitemapProcess = spawn('npm', ['run', 'postbuild'], {
    stdio: 'inherit'
  });
  
  sitemapProcess.on('error', (error) => {
    console.error(`Failed to start sitemap process: ${error.message}`);
    // Don't exit with error for sitemap
  });
  
  sitemapProcess.on('close', (code) => {
    if (code !== 0) {
      console.warn(`Sitemap process exited with code ${code}`);
    } else {
      console.log('Sitemap generated successfully!');
    }
    
    console.log('Deployment preparation complete!');
  });
}); 