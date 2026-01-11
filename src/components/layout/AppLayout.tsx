import { ReactNode, useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load sidebar state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(savedState === 'true');
    }
  }, []);

  const toggleSidebarCollapse = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  return (
    <div className={cn(
      "flex min-h-screen w-full transition-opacity duration-500",
      mounted ? "opacity-100" : "opacity-0"
    )}>
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      
      <AppSidebar 
        isOpen={sidebarOpen} 
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={toggleSidebarCollapse}
      />
      
      <div className={cn(
        "flex flex-1 flex-col relative transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
      )}>
        <AppHeader 
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className={cn(
            "mx-auto transition-all duration-300",
            sidebarCollapsed ? "max-w-[1600px]" : "max-w-7xl"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
