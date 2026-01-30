<script>
	import User from '@lucide/svelte/icons/user-round';
</script>

<h1 class="title">Corrective Action Report (e-CAR) History</h1>

<div class="project-box">
	<div class="info">
		<div class="report-overview">
			<h2>Report Overview</h2>
			<p class="label">Project Name</p>
			<p>ABC Plantation Sdn Bhd</p>
			<p class="label">Project No.</p>
			<p>PB1234</p>
			<p class="label">Submitted By</p>
			<p>Haziq Morsim</p>
			<p class="label">Submission Date</p>
			<p>09 Jan 2026</p>
			<p class="label">Current Status</p>
			<p>Pending</p>
			<p class="label">Current Level</p>
			<p>Level 1</p>
			<p class="label">Times Rejected</p>
			<p>0</p>
		</div>
		<div class="approval-timeline">
			<h2>Approval Timeline</h2>
			<div class="timeline">
				<div class="submitted-level">
					<p><b>Submitted</b></p>
					<p>Level 1</p>
					<div class="profile">
						<User />
						<p>Haziq Morsim</p>
					</div>
				</div>
				<div class="submitted-date">
					<p>09 Jan 2026 at 9:30 AM</p>
				</div>
			</div>
			<div class="timeline">
				<div class="submitted-level">
					<p><b>Submitted</b></p>
					<p>Level 2</p>
					<div class="profile">
						<User />
						<p>Chong Wen Yang</p>
					</div>
				</div>
				<div class="submitted-date">
					<p>09 Jan 2026 at 12:00 PM</p>
				</div>
			</div>
			<div class="timeline">
				<div class="submitted-level">
					<p><b>Submitted</b></p>
					<p>Level 3</p>
					<div class="profile">
						<User />
						<p>Wong Jun Ying</p>
					</div>
				</div>
				<div class="submitted-date">
					<p>09 Jan 2026 at 2:45 PM</p>
				</div>
			</div>
			<div class="timeline">
				<div class="submitted-level">
					<p><b>Submitted</b></p>
					<p>Level 4</p>
					<div class="profile">
						<User />
						<p>Goh Kok Ghee</p>
					</div>
				</div>
				<div class="submitted-date">
					<p>09 Jan 2026 at 4:15 PM</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: #091747;
	}

	.approval-timeline,
	.report-overview {
		width: 50%;
		padding: 10px;
		border: 1px solid #09174762;
	}

	h2 {
		font-size: 20px;
		font-weight: bold;
	}

	.info {
		display: flex;
		flex-direction: row;
	}

	.label {
		margin-top: 10px;
		font-weight: bold;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.profile {
		display: flex;
		gap: 10px;
		margin-top: 5px;
	}

	.timeline {
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}
</style>
