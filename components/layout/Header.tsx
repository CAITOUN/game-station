"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Gamepad2, Search } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="gradient-bg border-b border-blue-500/20 shadow-lg shadow-blue-500/10">
          <div className="flex h-16 items-center px-4 w-full">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden" 
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
              
              <Link 
                href="/" 
                className="text-xl font-bold flex items-center gap-2"
              >
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-md shadow-lg flex items-center justify-center">
                  <Gamepad2 className="h-5 w-5 text-white" />
                </span>
                <span
                  style={{
                    backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  GamePlayGo
                </span>
              </Link>
            </div>
            
            {/* Empty div to maintain space and push links to the right */}
            <div className="flex-1"></div>
            
            {/* Navigation links - right aligned */}
            <nav className="flex items-center gap-4">
              <Link href="/search" className="hidden md:block">
                <Button variant="outline" size="sm" className="game-tag text-sm font-medium">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </Link>
              <Link href="/about" className="hidden md:block">
                <Button variant="default" size="sm" className="glow-button text-sm font-medium text-white">
                  About
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md md:hidden pt-16">
          <div className="fixed left-0 top-16 z-50 w-64 h-[calc(100vh-4rem)] overflow-y-auto gradient-bg border-r border-blue-500/20 animate-in slide-in-from-left shadow-2xl shadow-blue-500/10">
            <div className="p-4">
              <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
              
              {/* Mobile navigation links */}
              <div className="mt-6 pt-4 relative">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-blue-400/20 to-purple-500/20"></div>
                <div className="space-y-3 mt-2">
                  <Link href="/search" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start game-tag text-sm font-medium">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </Link>
                  <Link href="/about" className="block">
                    <Button variant="default" size="sm" className="w-full justify-start glow-button text-sm font-medium text-white">
                      About
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 