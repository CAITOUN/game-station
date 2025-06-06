import { SimpleLayout } from "@/components/layout/SimpleLayout";
import Link from "next/link";

export default function AboutPage() {
  return (
    <SimpleLayout>
      <div className="py-8 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">About GamePlayGo</h1>
        
        <div className="space-y-6 max-w-3xl">
          <p className="text-lg">
            GamePlayGo is a curated platform for browser-based games that are free to play. 
            Our mission is to provide a fun and accessible gaming experience without the need for downloads or installations.
          </p>
          
          <div className="rounded-lg p-6 gradient-border">
            <h2 className="text-xl font-semibold mb-3">Our Collection</h2>
            <p>
              We feature a diverse selection of games across multiple categories including action, 
              adventure, puzzle, racing, and more. All games are carefully selected to ensure they 
              provide entertainment value and a smooth playing experience directly in your browser.
            </p>
          </div>
          
          <div className="rounded-lg p-6 gradient-border">
            <h2 className="text-xl font-semibold mb-3">For Developers</h2>
            <p>
              Are you a game developer? We&apos;re always looking to expand our collection with high-quality games. 
              Contact us to learn more about featuring your game on our platform.
            </p>
          </div>
          
          <div className="flex justify-center mt-12 mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-600 transform hover:translate-y-[-2px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Return to Game Collection
            </Link>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
} 