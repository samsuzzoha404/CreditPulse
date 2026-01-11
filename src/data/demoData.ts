/**
 * Demo Data for Hackathon Presentation
 * Realistic mock data showcasing all CreditPulse features
 */

import type { AnalysisResult, LMACDMData } from "@/types/cdm";
import type { TimeSeriesDataPoint } from "@/utils/forecastUtils";

// ==================== DEMO LOANS ====================
export interface DemoLoan {
  id: string;
  borrower: string;
  sector: string;
  amount: string;
  amountNumeric: number;
  nextReview: string;
  riskGrade: "Grade A" | "Grade B" | "Grade C" | "Grade D";
  status: "Healthy" | "Watch" | "Breach";
  leverageRatio: number;
  interestCoverage: number;
  lastAnalyzedDate: string;
  cdmData?: LMACDMData;
}

export const demoLoans: DemoLoan[] = [
  {
    id: "loan-001",
    borrower: "TechCore Industries",
    sector: "Technology",
    amount: "$450M",
    amountNumeric: 450,
    nextReview: "Feb 15, 2026",
    riskGrade: "Grade C",
    status: "Breach",
    leverageRatio: 5.8,
    interestCoverage: 3.2,
    lastAnalyzedDate: "Jan 8, 2026",
    cdmData: {
      company_name: "TechCore Industries",
      reporting_period: {
        start_date: "2025-10-01",
        end_date: "2025-12-31",
        period_type: "Q4"
      },
      financial_metrics: {
        revenue: { value: 280, currency: "USD", source_page: 3, confidence: 0.95 },
        ebitda: { value: 52, currency: "USD", source_page: 5, confidence: 0.92 },
        net_debt: { value: 301.6, currency: "USD", source_page: 7, confidence: 0.90 }
      },
      covenant_ratios: {
        leverage_ratio: 5.8,
        interest_coverage: 3.2
      },
      covenant_compliance: {
        is_compliant: false,
        breaches: [
          {
            covenant_name: "Maximum Leverage Ratio",
            threshold: 4.5,
            actual: 5.8,
            severity: "major"
          },
          {
            covenant_name: "Minimum Interest Coverage",
            threshold: 4.0,
            actual: 3.2,
            severity: "minor"
          }
        ]
      },
      extracted_at: "2026-01-08T14:32:00Z",
      confidence_score: 0.91
    }
  },
  {
    id: "loan-002",
    borrower: "GreenEnergy Solutions",
    sector: "Renewable Energy",
    amount: "$680M",
    amountNumeric: 680,
    nextReview: "Mar 1, 2026",
    riskGrade: "Grade A",
    status: "Healthy",
    leverageRatio: 2.8,
    interestCoverage: 6.5,
    lastAnalyzedDate: "Jan 10, 2026",
    cdmData: {
      company_name: "GreenEnergy Solutions",
      reporting_period: {
        start_date: "2025-10-01",
        end_date: "2025-12-31",
        period_type: "Q4"
      },
      financial_metrics: {
        revenue: { value: 425, currency: "USD", source_page: 2, confidence: 0.97 },
        ebitda: { value: 156, currency: "USD", source_page: 4, confidence: 0.96 },
        net_debt: { value: 436.8, currency: "USD", source_page: 6, confidence: 0.94 }
      },
      covenant_ratios: {
        leverage_ratio: 2.8,
        interest_coverage: 6.5
      },
      covenant_compliance: {
        is_compliant: true,
        breaches: []
      },
      extracted_at: "2026-01-10T09:15:00Z",
      confidence_score: 0.96
    }
  },
  {
    id: "loan-003",
    borrower: "MediPharm Global",
    sector: "Healthcare",
    amount: "$320M",
    amountNumeric: 320,
    nextReview: "Jan 28, 2026",
    riskGrade: "Grade B",
    status: "Watch",
    leverageRatio: 4.2,
    interestCoverage: 4.1,
    lastAnalyzedDate: "Jan 11, 2026",
    cdmData: {
      company_name: "MediPharm Global",
      reporting_period: {
        start_date: "2025-10-01",
        end_date: "2025-12-31",
        period_type: "Q4"
      },
      financial_metrics: {
        revenue: { value: 198, currency: "USD", source_page: 3, confidence: 0.93 },
        ebitda: { value: 48, currency: "USD", source_page: 5, confidence: 0.91 },
        net_debt: { value: 201.6, currency: "USD", source_page: 8, confidence: 0.89 }
      },
      covenant_ratios: {
        leverage_ratio: 4.2,
        interest_coverage: 4.1
      },
      covenant_compliance: {
        is_compliant: true,
        breaches: []
      },
      extracted_at: "2026-01-11T11:22:00Z",
      confidence_score: 0.91
    }
  },
  {
    id: "loan-004",
    borrower: "RetailMax Corporation",
    sector: "Retail",
    amount: "$275M",
    amountNumeric: 275,
    nextReview: "Feb 8, 2026",
    riskGrade: "Grade B",
    status: "Watch",
    leverageRatio: 4.3,
    interestCoverage: 3.8,
    lastAnalyzedDate: "Jan 9, 2026",
  },
  {
    id: "loan-005",
    borrower: "Infrastructure Partners LLC",
    sector: "Construction",
    amount: "$890M",
    amountNumeric: 890,
    nextReview: "Mar 15, 2026",
    riskGrade: "Grade A",
    status: "Healthy",
    leverageRatio: 3.1,
    interestCoverage: 5.2,
    lastAnalyzedDate: "Jan 7, 2026",
  },
  {
    id: "loan-006",
    borrower: "AutoDrive Manufacturing",
    sector: "Automotive",
    amount: "$540M",
    amountNumeric: 540,
    nextReview: "Feb 20, 2026",
    riskGrade: "Grade C",
    status: "Breach",
    leverageRatio: 5.2,
    interestCoverage: 3.5,
    lastAnalyzedDate: "Jan 6, 2026",
  },
  {
    id: "loan-007",
    borrower: "CloudNet Services",
    sector: "Technology",
    amount: "$195M",
    amountNumeric: 195,
    nextReview: "Jan 30, 2026",
    riskGrade: "Grade A",
    status: "Healthy",
    leverageRatio: 2.5,
    interestCoverage: 7.1,
    lastAnalyzedDate: "Jan 11, 2026",
  },
  {
    id: "loan-008",
    borrower: "FoodChain Logistics",
    sector: "Transportation",
    amount: "$385M",
    amountNumeric: 385,
    nextReview: "Feb 12, 2026",
    riskGrade: "Grade B",
    status: "Healthy",
    leverageRatio: 3.6,
    interestCoverage: 4.8,
    lastAnalyzedDate: "Jan 10, 2026",
  },
];

