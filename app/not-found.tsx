import Link from "next/link";
import { Suspense } from "react";

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found | GamePlayGo</h1>
      <h2 className="text-2xl font-semibold mb-6">Game Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Sorry, the game or page you're looking for doesn't exist or has been moved.
        Let's get you back to playing amazing games!
      </p>
      <Link 
        href="/"
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Back to Games
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
} 