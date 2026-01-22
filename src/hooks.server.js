import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export async function handle({ event, resolve }) {
	if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
		throw new Error('Supabase environment variables are missing');
	}

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		auth: { persistSession: false }
	});

	event.locals.supabase = supabase;

	event.locals.getUser = async () => {
		const allCookies = event.cookies.getAll();
		const authCookie = allCookies.find((c) => c.name.endsWith('-auth-token'));

		if (!authCookie?.value) return null;

		let sessionObj;
		try {
			sessionObj = JSON.parse(authCookie.value);
		} catch {
			return null;
		}

		const access_token = sessionObj?.access_token;
		const refresh_token = sessionObj?.refresh_token;

		if (!access_token || !refresh_token) return null;

		const { data, error } = await supabase.auth.setSession({
			access_token,
			refresh_token
		});

		if (error) return null;
		return data.user ?? null;
	};

	return resolve(event);
}
