<script>
	import Search from '@lucide/svelte/icons/search';
	import FileText from '@lucide/svelte/icons/file-text';
</script>

<h1 class="title">Housekeeping Report (e-HKP) Submission</h1>

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
			<label for="project-date" class="forms-label">Activity Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="project-weather" class="forms-label">Weather:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
		<hr />
		<h2 class="heading">Photos of Housekeeping</h2>
		<div class="upload">
			<p class="upload-text">
				<input type="file" id="ppe_photo" name="ppe_photo" accept="image/png, image/jpeg" />
			</p>
		</div>
		<br />
		<hr />
		<h2 class="heading">Report for the Day</h2>
		<div class="report-type">
			<label for="sitewalk-count" class="report-label"><b>No. of Site Walk:</b></label>
			<input type="text" class="report-count" />
		</div>
		<div class="report-type">
			<label for="hra-count" class="report-label"><b>No. High-risk Activities Observed:</b></label>
			<input type="text" class="report-count" />
		</div>
		<div class="report-type">
			<label for="uauc-count" class="report-label"
				><b>No. Unsafe Act Unsafe Condition (UAUC):</b></label
			>
			<input type="text" class="report-count" />
		</div>
		<div class="report-type">
			<label for="stopwork-count" class="report-label"><b>No. Stop Work:</b></label>
			<input type="text" class="report-count" />
		</div>
		<p><b>(A) Injuries</b></p>
		<div class="report-type">
			<label for="lti-count" class="report-label">(i) No. of Accidents (Lost Time Injuries):</label>
			<input type="text" class="report-count" />
		</div>
		<div class="report-type">
			<label for="nlti-count" class="report-label"
				>(ii) No. of Accidents (No Lost Time Injuries):</label
			>
			<input type="text" class="report-count" />
		</div>
		<p><b>(B) Non-Injuries</b></p>
		<div class="report-type">
			<label for="opd-count" class="report-label"
				>(i) No. of Established Occupational Poisoning or Disease (OPD):</label
			>
			<input type="text" class="report-count" />
		</div>
		<div class="report-type">
			<label for="nmi-count" class="report-label">(ii) No. of Near Miss Incident:</label>
			<input type="text" class="report-count" />
		</div>
		<div class="report-type">
			<label for="nc-count" class="report-label">(iii) No. of Non-Compliance:</label>
			<input type="text" class="report-count" />
		</div>
		<div class="report-type">
			<label for="sodo-count" class="report-label"
				><b>(C) No. of Significant Safety Occurrence / Dangerous Occurrence:</b></label
			>
			<input type="text" class="report-count" />
		</div>
		<hr />
		<h2 class="heading">Remarks</h2>
		<p>
			<textarea name="" id="" cols="30" rows="10" class="remarks" placeholder="Remarks"></textarea>
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

	.note {
		margin-bottom: 10px;
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
</style>
