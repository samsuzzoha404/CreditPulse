import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Validate anon key format (should be a JWT with 3 parts)
if (!supabaseAnonKey.includes('.') || supabaseAnonKey.split('.').length !== 3) {
  console.error('Invalid Supabase anon key format. Please check your .env file.');
  throw new Error(
    'Invalid VITE_SUPABASE_ANON_KEY format. It should be a valid JWT token from your Supabase project settings.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'x-client-info': 'creditpulse-web',
    },
  },
});

export default supabase;
