import { useQuery } from "@tanstack/react-query";
import { getDemoPortfolioStats, getDemoLoans, getRecentAlerts, portfolioRiskHistory } from "@/data/demoData";
import type { PortfolioStats, DemoLoan, Alert } from "@/data/demoData";
import type { TimeSeriesDataPoint } from "@/utils/forecastUtils";

/**
 * Hook to fetch portfolio statistics
 * Falls back to demo data for hackathon presentation
 */
export function usePortfolioStats() {
  return useQuery<PortfolioStats>({
    queryKey: ["portfolio-stats"],
    queryFn: async () => {
      // In production, this would fetch from Supabase
      // For hackathon demo, return mock data
      return getDemoPortfolioStats();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch all loans in portfolio
 */
export function usePortfolioLoans(filter?: {
  status?: "Healthy" | "Watch" | "Breach";
  sector?: string;
  minExposure?: number;
}) {
  return useQuery<DemoLoan[]>({
    queryKey: ["portfolio-loans", filter],
    queryFn: async () => {
      // In production, this would fetch from Supabase with filters
      // For hackathon demo, return mock data
      return getDemoLoans(filter);
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to fetch recent alerts/notifications
 */
export function useRecentAlerts(limit: number = 5) {
  return useQuery<Alert[]>({
    queryKey: ["recent-alerts", limit],
    queryFn: async () => {
      // In production, this would fetch from Supabase
      // For hackathon demo, return mock data
      return getRecentAlerts(limit);
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to fetch portfolio risk time series
 */
export function usePortfolioRiskHistory() {
  return useQuery<TimeSeriesDataPoint[]>({
    queryKey: ["portfolio-risk-history"],
    queryFn: async () => {
      // In production, this would aggregate from Supabase
      // For hackathon demo, return mock data
      return portfolioRiskHistory;
    },
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook to get single loan details
 */
export function useLoanDetails(loanId: string) {
  return useQuery<DemoLoan | undefined>({
    queryKey: ["loan-details", loanId],
    queryFn: async () => {
      // In production, fetch from Supabase
      const loans = getDemoLoans();
      return loans.find(l => l.id === loanId);
    },
    enabled: !!loanId,
  });
}
