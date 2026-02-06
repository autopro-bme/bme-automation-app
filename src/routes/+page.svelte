<script>
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { menuSections } from '$lib/data/menu';
	import { onMount } from 'svelte';

	let allowedDepartments = [];
	let errorMsg = '';

	function deptKey(label) {
		if (label.includes('(OSH)') || label.toLowerCase().includes('osh')) return 'OSH';
		if (label.toLowerCase().includes('project')) return 'Project';
		if (label.toLowerCase().includes('admin')) return 'Admin';
		return label;
	}

	function normalizeDepartments(raw) {
		if (Array.isArray(raw)) return raw;

		if (typeof raw === 'string') {
			try {
				const parsed = JSON.parse(raw);
				if (Array.isArray(parsed)) return parsed;
			} catch (_) {}

			return raw
				.split(',')
				.map((s) => s.replace(/[\[\]"]/g, '').trim())
				.filter(Boolean);
		}

		return [];
	}

	const visibleSections = () => {
		const isAdmin = allowedDepartments.includes('Admin');
		if (isAdmin) return menuSections;

		return menuSections.filter((section) => {
			const key = deptKey(section.department);
			return allowedDepartments.includes(key);
		});
	};

	onMount(async () => {
		const { data: auth } = await supabase.auth.getUser();
		if (!auth?.user) {
			goto('/auth/signin');
			return;
		}

		const { data: profile, error } = await supabase
			.from('profiles')
			.select('department')
			.eq('id', auth.user.id)
			.single();

		if (error) {
			errorMsg = error.message;
			return;
		}

		allowedDepartments = normalizeDepartments(profile?.department);
	});
</script>

{#if errorMsg}
	<p class="error">{errorMsg}</p>
{/if}

<h1 class="title">Main Menu</h1>

{#each visibleSections as section}
	<h2 class="department">Department: <span class="section">{section.department}</span></h2>

	{#each section.items as item}
		<div class="menu-card">
			<img src={item.icon} alt="icon" class="menu-icon" />
			<div class="menu-info">
				<h3>{item.title}</h3>
				<p>{item.description}</p>
			</div>
			<button disabled={item.disabled} onclick={() => !item.disabled && goto(item.route)}>
				Go To
			</button>
		</div>
	{/each}
{/each}

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 14px;
		color: #091747;
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

	button[disabled] {
		background-color: #cccccc;
		color: #666666;
		cursor: not-allowed;
		opacity: 0.6;
	}

	button:hover {
		background-color: #064c6da4;
	}

	.department {
		font-size: large;
		font-weight: bold;
		margin-top: 30px;
		padding: 0 10px;
	}

	h3 {
		font-weight: bold;
		font-size: 16px;
	}

	.section {
		font-size: large;
		color: #064c6dd7;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}

	.menu-card {
		display: flex;
		align-items: center;
		gap: 16px;
		background-color: #ffffff;
		border: 1px solid #dcdcdc;
		border-radius: 4px;
		padding: 15px 20px;
		margin: 10px 10px 0;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.menu-icon {
		width: 40px;
		height: 40px;
		flex-shrink: 0;
	}

	.menu-info {
		flex-grow: 1;
	}

	.menu-info h3 {
		margin: 0;
	}

	.menu-info p {
		margin: 4px 0 0;
		font-size: 14px;
		color: #091747;
	}

	@media (max-width: 600px) {
		.menu-card button {
			height: 32px;
			padding: 0 12px;
			font-size: 13px;
		}

		.menu-card {
			display: flex;
			align-items: center;
			gap: 10px;
		}

		.menu-icon {
			width: 38px;
			height: 38px;
			flex: 0 0 auto;
		}

		.menu-info {
			flex: 1 1 auto;
			min-width: 0;
			padding-right: 8px;
		}

		.menu-card button {
			flex: 0 0 auto;
			white-space: nowrap;
			min-width: 72px;
		}
	}
</style>
