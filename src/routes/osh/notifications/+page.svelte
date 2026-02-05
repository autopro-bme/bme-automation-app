<script>
	import Plus from '@lucide/svelte/icons/plus';
	import Search from '@lucide/svelte/icons/search';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let notifications = $state([]);
	let errorMsg = $state('');
	let loading = $state(false);
	let fromDate = $state('');
	let toDate = $state('');

	let selectedPriority = $state('All');
	let searchTitle = $state('');

	let filteredNotifications = $derived.by((n) => {
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

	onMount(loadNotification);
</script>

<h1 class="title">Notifications and Announcements</h1>
<!-- <p>Stay informed with the latest company updates and announcements</p> -->

<div class="notifications-create">
	<button class="button-create"><Plus /><span>Create Notification</span></button>
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
	<div>
		<p>Notification</p>
	</div>
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
