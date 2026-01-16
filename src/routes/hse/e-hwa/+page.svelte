<script>
	import FileText from '@lucide/svelte/icons/file-text';

	let subsections = [
		{
			title: 'Fire Extinguisher Device',
			items: [{ label: 'Powder ABC/Debu Kering' }, { label: 'CO2' }, { label: 'Foam' }]
		},
		{
			title: 'Personal Protective Equipment',
			items: [
				{ label: 'Safety Helmet/Topi Keselamatan' },
				{ label: 'Goggle/Face Shield/Pelindung Mata' },
				{ label: 'Leather Glove/Sarung Tangan Kulit' },
				{ label: 'Communication Device/Alat Perhubungan' }
			]
		},
		{
			title: 'Fire Prevention Equipment',
			items: [{ label: 'Fire Blankets' }, { label: 'Gas Detector' }, { label: 'Foam' }]
		}
	];
</script>

<h1 class="title">Hot Work Activities Report (e-HWA) Submission</h1>

<div class="project-box">
	<form action="" class="forms">
		<h2 class="heading">General Information</h2>
		<div class="forms-p">
			<label for="permit-date" class="forms-label">Permit Validity Date:</label>
			<input type="date" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="hotwork-location" class="forms-label">Hot Work Location Allowed:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="hotwork-contractor-employees" class="forms-label">Contractor and Employees:</label
			>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="hotwork-emergency-number" class="forms-label">Emergency Number:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
		<hr />
		<h2 class="heading">Hot Work Safety Checklist</h2>
		{#each subsections as subsection}
			<h3 class="subheading">{subsection.title}</h3>
			<div class="checklist-grid">
				{#each subsection.items as item, iIndex}
					<p class="index">{iIndex + 1}</p>
					<p>{item.label}</p>
					<p class="checklist-radio">
						<input type="radio" name="checklist-boolean" id="checklist-yes" />
						<label for="checklist-yes" class="label">Yes</label>
						<input type="radio" name="checklist-boolean" id="checklist-no" />
						<label for="checklist-no" class="label">No</label>
					</p>
					<input type="text" class="checklist-remarks" placeholder="Remarks" />
				{/each}
			</div>
			<br />
		{/each}
		<p class="note">
			<b
				>Permission to do Hot Work and this approval is valid to the location specified in the hot
				work permit only, contractor must apply for a different hot work permit for a different
				location.</b
			>
		</p>
		<br />
		<hr />
		<h2 class="heading">Contractor Information</h2>
		<div class="forms-p">
			<label for="contractor-name" class="forms-label">Contractor Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="ic-passport" class="forms-label">IC or Passport No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="phone-no" class="forms-label">Phone No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="company-name" class="forms-label">Company Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
		<h2 class="heading">Verified By</h2>
		<div class="forms-p">
			<label for="coordinator-name" class="forms-label">Project Coordinator Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="officer-name" class="forms-label">SHE Officer Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<br />
		<hr />
		<h2 class="heading">Acknowledgement and Submission</h2>
		<div class="container">
			<div class="checkbox">
				<input type="checkbox" name="" id="" />
			</div>
			<div class="declaration">
				<p>The declaration for the Hot Work Activities Report as below:</p>
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

	.checklist-grid {
		margin-top: 15px;
		display: grid;
		grid-template-columns: 40px 1fr 100px 2fr;
		align-items: center;
		gap: 10px;
	}

	.checklist-radio {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	.checklist-remarks {
		width: 100%;
		height: 38px;
		padding: 6px 10px;
		font-size: 14px;
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

	.index {
		text-align: center;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
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
