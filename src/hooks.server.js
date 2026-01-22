import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

export async function handle({ event, resolve }) {
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
