<script>
	import Search from '@lucide/svelte/icons/search';
	import CloudDownload from '@lucide/svelte/icons/cloud-download';
	import { supabase } from '$lib/supabase';

	let formType = 'TBM';
	let fromDate = '';
	let toDate = '';
	let searchText = '';

	let loading = false;
	let errorMsg = '';
	let rows = [];

	let showDetailsModal = false;
	let modalLoading = false;
	let modalError = '';
	let details = null;
	let activeRow = null;

	const tableMap = {
		TBM: 'tbm_submissions',
		PPE: 'ppe_submissions',
		HKP: 'hkp_submissions',
		ZCA: 'zca_submissions'
	};

	const selectMap = {
		TBM: `
			id, created_at, created_by_name,
			project_no, project_name,
			meeting_date,
			tbm_form_path, tbm_photo_path, ptw_form_path
		`,
		PPE: `
			id, created_at, created_by_name,
			project_no, project_name,
			activity_date,
			ppe_photo_path
		`,
		HKP: `
			id, created_at, created_by_name,
			project_no, project_name,
			activity_date,
			hkp_photo_path
		`,
		ZCA: `
			id, created_at, created_by_name,
			project_no, project_name,
			audit_date
		`
	};

	const detailsSelectMap = {
		TBM: 'meeting_topics, competency, attendance',
		PPE: 'attendance',
		HKP: 'report_day',
		ZCA: 'subsections'
	};

	const searchCols = {
		TBM: ['project_no', 'project_name', 'created_by_name'],
		PPE: ['project_no', 'project_name', 'created_by_name'],
		HKP: ['project_no', 'project_name', 'created_by_name'],
		ZCA: ['project_no', 'project_name', 'created_by_name']
	};

	function toISOStart(dateStr) {
		return dateStr ? new Date(dateStr + 'T00:00:00').toISOString() : null;
	}
	function toISOEnd(dateStr) {
		return dateStr ? new Date(dateStr + 'T23:59:59.999').toISOString() : null;
	}

	function fmtDateTime(ts) {
		if (!ts) return '-';
		return new Date(ts).toLocaleString();
	}

	function fmtDateOnly(d) {
		if (!d) return '-';
		// if it’s already yyyy-mm-dd, display it nicer
		if (typeof d === 'string' && d.includes('-')) {
			const [y, m, day] = d.split('-');
			if (y && m && day) return `${day}/${m}/${y}`;
		}
		return String(d);
	}

	const bucketMap = {
		TBM: { tbm_form_path: 'tbm_form', tbm_photo_path: 'tbm_session', ptw_form_path: 'ptw_form' },
		PPE: { ppe_photo_path: 'ppe_photo' },
		HKP: { hkp_photo_path: 'hkp_photo' }
	};

	function fileUrlFor(type, colName, path) {
		if (!path) return '';
		const bucket = bucketMap[type]?.[colName];
		if (!bucket) return '';
		const { data } = supabase.storage.from(bucket).getPublicUrl(path);
		return data?.publicUrl ?? '';
	}

	function fileName(path) {
		if (!path) return '';
		const p = String(path);
		return p.split('/').pop() || p;
	}

	async function loadForms() {
		loading = true;
		errorMsg = '';
		rows = [];

		try {
			const table = tableMap[formType];
			const selectCols = selectMap[formType];

			let q = supabase.from(table).select(selectCols).order('created_at', { ascending: false });

			const startISO = toISOStart(fromDate);
			const endISO = toISOEnd(toDate);
			if (startISO) q = q.gte('created_at', startISO);
			if (endISO) q = q.lte('created_at', endISO);

			const { data, error } = await q;
			if (error) throw error;

			let list = data ?? [];
			const s = searchText.trim().toLowerCase();
			if (s) {
				const cols = searchCols[formType];
				list = list.filter((r) =>
					cols.some((c) =>
						String(r?.[c] ?? '')
							.toLowerCase()
							.includes(s)
					)
				);
			}

			rows = list;
		} catch (e) {
			errorMsg = e?.message ?? String(e);
		} finally {
			loading = false;
		}
	}

	async function openDetailsModal(row) {
		showDetailsModal = true;
		modalLoading = true;
		modalError = '';
		details = null;
		activeRow = row;

		try {
			const table = tableMap[formType];
			const detailsSelect = detailsSelectMap[formType] || '';

			if (!detailsSelect) {
				details = {};
				return;
			}

			const { data, error } = await supabase
				.from(table)
				.select(detailsSelect)
				.eq('id', row.id)
				.single();

			if (error) throw error;
			details = data ?? {};
		} catch (e) {
			modalError = e?.message ?? String(e);
		} finally {
			modalLoading = false;
		}
	}

	function closeModal() {
		showDetailsModal = false;
		details = null;
		activeRow = null;
		modalError = '';
		modalLoading = false;
	}

	loadForms();
