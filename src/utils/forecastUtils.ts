/**
 * Data point for time series charts
 */
export interface TimeSeriesDataPoint {
  month: string;
  value: number;
  isForecast?: boolean;
}

/**
 * Simple Linear Regression for forecasting
 */
function linearRegression(data: number[]): { slope: number; intercept: number } {
  const n = data.length;
  const indices = Array.from({ length: n }, (_, i) => i);

  const sumX = indices.reduce((a, b) => a + b, 0);
  const sumY = data.reduce((a, b) => a + b, 0);
  const sumXY = indices.reduce((sum, x, i) => sum + x * data[i], 0);
  const sumXX = indices.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

/**
 * Generate forecast data using linear regression
 * Takes historical data and projects future values
 * 
 * @param historicalData - Array of historical data points with month and value
 * @param forecastMonths - Number of months to forecast (default: 3)
 * @returns Combined historical and forecast data
 */
export function generateForecastData(
  historicalData: TimeSeriesDataPoint[],
  forecastMonths: number = 3
): TimeSeriesDataPoint[] {
  if (historicalData.length < 3) {
    // Not enough data for meaningful forecast
    return historicalData;
  }

  // Extract values for regression
  const values = historicalData.map((d) => d.value);

  // Calculate linear regression
  const { slope, intercept } = linearRegression(values);

  // Generate forecast
  const forecast: TimeSeriesDataPoint[] = [];
  const lastMonth = historicalData[historicalData.length - 1].month;
  
  for (let i = 1; i <= forecastMonths; i++) {
    const predictedValue = intercept + slope * (values.length + i - 1);
    
    // Generate next month name
    const nextMonth = getNextMonth(lastMonth, i);
    
    forecast.push({
      month: nextMonth,
      value: Math.max(0, Math.round(predictedValue * 10) / 10), // Round to 1 decimal, no negatives
      isForecast: true,
    });
  }

  return [...historicalData, ...forecast];
}

/**
 * Get the month name N months ahead
 */
function getNextMonth(currentMonth: string, monthsAhead: number): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Try to parse current month
  const monthIndex = months.findIndex(m => currentMonth.startsWith(m));
  
  if (monthIndex === -1) {
    // If month not found, return generic format
    return `M+${monthsAhead}`;
  }
  
  // Calculate new month index
  const newIndex = (monthIndex + monthsAhead) % 12;
  return months[newIndex];
}

/**
 * Calculate moving average for smoothing
 */
export function calculateMovingAverage(
  data: TimeSeriesDataPoint[],
  window: number = 3
): TimeSeriesDataPoint[] {
  if (data.length < window) {
    return data;
  }

  return data.map((point, index) => {
    if (index < window - 1) {
      return point;
    }

    const windowData = data.slice(index - window + 1, index + 1);
    const average = windowData.reduce((sum, d) => sum + d.value, 0) / window;

    return {
      ...point,
      value: Math.round(average * 10) / 10,
    };
  });
}

/**
 * Calculate trend direction
 */
export function calculateTrend(data: TimeSeriesDataPoint[]): 'up' | 'down' | 'stable' {
  if (data.length < 2) {
    return 'stable';
  }

  const values = data.map(d => d.value);
  const { slope } = linearRegression(values);

  const threshold = 0.05; // 5% threshold for "stable"
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length;
  const relativeSlope = Math.abs(slope) / avgValue;

  if (relativeSlope < threshold) {
    return 'stable';
  }

  return slope > 0 ? 'up' : 'down';
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): number {
  if (oldValue === 0) {
    return 0;
  }
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Generate sample financial data for demonstration
 */
export function generateSampleData(
  startValue: number,
  months: number = 12,
  volatility: number = 0.1
): TimeSeriesDataPoint[] {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const data: TimeSeriesDataPoint[] = [];
  let currentValue = startValue;

  for (let i = 0; i < months; i++) {
    const randomChange = (Math.random() - 0.5) * 2 * volatility * currentValue;
    currentValue += randomChange;

    data.push({
      month: monthNames[i % 12],
      value: Math.round(currentValue * 10) / 10,
    });
  }

  return data;
}

/**
 * Format chart data for Recharts
 */
export interface ChartDataPoint {
  name: string;
  historical?: number;
  forecast?: number;
}

export function formatDataForChart(
  data: TimeSeriesDataPoint[]
): ChartDataPoint[] {
  return data.map((point) => ({
    name: point.month,
    historical: !point.isForecast ? point.value : undefined,
    forecast: point.isForecast ? point.value : undefined,
  }));
}
