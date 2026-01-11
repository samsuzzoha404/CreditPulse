/**
 * CreditPulse - Example Usage
 * 
 * This file demonstrates how to use the backend services
 * in your own components or pages.
 */

import { 
  uploadAndAnalyzePDF, 
  fetchAnalysisResults, 
  fetchAnalysisById 
} from '../services/analysisService';

import { 
  draftWaiverLetter, 
  saveWaiverRequest 
} from '../services/waiverService';

import { 
  generateForecastData, 
  calculateTrend,
  calculateMovingAverage 
} from '../utils/forecastUtils';

import { 
  exportCDMToJSON,
  formatCurrency,
  formatRatio,
  getCovenantStatus 
} from '../utils/cdmUtils';

// ============================================
// EXAMPLE 1: Upload and Analyze PDF
// ============================================
async function exampleAnalyzePDF(file: File) {
  try {
    const result = await uploadAndAnalyzePDF(file, (stage) => {
      console.log('Progress:', stage);
    });

    if (result.success && result.data) {
      console.log('Analysis complete!');
      console.log('Company:', result.data.cdm_data.company_name);
      console.log('Leverage Ratio:', result.data.cdm_data.covenant_ratios.leverage_ratio);
      
      // Check for breaches
      if (!result.data.cdm_data.covenant_compliance.is_compliant) {
        console.warn('⚠️ Covenant breaches detected!');
        result.data.cdm_data.covenant_compliance.breaches?.forEach(breach => {
          console.log(`- ${breach.covenant_name}: ${breach.actual}x (threshold: ${breach.threshold}x)`);
        });
      }
    } else {
      console.error('Analysis failed:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// EXAMPLE 2: Fetch All Previous Analyses
// ============================================
async function exampleFetchAnalyses() {
  try {
    const analyses = await fetchAnalysisResults();
    
    console.log(`Found ${analyses.length} analyses`);
    
    analyses.forEach(analysis => {
      console.log(`${analysis.company_name} - ${analysis.created_at}`);
      console.log(`Compliant: ${analysis.cdm_data.covenant_compliance.is_compliant}`);
    });
  } catch (error) {
    console.error('Error fetching analyses:', error);
  }
}

// ============================================
// EXAMPLE 3: Generate Waiver Letter
// ============================================
async function exampleGenerateWaiver() {
  try {
    const request = {
      company_name: 'Acme Corporation',
      breach_details: {
        covenant_name: 'Leverage Ratio',
        threshold: 4.0,
        actual: 4.5,
        reporting_period: 'Q4 2024',
      },
      contact_info: {
        lender_name: 'Premier Bank',
      }
    };

    const result = await draftWaiverLetter(request, true);
    
    if (result.success && result.letter) {
      console.log('Waiver letter generated!');
      console.log('Letter preview:', result.letter.substring(0, 200) + '...');
      
      if (result.savedId) {
        console.log('Saved to database with ID:', result.savedId);
      }
    } else {
      console.error('Failed to generate waiver:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// EXAMPLE 4: Export CDM Data
// ============================================
import type { AnalysisResult } from '../types/cdm';

function exampleExportCDM(analysisResult: AnalysisResult) {
  // Export as JSON file download
  exportCDMToJSON(analysisResult.cdm_data, analysisResult.company_name);
  console.log('CDM data exported!');
}

// ============================================
// EXAMPLE 5: Generate Forecast
// ============================================
function exampleGenerateForecast() {
  const historicalData = [
    { month: 'Jan', value: 3.2 },
    { month: 'Feb', value: 3.4 },
    { month: 'Mar', value: 3.1 },
    { month: 'Apr', value: 3.8 },
    { month: 'May', value: 4.0 },
    { month: 'Jun', value: 3.9 },
    { month: 'Jul', value: 4.1 },
    { month: 'Aug', value: 4.3 },
    { month: 'Sep', value: 4.0 },
  ];

  // Generate 3-month forecast
  const withForecast = generateForecastData(historicalData, 3);
  
  console.log('Full data with forecast:');
  withForecast.forEach(point => {
    const label = point.isForecast ? '(forecast)' : '';
    console.log(`${point.month}: ${point.value}x ${label}`);
  });

  // Calculate trend
  const trend = calculateTrend(historicalData);
  console.log('Trend direction:', trend); // 'up', 'down', or 'stable'
}

// ============================================
// EXAMPLE 6: Format Financial Data
// ============================================
function exampleFormatData() {
  // Format currency
  const revenue = formatCurrency(150.5, 'USD'); // "$150.5M"
  console.log('Revenue:', revenue);

  // Format ratio
  const leverage = formatRatio(4.5); // "4.50x"
  console.log('Leverage:', leverage);

  // Get covenant status
  const status = getCovenantStatus(4.5, 4.0, true);
  console.log('Status:', status.status); // 'breach'
  console.log('Message:', status.message); // 'Covenant Breach'
  console.log('Color:', status.color); // 'red'
}

// ============================================
// EXAMPLE 7: React Component Usage
// ============================================
/*
function MyAnalysisComponent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);

    const analysisResult = await uploadAndAnalyzePDF(file, (stage) => {
      console.log(stage); // Show progress to user
    });

    if (analysisResult.success) {
      setResult(analysisResult.data);
      toast.success('Analysis complete!');
    } else {
      toast.error(analysisResult.error);
    }

    setIsAnalyzing(false);
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".pdf" 
        onChange={handleFileUpload}
        disabled={isAnalyzing}
      />
      
      {isAnalyzing && <p>Analyzing...</p>}
      
      {result && (
        <div>
          <h2>{result.cdm_data.company_name}</h2>
          <p>Leverage: {result.cdm_data.covenant_ratios.leverage_ratio}x</p>
          <button onClick={() => exportCDMToJSON(result.cdm_data)}>
            Export CDM
          </button>
        </div>
      )}
    </div>
  );
}
*/

export {
  exampleAnalyzePDF,
  exampleFetchAnalyses,
  exampleGenerateWaiver,
  exampleExportCDM,
  exampleGenerateForecast,
  exampleFormatData,
};
