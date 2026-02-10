<script>
	import './layout.css';
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { spinner } from '$lib/stores/spinner.js';
	import { onMount, onDestroy } from 'svelte';
	import { getSupabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	/** @type {null | (() => void)} */
	let authUnsub = null;

	/** @type {{ children: any }} */
	const { children } = $props();

	const MIN_SPINNER_MS = 400;
	let spinnerActive = $state(false);
	/** @type {ReturnType<typeof setTimeout> | null} */
	let hideTimer = null;
	/** @type {null | (() => void)} */
	let navUnsub = null;

	onMount(() => {
		const supabase = getSupabase();
		if (!supabase) return;

		if (supabase) {
			const { data } = supabase.auth.onAuthStateChange((_event, session) => {
				if (
					!session &&
					$page.url.pathname !== '/auth/signin' &&
					$page.url.pathname !== '/auth/signup'
				) {
					goto('/auth/signin');
				}
			});
			authUnsub = () => data.subscription.unsubscribe();
		}

		navUnsub = navigating.subscribe((nav) => {
			if (nav) {
				if (hideTimer) {
					clearTimeout(hideTimer);
					hideTimer = null;
				}
				spinnerActive = true;
			} else {
				hideTimer = setTimeout(() => {
					spinnerActive = false;
					hideTimer = null;
				}, MIN_SPINNER_MS);
			}
		});
	});

	onDestroy(() => {
		if (authUnsub) authUnsub();
		// @ts-ignore
		if (navUnsub) navUnsub();
		if (hideTimer) clearTimeout(hideTimer);
	});
</script>

<svelte:head>
	<title>{$page.data.title ?? 'BME Automation App'}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<Spinner active={$spinner || spinnerActive} />

<div class="app-shell">
	<Header />

	<main class="app-main">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.app-main {
		flex: 1;
	}
</style>
