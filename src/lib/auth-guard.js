import { goto } from '$app/navigation';
import { getSupabase, waitForSession } from './supabase';

export async function requireUser(redirectTo = '/signin') {
	const supabase = getSupabase();
	if (!supabase) return null;

	const session = await waitForSession(5000);
	const user = session?.user ?? null;

	if (!user) {
		await goto(redirectTo);
		return null;
	}

	return { supabase, user, session };
}
