import { createClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

let _client = null;

export function getSupabase() {
	if (!browser) return null;
	if (_client) return _client;

	_client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		auth: {
			persistSession: true,
			autoRefreshToken: true,
			detectSessionInUrl: true
		}
	});

	return _client;
}

export const supabase = getSupabase();

export async function waitForUser(timeoutMs = 8000) {
	const client = getSupabase();
	if (!client) return null;

	const started = Date.now();

	while (Date.now() - started < timeoutMs) {
		try {
			const {
				data: { user },
				error
			} = await client.auth.getUser();

			if (!error && user) return user;
		} catch {
			// Ignore and retry
		}

		await new Promise((resolve) => setTimeout(resolve, 250));
	}

	return null;
}
