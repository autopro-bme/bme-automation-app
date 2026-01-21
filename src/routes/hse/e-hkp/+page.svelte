<script>
	import Search from '@lucide/svelte/icons/search';
	import FileText from '@lucide/svelte/icons/file-text';
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
	let activity_date = '';
	let weather = '';
	let hkp_photo_path = '';
	let report_day = {
		site_walk: '',
		high_risk: '',
		uauc: '',
		stop_work: '',
		lt_injuries: '',
		nlt_injuries: '',
		opd: '',
		near_miss: '',
		non_compliance: '',
		sd_occurrence: ''
	};
	let remarks = '';
	let acknowledged = false;
	let created_at = '';
	let created_by = '';

	let hkp_photo_file;

	function onFile(e, setter) {
		setter(e.currentTarget.files?.[0] ?? null);
	}

	let errorMsg = '';
	let saving = false;

	async function uploadToBucket(file, folder) {
		if (!file) return null;

		const { data: auth } = await supabase.auth.getUser();
		const user = auth?.user;
		if (!user) throw new Error('Not signed in');

		const ext = file.name.split('.').pop();
		const path = `${folder}/${user.id}/${crypto.randomUUID()}.${ext}`;

		const { error } = await supabase.storage.from('hkp-uploads').upload(path, file, {
			upsert: false
		});

		if (error) throw error;
		return path;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		errorMsg = '';
		saving = true;

		try {
			const { data: auth } = await supabase.auth.getUser();
			const user = auth?.user;
			if (!user) {
				goto('/auth/signin');
				return;
			}

			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('first_name, last_name')
				.eq('id', user.id)
				.single();

			if (profileError) throw profileError;

			const submitterName =
				`${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || user.email;

			const hkp_photo_path = await uploadToBucket(hkp_photo_path, 'hkp_site');

			const payload = {
				project_name,
				project_no,
				region,
				location,
				activity_date,
				weather,
				hkp_photo_path,
				report_day,
				remarks,
				acknowledged,
				created_by: user.id,
				created_by_name: submitterName
			};

			const { error } = await supabase.from('hkp_submissions').insert(payload);
			if (error) throw error;

			// optional: redirect
			// goto('/hse/history');
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
</script>

<h1 class="title">Housekeeping Report (e-HKP) Submission</h1>

<div class="project-box">
	<form class="forms" on:submit={handleSubmit}>
		<h2 class="heading">General Information</h2>
		<button type="button" class="button-primary" on:click={openProjectModal}
			><Search />Search Project</button
		>
		<div class="forms-p">
			<label for="project-name" class="forms-label">Project Name:</label>
			<input type="text" class="forms-input" bind:value={project_name} />
		</div>
		<div class="forms-p">
			<label for="project-no" class="forms-label">Project No.:</label>
			<input type="text" class="forms-input" bind:value={project_no} />
		</div>
		<div class="forms-p">
			<label for="project-region" class="forms-label">Region:</label>
			<input type="text" class="forms-input" bind:value={region} />
		</div>
		<div class="forms-p">
			<label for="project-location" class="forms-label">Location:</label>
			<input type="text" class="forms-input" bind:value={location} />
		</div>
		<div class="forms-p">
			<label for="project-date" class="forms-label">Activity Date:</label>
			<input type="date" class="forms-input" bind:value={activity_date} />
		</div>
		<div class="forms-p">
			<label for="project-weather" class="forms-label">Weather:</label>
			<input type="text" class="forms-input" bind:value={weather} />
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
							on:input={filterProjects}
						/>
						<button type="button" class="project-search-button" on:click={filterProjects}>
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
								<button type="button" class="project-row" on:click={() => selectProject(project)}>
									<span>{project.project_name ?? '-'}</span>
									<span class="project-row-id">{project.project_id ?? '-'}</span>
								</button>
							{/each}
						{/if}
					</div>
					<div class="modal-actions">
						<button type="button" class="button-secondary" on:click={closeProjectModal}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		{/if}
		<br />
		<hr />
		<h2 class="heading">Photos of Housekeeping</h2>
		<div class="upload">
			<p class="upload-text">
				<input
					type="file"
					id="hkp_photo"
					name="hkp_photo"
					accept="image/png, image/jpeg"
					multiple
					on:change={(e) => onFile(e, (f) => (hkp_photo_file = f))}
				/>
			</p>
		</div>
		<br />
		<hr />
		<h2 class="heading">Report for the Day</h2>
		<div class="report-type">
			<label for="sitewalk-count" class="report-label"><b>No. of Site Walk:</b></label>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<div class="report-type">
			<label for="hra-count" class="report-label"><b>No. High-risk Activities Observed:</b></label>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<div class="report-type">
			<label for="uauc-count" class="report-label"
				><b>No. Unsafe Act Unsafe Condition (UAUC):</b></label
			>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<div class="report-type">
			<label for="stopwork-count" class="report-label"><b>No. Stop Work:</b></label>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<p><b>(A) Injuries</b></p>
		<div class="report-type">
			<label for="lti-count" class="report-label">(i) No. of Accidents (Lost Time Injuries):</label>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<div class="report-type">
			<label for="nlti-count" class="report-label"
				>(ii) No. of Accidents (No Lost Time Injuries):</label
			>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<p><b>(B) Non-Injuries</b></p>
		<div class="report-type">
			<label for="opd-count" class="report-label"
				>(i) No. of Established Occupational Poisoning or Disease (OPD):</label
			>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<div class="report-type">
			<label for="nmi-count" class="report-label">(ii) No. of Near Miss Incident:</label>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<div class="report-type">
			<label for="nc-count" class="report-label">(iii) No. of Non-Compliance:</label>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<div class="report-type">
			<label for="sodo-count" class="report-label"
				><b>(C) No. of Significant Safety Occurrence / Dangerous Occurrence:</b></label
			>
			<input type="text" class="report-count" bind:group={report_day} />
		</div>
		<hr />
		<h2 class="heading">Remarks</h2>
		<p>
			<textarea
				name="remarks"
				id="remarks"
				cols="30"
				rows="10"
				class="remarks"
				placeholder="Remarks"
				bind:value={remarks}
			></textarea>
		</p>
		<p class="note">
			For any case reported above, please attached the Incident Reporting Form which can be obtained <a
				href="https://boilermechhr.com/databases/intranet-employee-view?open-modal=3712&resource=intranet-employee-view"
				>here</a
			>.
		</p>
		<h2 class="heading">Acknowledgement and Submission</h2>
		<div class="container">
			<div class="checkbox">
				<input type="checkbox" name="checkbox" id="checkbox" bind:checked={acknowledged} required />
			</div>
			<div class="declaration">
				<p>The declaration for the Housekeeping Report as below:</p>
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
		<p>Note: Double check if content is correct before submitting.</p>
		<div class="forms-p">
			<p><b>Confirm Login Password</b></p>
			<input type="password" class="forms-input" />
		</div>
		<div class="submit">
			<button type="submit" class="button-submit"><FileText />Submit</button>
		</div>
	</form>
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: #091747;
	}

	a {
		text-decoration: underline;
		font-weight: bold;
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

	.note {
		margin-bottom: 10px;
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

	.report-count {
		width: 30px;
		height: 30px;
		font-size: 14px;
		padding: 1px;
		text-align: center;
	}

	.report-label {
		width: 450px;
		font-size: 14px;
	}

	.report-type {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 10px 0;
	}

	.submit {
		display: flex;
		justify-content: flex-end;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}

	.upload {
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 10px;
		border: 1px solid #091747;
		border-radius: 2px;
	}

	.upload-text {
		width: fit-content;
	}

	.upload-text input[type='file'] {
		font-size: 14px;
	}

	.upload-text input[type='file']::file-selector-button {
		background-color: #091747;
		color: #ffffff;
		border: none;
		padding: 6px 12px;
		border-radius: 4px;
		cursor: pointer;
		margin-right: 10px;
	}

	.upload-text input[type='file']::file-selector-button:hover {
		background-color: #091747b9;
	}
</style>
