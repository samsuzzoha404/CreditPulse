import { Brain, TrendingUp, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ForecastPrediction {
  borrower: string;
  metric: string;
  current: number;
  predicted: number;
  limit: number;
  timeframe: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  confidence: number;
}

const predictions: ForecastPrediction[] = [
  {
    borrower: "MediPharm Global",
    metric: "Leverage Ratio",
    current: 4.2,
    predicted: 4.6,
    limit: 4.5,
    timeframe: "Q2 2026",
    riskLevel: "high",
    confidence: 87,
  },
  {
    borrower: "RetailMax Corporation",
    metric: "Interest Coverage",
    current: 3.8,
    predicted: 3.5,
    limit: 4.0,
    timeframe: "Q1 2026",
    riskLevel: "medium",
    confidence: 72,
  },
];

const riskColors = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  critical: "bg-destructive/10 text-destructive border-destructive/20",
};

const riskLabels = {
  low: "Low Risk",
  medium: "Moderate Risk",
  high: "High Risk",
  critical: "Critical Risk",
};

export function ForecastAlert() {
  return (
    <Card className="shadow-lg border-warning/40 bg-gradient-to-br from-warning/5 via-orange-500/5 to-background overflow-hidden relative h-full">
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-full blur-3xl" />
      
      <CardHeader className="pb-4 px-6 pt-6 relative border-b border-warning/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-warning/30 to-orange-500/20 animate-pulse shadow-sm">
            <Brain className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2 text-foreground">
              AI Predictive Sentinel
              <Sparkles className="h-4 w-4 text-warning animate-pulse" />
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              ML breach forecasts • 90-day early warning system
            </p>
          </div>
        </div>
        <Badge className="bg-warning/20 text-warning border-warning/40 gap-1.5 animate-pulse shadow-sm px-3 py-1 w-fit">
          <AlertCircle className="h-3 w-3" />
          2 Active Alerts
        </Badge>
      </CardHeader>

      <CardContent className="px-5 pb-5 space-y-3">
        {predictions.map((prediction, index) => (
          <div
            key={index}
            className={cn(
              "group relative rounded-xl border-2 p-4 transition-all hover:shadow-md cursor-pointer",
              prediction.riskLevel === "high"
                ? "border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-transparent hover:border-orange-500/50"
                : "border-warning/30 bg-gradient-to-r from-warning/5 to-transparent hover:border-warning/50"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">
                  {prediction.borrower}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {prediction.metric}
                </p>
              </div>
              <Badge
                variant="outline"
                className={cn("shrink-0 text-[10px] font-bold", riskColors[prediction.riskLevel])}
              >
                {riskLabels[prediction.riskLevel]}
              </Badge>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Current</p>
                <p className="text-sm font-bold text-primary">{prediction.current}x</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Forecast</p>
                <p className={cn(
                  "text-sm font-bold",
                  prediction.predicted > prediction.limit ? "text-destructive" : "text-warning"
                )}>
                  {prediction.predicted}x
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Limit</p>
                <p className="text-sm font-bold text-muted-foreground">{prediction.limit}x</p>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">Breach Probability</span>
                <span className="font-bold text-foreground">{prediction.confidence}%</span>
              </div>
              <Progress 
                value={prediction.confidence} 
                className={cn(
                  "h-2",
                  prediction.riskLevel === "high" ? "bg-orange-500/20" : "bg-warning/20"
                )}
              />
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-destructive" />
                <span className="text-xs text-muted-foreground">
                  Predicted: <span className="font-medium text-foreground">{prediction.timeframe}</span>
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Subtle Glow Effect */}
            <div className={cn(
              "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
              prediction.riskLevel === "high" 
                ? "bg-gradient-to-r from-orange-500/5 to-transparent" 
                : "bg-gradient-to-r from-warning/5 to-transparent"
            )} />
          </div>
        ))}

        {/* Action Button */}
        <Button
          variant="outline"
          className="w-full mt-2 gap-2 border-warning/30 hover:bg-warning/5 hover:border-warning/50 transition-all"
        >
          <Brain className="h-4 w-4" />
          View Full AI Risk Analysis
          <ArrowRight className="h-4 w-4 ml-auto" />
        </Button>

        {/* Info Footer */}
        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-muted-foreground">
            AI models updated <span className="font-medium text-foreground">2 hours ago</span> • 
            Next refresh in <span className="font-medium text-foreground">4 hours</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
