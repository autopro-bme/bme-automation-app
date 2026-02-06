<script>
	/** @type {Array<{ items: Array<any>}>} */
	import Plus from '@lucide/svelte/icons/plus';
	import Search from '@lucide/svelte/icons/search';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { derived } from 'svelte/store';

	let notifications = [];
	let errorMsg = '';
	let loading = false;
	let isSaving = false;
	let fromDate = '';
	let toDate = '';

	let selectedPriority = 'All';
	let searchTitle = '';

	let createForm = {
		title: '',
		summary: '',
		full_content: '',
		priority: '',
		photo_path: '',
		file_path: ''
	};

	$: filteredNotifications = notifications.filter((n) => {
		const title = `${n.title ?? ''}`;

		const matchesPriority = selectedPriority === 'All'(n.priority ?? []).includes(selectedPriority);

		return matchesPriority;
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

	async function loadNotification() {
		loading = true;
		errorMsg = '';
		notifications = [];

		try {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			if (!user) {
				goto('/auth/signin');
				return;
			}

			const notiRes = await supabase
				.from('notifications')
				.select(
					'id, created_at, created_by, title, summary, full_content, priority, photo_path, file_path'
				)
				.order('created_at', { ascending: false });

			if (notiRes.error) throw notiRes.error;
		} catch (error) {
			errorMsg = error?.message ?? String(error);
		} finally {
			loading = false;
		}
	}

	const openCreateModal = () => {
		createForm = {
			title: '',
			summary: '',
			full_content: '',
			priority: '',
			photo_path: '',
			file_path: ''
		};
		showCreateModal - true;
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
			file_path: createForm.file_path.trim() || null
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

	onMount(loadNotification);
</script>

<h1 class="title">Notifications and Announcements</h1>

<div class="notifications-create">
	<button class="button-create" onclick={openCreateModal}
		><Plus /><span>Create Notification</span></button
	>
</div>
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
		<button class="button-primary" id="button-search"><Search /><span>Search</span></button>
	</div>
</div>

<div class="project-box">
	{#each filteredNotifications as n (n.id)}
		<div class="notification-card">
			<div class="notification-info">
				<h3>{n.title ?? '-'}</h3>
				<p><b>Summary:</b> {n.summary ?? ''}</p>
				<p><b>Full Content:</b> {n.full_content ?? ''}</p>
				<p><b>Priority:</b> {n.priority ?? ''}</p>
				<p><b>Photo:</b> {n.photo_path ?? '-'}</p>
				<p><b>File:</b> {n.file_path ?? '-'}</p>
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
					>Priority: <select bind:value={createForm.priority}>
						<option value="All">All Priorities</option>
						<option value="Normal">Normal</option>
						<option value="Important">Important</option>
						<option value="Urgent">Urgent</option>
					</select></label
				>
				<label
					>Photo: <input
						type="file"
						name=""
						id=""
						accept="image/png, image/jpeg"
						onchange={(e) => (noti_photo_file = e.target.files[0])}
					/></label
				>
				<label
					>File: <input
						type="file"
						name=""
						id=""
						accept="image/png, image/jpeg"
						onchange={(e) => (noti_file_file = e.target.files[0])}
					/></label
				>
			</div>
			<div class="modal-actions">
				<button class="button-inverted" onclick={closeCreateModal} disabled={isSaving}>
					Cancel
				</button>
				<button onclick={createNotification} disabled={isSaving}>
					{isSaving ? 'Saving...' : 'Confirm'}
				</button>
			</div>
		</div>
	</div>
{/if}

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

	.button-create {
		width: 200px;
		height: 40px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-left: auto;
	}

	.button-create span {
		color: #ffffff;
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
		width: 120px;
		margin-top: 20px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	#button-search span {
		color: #ffffff;
	}

	/* .created-date,
	.project-id {
		font-size: large;
		font-weight: bold;
		margin: 10px 0;
	} */

	/* .date-from,
	.date-to {
		height: 30px;
		margin: 0 15px;
		font-size: 14px;
	} */

	.filter-input {
		width: 350px;
		font-size: 14px;
	}

	/* .modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.modal {
		background: white;
		padding: 20px;
		border-radius: 6px;
		width: min(600px, 92vw);
		max-height: 80vh;
		overflow: auto;
		overflow-wrap: anywhere;
	}

	.modal-actions {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	} */

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

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
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
