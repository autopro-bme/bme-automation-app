<script>
	import Search from '@lucide/svelte/icons/search';
	import CloudDownload from '@lucide/svelte/icons/cloud-download';
	import { Projector } from '@lucide/svelte';
</script>

<h1 class="title">Site Safety eForm Information</h1>

<div class="container">
	<input type="radio" name="eForm-type" id="eTBM-data" />
	<label for="eTBM-data" class="label">eTBM Data</label>
	<input type="radio" name="eForm-type" id="ePPE-data" />
	<label for="ePPE-data" class="label">ePPE Data</label>
	<input type="radio" name="eForm-type" id="eHKP-data" />
	<label for="eHKP-data" class="label">eHKP Data</label>
	<input type="radio" name="eForm-type" id="eZCA-data" />
	<label for="eZCA-data" class="label">eZCA Data</label>
</div>

<div class="filter-bar">
	<h2 class="created-date">Created Date</h2>
	<div class="date-select">
		From<input type="date" name="created-date" id="date-from" class="date-from" />To<input
			type="date"
			name="created-date"
			id="date-to"
			class="date-to"
		/>
	</div>
</div>

<div class="filter-bar">
	<h2 class="project-id">Project Name/Project ID</h2>
	<input type="text" placeholder="MP1234" class="filter-input" />
	<button class="button-primary" id="button-search"><Search /></button>
</div>
<div class="site-safety-download">
	<button class="button-download"><CloudDownload /><span>Excel</span></button>
</div>

<h3>Tool Box Meeting Data</h3>
<div class="project-box">
	<p class="project-name"><b>1. MP1234 eTBM</b></p>
	<p><b>Project Name:&nbsp;</b>ABC Sdn Bhd</p>
	<p><b>Project ID:&nbsp;</b>MP1234</p>
	<p><b>Conducted by Name:&nbsp;</b>Ali bin Abu</p>
	<p><b>Created Date:&nbsp;</b>31/12/2025 16:53</p>
	<p><b>Meeting Time:&nbsp;</b>07:45</p>
	<p><b>Location Submitted:&nbsp;</b>Jalan 1, Taman 2, 12345 Subang Jaya, Selangor.</p>
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

	button:hover {
		background-color: #064c6da4;
	}

	.button-download {
		background-color: #31b647;
		width: 150px;
		height: 40px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-left: auto;
	}

	.button-download span {
		color: #ffffff;
	}

	.button-download:hover {
		background-color: #31b647bd;
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
		vertical-align: middle;
	}

	.container {
		display: flex;
		padding: 0 10px;
		align-items: center;
	}

	.created-date,
	.project-id {
		font-size: large;
		font-weight: bold;
		margin: 10px 0;
	}

	.date-select,
	.date-from,
	.date-to {
		height: 30px;
		margin: 0 15px;
		font-size: 14px;
	}

	.filter-bar {
		padding: 10px;
	}

	.filter-input {
		width: 350px;
		font-size: 14px;
	}

	h3 {
		padding-left: 10px;
		font-weight: bold;
	}

	.label {
		font-weight: bold;
		margin: 0 25px 0 10px;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.project-name {
		font-size: 16px;
	}

	.site-safety-download {
		display: flex;
		margin: 10px;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}
</style>
