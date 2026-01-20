<script>
	import FileText from '@lucide/svelte/icons/file-text';
</script>

<h1 class="title">Overtime Requisition Approval Form (e-ORA) Submission</h1>

<div class="project-box">
	<form action="" class="forms">
		<h2 class="heading">Employee Information</h2>
		<div class="forms-p">
			<label for="employee-name" class="forms-label">Employee Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="employee-no" class="forms-label">Employee No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="department" class="forms-label">Department:</label>
			<select class="department-select">
				<option value="" disabled selected></option>
				<option value="Project">Project</option>
				<option value="HSE">HSE</option>
			</select>
		</div>
		<br />
		<hr />
		<h2 class="heading">Overtime Requisition</h2>
		<div class="forms-p">
			<label for="claim-type" class="forms-label">Type of Claim:</label>
			<select class="claim-select">
				<option value="" disabled selected></option>
				<option value="Overtime">Overtime</option>
				<option value="Duty-Allowance">Duty Allowance</option>
			</select>
		</div>
		<div class="forms-p">
			<label for="overtime-date" class="forms-label">Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="overtime-day" class="forms-label">Day:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="overtime-hours" class="forms-label">No. of Hours:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
		<hr />
		<h2 class="heading">Actual Day of Overtime Work</h2>
		<div class="forms-p">
			<label for="actual-date" class="forms-label">Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="actual-day" class="forms-label">Day:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="actual-in-time" class="forms-label">In Time (From):</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="actual-out-time" class="forms-label">Out Time (To):</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="actual-hours" class="forms-label">No. of Hours:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="reason" class="forms-label">Reason:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
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

	button {
		background-color: #064c6dd7;
		color: #ffffff;
		border: none;
		font-size: small;
		padding: 6px 14px;
		border-radius: 4px;
		cursor: pointer;
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

	.department-select,
	.claim-select {
		width: 150px;
		height: 30px;
		margin: 10px 0;
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
		width: 200px;
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
