import { FileUp, AlertTriangle, CheckCircle2, Clock, ArrowRight, Info, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useRecentAlerts } from "@/hooks/usePortfolioData";

const iconMap = {
  breach: AlertTriangle,
  warning: Bell,
  info: Info,
};

const colorMap = {
  breach: "text-destructive bg-destructive/10",
  warning: "text-warning bg-warning/10",
  info: "text-primary bg-primary/10",
};

export function AlertsFeed() {
  const { data: alerts, isLoading } = useRecentAlerts(5);

  return (
    <Card className="shadow-lg border-border/60 overflow-hidden bg-gradient-to-br from-background via-background to-secondary/5">
      <CardHeader className="pb-4 px-6 pt-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-sm">
              <Bell className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground">Recent Alerts</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time activity feed • Last 24 hours</p>
            </div>
          </div>
          {!isLoading && alerts && (
            <Badge variant="secondary" className="font-medium text-xs bg-primary/10 text-primary border-0 px-3 py-1 shadow-sm">
              {alerts.length} new
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </>
        ) : (
          <>
            {alerts?.map((alert, index) => {
              const Icon = iconMap[alert.type];
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "group relative flex flex-col p-4 rounded-xl border-2 transition-all hover:shadow-md cursor-pointer opacity-0 animate-fade-in-up",
                    alert.type === "breach" ? "border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent hover:border-destructive/50" : 
                    alert.type === "warning" ? "border-warning/30 bg-gradient-to-br from-warning/5 to-transparent hover:border-warning/50" :
                    "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50"
                  )}
                  style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'forwards' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 shadow-sm",
                      colorMap[alert.type]
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {alert.type === "breach" && (
                      <Badge variant="destructive" className="text-[10px] px-2 py-0.5 h-5 ml-auto">
                        Critical
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{alert.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                  </div>
                  <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs font-medium">{alert.timeAgo}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </>
        )}
        </div>
        {!isLoading && (
          <Button variant="ghost" className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground">
            View all alerts
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
