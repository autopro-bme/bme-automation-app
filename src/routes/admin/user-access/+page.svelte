<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getSupabase } from '$lib/supabase';

	let users = [];
	let departments = [];
	let errorMsg = '';
	let isSaving = false;
	let selectedDepartment = 'All';
	let selectedUser = '';
	let selectedDepartments = [];

	$: filteredUsers =
		selectedDepartment === 'All'
			? users
			: users.filter((user) => (user.department ?? []).includes(selectedDepartment));

	const departmentCards = [
		{
			value: 'Admin',
			label: 'Admin',
			items: 'User Information Management, User Access Management'
		},
		{
			value: 'Project',
			label: 'Project',
			items: 'Project Information Management'
		},
		{
			value: 'OSH',
			label: 'Occupational Safety & Health (OSH)',
			items:
				'Site Safety eForm Information, Working Day Attendance (e-WDA) Record, Site Safety eForms Submission'
		}
	];

	const getUserName = (user) => {
		const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
		return name || user.email || 'Unknown';
	};

	const syncSelectedDepartments = () => {
		const user = users.find((item) => item.id === selectedUser);
		selectedDepartments = user?.department ? [...user.department] : [];
	};

	const toggleDepartment = (value) => {
		if (selectedDepartments.includes(value)) {
			selectedDepartments = selectedDepartments.filter((item) => item !== value);
		} else {
			selectedDepartments = [...selectedDepartments, value];
		}
	};

	const saveDepartments = async () => {
		if (!selectedUser) return;
		isSaving = true;
		errorMsg = '';

		const payload = {
			department: selectedDepartments
		};

		const { error } = await supabase.from('profiles').update(payload).eq('id', selectedUser);

		isSaving = false;

		if (error) {
			errorMsg = error.message;
			return;
		}

		users = users.map((user) =>
			user.id === selectedUser ? { ...user, department: selectedDepartments } : user
		);
	};

	const removeAllAccess = async () => {
		if (!selectedUser) return;
		selectedDepartments = [];
		await saveDepartments();
	};

	onMount(async () => {
		const supabase = getSupabase();
		if (!supabase) return;

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
			departments = [];
			return;
		}

		users = data ?? [];
		const departmentSet = new Set();
		users.forEach((item) => {
			(item.department ?? []).forEach((dept) => departmentSet.add(dept));
		});
		departments = Array.from(departmentSet);
		syncSelectedDepartments();
	});

	$: if (selectedUser) {
		syncSelectedDepartments();
	} else {
		selectedDepartments = [];
	}
</script>

<svelte:head>
	<title>User Access Management | BME Automation App</title>
</svelte:head>

<h1 class="title">User Access Management</h1>

