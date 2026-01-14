<script>
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	let submissionTypes = [
		{ title: 'Corrective Action Report (e-CAR)', count: 0, items: [] },
		{ title: 'Housekeeping Report (e-HKP)', count: 0, items: [] },
		{ title: 'Overtime Requisition and Approval Form (e-ORA)', count: 0, items: [] },
		{ title: 'PPE Visual Inspections (e-PPE)', count: 0, items: [] },
		{ title: 'Staff Claim Form (e-SCF)', count: 0, items: [] },
		{ title: 'Safety Officer Audit (e-SOA)', count: 0, items: [] },
		{
			title: 'Tool Box Meeting (e-TBM)',
			count: 3,
			items: [
				{ id: '0001', project: 'ABC Plantation Sdn Bhd', date: '02 Jan 2026', time: '7:05 AM' },
				{ id: '0002', project: 'JT OIL Palm Development', date: '02 Jan 2026', time: '7:20 AM' },
				{ id: '0003', project: 'SD Tanah Merah', date: '02 Jan 2026', time: '7:40 AM' }
			]
		},
		{ title: 'Travel Requisition Form (e-TRF)', count: 0, items: [] },
		{ title: 'Zero Compromise Audit (e-ZCA)', count: 0, items: [] }
	];

	let openIndex = null; // which submission-type is open (null = none)

	function toggleDiv(i) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<h1 class="title">Submission History</h1>

<div class="project-box">
	<div class="date-container">
		<p><b>Submit Date</b></p>
		<p class="submit-dates">
			From&nbsp;<input type="date" class="submit-date" />&nbsp;To&nbsp;<input
				type="date"
				class="submit-date"
			/>
		</p>
	</div>
	{#each submissionTypes as s, i}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="submission-type" onclick={() => toggleDiv(i)}>
			<button class="button-toggle">{s.title} ({s.count})</button>
			{#if openIndex === i}
				<ChevronDown />
			{:else}
				<ChevronLeft />
			{/if}
		</div>

		{#if openIndex === i}
			<div class="submission-row" id="submission-row">
				{#if s.items && s.items.length > 0}
					{#each s.items as item}
						<div class="submission-data">
							<h2>Project #{item.id}</h2>
							<p class="project-data"><b>Project Name:&nbsp;</b>{item.project}</p>
							<p class="project-data"><b>Submit Date:&nbsp;</b>{item.date}</p>
							<p class="project-data"><b>Meeting Time:&nbsp;</b>{item.time}</p>
							<p class="project-data"><b>Filled TBM Image:&nbsp;</b></p>
							<p>(image)</p>
							<p class="project-data"><b>Filled PTW Image:&nbsp;</b></p>
							<p>(image)</p>
							<p class="project-data"><b>TBM Visit Image:&nbsp;</b></p>
							<p>(image)</p>
							<p class="project-data"><b>Another Document:&nbsp;</b></p>
							<p>(document)</p>
						</div>
					{/each}
				{:else}
					<div style="padding:12px;">No submissions.</div>
				{/if}
			</div>
		{/if}
	{/each}
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: #091747;
	}

	button {
		background-color: #05577ed7;
		color: #ffffff;
		border: none;
		font-size: small;
		padding: 6px 14px;
		border-radius: 4px;
		cursor: pointer;
	}

	.button-toggle {
		width: 98%;
		background-color: #ffffff;
		color: #091747;
		text-align: left;
		font-weight: bold;
	}

	.date-container {
		margin-bottom: 20px;
	}

	h2 {
		font-size: 16px;
		font-weight: bold;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.project-data {
		margin-top: 5px;
	}

	.submission-data {
		display: block;
		width: 33%;
		padding: 10px;
		margin: 5px;
		border: 1px solid #09174762;
		border-radius: 2px;
	}

	.submission-row {
		display: flex;
	}

	.submission-type {
		display: flex;
		align-items: center;
		cursor: pointer;
		width: 100%;
		margin-bottom: 5px;
		background-color: #ffffff;
		color: #091747;
		border: 1px solid #091747;
		border-radius: 2px;
	}

	.submit-date {
		font-size: 12px;
		cursor: pointer;
	}

	.submit-dates {
		margin-top: 5px;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}
</style>
