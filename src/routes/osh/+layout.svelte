<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getSupabase } from '$lib/supabase';

	let ready = false;

	onMount(async () => {
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
		if (!(dept.includes('Admin') || dept.includes('OSH'))) return goto('/');

		ready = true;
	});
</script>

{#if ready}
	<slot />
{/if}
