<script>
	/** @type {Array<{ items: Array<any>}>} */
	import Plus from '@lucide/svelte/icons/plus';
	import Search from '@lucide/svelte/icons/search';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let notifications = [];
	let errorMsg = '';
	let isSaving = false;
	let fromDate = '';
	let toDate = '';
	let showCreateModal = false;
	let selectedPriority = 'All';
	let currentUserName = '';
	let searchTitle = '';

	let createForm = {
		title: '',
		summary: '',
		full_content: '',
		priority: '',
		photo_path: '',
		file_path: ''
	};

	const normalize = (v) => String(v ?? '').toLowerCase();

	$: filteredNotifications = (notifications ?? []).filter((n) => {
		const matchesPriority =
			selectedPriority === 'All' || normalize(n.priority) === normalize(selectedPriority);

		const matchesSearch =
			!searchTitle.trim() || normalize(n.title).includes(normalize(searchTitle));

		const matchesDate = withinRange(n.created_at);

		return matchesPriority && matchesSearch && matchesDate;
	});

	function toISOStart(dateStr) {
		return dateStr ? new Date(dateStr + 'T00:00:00').toISOString() : null;
	}
	function toISOEnd(dateStr) {
		return dateStr ? new Date(dateStr + 'T23:59:59.999').toISOString() : null;
	}

	function fmtDate(iso) {
		const d = new Date(iso);
		return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}

	function withinRange(iso) {
		const d = new Date(iso);
		const fromOk = !fromDate || d >= new Date(fromDate + 'T00:00:00');
		const toOk = !toDate || d <= new Date(toDate + 'T23:59:59.999');
		return fromOk && toOk;
	}

	onMount(async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser();

		if (!user) {
			goto('/auth/signin');
			return;
		}

		const { data: profileData, error: profileError } = await supabase
			.from('profiles')
			.select('first_name, last_name')
			.eq('id', user.id)
			.single();

		if (profileError) {
			errorMsg = profileError.message;
		} else {
			const firstName = profileData?.first_name ?? '';
			const lastName = profileData?.last_name ?? '';
			currentUserName = `${firstName} ${lastName}`.trim();
		}

		const { data, error } = await supabase
			.from('notifications')
			.select(
				'id, created_at, created_by, title, summary, full_content, priority, photo_path, file_path'
			)
			.order('created_at', { ascending: false });

		if (error) {
			errorMsg = error.message;
			notifications = [];
			return;
		}

		notifications = data ?? [];
	});

	const openCreateModal = () => {
		createForm = {
			title: '',
			summary: '',
			full_content: '',
			priority: '',
			photo_path: '',
			file_path: ''
		};
		showCreateModal = true;
	};

	const closeCreateModal = () => {
		showCreateModal = false;
	};

	const createNotification = async () => {
		isSaving = true;
		errorMsg = '';

		const payload = {
			title: createForm.title.trim() || null,
			summary: createForm.summary.trim() || null,
			full_content: createForm.full_content.trim() || null,
			priority: createForm.priority.trim() || null,
			photo_path: createForm.photo_path.trim() || null,
			file_path: createForm.file_path.trim() || null,
			created_by: currentUserName || null
		};

		const { data, error } = await supabase.from('notifications').insert(payload).select().single();

		isSaving = false;

		if (error) {
			errorMsg = error.message;
			return;
		}

		notifications = data ? [data, ...notifications] : notifications;
		closeCreateModal();
	};
</script>

<h1 class="title">Notifications and Announcements</h1>

<div class="notifications-filter">
	<div>
		<p>Priority</p>
		<select bind:value={selectedPriority} class="priority-select">
			<option value="All">All Priorities</option>
			<option value="Normal">Normal</option>
			<option value="Important">Important</option>
			<option value="Urgent">Urgent</option>
		</select>
	</div>
	<div>
		<p>Search</p>
		<input
			type="text"
			placeholder="Search by title"
			bind:value={searchTitle}
			class="filter-input"
		/>
	</div>
	<div>
		<p>From Date</p>
		<input type="date" name="created-date" id="date-from" class="date-from" bind:value={fromDate} />
	</div>
	<div>
		<p>To Date</p>
		<input type="date" name="created-date" id="date-to" class="date-to" bind:value={toDate} />
	</div>
	<div>
		<p></p>
		<button class="button-primary" id="button-search"><Search /></button>
	</div>
