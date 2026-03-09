import { goto } from '$app/navigation';
import { getSupabase, waitForSession } from './supabase';

export async function requireUser() {
	const supabase = getSupabase();
	if (!supabase) return null;

	const session = await waitForSession(5000);
	const user = session?.user ?? null;

	if (!user) {
		await goto('/signin');
		return null;
	}

	return { supabase, user };
}
