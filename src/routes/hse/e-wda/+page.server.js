export async function load({ locals }) {
	const { data, error } = await locals.supabase
		.from('attendance_records')
		.select('*')
		.order('date', { ascending: false });

	if (error) {
		console.error(error);
		return { records: [] };
	}

	return {
		title: 'Working Day Attendance (-eWDA) Record | BME Automation App',
		records: data ?? []
	};
}
