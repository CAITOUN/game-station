export function Footer() {
  return (
    <footer className="border-t border-border/40 py-4 md:py-2 mt-auto">
      <div className="container flex items-center justify-center">
        <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground">
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