import { findUserByEmail, verifyPassword } from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const user = await findUserByEmail(email);
		if (!user) {
			return fail(400, { error: 'The username or password is incorrect' });
		}

		const valid = await verifyPassword(password, user.password);
		if (!valid) {
			return fail(400, { error: 'The username or password is incorrect' });
		}

		cookies.set('session', String(user.id), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict'
		});

		throw redirect(303, '/');
	}
};

export function load() {
	return {
		title: 'Sign In | BME Automation App'
	};
}

export const prerender = false;
