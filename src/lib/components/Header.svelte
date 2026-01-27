<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { getSupabase } from '$lib/supabase';
	import History from '@lucide/svelte/icons/history';
	import Calendar from '@lucide/svelte/icons/calendar-days';

	const isAuthPage = $derived.by(() => {
		const path = $page.url.pathname;
		return (
			path === '/auth/signin' ||
			path === '/auth/signup' ||
			path === '/auth/forgotpw' ||
			path === '/confirmation'
		);
	});

	let hasUser = $state(false);
	let userName = $state('User');
	let sub;

	async function syncUser(sessionUser) {
		if (!sessionUser) {
			hasUser = false;
			userName = 'User';
			return;
		}

		hasUser = true;

		const supabase = getSupabase();
		if (!supabase) return;

		const { data: profile, error: profileError } = await supabase
			.from('profiles')
			.select('nickname, first_name')
			.eq('id', sessionUser.id)
			.single();

		// If profiles read is blocked, fall back to email
		if (profileError) {
			userName = sessionUser.email ?? 'User';
			return;
		}

		userName = profile?.nickname || profile?.first_name || sessionUser.email;
	}

	onMount(async () => {
		const supabase = getSupabase();
		if (!supabase) return;

		// initial session
		const {
			data: { session }
		} = await supabase.auth.getSession();
		await syncUser(session?.user ?? null);

		// update immediately on sign-in/sign-out
		const { data } = supabase.auth.onAuthStateChange(async (_event, session2) => {
			await syncUser(session2?.user ?? null);
		});
		sub = data?.subscription;
	});

	onDestroy(() => {
		sub?.unsubscribe?.();
	});

	async function signOut() {
		const supabase = getSupabase();
		if (supabase) await supabase.auth.signOut();
		// syncUser will be called by onAuthStateChange, but set immediately too
		hasUser = false;
		userName = 'User';
		goto('/auth/signin');
	}
</script>

<div class="container">
	<div class="logo">
		<a href="/"><img src="/images/bme_logo.jpg" alt="BME Logo" class="logo" /></a>
	</div>
	{#if !isAuthPage && hasUser}
		<div class="welcome">
			<p>Welcome, <b>{userName}</b>!</p>
			<div class="calendar-history">
				<a href="/hse/submission-history" class="navigation"><History />History</a>
				<a href="/hse/calendar-view" class="navigation"><Calendar />Calendar</a>
				<button type="submit" onclick={signOut} class="button-primary">Sign Out</button>
			</div>
		</div>
	{/if}
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: #091747;
	}

	a:hover {
		color: #091747b9;
	}

	button {
		background-color: #064c6dd7;
		color: #ffffff;
		border: none;
		font-size: small;
		padding: 6px 14px;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #064c6da4;
	}

	.button-primary {
		background-color: #091747;
		padding: 10px 20px;
	}

	.button-primary:hover {
		background-color: #091747b9;
	}

	.calendar-history {
		display: flex;
		align-items: center;
		gap: 25px;
		font-size: 14px;
	}

	.container {
		display: flex;
		padding: 0 10px;
	}

	.logo {
		width: 35%;
	}

	.navigation {
		display: flex;
		vertical-align: middle;
		gap: 5px;
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

	@media (max-width: 600px) {
		.container {
			margin-top: 10px;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 10px;
		}

		.logo {
			width: 45%;
		}

		p {
			font-size: 14px;
		}

		.welcome {
			margin-left: auto;
			position: static;
			display: flex;
			justify-content: flex-end;
			gap: 5px;
			flex-wrap: wrap;
		}

		.welcome a {
			display: inline-flex;
			align-items: center;
			gap: 0;
			font-size: 0;
			line-height: 0;
		}

		.welcome a {
			width: 18px;
			height: 18px;
		}

		.welcome .button-primary {
			height: 32px;
			padding: 0 12px;
			font-size: 13px;
			border-radius: 4px;
		}

		.calendar-history {
			gap: 15px;
		}
	}
</style>
