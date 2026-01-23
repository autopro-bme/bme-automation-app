<script>
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let submissions = $state([]);
	let errorMsg = $state('');
	let loading = $state(false);
	let fromDate = $state('');
	let toDate = $state('');

	let open = $state({
		TBM: false,
		PPE: false,
		HKP: false
	});

	function toggle(type) {
		open = { ...open, [type]: !open[type] };
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

	async function loadHistory() {
		loading = true;
		errorMsg = '';
		submissions = [];

		try {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			if (!user) {
				goto('/auth/signin');
				return;
			}

			const [tbmRes, ppeRes, hkpRes] = await Promise.all([
				supabase
					.from('tbm_submissions')
					.select(
						'id, created_at, created_by_name, project_no, project_name, meeting_date, tbm_form_path, tbm_photo_path, ptw_form_path, other_doc_path'
					)
					.eq('created_by', user.id)
					.order('created_at', { ascending: false }),

				supabase
					.from('ppe_submissions')
					.select(
						'id, created_at, created_by_name, project_no, project_name, activity_date, ppe_photo_path'
					)
					.eq('created_by', user.id)
					.order('created_at', { ascending: false }),

				supabase
					.from('hkp_submissions')
					.select(
						'id, created_at, created_by_name, project_no, project_name, activity_date, hkp_photo_path'
					)
					.eq('created_by', user.id)
					.order('created_at', { ascending: false })
			]);

			console.log('Current user id:', user.id);
			console.log('TBM rows returned:', tbmRes.data?.length, tbmRes.error);
			console.log('PPE rows returned:', ppeRes.data?.length, ppeRes.error);
			console.log('HKP rows returned:', hkpRes.data?.length, hkpRes.error);

			if (tbmRes.error) throw tbmRes.error;
			if (ppeRes.error) throw ppeRes.error;
			if (hkpRes.error) throw hkpRes.error;

			const merged = [
				...(tbmRes.data ?? []).map((r) => ({ type: 'TBM', ...r })),
				...(ppeRes.data ?? []).map((r) => ({ type: 'PPE', ...r })),
				...(hkpRes.data ?? []).map((r) => ({ type: 'HKP', ...r }))
			].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

			if (fromDate || toDate) {
				submissions = merged.filter((r) => withinRange(r.created_at));
			} else {
				submissions = merged;
			}

			console.log('fromDate/toDate:', fromDate, toDate);
			console.log('merged:', merged.length, 'final submissions:', submissions.length);
		} catch (e) {
			errorMsg = e?.message ?? String(e);
		} finally {
			loading = false;
		}
	}

	const tbmRows = $derived.by(() => submissions.filter((s) => s.type === 'TBM'));
	const ppeRows = $derived.by(() => submissions.filter((s) => s.type === 'PPE'));
	const hkpRows = $derived.by(() => submissions.filter((s) => s.type === 'HKP'));

	onMount(loadHistory);
</script>

<h1 class="title">Submission History</h1>

<div class="project-box">
	<div class="date-container">
		<h2 class="heading">Submit Date</h2>
		<p class="submit-dates">
			<label for="">From</label>
			<input
				type="date"
				class="submit-date"
				bind:value={fromDate}
				onchange={loadHistory}
				onfocus={(e) => e.target.showPicker?.()}
			/>
			<label for="">To</label>
			<input
				type="date"
				class="submit-date"
				bind:value={toDate}
				onchange={loadHistory}
				onfocus={(e) => e.target.showPicker?.()}
			/>
		</p>
	</div>

	{#if errorMsg}
		<p class="error">{errorMsg}</p>
	{/if}

	<div class="accordion">
		<!-- TBM -->
		<div class="acc-section">
			<button type="button" class="acc-header" onclick={() => toggle('TBM')}>
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
									<p class="card-title">{r.project_no ?? '-'}</p>
									<p><b>Project Name:</b> {r.project_name ?? '-'}</p>
									<p><b>Submit Date:</b> {fmtDate(r.created_at)}</p>
									<p><b>Meeting Date:</b> {r.meeting_date ?? '-'}</p>

									<p class="doc-line">
										<b>Photo of Filled TBM Form:</b>
										{#if r.tbm_form_path}
											<a href={r.tbm_form_path} target="_blank" rel="noreferrer" class="photo-link"
												>View Photo</a
											>
										{:else}
											-
										{/if}
									</p>
									<p class="doc-line">
										<b>Photo(s) of TBM in Session:</b>
										{#if r.tbm_photo_path}
											<a href={r.tbm_photo_path} target="_blank" rel="noreferrer" class="photo-link"
												>View Photo</a
											>
										{:else}
											-
										{/if}
									</p>
									<p class="doc-line">
										<b>Photo of Filled PTW Form</b>
										{#if r.ptw_form_path}
											<a href={r.ptw_form_path} target="_blank" rel="noreferrer" class="photo-link"
												>View Photo</a
											>
										{:else}
											-
										{/if}
									</p>
									<p class="doc-line">
										<b>Another Document:</b>
										{#if r.other_doc_path}
											<a href={r.other_doc_path} target="_blank" rel="noreferrer" class="photo-link"
												>View Photo</a
											>
										{:else}
											-
										{/if}
									</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- PPE -->
		<div class="acc-section">
			<button type="button" class="acc-header" onclick={() => toggle('PPE')}>
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
									<p class="card-title">{r.project_no ?? '-'}</p>
									<p><b>Project Name:</b> {r.project_name ?? '-'}</p>
									<p><b>Submit Date:</b> {fmtDate(r.created_at)}</p>
									<p><b>Activity Date:</b> {r.activity_date ?? '-'}</p>

									<p class="doc-line">
										<b>Photos of Wearing PPE on Site:</b>
										{#if r.ppe_photo_path}
											<a href={r.ppe_photo_path} target="_blank" rel="noreferrer" class="photo-link"
												>View Photo</a
											>
										{:else}
											-
										{/if}
									</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- HKP -->
		<div class="acc-section">
			<button type="button" class="acc-header" onclick={() => toggle('HKP')}>
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
									<p class="card-title">{r.project_no ?? '—'}</p>
									<p><b>Project Name:</b> {r.project_name ?? '—'}</p>
									<p><b>Submit Date:</b> {fmtDate(r.created_at)}</p>
									<p><b>Activity Date:</b> {r.activity_date ?? '-'}</p>

									<p class="doc-line">
										<b>Photo of Housekeeping:</b>
										{#if r.hkp_photo_path}
											<a href={r.hkp_photo_path} target="_blank" rel="noreferrer" class="photo-link"
												>View Photo</a
											>
										{:else}
											-
										{/if}
									</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
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

	.date-container {
		margin-bottom: 20px;
	}

	.heading {
		margin: 10px 0;
		font-size: 20px;
		font-weight: bold;
	}

	.photo-link {
		text-decoration: underline;
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
		font-weight: bold;
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
