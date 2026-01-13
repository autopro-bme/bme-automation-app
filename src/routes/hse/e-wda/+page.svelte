<script>
	export let data;
	let filterDate = '';
	let currentPage = 1;
	const itemsPerPage = 10;
	const { title, records } = data;

	// const records = [
	// 	{
	// 		date: 'Dec 22, 2025',
	// 		name: 'Leong Yi Jien',
	// 		etbm: 'Yes',
	// 		eppe: 'No',
	// 		ehkp: 'No',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 22, 2025',
	// 		name: 'Pravin A/L Vijayakumar',
	// 		etbm: 'Yes',
	// 		eppe: 'Yes',
	// 		ehkp: 'Yes',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 22, 2025',
	// 		name: 'Abhar bin Razmi',
	// 		etbm: 'Yes',
	// 		eppe: 'No',
	// 		ehkp: 'Yes',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 22, 2025',
	// 		name: 'Eu Yu Han',
	// 		etbm: 'No',
	// 		eppe: 'Yes',
	// 		ehkp: 'Yes',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 22, 2025',
	// 		name: 'Adil bin Sharif',
	// 		etbm: 'Yes',
	// 		eppe: 'Yes',
	// 		ehkp: 'Yes',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 19, 2025',
	// 		name: 'Syukri bin Malek',
	// 		etbm: 'No',
	// 		eppe: 'Yes',
	// 		ehkp: 'No',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 19, 2025',
	// 		name: 'Yogesh A/L Rajagopal',
	// 		etbm: 'Yes',
	// 		eppe: 'No',
	// 		ehkp: 'No',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 19, 2025',
	// 		name: 'Ng Wei Bin',
	// 		etbm: 'Yes',
	// 		eppe: 'No',
	// 		ehkp: 'Yes',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 19, 2025',
	// 		name: 'Leon How Wen',
	// 		etbm: 'Yes',
	// 		eppe: 'Yes',
	// 		ehkp: 'Yes',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 19, 2025',
	// 		name: 'Mohd Nizar bin Yusni',
	// 		etbm: 'No',
	// 		eppe: 'No',
	// 		ehkp: 'No',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 18, 2025',
	// 		name: 'Alice Tan',
	// 		etbm: 'Yes',
	// 		eppe: 'Yes',
	// 		ehkp: 'Yes',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 18, 2025',
	// 		name: 'Bob Lee',
	// 		etbm: 'Yes',
	// 		eppe: 'No',
	// 		ehkp: 'Yes',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 18, 2025',
	// 		name: 'Carol Ong',
	// 		etbm: 'No',
	// 		eppe: 'Yes',
	// 		ehkp: 'No',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 17, 2025',
	// 		name: 'Daniel Lim',
	// 		etbm: 'Yes',
	// 		eppe: 'Yes',
	// 		ehkp: 'No',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 17, 2025',
	// 		name: 'Ethan Goh',
	// 		etbm: 'Yes',
	// 		eppe: 'Yes',
	// 		ehkp: 'Yes',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 16, 2025',
	// 		name: 'Farah Musa',
	// 		etbm: 'No',
	// 		eppe: 'No',
	// 		ehkp: 'Yes',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 15, 2025',
	// 		name: 'Gavin Koh',
	// 		etbm: 'Yes',
	// 		eppe: 'No',
	// 		ehkp: 'No',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 14, 2025',
	// 		name: 'Hannah Low',
	// 		etbm: 'No',
	// 		eppe: 'Yes',
	// 		ehkp: 'Yes',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 13, 2025',
	// 		name: 'Ian Chew',
	// 		etbm: 'Yes',
	// 		eppe: 'Yes',
	// 		ehkp: 'No',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 12, 2025',
	// 		name: 'Jin Park',
	// 		etbm: 'No',
	// 		eppe: 'No',
	// 		ehkp: 'No',
	// 		status: 'Absent'
	// 	},
	// 	{
	// 		date: 'Dec 11, 2025',
	// 		name: 'Kumar Singh',
	// 		etbm: 'Yes',
	// 		eppe: 'Yes',
	// 		ehkp: 'Yes',
	// 		status: 'Present'
	// 	},
	// 	{
	// 		date: 'Dec 10, 2025',
	// 		name: 'Lina Noor',
	// 		etbm: 'Yes',
	// 		eppe: 'No',
	// 		ehkp: 'Yes',
	// 		status: 'Absent'
	// 	}
	// ];

	$: totalPages = Math.max(1, Math.ceil(records.length / itemsPerPage));
	$: pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	$: start = (currentPage - 1) * itemsPerPage;
	$: paginated = records.slice(start, start + itemsPerPage);

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