</script>

<h1 class="title">Site Safety eForm Information</h1>

<div class="container">
	<input
		type="radio"
		name="eForm-type"
		id="eTBM-data"
		value="TBM"
		bind:group={formType}
		onchange={loadForms}
	/>
	<label for="eTBM-data" class="label">eTBM Data</label>
	<input
		type="radio"
		name="eForm-type"
		id="ePPE-data"
		value="PPE"
		bind:group={formType}
		onchange={loadForms}
	/>
	<label for="ePPE-data" class="label">ePPE Data</label>
	<input
		type="radio"
		name="eForm-type"
		id="eHKP-data"
		value="HKP"
		bind:group={formType}
		onchange={loadForms}
	/>
	<label for="eHKP-data" class="label">eHKP Data</label>
	<input
		type="radio"
		name="eForm-type"
		id="eZCA-data"
		value="ZCA"
		bind:group={formType}
		onchange={loadForms}
	/>
	<label for="eZCA-data" class="label">eZCA Data</label>
</div>

<div class="filter-bar">
	<h2 class="created-date">Created Date</h2>
	<div>
		From<input
			type="date"
			name="created-date"
			id="date-from"
			class="date-from"
			bind:value={fromDate}
			onchange={loadForms}
		/>To<input
			type="date"
			name="created-date"
			id="date-to"
			class="date-to"
			bind:value={toDate}
			onchange={loadForms}
		/>
	</div>
</div>

<div class="filter-bar">
	<h2 class="project-id">Project Name/Project ID</h2>
	<input type="text" placeholder="MP1234" class="filter-input" bind:value={searchText} />
	<button class="button-primary" id="button-search" onclick={loadForms}><Search /></button>
</div>
<div class="site-safety-download">
	<button class="button-download"><CloudDownload /><span>Excel</span></button>
</div>

