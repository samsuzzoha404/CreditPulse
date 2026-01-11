import { Menu, Search, Bell, HelpCircle, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface PageTitle {
  title: string;
  parent?: string;
}

const pageTitles: Record<string, PageTitle> = {
  "/": { title: "Dashboard" },
  "/analysis": { title: "Smart Analysis", parent: "AI Tools" },
  "/portfolio": { title: "Loan Portfolio", parent: "Management" },
  "/settings": { title: "Settings", parent: "System" },
};

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const location = useLocation();
  const currentPage = pageTitles[location.pathname] || { title: "Page" };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="h-9 w-9 lg:hidden hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-2 text-sm">
          {currentPage.parent && (
            <>
              <span className="text-muted-foreground font-medium">{currentPage.parent}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </>
          )}
          <span className="font-semibold text-foreground">{currentPage.title}</span>
        </nav>
        
        {/* Mobile Title */}
        <h1 className="text-base font-semibold text-foreground sm:hidden">
          {currentPage.title}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search - Desktop */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search loans, documents..."
            className="w-56 lg:w-72 pl-9 h-9 bg-muted/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Search - Mobile */}
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden hover:bg-muted">
          <Search className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-muted">
          <Bell className="h-5 w-5" />
          <Badge 
            className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] bg-destructive text-destructive-foreground border-2 border-background"
          >
            3
          </Badge>
        </Button>

        {/* Help */}
        <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 hover:bg-muted">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
