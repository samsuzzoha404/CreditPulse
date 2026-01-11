#!/usr/bin/env node

/**
 * Validate environment variables for CreditPulse
 * Run this script to check if your .env file is configured correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

console.log('🔍 Validating CreditPulse environment configuration...\n');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found!');
  console.log('📝 Create a .env file by copying .env.example:');
  console.log('   cp .env.example .env\n');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const lines = envContent.split(/\r?\n/);

const config = {};
lines.forEach(line => {
  // Skip comments and empty lines
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  
  const match = trimmed.match(/^([A-Z_]+)=(.*)$/);
  if (match) {
    config[match[1]] = match[2].trim();
  }
});

let hasErrors = false;

// Validate Supabase URL
console.log('🔗 Supabase URL:');
if (!config.VITE_SUPABASE_URL) {
  console.error('   ❌ Missing VITE_SUPABASE_URL');
  hasErrors = true;
} else if (!config.VITE_SUPABASE_URL.startsWith('https://')) {
  console.error('   ❌ Invalid format (should start with https://)');
  hasErrors = true;
} else if (!config.VITE_SUPABASE_URL.includes('supabase.co')) {
  console.warn('   ⚠️  URL doesn\'t contain "supabase.co" - is this correct?');
} else {
  console.log('   ✅ Valid');
}

// Validate Supabase Anon Key
console.log('\n🔑 Supabase Anon Key:');
if (!config.VITE_SUPABASE_ANON_KEY) {
  console.error('   ❌ Missing VITE_SUPABASE_ANON_KEY');
  hasErrors = true;
} else {
  const key = config.VITE_SUPABASE_ANON_KEY;
  
  // Check if it's a JWT (should have 3 parts)
  const parts = key.split('.');
  if (parts.length !== 3) {
    console.error(`   ❌ Invalid JWT format (has ${parts.length} parts, should have 3)`);
    hasErrors = true;
  } else {
    console.log('   ✅ Has 3 parts (valid JWT structure)');
  }
  
  // Check length
  if (key.length < 200) {
    console.error(`   ❌ Too short (${key.length} chars, should be 200+)`);
    hasErrors = true;
  } else {
    console.log(`   ✅ Adequate length (${key.length} chars)`);
  }
  
  // Check if it starts correctly
  if (!key.startsWith('eyJ')) {
    console.error('   ❌ Doesn\'t start with "eyJ" (not a valid JWT)');
    hasErrors = true;
  } else {
    console.log('   ✅ Starts with "eyJ" (Base64 encoded)');
  }
  
  // Check for common corruption patterns
  if (key.includes('sb_publishable') || key.includes('sb_service')) {
    console.error('   ❌ CORRUPTED: Key contains "sb_publishable" or "sb_service"');
    console.error('   ℹ️  This indicates the JWT was mixed with another key type');
    console.error('   ℹ️  Please get a fresh anon key from Supabase Dashboard → Settings → API');
    hasErrors = true;
  }
  
  // Try to decode the header
  try {
    const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
    if (header.alg && header.typ === 'JWT') {
      console.log(`   ✅ Valid JWT header (algorithm: ${header.alg})`);
    }
  } catch (e) {
    console.error('   ❌ Cannot decode JWT header');
    hasErrors = true;
  }
  
  // Try to decode the payload
  if (parts.length >= 2) {
    try {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      if (payload.role === 'anon') {
        console.log('   ✅ Correct role (anon)');
      } else {
        console.warn(`   ⚠️  Unexpected role: ${payload.role} (should be "anon")`);
      }
      
      if (payload.exp) {
        const expiryDate = new Date(payload.exp * 1000);
        if (expiryDate < new Date()) {
          console.error(`   ❌ Token expired on ${expiryDate.toISOString()}`);
          hasErrors = true;
        } else {
          console.log(`   ✅ Expires: ${expiryDate.toISOString()}`);
        }
      }
    } catch (e) {
      console.error('   ❌ Cannot decode JWT payload');
      hasErrors = true;
    }
  }
}

// Validate Google API Key
console.log('\n🤖 Google Gemini API Key:');
if (!config.VITE_GOOGLE_API_KEY) {
  console.warn('   ⚠️  Missing VITE_GOOGLE_API_KEY (AI analysis will be disabled)');
} else if (config.VITE_GOOGLE_API_KEY === 'your_google_api_key_here') {
  console.warn('   ⚠️  Using placeholder value (AI analysis will be disabled)');
} else if (config.VITE_GOOGLE_API_KEY.length < 30) {
  console.error('   ❌ Too short to be valid');
  hasErrors = true;
} else {
  console.log('   ✅ Present and valid format');
}

// Summary
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.error('\n❌ Configuration has errors. Please fix them before running the app.\n');
  console.log('📖 For help, see: SUPABASE_TROUBLESHOOTING.md\n');
  process.exit(1);
} else {
  console.log('\n✅ All environment variables are valid!\n');
  console.log('🚀 You can now run: npm run dev\n');
  process.exit(0);
}
