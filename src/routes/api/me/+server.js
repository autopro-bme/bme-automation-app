import { json } from '@sveltejs/kit';
import { findUserById } from '$lib/server/auth.js';

export async function GET({ cookies }) {
    const session = cookies.get('session');
    if (!session) {
        return json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const user = await findUserById(session);
        if (!user) {
            return json({ error: 'User not found' }, { status: 404 });
        }

        return json({ user: { id: user.id, name: user.name } });
    } catch (err) {
        return json({ error: 'Invalid session' }, { status: 400 });
    }
}
