<script>
	/** @type {Array<{ items: Array<any>}>} */
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let selectedDate = $state(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD
	let rows = $state([]);
	let errorMsg = $state('');
	let loading = $state(false);

	function localDayRangeISO(dateStr) {
		// interpret dateStr as local date; convert to UTC range for created_at query
		const start = new Date(dateStr + 'T00:00:00');
		const end = new Date(dateStr + 'T23:59:59.999');
		return { startISO: start.toISOString(), endISO: end.toISOString() };
	}

	function displayName(profile) {
		return (
			profile.nickname ||
			`${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() ||
			profile.email
		);
	}

	async function loadAttendance() {
		loading = true;
		errorMsg = '';
		rows = [];

		try {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			if (!user) {
				goto('/auth/signin');
				return;
			}

			// 1) load all users (attendance view is for everyone)
			const { data: users, error: usersErr } = await supabase
				.from('profiles')
				.select('id, nickname, first_name, last_name, email')
				.order('first_name');

			if (usersErr) throw usersErr;

			// 2) load submissions for that day (all users)
			const { startISO, endISO } = localDayRangeISO(selectedDate);

			const [tbmRes, ppeRes, hkpRes] = await Promise.all([
				supabase
					.from('tbm_submissions')
					.select('created_by')
					.gte('created_at', startISO)
					.lte('created_at', endISO),

				supabase
					.from('ppe_submissions')
					.select('created_by')
					.gte('created_at', startISO)
					.lte('created_at', endISO),

				supabase
					.from('hkp_submissions')
					.select('created_by')
					.gte('created_at', startISO)
					.lte('created_at', endISO)
			]);

			if (tbmRes.error) throw tbmRes.error;
			if (ppeRes.error) throw ppeRes.error;
			if (hkpRes.error) throw hkpRes.error;

			// 3) build sets of submitters
			const tbmSet = new Set((tbmRes.data ?? []).map((r) => r.created_by));
			const ppeSet = new Set((ppeRes.data ?? []).map((r) => r.created_by));
			const hkpSet = new Set((hkpRes.data ?? []).map((r) => r.created_by));

			// 4) build table rows for ALL users
			rows = (users ?? []).map((u) => {
				const etbm = tbmSet.has(u.id);
				const eppe = ppeSet.has(u.id);
				const ehkp = hkpSet.has(u.id);

				return {
					date: selectedDate,
					name: displayName(u),
					etbm: etbm ? 'Yes' : 'No',
					eppe: eppe ? 'Yes' : 'No',
					ehkp: ehkp ? 'Yes' : 'No',
					status: etbm && eppe && ehkp ? 'Present' : 'Absent'
				};
			});
		} catch (e) {
			errorMsg = e?.message ?? String(e);
		} finally {
			loading = false;
		}
	}

	onMount(loadAttendance);

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

<div class="project-box">
	<div class="date-records">
		<div>
			<p>Filter by Date</p>
			<input
				type="date"
				class="filter-date"
				bind:value={selectedDate}
				onchange={loadAttendance}
				onfocus={(e) => e.target.showPicker?.()}
			/>
		</div>
		<div class="records">
			Showing <b>{paginated.length}</b> of <b>{records.length}</b> records
		</div>
	</div>

	{#if errorMsg}
		<p class="error">{errorMsg}</p>
	{/if}

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
				{#each rows as r (r.name)}
					<tr>
						<td style="text-align:center">{r.date}</td>
						<td>{r.name}</td>
						<td style="text-align:center">{r.etbm}</td>
						<td style="text-align:center">{r.eppe}</td>
						<td style="text-align:center">{r.ehkp}</td>
						<td style="text-align:center">{r.status}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="pagination">
			<button onclick={prev} disabled={currentPage === 1} aria-label="Previous">«</button>
			{#each pages as p}
				<button class:active={p === currentPage} onclick={() => gotoPage(p)}>{p}</button>
			{/each}
			<button onclick={next} disabled={currentPage === totalPages} aria-label="Next">»</button>
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
