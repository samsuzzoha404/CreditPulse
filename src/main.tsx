import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Validate Supabase configuration on startup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '🚨 CONFIGURATION ERROR: Missing Supabase credentials in .env file\n' +
    'Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.\n' +
    'See FIX_SUPABASE_AUTH.md for instructions.'
  );
} else if (supabaseKey.includes('sb_publishable') || supabaseKey.includes('sb_service')) {
  console.error(
    '🚨 CONFIGURATION ERROR: Corrupted Supabase anon key detected!\n' +
    'Your anon key contains "sb_publishable" or "sb_service" which indicates corruption.\n' +
    'This will cause "signature verification failed" errors.\n\n' +
    '✅ QUICK FIX:\n' +
    '1. Go to: https://supabase.com/dashboard → Your Project → Settings → API\n' +
    '2. Copy the fresh "anon public" key\n' +
    '3. Replace VITE_SUPABASE_ANON_KEY in your .env file\n' +
    '4. Restart the dev server\n\n' +
    'See FIX_SUPABASE_AUTH.md for detailed instructions.'
  );
}

createRoot(document.getElementById("root")!).render(<App />);
