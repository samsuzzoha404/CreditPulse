import { GoogleGenerativeAI } from '@google/generative-ai';
import type { LMACDMData, AnalysisResult } from '../types/cdm';
import supabase from '../lib/supabase';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.warn('Google API Key not found. AI analysis features will be disabled.');
}

const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;

const EXTRACTION_PROMPT = `You are a financial analyst specializing in LMA (Loan Market Association) covenant compliance monitoring.

Analyze this financial document and extract the following information:

REQUIRED FIELDS:
1. Company Name
2. Reporting Period (start date, end date, period type: Q1/Q2/Q3/Q4/Annual/YTD)
3. Revenue (with currency and source page number)
4. EBITDA (with currency and source page number)
5. Net Debt (with currency and source page number)
6. Leverage Ratio (Net Debt / EBITDA)

OPTIONAL FIELDS:
- Total Assets
- Cash Balance
- Interest Expense
- Interest Coverage Ratio (EBITDA / Interest Expense)

COVENANT COMPLIANCE:
- Assume standard LMA covenants:
  * Leverage Ratio must be ≤ 3.5x
  * Interest Coverage must be ≥ 4.0x
- Flag any breaches with severity (minor/major/critical)

OUTPUT FORMAT:
Return ONLY a valid JSON object following this exact structure (no markdown, no explanations):

{
  "company_name": "string",
  "reporting_period": {
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD",
    "period_type": "Q1|Q2|Q3|Q4|Annual|YTD"
  },
  "financial_metrics": {
    "revenue": {
      "value": number,
      "currency": "USD|EUR|GBP",
      "source_page": number,
      "confidence": 0.0-1.0
    },
    "ebitda": {
      "value": number,
      "currency": "USD|EUR|GBP",
      "source_page": number,
      "confidence": 0.0-1.0
    },
    "net_debt": {
      "value": number,
      "currency": "USD|EUR|GBP",
      "source_page": number,
      "confidence": 0.0-1.0
    }
  },
  "covenant_ratios": {
    "leverage_ratio": number,
    "interest_coverage": number (optional)
  },
  "covenant_compliance": {
    "is_compliant": boolean,
    "breaches": [
      {
        "covenant_name": "string",
        "threshold": number,
        "actual": number,
        "severity": "minor|major|critical"
      }
    ]
  },
  "extracted_at": "ISO 8601 timestamp",
  "confidence_score": 0.0-1.0
}

IMPORTANT: 
- All monetary values should be in millions (e.g., 150.5 for $150.5M)
- Source page numbers are critical for citation
- If a field cannot be determined, omit it from the response
- Ensure the JSON is valid and parseable`;

/**
 * Upload PDF to Supabase Storage
 */
export async function uploadPDFToStorage(file: File): Promise<string> {
  try {
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `uploads/${fileName}`;

    // Upload the file directly - bucket existence check is not reliable with anon key
    const { data, error } = await supabase.storage
      .from('loan-docs')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'application/pdf',
      });

    if (error) {
      console.error('Upload error details:', error);
      
      // Provide more specific error messages
      if (error.message.includes('signature')) {
        throw new Error('Authentication failed. Please check your Supabase credentials in the .env file.');
      } else if (error.message.includes('policy')) {
        throw new Error('Storage permissions error. Please ensure storage policies are configured correctly.');
      } else if (error.message.includes('bucket')) {
        throw new Error('Storage bucket not found. Please run the Supabase schema setup.');
      } else {
        throw new Error(`Failed to upload file: ${error.message}`);
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('loan-docs')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload to storage failed:', error);
    throw error;
  }
}

/**
 * Analyze PDF using Google Gemini with native file handling
 */
export async function analyzePDFWithGemini(file: File): Promise<LMACDMData> {
  if (!genAI) {
    throw new Error('Google API Key is not configured');
  }

  try {
    // Use Gemini 2.5 Flash (fast multimodal model with 1M token context)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Convert file to base64 for Gemini API
    const fileBuffer = await file.arrayBuffer();
    const base64Data = btoa(
      new Uint8Array(fileBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type || 'application/pdf',
          data: base64Data,
        },
      },
      { text: EXTRACTION_PROMPT },
    ]);

    const response = await result.response;
    const text = response.text();

    // Clean response (remove markdown code blocks if present)
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    // Parse JSON response
    const cdmData: LMACDMData = JSON.parse(cleanedText);

    // Validate required fields
    if (!cdmData.company_name || !cdmData.reporting_period || !cdmData.financial_metrics) {
      throw new Error('Invalid CDM data structure returned from AI');
    }

    return cdmData;
  } catch (error) {
    console.error('Gemini analysis error:', error);
    throw new Error(
      `AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Save analysis result to Supabase
 */
export async function saveAnalysisResult(
  companyName: string,
  uploadUrl: string,
  cdmData: LMACDMData
): Promise<any> {
  const { data, error } = await supabase
    .from('analysis_results')
    .insert({
      company_name: companyName,
      upload_url: uploadUrl,
      cdm_json: cdmData,
    } as any)
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to save analysis: ${error?.message || 'No data returned'}`);
  }

  // Map cdm_json to cdm_data for TypeScript types
  return {
    ...(data as any),
    cdm_data: (data as any).cdm_json,
  };
}

/**
 * Main function: Upload and analyze PDF
 */
export async function uploadAndAnalyzePDF(
  file: File,
  onProgress?: (stage: string) => void
): Promise<{
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}> {
  try {
    // Validate file
    if (!file.type.includes('pdf')) {
      throw new Error('File must be a PDF');
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      throw new Error('File size must be less than 10MB');
    }

    // Step 1: Upload to Supabase Storage
    onProgress?.('Uploading PDF to storage...');
    const uploadUrl = await uploadPDFToStorage(file);

    // Step 2: Analyze with Gemini
    onProgress?.('Analyzing document with AI...');
    const cdmData = await analyzePDFWithGemini(file);

    // Step 3: Save to database
    onProgress?.('Saving analysis results...');
    const result = await saveAnalysisResult(cdmData.company_name, uploadUrl, cdmData);

    onProgress?.('Analysis complete!');

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Upload and analysis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Fetch all analysis results
 */
export async function fetchAnalysisResults(): Promise<any[]> {
  const { data, error } = await supabase
    .from('analysis_results')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch results: ${error.message}`);
  }

  // Map cdm_json to cdm_data for TypeScript compatibility
  return ((data || []) as any[]).map((item: any) => ({
    ...item,
    cdm_data: item.cdm_json,
  }));
}

/**
 * Fetch single analysis by ID
 */
export async function fetchAnalysisById(id: string): Promise<any> {
  const { data, error } = await supabase
    .from('analysis_results')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new Error(`Failed to fetch analysis: ${error?.message || 'Not found'}`);
  }

  // Map cdm_json to cdm_data for TypeScript compatibility
  return {
    ...(data as any),
    cdm_data: (data as any).cdm_json,
  };
}
