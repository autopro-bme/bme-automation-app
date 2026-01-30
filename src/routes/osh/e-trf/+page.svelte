<script>
	import FileText from '@lucide/svelte/icons/file-text';
	import Search from '@lucide/svelte/icons/search';

	let showAdditionalTraveller = false;
</script>

<h1 class="title">Travel Requisition Form Report (e-TRF) Submission</h1>

<div class="project-box">
	<form action="" class="forms">
		<h2 class="heading">Requestor Information</h2>
		<div class="forms-p">
			<label for="requestor-name" class="forms-label">Requestor Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="requestor-position" class="forms-label">Position:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="department" class="forms-label">Department:</label>
			<select class="select">
				<option value="" disabled selected></option>
				<option value="Project">Project</option>
				<option value="OSH">OSH</option>
			</select>
		</div>
		<br />
		<hr />
		<h2 class="heading">Traveller Information</h2>
		<div class="forms-p">
			<label for="traveller-name" class="forms-label">Traveller Name:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="traveller-ic-passport" class="forms-label">IC or Passport No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="traveller-company" class="forms-label">Company:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="traveller-position" class="forms-label">Position:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="department" class="forms-label">Department:</label>
			<select class="select">
				<option value="" disabled selected></option>
				<option value="Project">Project</option>
				<option value="OSH">OSH</option>
			</select>
		</div>
		<div class="forms-p">
			<label for="traveller-phone-no" class="forms-label">Phone No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="mode-of-travel" class="forms-label">Mode of Travel:</label>
			<select class="select">
				<option value="" disabled selected></option>
				<option value="Road">Road</option>
				<option value="Company-Vehicle">Company Vehicle</option>
				<option value="Air">Air</option>
			</select>
		</div>
		<div class="forms-p">
			<label for="fare-to-be-borne-by" class="forms-label">Fare to be Borne by:</label>
			<select class="select">
				<option value="" disabled selected></option>
				<option value="boilermech">Boilermech Sdn Bhd</option>
				<option value="bm-greentech">BM GreenTech Bhd</option>
				<option value="zenith">Zenith Index Sdn Bhd</option>
				<option value="others">Others - Clients/Sub-Contractor/Supplier</option>
				<option value="oretech">Boilermech Oretech Sdn Bhd</option>
			</select>
		</div>
		<br />
		<hr />
		<h2 class="heading">Business Trip Details</h2>
		<div class="forms-p">
			<label for="travel-origin" class="forms-label">Origin:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="travel-destination" class="forms-label">Destination:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="travel-date-time" class="forms-label">Departure Date & Time:</label>
			<input type="datetime-local" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="travel-purpose" class="forms-label">Purpose of Travel:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="project-id" class="forms-label">Project ID:</label>
			<input type="text" placeholder="MP1234" class="forms-input" />
			<button class="button-primary" id="button-search"><Search size={16} /></button>
		</div>
		<div class="forms-p">
			<label for="travel-airline" class="forms-label">Preferred Airline:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="travel-flight-no" class="forms-label">Flight No.:</label>
			<input type="text" class="forms-input" />
		</div>
		<div class="forms-p">
			<label for="travel-baggage-required" class="forms-label">Baggage Required (kg):</label>
			<input type="radio" name="baggage-weight" id="15-kg" />
			<label for="15-kg" class="label">15</label>
			<input type="radio" name="baggage-weight" id="20-kg" />
			<label for="20-kg" class="label">20</label>
			<input type="radio" name="baggage-weight" id="30-kg" />
			<label for="30-kg" class="label">30</label>
		</div>
		<div class="forms-p">
			<label for="meal-onboard-required" class="forms-label">Meal Onboard Required:</label>
			<input type="radio" name="baggage-weight" id="meal-yes" />
			<label for="meal-yes" class="label">Yes</label>
			<input type="radio" name="baggage-weight" id="meal-no" />
			<label for="meal-no" class="label">No</label>
		</div>
		<br />
		<hr />
		<h2 class="heading">Additional Traveller</h2>
		<p>
			<input type="checkbox" bind:checked={showAdditionalTraveller} />
			&nbsp;&nbsp;Should there be more than one (1) traveller
		</p>
		{#if showAdditionalTraveller}
			<h3 class="heading">Additional Traveller Information</h3>
			<div class="forms-p">
				<label for="traveller-2-name" class="forms-label">Traveller Name:</label>
				<input id="traveller-2-name" type="text" class="forms-input" />
			</div>
			<div class="forms-p">
				<label for="traveller-2-ic-passport" class="forms-label">IC or Passport No.:</label>
				<input id="traveller-2-ic-passport" type="text" class="forms-input" />
			</div>
			<div class="forms-p">
				<label for="traveller-2-company" class="forms-label">Company:</label>
				<input id="traveller-2-company" type="text" class="forms-input" />
			</div>
			<div class="forms-p">
				<label for="traveller-2-position" class="forms-label">Position:</label>
				<input id="traveller-2-position" type="text" class="forms-input" />
			</div>
			<div class="forms-p">
				<label for="traveller-2-department" class="forms-label">Department:</label>
				<select id="traveller-2-department" class="select">
					<option value="" disabled selected></option>
					<option value="Project">Project</option>
					<option value="OSH">OSH</option>
				</select>
			</div>
			<div class="forms-p">
				<label for="traveller-2-phone-no" class="forms-label">Phone No.:</label>
				<input id="traveller-2-phone-no" type="text" class="forms-input" />
			</div>
			<div class="forms-p">
				<label for="traveller-2-mode-of-travel" class="forms-label">Mode of Travel:</label>
				<select id="traveller-2-mode-of-travel" class="select">
					<option value="" disabled selected></option>
					<option value="Road">Road</option>
					<option value="Company-Vehicle">Company Vehicle</option>
					<option value="Air">Air</option>
				</select>
			</div>
			<div class="forms-p">
				<label for="traveller-2-fare-borne-by" class="forms-label">Fare to be Borne by:</label>
				<select id="traveller-2-fare-borne-by" class="select">
					<option value="" disabled selected></option>
					<option value="boilermech">Boilermech Sdn Bhd</option>
					<option value="bm-greentech">BM GreenTech Bhd</option>
					<option value="zenith">Zenith Index Sdn Bhd</option>
					<option value="others">Others - Clients/Sub-Contractor/Supplier</option>
					<option value="oretech">Boilermech Oretech Sdn Bhd</option>
				</select>
			</div>
		{/if}
		<br />
		<hr />
		<h2 class="heading">Acknowledgement and Submission</h2>
		<div class="container">
			<div class="checkbox">
				<input type="checkbox" name="" id="" />
			</div>
			<div class="declaration">
				<p>The declaration for the Staff Claim Form Report as below:</p>
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
		background-color: #091747;
		font-weight: bold;
		padding: 10px 20px;
	}

	.button-primary:hover {
		background-color: #091747b9;
	}

	#button-search {
		display: flex;
		justify-content: center;
		vertical-align: middle;
		height: 30px;
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

	.select {
		height: 30px;
		width: 500px;
		font-size: 14px;
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
