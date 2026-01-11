import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, TrendingUp } from "lucide-react";
import { generateForecastData, calculateTrend } from "@/utils/forecastUtils";
import { usePortfolioRiskHistory } from "@/hooks/usePortfolioData";
import type { TimeSeriesDataPoint } from "@/utils/forecastUtils";

// Historical leverage ratio data (last 9 months)
// Removed - now using usePortfolioRiskHistory hook

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; color: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload) return null;

  const historyValue = payload.find(p => p.dataKey === "history")?.value;
  const forecastValue = payload.find(p => p.dataKey === "forecast")?.value;
  const isForecast = forecastValue !== undefined && !historyValue;

  return (
    <div className="rounded-xl border border-border bg-card/95 backdrop-blur-sm p-4 shadow-xl">
      <p className="font-semibold text-foreground text-sm mb-3">{label}</p>
      {historyValue !== undefined && (
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-muted-foreground">Exposure:</span>
          <span className="font-semibold text-foreground">${historyValue}B</span>
        </div>
      )}
      {forecastValue !== undefined && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-muted-foreground">AI Forecast:</span>
            <span className="font-semibold text-foreground">${forecastValue}B</span>
          </div>
          {isForecast && (
            <div className="mt-3 pt-3 border-t border-border bg-destructive/5 -mx-4 px-4 py-2 rounded-b-lg">
              <p className="text-xs font-bold text-destructive flex items-center gap-1.5 mb-1">
                <span className="text-base animate-pulse">🚨</span>
                FORECAST: COVENANT BREACH PREDICTED
              </p>
              <p className="text-[10px] text-muted-foreground">
                AI projects 15% chance of breach in Q2 2026
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export function RiskChart() {
  const { data: historicalData, isLoading } = usePortfolioRiskHistory();

  if (isLoading) {
    return (
      <Card className="shadow-card border-border/50 overflow-hidden">
        <CardHeader className="pb-2 px-5 pt-5">
          <CardTitle className="text-base sm:text-lg font-semibold">Portfolio Risk Exposure</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 px-2 sm:px-5 pb-5">
          <Skeleton className="h-[280px] sm:h-[320px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!historicalData) return null;

  // Generate forecast for next 3 months using linear regression
  const fullData = generateForecastData(historicalData, 3);
  const trend = calculateTrend(historicalData);

  // Transform data for recharts (split historical and forecast)
  const data = fullData.map((point) => ({
    month: point.month,
    history: !point.isForecast ? point.value : undefined,
    forecast: point.isForecast ? point.value : undefined,
    limit: 5, // Covenant threshold
  }));

  return (
    <Card className="shadow-lg border-border/60 overflow-hidden h-full bg-gradient-to-br from-background via-background to-primary/5">
      <CardHeader className="pb-3 px-6 pt-6 border-b border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground">Portfolio Risk Exposure</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Leverage ratio tracking • Historical & AI forecast</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-warning/20 to-destructive/20 text-warning border-warning/40 text-xs gap-1.5 animate-pulse shadow-sm px-3 py-1">
            <Brain className="h-3 w-3" />
            AI Predicts Breach
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs sm:text-sm text-muted-foreground">9-month history + 3-month AI forecast</p>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-primary rounded-full" />
              <span className="text-muted-foreground font-medium">History</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-warning rounded-full opacity-70" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--warning)) 0px, hsl(var(--warning)) 3px, transparent 3px, transparent 6px)' }} />
              <span className="text-muted-foreground font-medium">AI Forecast</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 px-2 sm:px-5 pb-5">
        <div className="h-[280px] sm:h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="historyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                dy={10}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                dx={-5}
                tickFormatter={(value) => `${value}B`}
                width={40}
                domain={[0, 6]}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={5}
                stroke="hsl(var(--destructive))"
                strokeDasharray="5 5"
                strokeWidth={1.5}
                label={{ value: "Limit: 5B", position: "right", fill: "hsl(var(--destructive))", fontSize: 10, fontWeight: 500 }}
              />
              <Area
                type="monotone"
                dataKey="history"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                fill="url(#historyGradient)"
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--warning))"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                fill="url(#forecastGradient)"
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
