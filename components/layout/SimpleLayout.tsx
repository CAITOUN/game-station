"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <div className="w-full flex-1">
          <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4rem-3rem)] flex justify-center">
            <div className="w-full max-w-4xl px-4 md:px-6">
              {children}
            </div>
          </main>
        </div>
      </div>
      <div className="mt-auto">
        <Footer centered />
      </div>
    </div>
  );
} 