import { createServerClient } from '@supabase/auth-helpers-sveltekit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Create Supabase server client
	event.locals.supabase = createServerClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY,
		{
			cookies: event.cookies
		}
	);

	// Get current session
	const { data } = await event.locals.supabase.auth.getSession();

	event.locals.session = data?.session ?? null;
	event.locals.user = data?.session?.user ?? null;

	return resolve(event);
}