// ==================== PORTFOLIO STATS ====================
export interface PortfolioStats {
  totalLoans: number;
  totalExposure: number;
  totalExposureFormatted: string;
  pendingReviews: number;
  covenantBreaches: number;
  healthyLoans: number;
  watchLoans: number;
  breachLoans: number;
  avgLeverageRatio: number;
  lastUpdated: string;
}

export function calculatePortfolioStats(loans: DemoLoan[]): PortfolioStats {
  const totalExposure = loans.reduce((sum, loan) => sum + loan.amountNumeric, 0);
  const breaches = loans.filter(l => l.status === "Breach");
  const healthy = loans.filter(l => l.status === "Healthy");
  const watch = loans.filter(l => l.status === "Watch");
  
  // Count pending reviews (reviews in next 2 weeks)
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
  const pending = loans.filter(loan => {
    const reviewDate = new Date(loan.nextReview);
    return reviewDate <= twoWeeksFromNow;
  }).length;

  const avgLeverage = loans.reduce((sum, l) => sum + l.leverageRatio, 0) / loans.length;

  return {
    totalLoans: loans.length,
    totalExposure,
    totalExposureFormatted: `$${(totalExposure / 1000).toFixed(1)}B`,
    pendingReviews: pending,
    covenantBreaches: breaches.length,
    healthyLoans: healthy.length,
    watchLoans: watch.length,
    breachLoans: breaches.length,
    avgLeverageRatio: Number(avgLeverage.toFixed(1)),
    lastUpdated: new Date().toISOString(),
  };
}

// ==================== TIME SERIES DATA ====================
export const portfolioRiskHistory: TimeSeriesDataPoint[] = [
  { month: "May", value: 3.2 },
  { month: "Jun", value: 3.4 },
  { month: "Jul", value: 3.1 },
  { month: "Aug", value: 3.8 },
  { month: "Sep", value: 4.0 },
  { month: "Oct", value: 3.9 },
  { month: "Nov", value: 4.1 },
  { month: "Dec", value: 4.3 },
  { month: "Jan", value: 4.0 },
];

