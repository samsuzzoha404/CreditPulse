-- CreditPulse Supabase Schema
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. CREATE ANALYSIS RESULTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    upload_url TEXT NOT NULL,
    cdm_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analysis_company ON public.analysis_results(company_name);
CREATE INDEX IF NOT EXISTS idx_analysis_created ON public.analysis_results(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;

-- Allow public read access (adjust based on your security requirements)
CREATE POLICY "Allow public read access" ON public.analysis_results
    FOR SELECT USING (true);

-- Allow public insert (adjust based on your security requirements)
CREATE POLICY "Allow public insert" ON public.analysis_results
    FOR INSERT WITH CHECK (true);

-- ============================================
-- 2. CREATE STORAGE BUCKET FOR LOAN DOCUMENTS
-- ============================================
-- Run this via the Supabase Dashboard > Storage
-- Or use the SQL command below:

INSERT INTO storage.buckets (id, name, public)
VALUES ('loan-docs', 'loan-docs', true)
ON CONFLICT (id) DO NOTHING;

-- Set storage policy to allow public uploads
CREATE POLICY "Allow public uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'loan-docs');

-- Allow public reads
CREATE POLICY "Allow public reads" ON storage.objects
    FOR SELECT USING (bucket_id = 'loan-docs');

-- Allow public deletes (optional - adjust based on requirements)
CREATE POLICY "Allow public deletes" ON storage.objects
    FOR DELETE USING (bucket_id = 'loan-docs');

-- ============================================
-- 3. CREATE UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.analysis_results
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 4. OPTIONAL: CREATE WAIVER REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.waiver_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES public.analysis_results(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    breach_details JSONB NOT NULL,
    generated_letter TEXT NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waiver_company ON public.waiver_requests(company_name);
CREATE INDEX IF NOT EXISTS idx_waiver_status ON public.waiver_requests(status);

ALTER TABLE public.waiver_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access" ON public.waiver_requests
    FOR ALL USING (true);

CREATE TRIGGER set_waiver_updated_at
    BEFORE UPDATE ON public.waiver_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
