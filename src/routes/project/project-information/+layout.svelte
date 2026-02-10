<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getSupabase } from '$lib/supabase';
	import { authReady, session } from '$lib/stores/auth';
	import { get } from 'svelte/store';

	let ready = false;

	onMount(async () => {
		while (!get(authReady)) {
			await new Promise((r) => setTimeout(r, 25));
		}

		const s = get(session);
		if (!s?.user) {
			goto('/auth/signin');
			return;
		}
		const supabase = getSupabase();
		if (!supabase) return;

		const { data: auth } = await supabase.auth.getUser();
		if (!auth?.user) return goto('/auth/signin');

		const { data: profile } = await supabase
			.from('profiles')
			.select('department')
			.eq('id', auth.user.id)
			.single();

		const dept = profile?.department ?? [];
		if (!(dept.includes('Admin') || dept.includes('Project'))) return goto('/');

		ready = true;
	});
</script>

{#if ready}
	<slot />
{/if}
