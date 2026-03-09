<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { requireUser } from '$lib/auth-guard';

	let ready = false;

	onMount(async () => {
		const auth = await requireUser();
		if (!auth) return;

		const { supabase, user } = auth;

		const { data: profile } = await supabase
			.from('profiles')
			.select('department')
			.eq('id', user.id)
			.single();

		const dept = profile?.department ?? [];
		if (!(dept.includes('Admin') || dept.includes('Project'))) {
			await goto('/');
			return;
		}

		ready = true;
	});
</script>

{#if ready}
	<slot />
{/if}
