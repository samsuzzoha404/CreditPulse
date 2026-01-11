/**
 * LMA Common Domain Model (CDM) Types
 * Represents financial covenant monitoring data structure
 */

export interface FinancialMetric {
  value: number;
  currency?: string;
  source_page?: number;
  confidence?: number;
}

export interface ReportingPeriod {
  start_date: string;
  end_date: string;
  period_type: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Annual' | 'YTD';
}

export interface CovenantRatios {
  leverage_ratio?: number; // Net Debt / EBITDA
  interest_coverage?: number; // EBITDA / Interest Expense
  debt_service_coverage?: number; // Cash Flow / Debt Service
}

export interface LMACDMData {
  company_name: string;
  reporting_period: ReportingPeriod;
  financial_metrics: {
    revenue?: FinancialMetric;
    ebitda?: FinancialMetric;
    net_debt?: FinancialMetric;
    total_assets?: FinancialMetric;
    cash_balance?: FinancialMetric;
    interest_expense?: FinancialMetric;
  };
  covenant_ratios: CovenantRatios;
  covenant_compliance: {
    is_compliant: boolean;
    breaches?: Array<{
      covenant_name: string;
      threshold: number;
      actual: number;
      severity: 'minor' | 'major' | 'critical';
    }>;
  };
  extracted_at: string;
  confidence_score?: number;
}

export interface AnalysisResult {
  id: string;
  company_name: string;
  upload_url: string;
  cdm_data: LMACDMData;
  created_at: string;
}

export interface SupabaseAnalysisResult {
  id: string;
  company_name: string;
  upload_url: string;
  cdm_data: LMACDMData;
  created_at: string;
}

export interface UploadAnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export interface WaiverLetterRequest {
  company_name: string;
  breach_details: {
    covenant_name: string;
    threshold: number;
    actual: number;
    reporting_period: string;
  };
  contact_info?: {
    lender_name?: string;
    borrower_representative?: string;
  };
}

export interface WaiverLetterResponse {
  success: boolean;
  letter?: string;
  error?: string;
}
