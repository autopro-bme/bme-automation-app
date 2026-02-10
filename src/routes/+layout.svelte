<script>
	import './layout.css';
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { spinner } from '$lib/stores/spinner.js';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { authReady, session } from '$lib/stores/auth.js';

	/** @type {null | (() => void)} */
	let authStoresUnsub = null;

	/** @type {{ children: any }} */
	const { children } = $props();

	const MIN_SPINNER_MS = 400;
	let spinnerActive = $state(false);
	/** @type {ReturnType<typeof setTimeout> | null} */
	let hideTimer = null;
	/** @type {null | (() => void)} */
	let navUnsub = null;

	onMount(() => {
		// Spinner control during navigation
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

		// Auth guard: wait for authReady before redirecting
		let ready = false;
		let sess = null;
		const check = () => {
			if (!ready) return;
			const path = $page.url.pathname;
			const isAuthPage =
				path === '/auth/signin' ||
				path === '/auth/signup' ||
				path === '/auth/forgotpw' ||
				path === '/auth/forgotpw/confirm' ||
				path === '/auth/resetpw';

			if (!sess && !isAuthPage) {
				goto('/auth/signin');
			}
		};

		const unsubReady = authReady.subscribe((val) => {
			ready = val;
			check();
		});
		const unsubSession = session.subscribe((val) => {
			sess = val;
			check();
		});

		authStoresUnsub = () => {
			unsubReady();
			unsubSession();
		};
	});

	onDestroy(() => {
		if (authStoresUnsub) authStoresUnsub();
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
