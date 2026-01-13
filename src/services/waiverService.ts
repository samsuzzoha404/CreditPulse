import { GoogleGenerativeAI } from '@google/generative-ai';
import type { WaiverLetterRequest } from '../types/cdm';
import supabase from '../lib/supabase';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;

const WAIVER_PROMPT = `You are a corporate finance legal expert specializing in LMA (Loan Market Association) loan documentation and covenant waiver requests.

Generate a professional, formal waiver request letter based on the provided breach details.

CONTEXT:
- Company: {COMPANY_NAME}
- Covenant Breach: {COVENANT_NAME}
- Threshold: {THRESHOLD}
- Actual Value: {ACTUAL_VALUE}
- Reporting Period: {REPORTING_PERIOD}

REQUIREMENTS:
1. Use formal, professional tone appropriate for bank correspondence
2. Follow LMA standard practices
3. Include:
   - Formal salutation
   - Clear explanation of the breach
   - Contextual business reasons (infer reasonable scenarios)
   - Remediation plan (propose realistic steps)
   - Request for temporary waiver
   - Commitment to future compliance
   - Professional closing

4. Structure:
   - Date (use current date)
   - Addressee (use "The Lender Group" or specific name if provided)
   - Subject line
   - Body (3-5 paragraphs)
   - Signature block

5. Length: 350-500 words

OUTPUT:
Return ONLY the letter text, formatted professionally with proper line breaks and spacing. Do NOT include any JSON, markdown formatting, or explanatory text.`;

/**
 * Generate a template waiver letter (fallback when API is not available)
 */
function generateTemplateWaiverLetter(request: WaiverLetterRequest): string {
  const today = new Date().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const breachPercent = (((request.breach_details.actual - request.breach_details.threshold) / request.breach_details.threshold) * 100).toFixed(1);
  
  return `${today}

The Lender Group
[Lender Address]

Dear Sirs/Madams,

Re: Waiver Request - ${request.breach_details.covenant_name} Covenant Breach

We write to you on behalf of ${request.company_name} ("the Company") to formally request a waiver in respect of a covenant breach identified in our recent compliance testing.

During the ${request.breach_details.reporting_period} reporting period, the Company recorded a ${request.breach_details.covenant_name} of ${request.breach_details.actual.toFixed(2)}x, which exceeds the agreed threshold of ${request.breach_details.threshold.toFixed(2)}x by approximately ${breachPercent}%.

This breach occurred due to [temporary market conditions / one-off operational adjustments / restructuring costs] which have now been addressed. The Company has implemented corrective measures including enhanced cash flow management and cost optimization initiatives to ensure future compliance.

We are confident that the Company's financial position remains fundamentally sound, and we project full compliance with all covenant requirements from the next reporting period onwards. The Company maintains strong operational performance and continues to meet all payment obligations under the facility.

In light of these circumstances, we respectfully request that the Lender Group grant a one-time waiver for this covenant breach. We remain committed to transparent reporting and maintaining a constructive relationship with all lenders.

We would be pleased to provide any additional information or arrange a meeting to discuss this matter further at your convenience.

Yours faithfully,

_______________________
[Name]
[Title]
${request.company_name}`;
}

/**
 * Generate waiver letter using Gemini
 */
export async function generateWaiverLetter(
  request: WaiverLetterRequest
): Promise<string> {
  if (!genAI) {
    // Use template instead of throwing error
    return generateTemplateWaiverLetter(request);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    // Prepare the prompt with actual data
    const prompt = WAIVER_PROMPT
      .replace('{COMPANY_NAME}', request.company_name)
      .replace('{COVENANT_NAME}', request.breach_details.covenant_name)
      .replace('{THRESHOLD}', request.breach_details.threshold.toString())
      .replace('{ACTUAL_VALUE}', request.breach_details.actual.toString())
      .replace('{REPORTING_PERIOD}', request.breach_details.reporting_period);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const letter = response.text();

    return letter.trim();
  } catch (error) {
    console.error('Waiver generation error:', error);
    // Fallback to template if API fails
    console.log('Falling back to template waiver letter');
    return generateTemplateWaiverLetter(request);
  }
}

/**
 * Save waiver request to database
 */
export async function saveWaiverRequest(
  companyName: string,
  breachDetails: WaiverLetterRequest['breach_details'],
  generatedLetter: string,
  analysisId?: string
): Promise<any> {
  const { data, error } = await supabase
    .from('waiver_requests')
    .insert({
      analysis_id: analysisId || null,
      company_name: companyName,
      breach_details: breachDetails,
      generated_letter: generatedLetter,
      status: 'draft',
    } as any)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save waiver request: ${error.message}`);
  }

  return data;
}

/**
 * Main function: Draft waiver letter with optional save
 */
export async function draftWaiverLetter(
  request: WaiverLetterRequest,
  saveToDatabase: boolean = false
): Promise<{
  success: boolean;
  letter?: string;
  savedId?: string;
  error?: string;
}> {
  try {
    // Generate letter
    const letter = await generateWaiverLetter(request);

    // Optionally save to database
    let savedId: string | undefined;
    if (saveToDatabase) {
      const saved = await saveWaiverRequest(
        request.company_name,
        request.breach_details,
        letter
      );
      if (saved) {
        savedId = saved.id;
      }
    }

    return {
      success: true,
      letter,
      savedId,
    };
  } catch (error) {
    console.error('Waiver drafting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Fetch all waiver requests
 */
export async function fetchWaiverRequests() {
  const { data, error } = await supabase
    .from('waiver_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch waiver requests: ${error.message}`);
  }

  return data;
}

/**
 * Update waiver status
 */
export async function updateWaiverStatus(
  id: string,
  status: 'draft' | 'sent' | 'approved' | 'rejected'
): Promise<any> {
  const supabaseClient = supabase as any;
  const { data, error } = await supabaseClient
    .from('waiver_requests')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update waiver status: ${error.message}`);
  }

  return data;
}
