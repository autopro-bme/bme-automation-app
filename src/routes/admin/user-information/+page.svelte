<script>
	/** @type {Array<{ items: Array<any>}>} */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Search from '@lucide/svelte/icons/search';
	import { supabase } from '$lib/supabase';

	let users = [];
	let errorMsg = '';

	let searchText = '';
	let selectedDepartment = 'All';

	$: filteredUsers = users.filter((u) => {
		const name = `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim();
		const haystack = `${name} ${u.email ?? ''} ${u.department ?? ''}`.toLowerCase();

		const matchesSearch = haystack.includes(searchText.toLowerCase());
		const matchesDepartment =
			selectedDepartment === 'All' || (u.department ?? []).includes(selectedDepartment);

		return matchesSearch && matchesDepartment;
	});

	onMount(async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser();

		if (!user) {
			goto('/auth/signin');
			return;
		}

		const { data, error } = await supabase
			.from('profiles')
			.select(
				'id, first_name, last_name, nickname, email, phone, department, position, region, created_at'
			)
			.order('created_at', { ascending: false });

		if (error) {
			errorMsg = error.message;
			users = [];
			return;
		}

		users = data ?? [];
	});
</script>

<svelte:head>
	<title>User Information Management | BME Automation App</title>
</svelte:head>

<h1 class="title">User Information Management</h1>

<div class="filter-bar">
	<input type="text" placeholder="Search here..." bind:value={searchText} class="filter-input" />
	<select bind:value={selectedDepartment} class="department-select">
		<option value="All">All Departments</option>
		<option value="Admin">Admin</option>
		<option value="Project">Project</option>
		<option value="HSE">HSE</option>
	</select>
	<button class="button-primary" id="button-search"><Search /></button>
</div>

{#if errorMsg}
	<p class="error">{errorMsg}</p>
{/if}

<div class="card-grid">
	{#each filteredUsers as u (u.id)}
		<div class="user-card">
			<div class="user-info">
				<h3>{`${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || '—'}</h3>
				<p>E-mail: {u.email}</p>
				<p>Phone: {u.phone ?? '-'}</p>
				<p>Department: {u.department?.join(', ') ?? '-'}</p>
				<p>Position: {u.position ?? '-'}</p>
				<p>Region: {u.region ?? '-'}</p>
			</div>
			<div class="button-modify">
				<button>Edit</button>
				<button class="button-inverted">Delete</button>
			</div>
		</div>
	{/each}
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
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

	button:hover {
		background-color: #064c6da4;
	}

	.button-inverted {
		background-color: #ffffff;
		color: #064c6dd7;
		font-size: small;
		margin-top: 5px;
		padding: 6px 14px;
		border: 2px solid #064c6dd7;
		border-radius: 4px;
		cursor: pointer;
	}

	.button-inverted:hover {
		background-color: #dedede;
	}

	.button-modify {
		display: grid;
		width: 20%;
	}

	.button-primary {
		background-color: #091747;
		font-weight: bold;
		padding: 10px 20px;
	}

	.button-primary:hover {
		background-color: #091747b9;
	}

	#button-search {
		vertical-align: middle;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.department-select {
		font-size: 14px;
		cursor: pointer;
	}

	.filter-bar {
		padding: 10px;
	}

	.filter-input {
		width: 30%;
		font-size: 14px;
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

	.user-card {
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

	.user-info {
		width: 80%;
	}

	.user-info p {
		font-size: 14px;
	}
</style>