</div>

<div class="notifications-create">
	<button class="button-create" on:click={openCreateModal}
		><Plus /><span>Create Notification</span></button
	>
</div>

<div class="project-box">
	{#each filteredNotifications as n (n.id)}
		<div class="notification-card">
			<div class="notification-info">
				<div class="priority-date">
					<span
						class="priority-badge"
						class:normal={n.priority === 'Normal'}
						class:important={n.priority === 'Important'}
						class:urgent={n.priority === 'Urgent'}
					>
						{n.priority}
					</span>
					<p>{n.created_date ?? ''}</p>
				</div>
				<h3>{n.title ?? '-'}</h3>
				<p><b>{n.summary ?? ''}</b></p>
				<p>{n.full_content ?? ''}</p>
				<p>Photo: {n.photo_path ?? '-'}</p>
				<p>File: {n.file_path ?? '-'}</p>
			</div>
		</div>
	{/each}
</div>

{#if showCreateModal}
	<div class="modal-backdrop" role="presentation">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Create notification">
			<h2>New Notification</h2>
			<div class="modal-body">
				<label>Title: <input type="text" bind:value={createForm.title} /></label>
				<label>Summary: <input type="text" bind:value={createForm.summary} /></label>
				<label>Full Content: <input type="text" bind:value={createForm.full_content} /></label>
				<label
					>Priority:
					<select bind:value={createForm.priority}>
						<option value="" disabled selected>Choose Priority</option>
						<option value="Normal">Normal</option>
						<option value="Important">Important</option>
						<option value="Urgent">Urgent</option>
					</select>
				</label>
				<label
					>Photo:
					<input
						type="file"
						name=""
						id=""
						accept="image/png, image/jpeg"
						on:change={(e) => (noti_photo_file = e.target.files[0])}
					/>
				</label>
				<label
					>File:
					<input
						type="file"
						name=""
						id=""
						accept="image/png, image/jpeg"
						on:change={(e) => (noti_file_file = e.target.files[0])}
					/>
				</label>
			</div>
			<div class="modal-actions">
				<button class="button-inverted" on:click={closeCreateModal} disabled={isSaving}>
					Cancel
				</button>
				<button on:click={createNotification} disabled={isSaving}>
					{isSaving ? 'Saving...' : 'Confirm'}
				</button>
			</div>
		</div>
	</div>
{/if}

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

	button:hover {
		background-color: #064c6da4;
	}

	.button-create {
		width: 200px;
		height: 40px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-right: auto;
	}

	.button-create span {
		color: #ffffff;
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
		margin-top: 20px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.filter-input {
		width: 350px;
		font-size: 14px;
	}

	h2 {
		font-weight: bold;
	}

	h3 {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(9, 23, 71, 0.45);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 32px 20px;
		z-index: 10;
	}

	.modal {
		width: min(560px, 100%);
		max-height: calc(100vh - 64px);
		overflow: auto;
		background: #ffffff;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.modal h2 {
		margin: 0 0 16px;
		font-size: 20px;
	}

	.modal-body {
		display: grid;
		gap: 12px;
	}

	.modal-body label {
		display: grid;
		gap: 6px;
		font-size: 13px;
		font-weight: bold;
	}

	.modal-body input {
		border: 1px solid #dcdcdc;
		border-radius: 4px;
		padding: 8px 10px;
		font-size: 14px;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 18px;
	}

	.notification-card {
		align-items: center;
		background-color: #ffffff;
		border: 1px solid #dcdcdc;
		border-radius: 4px;
		padding: 15px 20px;
		margin: 10px 10px 0;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.notifications-create {
		display: flex;
		margin: 10px;
	}

	.notifications-filter {
		display: flex;
		gap: 10px;
		margin: 10px;
		border-radius: 4px;
		padding: 10px 0;
		font-size: 14px;
	}

	.priority-date {
		display: flex;
		padding: 10px;
		justify-content: space-between;
	}

	.priority-badge {
		padding: 4px 10px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: bold;
		color: #fff;
		display: inline-block;
	}

	.priority-badge.normal {
		background-color: #064c6dd7;
	}

	.priority-badge.important {
		background-color: #fb8c00;
	}

	.priority-badge.urgent {
		background-color: #e53935;
	}

	.project-box {
		margin: 10px;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}
</style>
