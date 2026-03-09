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

export async function waitForSession(timeoutMs = 2000) {
	const client = getSupabase();
	if (!client) return null;

	const {
		data: { session }
	} = await client.auth.getSession();

	if (session) return session;

	return await new Promise((resolve) => {
		let done = false;

		const finish = (value) => {
			if (done) return;
			done = true;
			clearTimeout(timer);
			subscription?.unsubscribe();
			resolve(value);
		};

		const timer = setTimeout(() => finish(null), timeoutMs);

		const {
			data: { subscription }
		} = client.auth.onAuthStateChange((_event, session) => {
			if (session) finish(session);
		});
	});
}