// Historical data for individual loan (TechCore Industries)
export const techCoreLeverageHistory: TimeSeriesDataPoint[] = [
  { month: "May", value: 4.2 },
  { month: "Jun", value: 4.5 },
  { month: "Jul", value: 4.8 },
  { month: "Aug", value: 5.1 },
  { month: "Sep", value: 5.3 },
  { month: "Oct", value: 5.5 },
  { month: "Nov", value: 5.6 },
  { month: "Dec", value: 5.7 },
  { month: "Jan", value: 5.8 },
];

// ==================== RECENT ALERTS ====================
export interface Alert {
  id: string;
  type: "breach" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  borrower?: string;
  timeAgo: string;
}

export const recentAlerts: Alert[] = [
  {
    id: "alert-001",
    type: "breach",
    title: "Covenant Breach Detected",
    description: "TechCore Industries: Leverage ratio 5.8x exceeds limit of 4.5x",
    timestamp: "2026-01-08T14:32:00Z",
    borrower: "TechCore Industries",
    timeAgo: "3 days ago"
  },
  {
    id: "alert-002",
    type: "breach",
    title: "Multiple Covenant Violations",
    description: "AutoDrive Manufacturing: 2 covenant breaches identified",
    timestamp: "2026-01-06T09:15:00Z",
    borrower: "AutoDrive Manufacturing",
    timeAgo: "5 days ago"
  },
  {
    id: "alert-003",
    type: "warning",
    title: "🔮 AI Prediction: Covenant Breach Expected Q2 2026",
    description: "MediPharm Global: AI models predict leverage ratio will breach 4.5x limit, reaching 4.6x by April 2026",
    timestamp: "2026-01-11T11:22:00Z",
    borrower: "MediPharm Global",
    timeAgo: "Just now"
  },
  {
    id: "alert-004",
    type: "warning",
    title: "🤖 AI Early Warning: Deteriorating Trend",
    description: "RetailMax Corporation: Machine learning detects 23% probability of covenant breach within 90 days",
    timestamp: "2026-01-10T16:45:00Z",
    borrower: "RetailMax Corporation",
    timeAgo: "1 day ago"
  },
  {
    id: "alert-005",
    type: "info",
    title: "Analysis Complete",
    description: "CloudNet Services: Q4 2025 financials analyzed - All covenants compliant",
    timestamp: "2026-01-11T08:30:00Z",
    borrower: "CloudNet Services",
    timeAgo: "3 hours ago"
  },
];

// ==================== SAMPLE CDM EXPORT ====================
export const sampleCDMExport: LMACDMData = {
  company_name: "TechCore Industries",
  reporting_period: {
    start_date: "2025-10-01",
    end_date: "2025-12-31",
    period_type: "Q4"
  },
  financial_metrics: {
    revenue: { value: 280, currency: "USD", source_page: 3, confidence: 0.95 },
    ebitda: { value: 52, currency: "USD", source_page: 5, confidence: 0.92 },
    net_debt: { value: 301.6, currency: "USD", source_page: 7, confidence: 0.90 }
  },
  covenant_ratios: {
    leverage_ratio: 5.8,
    interest_coverage: 3.2
  },
  covenant_compliance: {
    is_compliant: false,
    breaches: [
      {
        covenant_name: "Maximum Leverage Ratio",
        threshold: 4.5,
        actual: 5.8,
        severity: "major"
      }
    ]
  },
  extracted_at: "2026-01-08T14:32:00Z",
  confidence_score: 0.91
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get demo portfolio statistics
 */
export function getDemoPortfolioStats(): PortfolioStats {
  return calculatePortfolioStats(demoLoans);
}

/**
 * Get demo loans with optional filter
 */
export function getDemoLoans(filter?: {
  status?: "Healthy" | "Watch" | "Breach";
  sector?: string;
  minExposure?: number;
}): DemoLoan[] {
  let filtered = [...demoLoans];

  if (filter?.status) {
    filtered = filtered.filter(loan => loan.status === filter.status);
  }

  if (filter?.sector) {
    filtered = filtered.filter(loan => loan.sector === filter.sector);
  }

  if (filter?.minExposure) {
    filtered = filtered.filter(loan => loan.amountNumeric >= filter.minExposure);
  }

  return filtered;
}

/**
 * Get loan by ID
 */
export function getDemoLoanById(id: string): DemoLoan | undefined {
  return demoLoans.find(loan => loan.id === id);
}

/**
 * Get recent alerts
 */
export function getRecentAlerts(limit: number = 5): Alert[] {
  return recentAlerts.slice(0, limit);
}

/**
 * Check if demo mode is active (no real Supabase data)
 */
export function isDemoMode(): boolean {
  // In real implementation, this would check if Supabase has data
  // For hackathon, always return true to show demo data
  return true;
}
