import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
});

export default pool;