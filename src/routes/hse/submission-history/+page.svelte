<script>
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let submissions = [];
	let errorMsg = '';
	let fromDate = '';
	let toDate = '';

	let open = {
		TBM: false,
		PPE: false,
		HKP: false
	};

	function toggle(type) {
		open = { ...open, [type]: !open[type] };
	}

	function fmtDate(iso) {
		const d = new Date(iso);
		return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}

	$: filtered = submissions.filter((s) => {
		const d = new Date(s.created_at);
		const fromOk = !fromDate || d >= new Date(fromDate);
		const toOk = !toDate || d <= new Date(toDate + 'T23:59:59');
		return fromOk && toOk;
	});

	$: tbmRows = filtered.filter((s) => s.type === 'TBM');
	$: ppeRows = filtered.filter((s) => s.type === 'PPE');
	$: hkpRows = filtered.filter((s) => s.type === 'HKP');

	async function loadSubmissions() {
		const [tbmRecords, ppeRecords, hkpRecords] = await Promise.all([
			supabase
				.from('tbm_submissions')
				.select(
					'id, project_name, project_no, region, location, meeting_date, weather, meeting_topics, other_topic, competency, attendance, conducted_by, conducted_position, created_at, created_by_name'
				),
			supabase
				.from('ppe_submissions')
				.select(
					'id, project_name, project_no, region, location, activity_date, weather, conducted_by, conducted_position, attendance, created_at, created_by_name'
				),
			supabase
				.from('hkp_submissions')
				.select(
					'id, project_name, project_no, region, location, activity_date, weather, report_day, created_at, created_by_name'
				)
		]);

		if (tbmRecords.error || ppeRecords.error || hkpRecords.error) {
			errorMsg = (tbmRecords.error || ppeRecords.error || hkpRecords.error).message;
			return;
		}

		submissions = [
			...(tbmRecords.data ?? []).map((r) => ({
				type: 'TBM',
				...r
			})),
			...(ppeRecords.data ?? []).map((r) => ({
				type: 'PPE',
				...r
			})),
			...(hkpRecords.data ?? []).map((r) => ({
				type: 'HKP',
				...r
			}))
		].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
	}

	onMount(loadSubmissions);
</script>

