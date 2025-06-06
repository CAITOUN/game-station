"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        {/* Sidebar - collapsible */}
        <div 
          className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] transition-all duration-300 ${
            sidebarCollapsed ? "w-14" : "w-64"
          } hidden md:block`}
        >
          {/* Toggle button */}
          <button 
            onClick={toggleSidebar}
            className="absolute right-0 top-4 z-40 flex h-6 w-6 items-center justify-center rounded-l-md bg-primary/80 text-white shadow-md transform translate-x-6 hover:bg-primary transition-all duration-300"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
          
          <div className="h-full overflow-hidden transition-all duration-300">
            <Sidebar collapsed={sidebarCollapsed} />
          </div>
        </div>
        
        {/* Main content - adjusted based on sidebar state */}
        <div className={`w-full transition-all duration-300 ${sidebarCollapsed ? "md:ml-14" : "md:ml-64"} flex-1`}>
          <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4rem-3rem)]">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
} 