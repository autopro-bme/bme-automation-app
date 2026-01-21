<script>
	/** @type {Array<{ items: Array<any>}>} */
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let filterDate = '';
	let date = '';
	let name = '';
	let etbm = false;
	let eppe = false;
	let ehkp = false;
	let status = '';
	let created_at = '';
	let currentPage = 1;
	const itemsPerPage = 10;

	$: totalPages = Math.max(1, Math.ceil(records.length / itemsPerPage));
	$: pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	$: start = (currentPage - 1) * itemsPerPage;
	$: paginated = records.slice(start, start + itemsPerPage);

	onMount(async () => {
		const {
			data: { user }
		} = await supabase.getUser();

		if (!user) {
			goto('/auth/signin');
			return;
		}

		const { data, error } = await supabase
			.from('attendance_records')
			.select('id, date, name, etbm, eppe, ehkp, status, created_at')
			.order('created_at', { ascending: false });

		if (error) {
			errorMsg = error.message;
			users = [];
			return;
		}

		users = data ?? [];
	});

	// @ts-ignore
	function gotoPage(n) {
		if (n < 1) n = 1;
		if (n > totalPages) n = totalPages;
		currentPage = n;
	}

	function prev() {
		gotoPage(currentPage - 1);
	}

	function next() {
		gotoPage(currentPage + 1);
	}
</script>

<h1 class="title">Working Day Attendance (e-WDA) Record</h1>

{#if errorMsg}
	<p class="error">{errorMsg}</p>
{/if}

<div class="project-box">
	<div class="date-records">
		<div>
			<p>Filter by Date</p>
			<input type="date" bind:value={filterDate} class="filter-date" />
		</div>
		<div class="records">
			Showing <b>{paginated.length}</b> of <b>{records.length}</b> records
		</div>
	</div>

	<div class="table-container">
		<table class="wda-table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Site Safety Supervisor Name</th>
					<th>eTBM</th>
					<th>ePPE</th>
					<th>eHKP</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each paginated as r}
					<tr>
						<td style="text-align:center">{new Date(r.date).toLocaleDateString()}</td>
						<td>{r.name}</td>
						<td style="text-align:center">{r.etbm ? 'Yes' : 'No'}</td>
						<td style="text-align:center">{r.eppe ? 'Yes' : 'No'}</td>
						<td style="text-align:center">{r.ehkp ? 'Yes' : 'No'}</td>
						<td style="text-align:center">{r.status}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="pagination">
			<button on:click={prev} disabled={currentPage === 1} aria-label="Previous">«</button>
			{#each pages as p}
				<button class:active={p === currentPage} on:click={() => gotoPage(p)}>{p}</button>
			{/each}
			<button on:click={next} disabled={currentPage === totalPages} aria-label="Next">»</button>
		</div>
	</div>
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: #091747;
	}

	.date-records {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.filter-date {
		font-size: 12px;
		cursor: pointer;
	}

	.filter-date::-webkit-calendar-picker-indicator {
		cursor: pointer;
	}

	.pagination {
		display: flex;
		gap: 6px;
		justify-content: flex-end;
		margin-top: 12px;
	}

	.pagination button {
		min-width: 34px;
		height: 34px;
		border-radius: 4px;
		border: 1px solid #283a5a33;
		background: white;
		cursor: pointer;
		padding: 0 8px;
	}

	.pagination button[disabled] {
		opacity: 0.5;
		cursor: default;
	}

	.pagination button.active,
	.pagination button.active:focus {
		background: #091747;
		color: white;
		border-color: #091747;
	}

	.pagination button:hover:not([disabled]) {
		background: #eef2f8;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.records {
		font-size: 12px;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}

	.table-container {
		margin-top: 12px;
	}

	.wda-table {
		width: 100%;
		border-collapse: collapse;
	}

	.wda-table th,
	.wda-table td {
		border: 1px solid #091747b9;
		padding: 12px 16px;
		text-align: left;
		font-size: 14px;
	}

	.wda-table thead th {
		background-color: #091747;
		color: #ffffff;
		font-weight: 700;
		text-align: center;
	}

	.wda-table tbody tr:nth-child(even) {
		background-color: #ececec;
	}
</style>
