<script>
	import Search from '@lucide/svelte/icons/search';
	import FileText from '@lucide/svelte/icons/file-text';
	import Check from '@lucide/svelte/icons/check';
	import { getSupabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { authReady, session } from '$lib/stores/auth';
	import { get } from 'svelte/store';

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
	let kickoff_date = '';
	let weather = '';
	let supervisor_name = '';
	let start_date = '';
	let end_date = '';
	let staff_name = '';
	let workday_date = '';
	let hours_worked = '';
	let workday_day = '';
	let actual_hours_worked = '';
	let travel_date = '';
	let travel_origin = '';
	let travel_destination = '';
	let travel_allowance = '';
	let contractor_name = '';
	let contractor_phone_no = '';
	let contractor_email = '';
	let contractor_company = '';
	let contractor_certification = '';
	let remarks = '';
	let acknowledged = false;
	let created_at = '';
	let created_by = '';

	// let confirmPassword = '';

	// if (!confirmPassword) {
	// 	throw new Error('Please confirm your login password.');
	// }

	let errorMsg = '';
	let saving = false;

	let showSuccess = false;
	let successTimer;

	async function handleSubmit(e) {
		while (!get(authReady)) {
			await new Promise((r) => setTimeout(r, 25));
		}

		const s = get(session);
		if (!s?.user) {
			goto('/auth/signin');
			return;
		}
		const supabase = getSupabase();
		if (!supabase) return;

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
				kickoff_date,
				weather,
				supervisor_name,
				start_date,
				end_date,
				staff_name,
				workday_date,
				hours_worked,
				workday_day,
				actual_hours_worked,
				travel_date,
				travel_origin,
				travel_destination,
				travel_allowance,
				contractor_name,
				contractor_phone_no,
				contractor_email,
				contractor_company,
				contractor_certification,
				remarks,
				acknowledged,
				created_by: user.id,
				created_by_name: submitterName
			};

			const { error: insErr } = await withTimeout(
				supabase.from('ctr_submissions').insert(payload),
				15000
			);
			if (insErr) throw insErr;

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
		const supabase = getSupabase();
		if (!supabase) return;

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

<h1 class="title">Competency Register Report (e-CTR) Submission</h1>

<div class="project-box">
	<form class="forms" onsubmit={handleSubmit}>
		<h2 class="heading">General Information</h2>
		<button type="button" class="button-primary"><Search />Search Project</button>
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
			<label for="kickoff-date" class="forms-label">Kick-off Date:</label>
			<input type="date" class="forms-input" bind:value={kickoff_date} />
		</div>
		<div class="forms-p">
			<label for="project-weather" class="forms-label">Weather:</label>
			<input type="text" class="forms-input" bind:value={weather} />
		</div>
		<br />
		<hr />
		<h2 class="heading">Site Safety Supervisor Allocation</h2>
		<div class="forms-p">
			<label for="supervisor-name" class="forms-label">Supervisor Name:</label>
			<input type="text" class="forms-input" bind:value={supervisor_name} />
		</div>
		<div class="forms-p">
			<label for="start-date" class="forms-label">Start Date:</label>
			<input type="date" class="forms-input" bind:value={start_date} />
		</div>
		<div class="forms-p">
			<label for="end-date" class="forms-label">End Date:</label>
			<input type="date" class="forms-input" bind:value={end_date} />
		</div>
		<br />
		<hr />
		<h2 class="heading">Staff Information</h2>
		<h3 class="subheading">Workday</h3>
		<div class="forms-p">
			<label for="staff-name" class="forms-label">Staff Name:</label>
			<input type="text" class="forms-input" bind:value={staff_name} />
		</div>
		<div class="forms-p">
			<label for="workday-date" class="forms-label">Date:</label>
			<input type="date" class="forms-input" bind:value={workday_date} />
		</div>
		<div class="forms-p">
			<label for="hours-worked" class="forms-label">Hours Worked:</label>
			<input type="text" class="forms-input" bind:value={hours_worked} />
		</div>
		<h3 class="subheading">Overtime (OT) Claim</h3>
		<div class="forms-p">
			<label for="workday-day" class="forms-label">Workday:</label>
			<input type="text" class="forms-input" bind:value={workday_day} />
		</div>
		<div class="forms-p">
			<label for="hours-worked" class="forms-label">Hours Worked:</label>
			<input type="text" class="forms-input" bind:value={actual_hours_worked} />
		</div>
		<h3 class="subheading">Travel Details</h3>
		<div class="forms-p">
			<label for="travel-date" class="forms-label">Date:</label>
			<input type="date" class="forms-input" bind:value={travel_date} />
		</div>
		<div class="forms-p">
			<label for="travel-origin" class="forms-label">Origin:</label>
			<input type="text" class="forms-input" bind:value={travel_origin} />
		</div>
		<div class="forms-p">
			<label for="travel-destination" class="forms-label">Destination:</label>
			<input type="text" class="forms-input" bind:value={travel_destination} />
		</div>
		<div class="forms-p">
			<label for="travel-allowance" class="forms-label">Allowance:</label>
			<input type="text" class="forms-input" bind:value={travel_allowance} />
		</div>
		<br />
		<hr />
		<h2 class="heading">Contractor Information</h2>
		<div class="forms-p">
			<label for="contractor-name" class="forms-label">Contractor Name:</label>
			<input type="text" class="forms-input" bind:value={contractor_name} />
		</div>
		<div class="forms-p">
			<label for="contractor-phone-no" class="forms-label">Phone No.:</label>
			<input type="text" class="forms-input" bind:value={contractor_phone_no} />
		</div>
		<div class="forms-p">
			<label for="contractor-company" class="forms-label">Company:</label>
			<input type="text" class="forms-input" bind:value={contractor_company} />
		</div>
		<div class="forms-p">
			<label for="contractor-email" class="forms-label">Email:</label>
			<input type="email" class="forms-input" bind:value={contractor_email} />
		</div>
		<div class="forms-p">
			<label for="contractor-certification" class="forms-label">Certification Expiry Date:</label>
			<input type="date" class="forms-input" bind:value={contractor_certification} />
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
		<h2 class="heading">Acknowledgement and Submission</h2>
		<div class="container">
			<div class="checkbox">
				<input type="checkbox" name="checkbox" id="checkbox" bind:value={acknowledged} />
			</div>
			<div class="declaration">
				<p>The declaration for the Competency Register Report as below:</p>
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
		<!-- <div class="forms-p">
			<p><b>Confirm Login Password</b></p>
			<input type="password" class="forms-input" />
		</div> -->
		{#if errorMsg}
			<p class="error">{errorMsg}</p>
		{/if}
		<div class="submit">
			<button type="submit" class="button-submit" disabled={saving}
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
		font-size: 14px;
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

	.subheading {
		margin: 10px 0;
		font-size: 16px;
		font-weight: bold;
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
</style>
