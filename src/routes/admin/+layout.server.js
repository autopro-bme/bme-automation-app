// import { redirect } from '@sveltejs/kit';

// export async function load({ locals }) {
// 	const {
// 		data: { user }
// 	} = await locals.supabase.auth.getUser();
// 	if (!user) throw redirect(303, '/auth/signin');

// 	const { data: profile } = await locals.supabase
// 		.from('profiles')
// 		.select('department')
// 		.eq('id', user.id)
// 		.single();

// 	const departments = profile?.department ?? [];
// 	const isAdmin = departments.include('Admin');

// 	if (!isAdmin) throw redirect(303, '/');
// }
