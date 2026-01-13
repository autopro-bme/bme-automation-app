<script>
	import './layout.css';
	import { page } from '$app/stores';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { spinner } from '$lib/stores/spinner.js';
	import { onMount, onDestroy } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	supabase.auth.onAuthStateChange((event, session) => {
		if (!session && $page.url.pathname.startsWith('/main')) {
			goto('/auth/signin');
		}
	});

	/** @type {{ children: any }} */
	const { children } = $props();

	const MIN_SPINNER_MS = 1000;
	let spinnerActive = $state(false);
	let navStart = $state(0);
	/** @type {ReturnType<typeof setTimeout> | null} */
	let hideTimer = null;

	// @ts-ignore
	let beforeUnsub = null;
	// @ts-ignore
	let afterUnsub = null;

	onMount(() => {
		beforeUnsub = beforeNavigate(() => {
			if (hideTimer) {
				clearTimeout(hideTimer);
				hideTimer = null;
			}
			navStart = Date.now();
			spinnerActive = true;
		});

		afterUnsub = afterNavigate(() => {
			if (!spinnerActive) return;
			const elapsed = Date.now() - navStart;
			const remaining = Math.max(0, MIN_SPINNER_MS - elapsed);
			hideTimer = setTimeout(() => {
				spinnerActive = false;
				hideTimer = null;
			}, remaining);
		});
	});

	onDestroy(() => {
		// @ts-ignore
		if (beforeUnsub) beforeUnsub();
		// @ts-ignore
		if (afterUnsub) afterUnsub();
		if (hideTimer) clearTimeout(hideTimer);
	});
</script>

<svelte:head>
	<title>{$page.data.title ?? 'BME Automation App'}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<Spinner active={$spinner || spinnerActive} />

<Header />

{@render children()}

<Footer />
