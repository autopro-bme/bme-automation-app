import { createClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { resolve } from '$app/paths';

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

export async function waitForSession(timeoutMs = 8000) {
	const client = getSupabase();
	if (!client) return null;

	const started = Date.now();

	while (Date.now() - started < timeoutMs) {
		const {
			data: { session }
		} = await client.auth.getSession();

		if (session?.user) return session;

		try {
			const { data: refreshed } = await client.auth.refreshSession();
			if (refreshed?.session?.user) return refreshed.session;
		} catch {
			// Ignore
		}

		await new Promise((resolve) => setTimeout(resolve, 250));
	}

	return null;
}
