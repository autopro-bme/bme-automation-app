<script>
	/**
	 * @typedef {{ score: number | null }} AuditItem
	 * @typedef {{ items: AuditItem[] }} Subsection
	 */

	import Search from '@lucide/svelte/icons/search';
	import FileText from '@lucide/svelte/icons/file-text';
	import Info from '@lucide/svelte/icons/info';

	let showInfo = false;

	const MAX_SCORE_PER_ITEM = 5;

	let subsections = [
		{
			title: 'Documentation & Approvals',
			items: [
				{
					label: 'Approved Safety Plan & Risk Assessment (HIRARC) on site',
					score: null,
					showInfo: false
				},
				{ label: 'Approved SOPs', score: null, showInfo: false },
				{ label: 'Daily Toolbox Briefing Records', score: null, showInfo: false },
				{
					label: 'Work Permit Process (Hot works, Confined Space, etc.)',
					score: null,
					showInfo: false
				}
			]
		},
		{
			title: 'Safety Manpower Coverage',
			items: [
				{ label: 'Presence of Competent Safety Supervisor on Site', score: null, showInfo: false },
				{
					label: 'Project Supervisor/Engineer Responsible in Absence of Safety Supervisor',
					score: null,
					showInfo: false
				},
				{ label: 'Safety Officer Attendance at High-Risk Activities', score: null, showInfo: false }
			]
		},
		{
			title: 'Workforce Safety Compliance',
			items: [
				{
					label: 'Full PPE Compliance (Helmet, Harness, Vest, Boots, Gloves)',
					score: null,
					showInfo: false
				},
				{ label: 'Workers briefed & aware of Safety SOPs', score: null, showInfo: false },
				{
					label: 'Workers possess valid CIDB/OSH/Safety Cards/NIOSH passport',
					score: null,
					showInfo: false
				},
				{ label: 'No unauthorized personal on site', score: null, showInfo: false }
			]
		},
		{
			title: 'Subcontractor Vetting',
			items: [
				{ label: "Subcontractors's HSE Qualifications Verified", score: null, showInfo: false },
				{ label: 'HSE Terms Embedded in Subcontract Agreement', score: null, showInfo: false }
			]
		},
		{
			title: 'Site Condition & Controls',
			items: [
				{ label: 'Housekeeping & Waste Disposal', score: null, showInfo: false },
				{ label: 'Edge & Fall Protection', score: null, showInfo: false },
				{ label: 'Equipment & Machinery Safety', score: null, showInfo: false },
				{ label: 'Signage & Emergency Access', score: null, showInfo: false },
				{ label: 'Presence of lifting crew (competent person)', score: null, showInfo: false },
				{ label: 'Scaffold & ladder', score: null, showInfo: false }
			]
		},
		{
			title: 'Safety Leadership & Reporting',
			items: [
				{ label: 'Stop Work Authority (SWA) Exercised Where Needed', score: null, showInfo: false },
				{ label: 'Near Miss & Incident Reporting', score: null, showInfo: false },
				{ label: 'Disciplinary Action Taken on Violations', score: null, showInfo: false }
			]
		}
	];

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
			<label for="project-date" class="forms-label">Audit Date:</label>
			<input type="date" class="forms-input" />
		</div>
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
						<button
							type="button"
							class="info-button"
							on:click={() => (item.showInfo = !item.showInfo)}><Info /></button
						>
						{#if item.showInfo}
							<div class="info-popup">
								<p class="info-details">
									<span class="one">1</span> Document exists but is lacking critical sections or less
									relevant to current site work.
								</p>
								<p class="info-details">
									<span class="two">2</span> Incomplete or draft version is available; approval status
									unclear or still pending.
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
						{/if}
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
					<input type="text" class="audit-remarks" placeholder="Remarks" />
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
	}

	.info-wrapper {
		position: relative;
		display: inline-flex;
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

	span {
		display: inline-block;
		text-align: center;
		align-items: center;
		color: #091747;
		width: 50px;
	}

	/* span scores */
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

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}
</style>
