import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkResults() {
  console.log('🔍 Fetching analysis results...\n');
  
  const { data, error } = await supabase
    .from('analysis_results')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('⚠️  No results found');
    return;
  }

  console.log('✅ Found result:');
  console.log('ID:', data[0].id);
  console.log('Company:', data[0].company_name);
  console.log('Upload URL:', data[0].upload_url);
  console.log('\n📊 CDM Data Structure:');
  console.log(JSON.stringify(data[0].cdm_json, null, 2));
}

checkResults();
