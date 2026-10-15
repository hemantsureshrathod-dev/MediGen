import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// Support both standard naming conventions: VITE_SUPABASE_PUBLISHABLE_KEY and VITE_SUPABASE_ANON_KEY
const supabasePublishableKey = 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  '';

/**
 * Check if the Supabase client is configured with real credentials
 * rather than missing or placeholder values.
 */
export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabasePublishableKey) return false;
  if (
    supabasePublishableKey.includes('your-supabase-publishable-key-here') ||
    supabasePublishableKey.includes('placeholder')
  ) {
    return false;
  }
  return true;
};

if (!isSupabaseConfigured()) {
  console.warn(
    '[MediGen Auth] Supabase is not fully configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env.local file to enable live authentication.'
  );
}

// Fallback placeholder URL & key to avoid createClient throwing on startup if env is empty
const effectiveUrl = supabaseUrl || 'https://ssdoatwllkkqwrmdpqka.supabase.co';
const effectiveKey = supabasePublishableKey || 'placeholder-anon-key';

export const supabase: SupabaseClient = createClient(effectiveUrl, effectiveKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});
