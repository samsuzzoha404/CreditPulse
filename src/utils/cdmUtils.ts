import type { LMACDMData } from '../types/cdm';

/**
 * Export CDM data as JSON file download
 */
export function exportCDMToJSON(cdmData: LMACDMData, companyName?: string): void {
  const fileName = `${companyName || cdmData.company_name}_CDM_${new Date().toISOString().split('T')[0]}.json`;
  
  const jsonString = JSON.stringify(cdmData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy CDM data to clipboard
 */
export async function copyCDMToClipboard(cdmData: LMACDMData): Promise<boolean> {
  try {
    const jsonString = JSON.stringify(cdmData, null, 2);
    await navigator.clipboard.writeText(jsonString);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Format currency value
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  inMillions: boolean = true
): string {
  const displayValue = inMillions ? value : value / 1000000;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(displayValue) + (inMillions ? 'M' : '');
}

/**
 * Format ratio value
 */
export function formatRatio(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}x`;
}

/**
 * Calculate covenant status
 */
export function getCovenantStatus(
  actualValue: number,
  threshold: number,
  isMaximum: boolean = true
): {
  status: 'compliant' | 'warning' | 'breach';
  color: string;
  message: string;
} {
  const breached = isMaximum ? actualValue > threshold : actualValue < threshold;
  const warning = isMaximum
    ? actualValue > threshold * 0.9
    : actualValue < threshold * 1.1;

  if (breached) {
    return {
      status: 'breach',
      color: 'red',
      message: 'Covenant Breach',
    };
  }

  if (warning) {
    return {
      status: 'warning',
      color: 'yellow',
      message: 'Approaching Threshold',
    };
  }

  return {
    status: 'compliant',
    color: 'green',
    message: 'Compliant',
  };
}

/**
 * Validate CDM data structure
 */
export function validateCDMData(data: Partial<LMACDMData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.company_name) {
    errors.push('Missing company_name');
  }

  if (!data.reporting_period) {
    errors.push('Missing reporting_period');
  }

  if (!data.financial_metrics) {
    errors.push('Missing financial_metrics');
  }

  if (!data.covenant_ratios) {
    errors.push('Missing covenant_ratios');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate summary text from CDM data
 */
export function generateCDMSummary(cdmData: LMACDMData): string {
  const { company_name, reporting_period, financial_metrics, covenant_ratios, covenant_compliance } = cdmData;

  const period = `${reporting_period.period_type} ${reporting_period.end_date}`;
  const revenue = financial_metrics.revenue
    ? formatCurrency(financial_metrics.revenue.value, financial_metrics.revenue.currency)
    : 'N/A';
  const ebitda = financial_metrics.ebitda
    ? formatCurrency(financial_metrics.ebitda.value, financial_metrics.ebitda.currency)
    : 'N/A';
  const leverage = covenant_ratios.leverage_ratio
    ? formatRatio(covenant_ratios.leverage_ratio)
    : 'N/A';
  const compliance = covenant_compliance.is_compliant ? 'Compliant' : 'Non-Compliant';

  return `${company_name} - ${period}
Revenue: ${revenue}
EBITDA: ${ebitda}
Leverage Ratio: ${leverage}
Status: ${compliance}`;
}
