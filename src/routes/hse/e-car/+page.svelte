<script>
	import Search from '@lucide/svelte/icons/search';
	import FileText from '@lucide/svelte/icons/file-text';
</script>

<h1 class="title">Corrective Action Report (e-CAR) Submission</h1>

<a href="/hse/e-car-history"
	><button class="button-primary" id="button-history">View History</button></a
>
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
			<label for="project-date" class="forms-label">Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="project-weather" class="forms-label">Weather:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
		<hr />
		<h2 class="heading">Corrective Action Information</h2>
		<div class="forms-p">
			<label for="iso-no" class="forms-label">ISO Form No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div>
			<label for="form-description" class="forms-label">Form Description:</label>
			<p><textarea name="" id="" cols="77" rows="10" placeholder="Issue"></textarea></p>
		</div>
		<div>
			<label for="action-taken" class="forms-label">Action Taken:</label>
			<p><textarea name="" id="" cols="77" rows="10" placeholder="Action Taken"></textarea></p>
		</div>
		<div class="forms-p">
			<label for="assigned-to" class="forms-label">Assigned To:</label>
			<input type="text" class="forms-input" disabled />
			<button class="button-primary" id="button-select-user">Select User</button>
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
				<p>The declaration for the Corrective Action Report as below:</p>
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

	#button-history {
		display: block;
		margin: 0 10px 10px auto;
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

	#button-select-user {
		height: 30px;
		margin: 10px 0;
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
