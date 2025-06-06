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
          className={`fixed left-0 top-16 bottom-0 z-30 transition-all duration-500 ease-in-out ${
            sidebarCollapsed ? "w-14" : "w-64"
          } hidden md:block shadow-xl no-drag`}
          style={{ 
            bottom: 'auto',
            height: 'calc(100vh - 4rem - 2.5rem)'
          }}
        >
          <div className="h-full overflow-hidden transition-all duration-500 ease-in-out">
            <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
          </div>
        </div>
        
        {/* Main content - adjusted based on sidebar state */}
        <div className={`w-full transition-all duration-500 ease-in-out ${sidebarCollapsed ? "md:ml-14" : "md:ml-64"} flex-1`}>
          <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4rem-3rem)]">
            {children}
          </main>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
} 