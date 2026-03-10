import { goto } from '$app/navigation';
import { getSupabase, waitForUser } from '$lib/supabase';

export async function requireUser(redirectTo = '/signin') {
	const supabase = getSupabase();
	if (!supabase) return null;

	const user = await waitForUser(8000);

	if (!user) {
		await goto(redirectTo);
		return null;
	}

	return { supabase, user };
}
