import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getSupabase } from '$lib/supabase';

export const authReady = writable(false);
export const session = writable(null);

if (browser) {
	const supabase = getSupabase();

	supabase.auth.getSession().then(({ data }) => {
		session.set(data.session ?? null);
		authReady.set(true);
	});

	supabase.auth.onAuthStateChange((_event, newSession) => {
		session.set(newSession ?? null);
		authReady.set(true);
	});
}