{#if errorMsg}
	<p class="error">{errorMsg}</p>
{/if}

<div class="filter-bar">
	<h2 class="department">Department</h2>
	<select bind:value={selectedDepartment} class="department-select">
		<option value="All">All Departments</option>
		{#each departments as department}
			<option value={department}>{department}</option>
		{/each}
	</select>
	<h2 class="user">User</h2>
	<select bind:value={selectedUser} class="user-select">
		<option value="" disabled selected>All Users</option>
		{#each filteredUsers as item}
			<option value={item.id}>{getUserName(item)}</option>
		{/each}
	</select>
	{#each departmentCards as card}
		<div class="menu-card">
			<div class="menu-access">
				<div class="menu-info">
					<h3><b>Department:</b> {card.label}</h3>
					<p><b>Item(s):</b> {card.items}</p>
				</div>
				<div class="access-check">
					<label class="circle-checkbox">
						<input
							type="checkbox"
							name="access-status"
							checked={selectedDepartments.includes(card.value)}
							onchange={() => toggleDepartment(card.value)}
							disabled={!selectedUser || isSaving}
						/>
						<span class="checkmark" aria-hidden="true"></span>
					</label>
				</div>
			</div>
		</div>
	{/each}
</div>
<div class="button-modify">
	<button class="button-inverted" onclick={removeAllAccess} disabled={!selectedUser || isSaving}>
		Remove All Access From This User
	</button>
	<button class="button-assign" onclick={saveDepartments} disabled={!selectedUser || isSaving}>
		{isSaving ? 'Saving...' : 'Assign Access To This User'}
	</button>
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 14px;
		color: #091747;
	}

	.access-check {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
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

	.button-assign {
		width: 250px;
		height: 40px;
	}

	.button-inverted {
		background-color: #ffffff;
		color: #064c6dd7;
		width: 250px;
		height: 40px;
		font-size: small;
		padding: 6px 14px;
		border: 2px solid #064c6dd7;
		border-radius: 4px;
		cursor: pointer;
	}

	.button-inverted:hover {
		background-color: #dedede;
	}

	.button-modify {
		display: flex;
		width: 40%;
		padding: 10px 0 10px 10px;
		justify-content: space-between;
	}

	.circle-checkbox {
		display: inline-block;
		position: relative;
		width: 30px;
		height: 30px;
		cursor: pointer;
	}

	.circle-checkbox input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
		padding: 0;
	}

	.circle-checkbox .checkmark {
		display: inline-block;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 2px solid #091747;
		background: #ffffff;
		box-sizing: border-box;
		position: relative;
	}

	.circle-checkbox .checkmark::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 18px;
		height: 18px;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><polyline points='20 6 9 17 4 12' stroke='%23ffffff' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		transform: translate(-50%, -50%) scale(0);
		transition:
			transform 140ms ease,
			opacity 120ms ease;
		opacity: 0;
		pointer-events: none;
	}
	.circle-checkbox input:checked + .checkmark {
		background: #091747;
	}

	.circle-checkbox input:checked + .checkmark::after {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
	}

	.circle-checkbox input:focus + .checkmark {
		outline: 3px solid rgba(9, 23, 71, 0.12);
	}

	.error {
		color: #b00020;
		padding: 0 10px 10px;
	}

	.department,
	.user {
		font-size: large;
		font-weight: bold;
		margin: 10px 0;
	}

	.department-select,
	.user-select {
		font-size: 14px;
		width: 40%;
		cursor: pointer;
	}

	.filter-bar {
		padding: 10px;
	}

	.menu-access {
		display: flex;
	}

	.menu-card {
		width: 100%;
		align-items: center;
		gap: 16px;
		background-color: #ffffff;
		border: 1px solid #dcdcdc;
		border-radius: 4px;
		padding: 15px 10px;
		margin: 10px 0;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}

	@media (max-width: 1024px) {
		.title {
			font-size: 24px;
			margin-bottom: 15px;
		}

		.filter-bar {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.department-select,
		.user-select {
			width: 100%;
		}

		.menu-access {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.menu-info {
			width: 100%;
		}

		.menu-info h3,
		.menu-info p {
			word-break: break-word;
			overflow-wrap: anywhere;
			white-space: normal;
		}

		.access-check {
			align-self: flex-end;
		}

		.button-modify {
			width: 100%;
			padding: 10px;
			gap: 10px;
		}

		.button-assign,
		.button-inverted {
			width: 100%;
		}
	}

	@media (max-width: 600px) {
		.title {
			font-size: 24px;
		}

		.department,
		.user {
			font-size: 16px;
		}

		.menu-card {
			padding: 12px;
		}

		.menu-info h3 {
			font-size: 16px;
		}

		.menu-info p {
			font-size: 13px;
		}

		.circle-checkbox {
			width: 26px;
			height: 26px;
		}

		.circle-checkbox .checkmark {
			width: 26px;
			height: 26px;
		}

		.circle-checkbox .checkmark::after {
			width: 14px;
			height: 14px;
		}

		.button-modify {
			flex-direction: column;
		}

		button {
			width: 100%;
		}
	}
</style>
