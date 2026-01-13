<script>
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { menuSections } from '$lib/data/menu';
	import { onMount } from 'svelte';

	let user = null;

	onMount(async () => {
		const { data } = await supabase.auth.getUser();

		if (!data?.user) {
			goto('/auth/signin');
			return;
		}

		user = data.user;
	});
</script>

<h1 class="title">Main Menu</h1>

{#each menuSections as section}
	<h2 class="department">Department: {section.department}</h2>

	{#each section.items as item}
		<div class="menu-card">
			<img src={item.icon} alt="icon" class="menu-icon" />
			<div class="menu-info">
				<h3>{item.title}</h3>
				<p>{item.description}</p>
			</div>
			<button on:click={() => goto(item.route)}> Go To </button>
		</div>
	{/each}
{/each}

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

	.department {
		font-size: large;
		font-weight: bold;
		margin-top: 30px;
		padding: 0 10px;
	}

	h3 {
		font-weight: bold;
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
</style>
