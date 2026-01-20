<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';

	let ready = false;

	onMount(async () => {
		const { data: auth } = await supabase.auth.getUser();
		if (!auth?.user) return goto('/auth/signin');

		const { data: profile } = await supabase
			.from('profiles')
			.select('department')
			.eq('id', auth.user.id)
			.single();

		const dept = profile?.department ?? [];
		if (!dept.includes('Admin')) return goto('/');

		ready = true;
	});
</script>

{#if ready}
	<slot />
{/if}
