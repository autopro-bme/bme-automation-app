import { createClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

/**
 * Browser-only Supabase client.
 *
 * In SvelteKit, component scripts can run during SSR. If you access Supabase
 * at module top-level on the server, it will crash. Use `getSupabase()`
 * inside `onMount()` or inside event handlers.
 */
export function getSupabase() {
	if (!browser) return null;
	return createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}

// Convenience export (still browser-only). Always null on the server.
export const supabase = getSupabase();
