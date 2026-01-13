import {createUser, findUserByEmail} from '$lib/server/auth.js';
import {redirect, fail} from '@sveltejs/kit';

// SvelteKit expects `actions` to be an object of named handlers.
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const phone = data.get('phone');
        const position = data.get('position');
        const region = data.get('region');
        const password = data.get('password');
        const confirmPassword = data.get('confirm-password');

        if (!name || !email || !phone || !position || !region || !password || !confirmPassword) {
            return fail(400, {error: 'Missing fields'});
        }

        if (password !== confirmPassword) {
            return fail(400, {error: 'Passwords do not match'});
        }

        const existing = await findUserByEmail(email);
        if (existing) {
            return fail(400, {error: 'This email has been already registered to an account'});
        }

        await createUser(name, email, phone, position, region, password);

        throw redirect(303, '/signin');
    }
};

export function load() {
    return {
        title: "Sign Up Page | BME Automation App"
    }
}

export const prerender = false;