{#if errorMsg}
	<p class="error">{errorMsg}</p>
{/if}

<h1 class="title">Submission History</h1>

<div class="project-box">
	<div class="date-container">
		<h2 class="heading">Submit Date</h2>
		<p class="submit-dates">
			<label for="">From</label>
			<input
				type="date"
				class="submit-date"
				on:focus={(e) => e.target.showPicker?.()}
				bind:value={fromDate}
			/>
			<label for="">To</label>
			<input
				type="date"
				class="submit-date"
				on:focus={(e) => e.target.showPicker?.()}
				bind:value={toDate}
			/>
		</p>
	</div>

	<div class="accordion">
		<!-- TBM -->
		<div class="acc-section">
			<button type="button" class="acc-header" on:click={() => toggle('TBM')}>
				<span>Tool Box Meeting (e-TBM) ({tbmRows.length})</span>
				<span class="acc-icon">
					{#if open.TBM}
						<ChevronDown />
					{:else}
						<ChevronLeft />
					{/if}
				</span>
			</button>

			{#if open.TBM}
				<div class="acc-body">
					{#if tbmRows.length === 0}
						<p class="empty">No submissions</p>
					{:else}
						<div class="card-grid">
							{#each tbmRows as r (r.id)}
								<div class="history-card">
									<p class="card-title">{r.project_no}</p>
									<p><b>Project Name:</b> {r.project_name}</p>
									<p><b>Submit Date:</b> {fmtDate(r.created_at)}</p>
									<p><b>Meeting Time:</b> {r.meeting_time ?? '-'}</p>

									<p class="doc-line"><b>Filled TBM Image:</b> (image)</p>
									<p class="doc-line"><b>Filled PTW Image:</b> (image)</p>
									<p class="doc-line"><b>TBM Visit Image:</b> (image)</p>
									<p class="doc-line"><b>Another Document:</b> (document)</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- PPE -->
		<div class="acc-section">
			<button type="button" class="acc-header" on:click={() => toggle('PPE')}>
				<span>PPE Visual Inspections (e-PPE) ({ppeRows.length})</span>
				<span class="acc-icon">
					{#if open.PPE}
						<ChevronDown />
					{:else}
						<ChevronLeft />
					{/if}
				</span>
			</button>

			{#if open.PPE}
				<div class="acc-body">
					{#if ppeRows.length === 0}
						<p class="empty">No submissions</p>
					{:else}
						<div class="card-grid">
							{#each ppeRows as r (r.id)}
								<div class="history-card">
									<p class="card-title">{r.project_no}</p>
									<p><b>Project Name:</b> {r.project_name}</p>
									<p><b>Submit Date:</b> {fmtDate(r.created_at)}</p>

									<p class="doc-line"><b>Filled PPE Image:</b> (image)</p>
									<p class="doc-line"><b>Another Document:</b> (document)</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- HKP -->
		<div class="acc-section">
			<button type="button" class="acc-header" on:click={() => toggle('HKP')}>
				<span>Housekeeping Report (e-HKP) ({hkpRows.length})</span>
				<span class="acc-icon">
					{#if open.HKP}
						<ChevronDown />
					{:else}
						<ChevronLeft />
					{/if}
				</span>
			</button>

			{#if open.HKP}
				<div class="acc-body">
					{#if hkpRows.length === 0}
						<p class="empty">No submissions</p>
					{:else}
						<div class="card-grid">
							{#each hkpRows as r (r.id)}
								<div class="history-card">
									<p class="card-title">{r.project_no}</p>
									<p><b>Project Name:</b> {r.project_name}</p>
									<p><b>Submit Date:</b> {fmtDate(r.created_at)}</p>

									<p class="doc-line"><b>Filled HKP Image:</b> (image)</p>
									<p class="doc-line"><b>Another Document:</b> (document)</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<!-- {#each submissionTypes as s, i}
		<div class="submission-type" onclick={() => toggleDiv(i)}>
			<button class="button-toggle">{s.title} ({s.count})</button>
			{#if openIndex === i}
				<ChevronDown color="#064c6dd7" />
			{:else}
				<ChevronLeft color="#064c6dd7" />
			{/if}
		</div>

		{#if openIndex === i}
			<div class="submission-row" id="submission-row">
				{#if s.items && s.items.length > 0}
					{#each s.items as item}
						<div class="submission-data">
							<h2>Project #{item.id}</h2>
							<p class="project-data"><b>Project Name:&nbsp;</b>{item.project}</p>
							<p class="project-data"><b>Submit Date:&nbsp;</b>{item.date}</p>
							<p class="project-data"><b>Meeting Time:&nbsp;</b>{item.time}</p>
							<p class="project-data"><b>Filled TBM Image:&nbsp;</b></p>
							<p>(image)</p>
							<p class="project-data"><b>Filled PTW Image:&nbsp;</b></p>
							<p>(image)</p>
							<p class="project-data"><b>TBM Visit Image:&nbsp;</b></p>
							<p>(image)</p>
							<p class="project-data"><b>Another Document:&nbsp;</b></p>
							<p>(document)</p>
						</div>
					{/each}
				{:else}
					<div style="padding:12px;">No submissions.</div>
				{/if}
			</div>
		{/if}
	{/each} -->
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

	.date-container {
		margin-bottom: 20px;
	}

	.heading {
		margin: 10px 0;
		font-size: 20px;
		font-weight: bold;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.submit-date {
		font-size: 12px;
		cursor: pointer;
	}

	.submit-dates {
		margin-top: 5px;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}

	.accordion {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.acc-section {
		width: 100%;
	}

	.acc-header {
		width: 100%;
		border: 1px solid #091747;
		border-radius: 2px;
		padding: 10px 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		color: #091747;
		font-weight: 700;
		cursor: pointer;
	}

	.acc-icon :global(svg) {
		width: 18px;
		height: 18px;
	}

	.acc-body {
		padding: 14px 0 0;
	}

	.empty {
		color: #555;
		padding: 10px 2px;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	.history-card {
		border: 1px solid #8a8fa3;
		background: #fff;
		padding: 14px;
		min-height: 240px;
	}

	.card-title {
		font-size: 18px;
		font-weight: 800;
		color: #091747;
		margin: 0 0 10px;
	}

	.doc-line {
		margin: 8px 0;
	}

	@media (max-width: 1100px) {
		.card-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 700px) {
		.card-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
