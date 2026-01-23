// export async function load({ locals }) {
// 	const { data, error } = await locals.supabase
// 		.from('attendance_records')
// 		.select('*')
// 		.order('date', { ascending: false });

// 	if (error) {
// 		console.error(error);
// 		return { records: [] };
// 	}

// 	return {
// 		title: 'Working Day Attendance (-eWDA) Record | BME Automation App',
// 		records: data ?? []
// 	};
// }

import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	// Require authentication
	const {
		data: { user }
	} = await locals.supabase.auth.getUser();

	if (!user) throw redirect(303, '/auth/signin');

	const selectedDate = url.searchParams.get('date') ?? new Date().toISOString().slice(0, 10);

	// Only Site Safety Supervisors are required to submit e-TBM/e-PPE/e-HKP
	const { data: supervisors, error: supErr } = await locals.supabase
		.from('profiles')
		.select('id, nickname, first_name, last_name, email, position')
		.eq('position', 'Site Safety Supervisor')
		.order('first_name', { ascending: true });

	if (supErr) {
		return {
			title: 'Working Day Attendance (e-WDA) | BME Automation App',
			date: selectedDate,
			rows: [],
			error: supErr.message
		};
	}

	// Load attendance_records for that date
	const { data: records, error: recErr } = await locals.supabase
		.from('attendance_records')
		.select('created_by, created_by_name, etbm, eppe, ehkp, date')
		.eq('date', selectedDate);

	if (recErr) {
		return {
			title: 'Working Day Attendance (e-WDA) | BME Automation App',
			date: selectedDate,
			rows: [],
			error: recErr.message
		};
	}

	const recordByUser = new Map((records ?? []).map((r) => [r.created_by, r]));

	const rows = (supervisors ?? []).map((u) => {
		const r = recordByUser.get(u.id);
		const name =
			u.nickname ||
			`${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() ||
			u.email ||
			r?.created_by_name ||
			'—';

		const etbm = !!r?.etbm;
		const eppe = !!r?.eppe;
		const ehkp = !!r?.ehkp;
		return {
			date: selectedDate,
			name,
			etbm: etbm ? 'Yes' : 'No',
			eppe: eppe ? 'Yes' : 'No',
			ehkp: ehkp ? 'Yes' : 'No',
			status: etbm && eppe && ehkp ? 'Present' : 'Absent'
		};
	});

	return {
		title: 'Working Day Attendance (e-WDA) Record | BME Automation App',
		date: selectedDate,
		rows,
		error: ''
	};
}
