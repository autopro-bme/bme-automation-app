<script>
	import Search from '@lucide/svelte/icons/search';
	import FileText from '@lucide/svelte/icons/file-text';
</script>

<h1 class="title">Competency Register Report (e-CTR) Submission</h1>

<div class="project-box">
	<form action="" class="forms">
		<h2 class="heading">General Information</h2>
		<button type="submit" class="button-primary"><Search />Search Project</button>
		<div class="forms-p">
			<label for="project-name" class="forms-label">Project Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="project-no" class="forms-label">Project No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="project-region" class="forms-label">Region:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="project-location" class="forms-label">Location:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="kickoff-date" class="forms-label">Kick-off Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="project-weather" class="forms-label">Weather:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
		<hr />
		<h2 class="heading">Site Safety Supervisor Allocation</h2>
		<div class="forms-p">
			<label for="supervisor-name" class="forms-label">Supervisor Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="start-date" class="forms-label">Start Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="end-date" class="forms-label">End Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<br />
		<hr />
		<h2 class="heading">Staff Information</h2>
		<h3 class="subheading">Workday</h3>
		<div class="forms-p">
			<label for="staff-name" class="forms-label">Staff Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="workday-date" class="forms-label">Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="hours-worked" class="forms-label">Hours Worked:</label>
			<input type="text" class="forms-input" />
		</div>
		<h3 class="subheading">Overtime (OT) Claim</h3>
		<div class="forms-p">
			<label for="workday-day" class="forms-label">Workday:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="hours-worked" class="forms-label">Hours Worked:</label>
			<input type="text" class="forms-input" />
		</div>
		<h3 class="subheading">Travel Details</h3>
		<div class="forms-p">
			<label for="travel-date" class="forms-label">Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="travel-origin" class="forms-label">Origin:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="travel-destination" class="forms-label">Destination:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="travel-allowance" class="forms-label">Allowance:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
		<hr />
		<h2 class="heading">Contractor Information</h2>
		<div class="forms-p">
			<label for="contractor-name" class="forms-label">Contractor Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="contractor-phone-no" class="forms-label">Phone No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="contractor-company" class="forms-label">Company:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="contractor-email" class="forms-label">Email:</label>
			<input type="email" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="contractor-certification" class="forms-label">Certification Expiry Date:</label>
			<input type="date" class="forms-input" />
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