<div class="project-box">
	{#if loading}
		<p>Loading...</p>
	{:else if errorMsg}
		<p class="error">{errorMsg}</p>
	{:else if rows.length === 0}
		<p>No records found.</p>
	{:else}
		{#each rows as r (r.id)}
			<div class="project-box">
				<div class="project-box-top">
					<p class="project-name"><b>{r.project_no ?? '-'} {formType}</b></p>
					<button class="button-primary" type="button" onclick={() => openDetailsModal(r)}>
						View Details
					</button>
				</div>
				<p><b>Project Name:&nbsp;</b>{r.project_name ?? '-'}</p>
				<p><b>Project ID:&nbsp;</b>{r.project_no ?? '-'}</p>
				<p><b>Submitted By:&nbsp;</b>{r.created_by_name ?? '-'}</p>
				<p><b>Created Date:&nbsp;</b>{fmtDateTime(r.created_at)}</p>
				{#if formType === 'TBM'}
					<p><b>Meeting Date:&nbsp;</b>{fmtDateOnly(r.meeting_date)}</p>

					<p class="doc-line">
						<b>TBM Form:&nbsp;</b>
						{#if r.tbm_form_path}
							<a href={fileUrlFor('TBM', 'tbm_form_path', r.tbm_form_path)} target="_blank">
								{fileName(r.tbm_form_path)}
							</a>
						{:else}
							-
						{/if}
					</p>
					<p class="doc-line">
						<b>TBM Photo:&nbsp;</b>
						{#if r.tbm_photo_path}
							<a href={fileUrlFor('TBM', 'tbm_photo_path', r.tbm_photo_path)} target="_blank">
								{fileName(r.tbm_photo_path)}
							</a>
						{:else}
							-
						{/if}
					</p>
					<p class="doc-line">
						<b>PTW Form:&nbsp;</b>
						{#if r.ptw_form_path}
							<a href={fileUrlFor('TBM', 'ptw_form_path', r.ptw_form_path)} target="_blank">
								{fileName(r.ptw_form_path)}
							</a>
						{:else}
							-
						{/if}
					</p>
				{:else if formType === 'PPE'}
					<p><b>Activity Date:&nbsp;</b>{fmtDateOnly(r.activity_date)}</p>
					<p class="doc-line">
						<b>PPE Photo:&nbsp;</b>
						{#if r.ppe_photo_path}
							<a href={fileUrlFor('PPE', 'ppe_photo_path', r.ppe_photo_path)} target="_blank">
								{fileName(r.ppe_photo_path)}
							</a>
						{:else}
							-
						{/if}
					</p>
				{:else if formType === 'HKP'}
					<p><b>Activity Date:&nbsp;</b>{fmtDateOnly(r.activity_date)}</p>
					<p class="doc-line">
						<b>HKP Photo:&nbsp;</b>
						{#if r.hkp_photo_path}
							<a href={fileUrlFor('HKP', 'hkp_photo_path', r.hkp_photo_path)} target="_blank">
								{fileName(r.hkp_photo_path)}
							</a>
						{:else}
							-
						{/if}
					</p>
				{:else if formType === 'ZCA'}
					<p><b>Audit Date:&nbsp;</b>{fmtDateOnly(r.audit_date)}</p>
				{/if}
			</div>
		{/each}
		{#if showDetailsModal}
			<div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Select details">
				<div class="modal">
					<h3>Form Details</h3>
					{#if modalLoading}
						<p>Loading...</p>
					{:else if modalError}
						<p class="error">{modalError}</p>
					{:else if formType === 'TBM'}
						<p><b>Meeting Topics:</b> {JSON.stringify(details?.meeting_topics ?? [])}</p>
						<p><b>Competency:</b> {details?.competency ?? '-'}</p>
						<p><b>Attendance:</b> {JSON.stringify(details?.attendance ?? {})}</p>
					{:else if formType === 'PPE'}
						<p><b>Attendance:</b> {JSON.stringify(details?.attendance ?? {})}</p>
					{:else if formType === 'HKP'}
						<p><b>Report Day:</b> {details?.report_day ?? '-'}</p>
					{:else if formType === 'ZCA'}
						<p><b>Subsections:</b> {JSON.stringify(details?.subsections ?? [])}</p>
					{/if}

					<div class="modal-actions">
						<button type="button" class="button-primary" onclick={closeModal}>Close</button>
					</div>
				</div>
			</div>
		{/if}
	{/if}
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

	.button-download {
		background-color: #31b647;
		width: 150px;
		height: 40px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-left: auto;
	}

	.button-download span {
		color: #ffffff;
	}

	.button-download:hover {
		background-color: #31b647bd;
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

	.container {
		display: flex;
		padding: 0 10px;
		align-items: center;
	}

	.created-date,
	.project-id {
		font-size: large;
		font-weight: bold;
		margin: 10px 0;
	}

	.date-from,
	.date-to {
		height: 30px;
		margin: 0 15px;
		font-size: 14px;
	}

	.filter-bar {
		padding: 10px;
	}

	.filter-input {
		width: 350px;
		font-size: 14px;
	}

	.label {
		font-weight: bold;
		margin: 0 25px 0 10px;
	}

	.modal-overlay {
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
	}

	.modal-actions {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.project-box-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.project-name {
		font-size: 16px;
	}

	.site-safety-download {
		display: flex;
		margin: 10px;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}
</style>
