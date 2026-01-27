<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';

	import ChevronsLeft from '@lucide/svelte/icons/chevrons-left';
	import ChevronsRight from '@lucide/svelte/icons/chevrons-right';

	let selectedDate = $state(new Date().toISOString().slice(0, 10));
	let rows = $state([]);
	let errorMsg = $state('');
	let loading = $state(false);

	let currentPage = $state(1);
	const pageSize = 10;

	const records = $derived.by(() => rows);
	const totalPages = $derived.by(() => Math.max(1, Math.ceil(records.length / pageSize)));
	const pages = $derived.by(() => Array.from({ length: totalPages }, (_, i) => i + 1));
	const paginated = $derived.by(() =>
		records.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	);

	function formatDateDMY(dateStr) {
		const [y, m, d] = (dateStr ?? '').split('-');
		return y ? `${d}/${m}/${y}` : dateStr;
	}

	function displayName(u, rec) {
		return (
			u.nickname ||
			`${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() ||
			u.email ||
			rec?.created_by_name ||
			'—'
		);
	}

	async function ensureSignedIn() {
		const {
			data: { session }
		} = await supabase.auth.getSession();
		if (!session?.user) {
			goto('/auth/signin');
			return null;
		}
		return session.user;
	}

	async function loadAttendance() {
		loading = true;
		errorMsg = '';
		rows = [];

		try {
			const user = await ensureSignedIn();
			if (!user) return;

			const { data: supervisors, error: supErr } = await supabase
				.from('profiles')
				.select('id, nickname, first_name, last_name, email, position')
				.eq('position', 'Site Safety Supervisor')
				.order('first_name', { ascending: true });

			if (supErr) throw supErr;

			const { data: records, error: recErr } = await supabase
				.from('attendance_records')
				.select('created_by, created_by_name, etbm, eppe, ehkp, date')
				.eq('date', selectedDate);

			if (recErr) throw recErr;

			const recordByUser = new Map((records ?? []).map((r) => [r.created_by, r]));

			rows = (supervisors ?? []).map((u) => {
				const r = recordByUser.get(u.id);

				const etbm = !!r?.etbm;
				const eppe = !!r?.eppe;
				const ehkp = !!r?.ehkp;

				return {
					date: selectedDate,
					name: displayName(u, r),
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

	$effect(() => {
		selectedDate;
		currentPage = 1;
		if (selectedDate) loadAttendance();
	});

	function gotoPage(n) {
		currentPage = Math.min(Math.max(1, n), totalPages);
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
				{#each paginated as r (r.name)}
					<tr>
						<td style="text-align:center">{formatDateDMY(r.date)}</td>
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
			<button onclick={prev} disabled={currentPage === 1} aria-label="Previous"
				><ChevronsLeft /></button
			>
			{#each pages as p}
				<button class:active={p === currentPage} onclick={() => gotoPage(p)}>{p}</button>
			{/each}
			<button onclick={next} disabled={currentPage === totalPages} aria-label="Next"
				><ChevronsRight /></button
			>
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
		align-items: end;
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
		background: #091747b9;
		color: white;
	}

	.project-box {
		margin: 10px;
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
