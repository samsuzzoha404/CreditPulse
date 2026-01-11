import { Home, FileText, Briefcase, Settings, X, Zap, Activity, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Smart Analysis", icon: FileText, path: "/analysis", badge: "AI" },
  { label: "Loan Portfolio", icon: Briefcase, path: "/portfolio" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

interface AppSidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export function AppSidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: AppSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-sidebar-border bg-sidebar shadow-xl transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-72",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex h-16 items-center border-b border-sidebar-border transition-all duration-300",
          isCollapsed ? "justify-center px-3" : "justify-between px-6"
        )}>
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-primary/25 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-lg font-bold text-sidebar-foreground tracking-tight">
                  CreditPulse
                </span>
                <div className="flex items-center gap-1.5">
                  <Activity className="h-2.5 w-2.5 text-success animate-pulse" />
                  <span className="text-[10px] font-medium text-sidebar-foreground/60 uppercase tracking-wider">
                    Enterprise
                  </span>
                </div>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" className="group">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-primary/25 transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          )}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/60 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground hover:rotate-90 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 space-y-1 overflow-y-auto transition-all duration-300",
          isCollapsed ? "px-2 py-3" : "p-4"
        )}>
          {!isCollapsed && (
            <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              Main Menu
            </p>
          )}
          <TooltipProvider delayDuration={0}>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const navItem = (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "group relative flex items-center rounded-xl text-sm font-medium transition-all duration-200",
                    "opacity-0 animate-fade-in-up",
                    isCollapsed ? "justify-center p-3.5" : "gap-3 px-4 py-3",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  <div className="relative">
                    <item.icon className={cn(
                      "transition-all duration-200",
                      isCollapsed ? "h-6 w-6" : "h-5 w-5",
                      isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground",
                      "group-hover:scale-110"
                    )} />
                    {item.badge && isCollapsed && (
                      <div className="absolute -top-1.5 -right-1.5 h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary/50 ring-2 ring-sidebar" />
                    )}
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 transition-all">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-[9px] px-1.5 py-0 h-4 font-semibold transition-all",
                            isActive 
                              ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground" 
                              : "bg-primary/20 text-primary"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {isActive && (
                    <div className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-sidebar-primary-foreground rounded-r-full transition-all",
                      isCollapsed ? "h-10" : "h-8"
                    )} />
                  )}
                </Link>
              );
              
              return isCollapsed ? (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    {navItem}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-2 font-medium">
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 font-semibold bg-primary/20 text-primary">
                        {item.badge}
                      </Badge>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : navItem;
            })}
          </TooltipProvider>
        </nav>

        {/* Collapse Toggle Button - Desktop Only */}
        <div className={cn(
          "hidden lg:flex items-center border-t border-sidebar-border transition-all duration-300",
          isCollapsed ? "justify-center py-3" : "justify-end px-4 py-3"
        )}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className={cn(
              "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all group",
              isCollapsed ? "h-10 w-10" : "h-8 w-8"
            )}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronsRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            ) : (
              <ChevronsLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            )}
          </Button>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* User Profile */}
        <div className={cn(
          "transition-all duration-300",
          isCollapsed ? "p-2" : "p-4"
        )}>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  "rounded-xl bg-sidebar-accent/50 transition-all hover:bg-sidebar-accent cursor-pointer relative group",
                  isCollapsed ? "flex justify-center p-2.5" : "flex items-center gap-3 p-3"
                )}>
                  <div className="relative">
                    <Avatar className={cn(
                      "border-2 border-sidebar-border shadow-md transition-all",
                      isCollapsed ? "h-11 w-11" : "h-10 w-10"
                    )}>
                      <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=BL&backgroundColor=6366f1" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">BL</AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "absolute rounded-full bg-success shadow-sm shadow-success/50 border-2 border-sidebar transition-all",
                      isCollapsed ? "-bottom-0.5 -right-0.5 h-3.5 w-3.5" : "-bottom-0.5 -right-0.5 h-3 w-3"
                    )} />
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-sidebar-foreground truncate">BlockNexa Labs</p>
                      <p className="text-xs text-sidebar-foreground/50 truncate">Organization</p>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="font-medium">
                  <div className="text-sm">
                    <p className="font-semibold">BlockNexa Labs</p>
                    <p className="text-xs text-muted-foreground">Organization</p>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>
    </>
  );
}
