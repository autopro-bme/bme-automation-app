<script>
	import ChevronsLeft from '@lucide/svelte/icons/chevrons-left';
	import ChevronsRight from '@lucide/svelte/icons/chevrons-right';
	import CloudDownload from '@lucide/svelte/icons/cloud-download';

	const startYear = 2026;
	const endYear = 2028;

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	// build months list from Jan 2026 to Dec 2028
	// @ts-ignore
	const months = [];
	for (let y = startYear; y <= endYear; y++) {
		for (let m = 0; m < 12; m++) {
			months.push({ year: y, month: m });
		}
	}

	// start at January 2026
	let index = 0;

	function prev() {
		if (index > 0) index -= 1;
	}

	function next() {
		if (index < months.length - 1) index += 1;
	}

	// @ts-ignore
	function getWeeks(year, month) {
		const first = new Date(year, month, 1);
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const weeks = [];
		let week = new Array(7).fill(null);

		// convert to Monday-first: monday = 0 .. sunday = 6
		let dayOfWeek = (first.getDay() + 6) % 7;
		let dayCounter = 1;

		// fill initial nulls until first day
		for (let i = dayOfWeek; i < 7 && dayCounter <= daysInMonth; i++) {
			week[i] = dayCounter++;
		}
		weeks.push(week.slice());

		while (dayCounter <= daysInMonth) {
			week = new Array(7).fill(null);
			for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
				week[i] = dayCounter++;
			}
			weeks.push(week.slice());
		}

		// ensure 6 rows for visual consistency
		while (weeks.length < 6) {
			weeks.push(new Array(7).fill(null));
		}

		return weeks;
	}
</script>

<h1 class="title">Calendar View</h1>

<div class="project-box">
	<p>
		Note: Only submitting Tool Box Meeting, PPE Visual Inspections and Housekeeping forms will
		become Working Day (Start form December 2025)
	</p>

	<div class="calendar">
		<div class="calendar-header">
			<button class="nav" on:click={prev} disabled={index === 0}><ChevronsLeft /></button>
			<div class="month-label">{monthNames[months[index].month]} {months[index].year}</div>
			<button class="nav" on:click={next} disabled={index === months.length - 1}
				><ChevronsRight /></button
			>
		</div>

		<div class="weekdays">
			<div>Monday</div>
			<div>Tuesday</div>
			<div>Wednesday</div>
			<div>Thursday</div>
			<div>Friday</div>
			<div>Saturday</div>
			<div>Sunday</div>
		</div>

		{#each getWeeks(months[index].year, months[index].month) as week}
			<div class="week">
				{#each week as day}
					<div class="cell">
						{#if day}
							<div class="no-working">No Working</div>
							<div class="day-num">{String(day).padStart(2, '0')}</div>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<div class="download">
		<button class="button-download"><CloudDownload /><span>Excel</span></button>
	</div>
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

	.button-download {
		background-color: #31b647;
		width: 150px;
		height: 40px;
		margin: 10px 0 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.button-download span {
		color: #ffffff;
	}

	.button-download:hover {
		background-color: #31b647bd;
	}

	.calendar {
		margin-top: 10px;
		border: 1px solid #b0b0b0;
		border-radius: 6px;
		overflow: hidden;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 10px 0;
		font-weight: bold;
	}

	.calendar-header .month-label {
		font-size: 16px;
	}

	.cell {
		min-height: 90px;
		padding: 8px;
		border-right: 1px solid #b0b0b0;
		border-bottom: 1px solid #b0b0b0;
		position: relative;
		background: #fff;
	}

	.cell:last-child {
		border-right: none;
	}

	.day-num {
		position: absolute;
		bottom: 6px;
		right: 8px;
		font-weight: bold;
		color: #064c6dd7;
	}

	.download {
		display: flex;
		align-items: flex-end;
	}

	.nav {
		background: none;
		color: #064c6dd7;
		border: none;
		font-size: 18px;
		cursor: pointer;
		padding: 6px 12px;
	}

	.nav:disabled {
		color: #b0b0b0;
		cursor: default;
	}

	.no-working {
		color: #e60000;
		font-weight: bold;
		text-align: center;
		margin-top: 6px;
	}

	.project-box {
		margin: 10px;
		border: 1px solid #091747;
		border-radius: 4px;
		padding: 10px;
		font-size: 14px;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 0 10px;
	}

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		background: #f7fbff;
		border-top: 1px solid #b0b0b0;
		border-bottom: 1px solid #b0b0b0;
	}

	.weekdays > div {
		padding: 10px;
		text-align: center;
		font-weight: bold;
		color: #091747;
	}

	.week {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}
</style>
