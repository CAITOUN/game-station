"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/40 backdrop-blur-sm">
        <div className="gradient-bg">
          <div className="container flex h-16 items-center justify-between px-4">
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
                className="text-xl font-bold"
                style={{
                  backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
              >
                GameStation
              </Link>
            </div>
            <div className="flex-1 max-w-md mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search games..."
                  className="pl-10 bg-secondary/50 border-primary/20 focus:border-primary/50"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </form>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                About
              </Button>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden pt-16">
          <div className="fixed left-0 top-16 z-50 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-card border-r border-border animate-in slide-in-from-left">
            <div className="p-4">
              <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 