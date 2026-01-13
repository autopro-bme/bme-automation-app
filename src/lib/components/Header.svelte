<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	$: isAuthPage = $page.url.pathname === '/auth/signin' || $page.url.pathname === '/auth/signup';

	let userName = 'User';

	onMount(async () => {
		const { data } = await supabase.auth.getUser();

		if (data?.user) {
			userName = data.user.user_metadata?.first_name ?? data.user.email;
		}
	});

	async function signOut() {
		await supabase.auth.signOut();
		goto('/auth/signin');
	}
</script>

<div class="container">
	<div class="logo">
		<a href="/"><img src="\src\images\bme_logo.jpg" alt="BME Logo" class="logo" /></a>
	</div>
	{#if !isAuthPage}
		<div class="welcome">
			<p>Welcome, <b>{userName}</b></p>
			<button type="submit" on:click={signOut} class="button-primary">Sign Out</button>
		</div>
	{/if}
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: #091747;
	}

	button {
		background-color: #05577ed7;
		color: #ffffff;
		border: none;
		font-size: small;
		padding: 6px 14px;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #05577ea4;
	}

	.button-primary {
		background-color: #091747;
		padding: 10px 20px;
	}

	.button-primary:hover {
		background-color: #091747b9;
	}

	.container {
		display: flex;
		padding: 0 10px;
	}

	.logo {
		width: 35%;
	}

	.welcome {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		position: absolute;
		top: 40px;
		right: 10px;
		gap: 10px;
	}
</style>
