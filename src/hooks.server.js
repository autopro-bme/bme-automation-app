import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

export async function handle({ event, resolve }) {
	const SUPABASE_URL = env.SUPABASE_URL;
	const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;

	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		throw new Error(
			'Supabase environment variables are missing (SUPABASE_URL / SUPABASE_ANON_KEY)'
		);
	}

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
		auth: { persistSession: false }
	});

	event.locals.supabase = supabase;

	event.locals.getUser = async () => {
		const access_token = event.cookies.get('sb-access-token');
		const refresh_token = event.cookies.get('sb-refresh-token');

		if (!access_token || !refresh_token) return null;

		const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });
		if (error) return null;

		return data.user;
	};

	return resolve(event);
}
