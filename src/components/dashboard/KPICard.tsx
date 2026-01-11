import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  trend?: string;
  trendType?: "up" | "down" | "stable";
  variant?: "default" | "warning" | "danger";
  icon?: ReactNode;
}

export function KPICard({ title, value, trend, trendType = "stable", variant = "default", icon }: KPICardProps) {
  const TrendIcon = trendType === "up" ? TrendingUp : trendType === "down" ? TrendingDown : Minus;

  return (
    <Card
      className={cn(
        "relative overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover group",
        "border-border/50 bg-card",
        variant === "danger" && "border-destructive/30 bg-gradient-to-br from-destructive/5 to-destructive/10",
        variant === "warning" && "border-warning/30 bg-gradient-to-br from-warning/5 to-warning/10"
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 sm:space-y-2 min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p
              className={cn(
                "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
                variant === "danger" && "text-destructive",
                variant === "warning" && "text-warning",
                variant === "default" && "text-foreground"
              )}
            >
              {value}
            </p>
            {trend && (
              <div className="flex items-center gap-1.5 mt-1">
                <div className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                  trendType === "up" && "bg-success/10 text-success",
                  trendType === "down" && "bg-destructive/10 text-destructive",
                  trendType === "stable" && "bg-muted text-muted-foreground"
                )}>
                  <TrendIcon className="h-3 w-3 shrink-0" />
                  <span className="truncate">{trend}</span>
                </div>
              </div>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                "hidden sm:flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl shrink-0 transition-transform group-hover:scale-110",
                variant === "danger" && "bg-destructive/10 text-destructive",
                variant === "warning" && "bg-warning/10 text-warning",
                variant === "default" && "bg-primary/10 text-primary"
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
