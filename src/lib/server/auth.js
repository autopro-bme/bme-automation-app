import bcrypt from 'bcrypt';
import pool from './db';

const SALT_ROUNDS = 10;

// @ts-ignore
export async function hashPassword(password) {
	return bcrypt.hash(password, SALT_ROUNDS);
}

// @ts-ignore
export async function verifyPassword(password, hash) {
	return bcrypt.compare(password, hash);
}

// @ts-ignore
export async function createUser(name, employee_no, email, phone, position, region, password) {
	const hash = await hashPassword(password);

	const result = await pool.query(
		'INSERT INTO users (name, employee_no, email, phone, position, region, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
		[name, employee_no, email, phone, position, region, hash]
	);

	return result.rows[0];
}

// @ts-ignore
export async function findUserByEmployeeNo(employee_no) {
	const result = await pool.query('SELECT * FROM users WHERE employee_no = $1', [employee_no]);

	return result.rows[0];
}

// @ts-ignore
export async function findUserByEmail(email) {
	const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

	return result.rows[0];
}

// @ts-ignore
export async function findUserById(id) {
	const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

	return result.rows[0];
}
