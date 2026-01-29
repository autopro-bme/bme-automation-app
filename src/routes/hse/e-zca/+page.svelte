<script>
	/**
	 * @typedef {{ score: number | null }} AuditItem
	 * @typedef {{ items: AuditItem[] }} Subsection
	 */

	import Search from '@lucide/svelte/icons/search';
	import FileText from '@lucide/svelte/icons/file-text';
	import Info from '@lucide/svelte/icons/info';
	import Check from '@lucide/svelte/icons/check';
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let showProjectModal = false;
	let projects = [];
	let filteredProjects = [];
	let projectSearch = '';
	let projectLoading = false;
	let projectError = '';

	let project_name = '';
	let project_no = '';
	let region = '';
	let location = '';
	let audit_date = '';
	let showInfo = false;
	let remarks = '';
	let acknowledged = false;
	let created_at = '';
	let created_by = '';

	const MAX_SCORE_PER_ITEM = 5;

	let subsections = [
		{
			key: 'docs',
			title: 'Documentation & Approvals',
			items: [
				{
					label: 'Approved Safety Plan & Risk Assessment (HIRARC) on site',
					score: null,
					remarks: '',
					showInfo: false
				},
				{ label: 'Approved SOPs', score: null, remarks: '', showInfo: false },
				{ label: 'Daily Toolbox Briefing Records', score: null, remarks: '', showInfo: false },
				{
					label: 'Work Permit Process (Hot works, Confined Space, etc.)',
					score: null,
					remarks: '',
					showInfo: false
				}
			]
		},
		{
			key: 'manpower',
			title: 'Safety Manpower Coverage',
			items: [
				{
					label: 'Presence of Competent Safety Supervisor on Site',
					score: null,
					remarks: '',
					showInfo: false
				},
				{
					label: 'Project Supervisor/Engineer Responsible in Absence of Safety Supervisor',
					score: null,
					remarks: '',
					showInfo: false
				},
				{
					label: 'Safety Officer Attendance at High-Risk Activities',
					score: null,
					remarks: '',
					showInfo: false
				}
			]
		},
		{
			key: 'workforce',
			title: 'Workforce Safety Compliance',
			items: [
				{
					label: 'Full PPE Compliance (Helmet, Harness, Vest, Boots, Gloves)',
					score: null,
					remarks: '',
					showInfo: false
				},
				{
					label: 'Workers briefed & aware of Safety SOPs',
					score: null,
					remarks: '',
					showInfo: false
				},
				{
					label: 'Workers possess valid CIDB/OSH/Safety Cards/NIOSH passport',
					score: null,
					remarks: '',
					showInfo: false
				},
				{ label: 'No unauthorized personal on site', score: null, remarks: '', showInfo: false }
			]
		},
		{
			key: 'vetting',
			title: 'Subcontractor Vetting',
			items: [
				{
					label: "Subcontractors's HSE Qualifications Verified",
					score: null,
					remarks: '',
					showInfo: false
				},
				{
					label: 'HSE Terms Embedded in Subcontract Agreement',
					score: null,
					remarks: '',
					showInfo: false
				}
			]
		},
		{
			docs: 'c&c',
			title: 'Site Condition & Controls',
			items: [
				{ label: 'Housekeeping & Waste Disposal', score: null, remarks: '', showInfo: false },
				{ label: 'Edge & Fall Protection', score: null, remarks: '', showInfo: false },
				{ label: 'Equipment & Machinery Safety', score: null, remarks: '', showInfo: false },
				{ label: 'Signage & Emergency Access', score: null, remarks: '', showInfo: false },
				{
					label: 'Presence of lifting crew (competent person)',
					score: null,
					remarks: '',
					showInfo: false
				},
				{ label: 'Scaffold & ladder', score: null, remarks: '', showInfo: false }
			]
		},
		{
			key: 'l&r',
			title: 'Safety Leadership & Reporting',
			items: [
				{
					label: 'Stop Work Authority (SWA) Exercised Where Needed',
					score: null,
					remarks: '',
					showInfo: false
				},
				{ label: 'Near Miss & Incident Reporting', score: null, remarks: '', showInfo: false },
				{
					label: 'Disciplinary Action Taken on Violations',
					score: null,
					remarks: '',
					showInfo: false
				}
			]
		}
	];

	// let confirmPassword = '';

	// if (!confirmPassword) {
	// 	throw new Error('Please confirm your login password.');
	// }

	let errorMsg = '';
	let saving = false;

	let showSuccess = false;
	let successTimer;

	function withTimeout(promise, ms = 20000) {
		return Promise.race([
			promise,
			new Promise((_, reject) => setTimeout(() => reject(new Error('Upload timed out')), ms))
		]);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		errorMsg = '';
		saving = true;

		try {
			const { data: auth, error: authErr } = await withTimeout(supabase.auth.getUser(), 15000);
			if (authErr) throw authErr;
			const user = auth?.user;
			if (!user) throw new Error('Not signed in.');

			const { data: profile, error: profileError } = await withTimeout(
				supabase.from('profiles').select('first_name, last_name').eq('id', user.id).single(),
				15000
			);

			if (profileError) throw profileError;

			const submitterName =
				`${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || user.email;

			const payload = {
				project_name,
				project_no,
				region,
				location,
				audit_date,
				subsections,
				remarks,
				acknowledged,
				created_by: user.id,
				created_by_name: submitterName,
				overall_total: calculateOverallTotal,
				overall_max: calculateOverallMax,
				overall_percent: calculateOverallPercentage
			};

			const { error, insError } = await withTimeout(
				supabase.from('zca_submissions').insert(payload),
				15000
			);
			if (insError) throw insError;

			showSuccess = true;

			setTimeout(() => {
				showSuccess = false;
				goto('/');
			}, 3000);
		} catch (error) {
			errorMsg = error?.message ?? String(error);
		} finally {
			saving = false;
		}
	}

	async function loadProjects() {
		projectLoading = true;
		projectError = '';

		const { data, error } = await supabase
			.from('projects')
			.select('project_name, project_id, region, location')
			.order('project_name', { ascending: true });

		if (error) {
			projectError = error.message;
			projects = [];
			filteredProjects = [];
		} else {
			projects = data ?? [];
			filterProjects();
		}

		projectLoading = false;
	}

	function filterProjects() {
		const query = projectSearch.trim().toLowerCase();
		if (!query) {
			filteredProjects = projects;
			return;
		}

		filteredProjects = projects.filter((project) => {
			const name = project.project_name ?? '';
			const id = project.project_id ?? '';
			return `${name} ${id}`.toLowerCase().includes(query);
		});
	}

	async function openProjectModal() {
		showProjectModal = true;
		if (projects.length === 0 && !projectLoading) {
			await loadProjects();
		}
	}

	function closeProjectModal() {
		showProjectModal = false;
	}

	function selectProject(project) {
		project_name = project.project_name ?? '';
		project_no = project.project_id ?? '';
		region = project.region ?? '';
		location = project.location ?? '';
		closeProjectModal();
	}

	/**
	 * @param {{ items: { score: number | null }[] }} subsection
	 */
	function calculatePercentage(subsection) {
		const validScores = subsection.items.filter((item) => item.score !== null);

		if (validScores.length === 0) return 0;

		const total = validScores.reduce((sum, item) => sum + Number(item.score), 0);

		const max = subsection.items.length * MAX_SCORE_PER_ITEM;

		return Math.round((total / max) * 100);
	}

	/**
	 * @param {Subsection[]} subsections
	 */
	function calculateOverallTotal(subsections) {
		return subsections.reduce(
			/** @param {number} total @param {Subsection} subsection */
			(total, subsection) =>
				total +
				subsection.items.reduce(
					/** @param {number} sum @param {AuditItem} item */
					(sum, item) => sum + Number(item.score ?? 0),
					0
				),
			0
		);
	}

	/**
	 * @param {Subsection[]} subsections
	 */
	function calculateOverallMax(subsections) {
		return subsections.reduce(
			/** @param {number} max @param {Subsection} subsection */
			(max, subsection) => max + subsection.items.length * MAX_SCORE_PER_ITEM,
			0
		);
	}

	/**
	 * @param {Subsection[]} subsections
	 */
	function calculateOverallPercentage(subsections) {
		const total = calculateOverallTotal(subsections);
		const max = calculateOverallMax(subsections);

		if (max === 0) return 0;

		return Math.round((total / max) * 100);
	}
</script>

<h1 class="title">Zero Compromise Audit Report (e-ZCA) Submission</h1>

<div class="project-box">
	<form class="forms" onsubmit={handleSubmit}>
		<h2 class="heading">General Information</h2>
		<button type="button" class="button-primary" onclick={openProjectModal}
			><Search />Search Project</button
		>
		<div class="forms-p">
			<label for="project-name" class="forms-label">Project Name:</label>
			<input type="text" class="forms-input" bind:value={project_name} disabled />
		</div>
		<div class="forms-p">
			<label for="project-no" class="forms-label">Project No.:</label>
			<input type="text" class="forms-input" bind:value={project_no} disabled />
		</div>
		<div class="forms-p">
			<label for="project-region" class="forms-label">Region:</label>
			<input type="text" class="forms-input" bind:value={region} disabled />
		</div>
		<div class="forms-p">
			<label for="project-location" class="forms-label">Location:</label>
			<input type="text" class="forms-input" bind:value={location} disabled />
		</div>
		<div class="forms-p">
			<label for="project-date" class="forms-label">Audit Date:</label>
			<input
				type="date"
				class="forms-input forms-date"
				bind:value={audit_date}
				onfocus={(e) => e.target.showPicker?.()}
			/>
		</div>
		{#if showProjectModal}
			<div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Select project">
				<div class="modal">
					<h3>Select a Project</h3>
					<div class="project-search">
						<input
							type="text"
							placeholder="Project Name/Project ID"
							class="project-search-input"
							bind:value={projectSearch}
							oninput={filterProjects}
						/>
						<button type="button" class="project-search-button" onclick={filterProjects}>
							<Search />
						</button>
					</div>
					<div class="project-list">
						<div class="project-list-header">
							<span>Project Name</span>
							<span>Project ID</span>
						</div>
						{#if projectLoading}
							<p class="project-status">Loading projects...</p>
						{:else if projectError}
							<p class="project-status error">{projectError}</p>
						{:else if filteredProjects.length === 0}
							<p class="project-status">No projects found.</p>
						{:else}
							{#each filteredProjects as project}
								<button type="button" class="project-row" onclick={() => selectProject(project)}>
									<span>{project.project_name ?? '-'}</span>
									<span class="project-row-id">{project.project_id ?? '-'}</span>
								</button>
							{/each}
						{/if}
					</div>
					<div class="modal-actions">
						<button type="button" class="button-secondary" onclick={closeProjectModal}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		{/if}
		<br />
		{#each subsections as subsection, sIndex}
			<h2 class="heading">{subsection.title}</h2>
			<div class="categories">
				<p>No.</p>
				<p>Item</p>
				<p></p>
				<p>Score</p>
				<p></p>
			</div>
			<div class="audit-grid">
				{#each subsection.items as item, iIndex}
					<p class="index">{iIndex + 1}</p>
					<p>{item.label}</p>
					<div class="audit-select info-wrapper">
						<button type="button" class="info-button"><Info /></button>
						<div class="info-popup">
							<p class="info-details">
								<span class="one">1</span> Document exists but is lacking critical sections or less relevant
								to current site work.
							</p>
							<p class="info-details">
								<span class="two">2</span> Incomplete or draft version is available; approval status unclear
								or still pending.
							</p>
							<p class="info-details">
								<span class="three">3</span> Document is available but either: Outdated, Unsigned, or
								Partially approved.
							</p>
							<p class="info-details">
								<span class="four">4</span> Latest and signed document is available, but accessibility
								is limited (e.g. only in digital format or stored but not communicated to workers).
							</p>
							<p class="info-details">
								<span class="five">5</span> Latest version, signed and dated, clearly approved, physically
								available at the site office, and known to site personnel.
							</p>
						</div>
					</div>
					<p class="audit-select">
						<select bind:value={subsections[sIndex].items[iIndex].score} class="audit-count">
							<option value={null}></option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5</option>
						</select>
					</p>
					<input
						type="text"
						class="audit-remarks"
						placeholder="Remarks"
						bind:value={subsections[sIndex].items[iIndex].remarks}
					/>
				{/each}
			</div>
			<div class="subsection-type">
				<label for="" class="subsection-label heading">Subsection</label>
				<input
					type="text"
					class="subsection-count"
					value="{calculatePercentage(subsection)}%"
					readonly
				/>
			</div>
		{/each}
		<hr />
		<div class="overall-summary">
			<label for="" class="overall-label heading">Total / {calculateOverallMax(subsections)}</label>
			<input
				type="text"
				class="overall-count"
				value={calculateOverallTotal(subsections)}
				readonly
			/>
		</div>
		<div class="overall-summary">
			<label for="" class="overall-label heading">Overall</label>
			<input
				type="text"
				class="overall-count"
				value="{calculateOverallPercentage(subsections)}%"
				readonly
			/>
		</div>
		<hr />
		<h2 class="heading">Remarks</h2>
		<p>
			<textarea name="" id="" cols="30" rows="10" class="remarks" placeholder="Remarks"></textarea>
		</p>
		<h2 class="heading">Acknowledgement and Submission</h2>
		<div class="container">
			<div class="checkbox">
				<input type="checkbox" name="" id="" />
			</div>
			<div class="declaration">
				<p>The declaration for the Zero Compromise Audit Report as below:</p>
				<p>
					I hereby acknowledge that I have conducted a thorough check and confirm the following:
				</p>
				<p>>> All information in this report is accurate and up to date.</p>
				<p>>> All personnel working on site are registered and have appropriate permits.</p>
				<p>
					By entering my password below, I confirm my identity and consent as a digital
					acknowledgment.
				</p>
				<p>I understand that this action may be recorded as part of the official audit trail.</p>
			</div>
		</div>
		<p class="note">Note: Double check if content is correct before submitting.</p>
		<!-- <div class="forms-p">
			<p><b>Confirm Login Password</b></p>
			<input type="password" class="forms-input" />
		</div> -->
		{#if errorMsg}
			<p class="error">{errorMsg}</p>
		{/if}
		<div class="submit">
			<button type="submit" class="button-submit"
				><FileText />{saving ? 'Submitting...' : 'Submit'}</button
			>
		</div>
	</form>
	{#if showSuccess}
		<div class="success-overlay">
			<div class="success-popup">
				<h3>Success! <Check strokeWidth={4} /></h3>
				<p>Your form submission was successful.</p>
			</div>
		</div>
	{/if}
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: #091747;
	}

	.audit-count {
		width: 50px;
		height: 30px;
		font-size: 14px;
		padding: 5px;
	}

	.audit-grid {
		margin-top: 15px;
		display: grid;
		grid-template-columns: 40px 3fr 50px 50px 3fr;
		align-items: center;
		gap: 10px;
	}

	.audit-remarks {
		width: 100%;
		height: 30px;
		padding: 6px 10px;
		font-size: 14px;
	}

	.audit-select {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
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

	.button-primary {
		display: flex;
		align-items: center;
		gap: 8px;
		background-color: #091747;
		font-weight: bold;
		margin: 10px 0 20px 0;
		padding: 10px 20px;
	}

	.button-primary:hover {
		background-color: #091747b9;
	}

	.button-submit {
		display: flex;
		align-items: center;
		gap: 8px;
		background-color: #091747;
		font-weight: bold;
		margin: 5px;
		padding: 10px 20px;
	}

	.button-submit:hover {
		background-color: #091747b9;
	}

	.button-secondary {
		background-color: #ffffff;
		color: #091747;
		border: 1px solid #091747;
		padding: 8px 18px;
		border-radius: 6px;
		cursor: pointer;
		font-weight: bold;
	}

	.button-secondary:hover {
		background-color: #dedede;
	}

	.categories {
		margin: 10px 0;
		display: grid;
		grid-template-columns: 40px 3fr 50px 50px 3fr;
		text-align: center;
		font-weight: bold;
		align-items: center;
		gap: 10px;
	}

	.container {
		display: flex;
		margin: 10px 0;
	}

	.declaration {
		padding: 0 10px;
		font-weight: bold;
	}

	.declaration p {
		margin-bottom: 10px;
	}

	.forms {
		margin: 0;
		position: relative;
	}

	.forms-date {
		cursor: pointer;
	}

	.forms-date::-webkit-calendar-picker-indicator {
		cursor: pointer;
	}

	.forms-input {
		height: 30px;
		width: 500px;
		font-size: 14px;
	}

	.forms-label {
		width: 150px;
		font-size: 14px;
	}

	.forms-p {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 10px 0;
	}

	.heading {
		margin: 10px 0;
		font-size: 20px;
		font-weight: bold;
	}

	.index {
		text-align: center;
	}

	.info-button {
		background-color: #ffffff;
		color: #091747;
		cursor: pointer;
		padding: 0;
	}

	.info-details {
		margin: 3px 0;
	}

	.info-popup {
		position: absolute;
		top: 110%;
		left: 50%;
		transform: translate(-50%);
		background-color: #ffffff;
		color: #091747;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 8px 12px;
		font-size: 13px;
		width: 900px;
		z-index: 100;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition: opacity 0.15s ease-in-out;
	}

	.info-wrapper {
		position: relative;
		display: inline-flex;
	}

	.info-wrapper:hover .info-popup {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
	}

	.note {
		margin-bottom: 10px;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(9, 23, 71, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		z-index: 50;
	}

	.modal {
		background: #ffffff;
		border-radius: 10px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
		padding: 20px;
		width: min(600px, 95vw);
	}

	.modal h3 {
		margin: 0 0 16px 0;
		font-size: 20px;
	}

	.project-search {
		display: flex;
		gap: 10px;
		margin-bottom: 16px;
	}

	.project-search-input {
		flex: 1;
		height: 36px;
		padding: 0 10px;
		border: 1px solid #cfd6e4;
		border-radius: 6px;
		font-size: 14px;
	}

	.project-search-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 36px;
		padding: 0;
		background-color: #091747;
		border-radius: 6px;
	}

	.project-search-button:hover {
		background-color: #091747b9;
	}

	.project-list {
		border: 1px solid #cfd6e4;
		border-radius: 8px;
		overflow: hidden;
		max-height: 320px;
		overflow-y: auto;
	}

	.project-list-header,
	.project-row {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 10px;
		padding: 10px 12px;
	}

	.project-list-header {
		background-color: #f2f4f9;
		font-weight: bold;
		border-bottom: 1px solid #cfd6e4;
		text-align: center;
	}

	.project-row {
		width: 100%;
		text-align: left;
		background: #ffffff;
		border: none;
		border-bottom: 1px solid #e3e8f0;
		cursor: pointer;
	}

	.project-row:last-child {
		border-bottom: none;
	}

	.project-row:hover {
		background-color: #dedede;
	}

	.project-row-id {
		text-align: center;
	}

	.project-status {
		padding: 12px;
		margin: 0;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-start;
		margin-top: 16px;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.remarks {
		width: 100%;
		height: 200px;
	}

	/* span scores */
	.one,
	.two,
	.three,
	.four,
	.five {
		display: inline-block;
		text-align: center;
		align-items: center;
		color: #091747;
		width: 50px;
	}

	.one {
		background-color: #d60000d2;
	}

	.two {
		background-color: #f4bb44;
	}

	.three {
		background-color: #fff132;
	}

	.four {
		background-color: #51e951da;
	}

	.five {
		background-color: #40dd40;
	}
	/* span scores */

	.subsection-count,
	.overall-count {
		width: 50px;
		height: 40px;
		font-size: 14px;
		padding: 1px;
		text-align: center;
	}

	.subsection-label,
	.overall-label {
		width: 100px;
	}

	.subsection-type,
	.overall-summary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
		margin: 20px auto;
	}

	.submit {
		display: flex;
		justify-content: flex-end;
	}

	.success-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.success-popup {
		height: 200px;
		background: #ffffff;
		padding: 25px 35px;
		border: 1px solid #091747;
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		animation: fadeIn 0.3s ease;
	}

	.success-popup h3 {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: #2e7d32;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.success-popup h3 :global(svg) {
		display: block;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}
</style>
