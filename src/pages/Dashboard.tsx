import { Wallet, DollarSign, Clock, AlertTriangle, TrendingUp, Activity, Database, Brain, TrendingDown, ArrowUpRight } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { RiskChart } from "@/components/dashboard/RiskChart";
import { AlertsFeed } from "@/components/dashboard/AlertsFeed";
import { ForecastAlert } from "@/components/dashboard/ForecastAlert";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { usePortfolioStats } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: stats, isLoading } = usePortfolioStats();

  const formatTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <Badge variant="secondary" className="bg-success/10 text-success border-0 gap-1.5 hidden sm:flex">
              <Activity className="h-3 w-3 animate-pulse" />
              Live
            </Badge>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1.5 hidden sm:flex">
              <Database className="h-3 w-3" />
              Demo Mode
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Real-time covenant monitoring and portfolio overview</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Last updated:</span>
          <span className="font-medium text-foreground">Just now</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="opacity-0 animate-fade-in-up stagger-1" style={{ animationFillMode: 'forwards' }}>
          {isLoading ? (
            <Skeleton className="h-[120px] w-full" />
          ) : (
            <KPICard
              title="Active Loans"
              value={stats?.totalLoans.toString() || "0"}
              trend={`${stats?.healthyLoans || 0} healthy`}
              trendType="up"
              icon={<Wallet className="h-6 w-6 lg:h-7 lg:w-7" />}
            />
          )}
        </div>
        <div className="opacity-0 animate-fade-in-up stagger-2" style={{ animationFillMode: 'forwards' }}>
          {isLoading ? (
            <Skeleton className="h-[120px] w-full" />
          ) : (
            <KPICard
              title="Total Exposure"
              value={stats?.totalExposureFormatted || "$0"}
              trend={`Avg Leverage: ${stats?.avgLeverageRatio}x`}
              trendType="stable"
              icon={<DollarSign className="h-6 w-6 lg:h-7 lg:w-7" />}
            />
          )}
        </div>
        <div className="opacity-0 animate-fade-in-up stagger-3" style={{ animationFillMode: 'forwards' }}>
          {isLoading ? (
            <Skeleton className="h-[120px] w-full" />
          ) : (
            <KPICard
              title="Pending Reviews"
              value={stats?.pendingReviews.toString() || "0"}
              trend={`${stats?.watchLoans || 0} on watch list`}
              trendType="stable"
              variant="warning"
              icon={<Clock className="h-6 w-6 lg:h-7 lg:w-7" />}
            />
          )}
        </div>
        <div className="opacity-0 animate-fade-in-up stagger-4" style={{ animationFillMode: 'forwards' }}>
          {isLoading ? (
            <Skeleton className="h-[120px] w-full" />
          ) : (
            <KPICard
              title="Covenant Breaches"
              value={stats?.covenantBreaches.toString() || "0"}
              trend="Action required"
              trendType="down"
              variant="danger"
              icon={<AlertTriangle className="h-6 w-6 lg:h-7 lg:w-7" />}
            />
          )}
        </div>
      </div>

      {/* Main Dashboard Grid - 3 Key Sections */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-12">
        {/* Portfolio Risk Exposure - Takes 2/3 width */}
        <div className="xl:col-span-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <RiskChart />
        </div>

        {/* AI Predictive Sentinel - Takes 1/3 width, top right */}
        <div className="xl:col-span-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
          <ForecastAlert />
        </div>

        {/* Recent Alerts - Full width below */}
        <div className="xl:col-span-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <AlertsFeed />
        </div>
      </div>
    </div>
  );
}
