import { goto } from '$app/navigation';
import { getSupabase } from '$lib/supabase';
import { waitForAuthReady } from './auth-store';

export async function requireUser(redirectTo = '/signin') {
	const supabase = getSupabase();
	if (!supabase) return null;

	const { user } = await waitForAuthReady(8000);

	if (!user) {
		await goto(redirectTo);
		return null;
	}

	return { supabase, user };
}
