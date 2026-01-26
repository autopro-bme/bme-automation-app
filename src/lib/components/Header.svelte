<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getSupabase } from '$lib/supabase';
	import History from '@lucide/svelte/icons/history';
	import Calendar from '@lucide/svelte/icons/calendar-days';

	let sessionUser = $state(null);
	let userName = $state('User');

	const isAuthPage = $derived.by(() =>
		['/auth/signin', '/auth/signup'].includes($page.url.pathname)
	);

	onMount(async () => {
		const supabase = getSupabase();
		if (!supabase) return;
		const {
			data: { user }
		} = await supabase.auth.getUser();
		sessionUser = user ?? null;

		const { data: profile, error: profileError } = await supabase
			.from('profiles')
			.select('nickname, first_name')
			.eq('id', user.id)
			.single();

		const meta = user.user_metadata ?? {};
		if (!profile && (meta.nickname || meta.first_name)) {
			await supabase.from('profiles').upsert(
				{
					id: user.id,
					email: user.email,
					first_name: meta.first_name ?? null,
					nickname: meta.nickname ?? null
				},
				{ onConflict: 'id' }
			);
		} else if (profile && !profile.nickname && meta.nickname) {
			await supabase.from('profiles').update({ nickname: meta.nickname }).eq('id', user.id);
		}

		userName =
			profile?.nickname || profile?.first_name || meta.nickname || meta.first_name || user.email;
	});

	async function signOut() {
		const supabase = getSupabase();
		if (!supabase) return;

		await supabase.auth.signOut();
		goto('/auth/signin');
	}
</script>

<div class="container">
	<div class="logo">
		<a href="/"><img src="/images/bme_logo.jpg" alt="BME Logo" class="logo" /></a>
	</div>
	{#if !isAuthPage && sessionUser}
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
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 10px;
		}

		.welcome {
			margin-left: auto;
			position: static;
			display: flex;
			justify-content: flex-end;
			gap: 10px;
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
