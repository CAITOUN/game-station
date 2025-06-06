interface FooterProps {
  centered?: boolean;
}

export function Footer({ centered = false }: FooterProps) {
  return (
    <footer className={`border-t border-border/40 py-3 ${centered ? 'text-center' : ''}`}>
      <div className={`${centered ? 'w-full max-w-4xl mx-auto' : 'container'} flex items-center justify-center`}>
        <p className="text-xs md:text-sm leading-loose text-muted-foreground">
          © {new Date().getFullYear()} <span style={{
            backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: "500"
          }}>GameStation</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 