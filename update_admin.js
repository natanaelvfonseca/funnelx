
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000 // 10s timeout
});

console.log('INIT Pool connected setup');

pool.connect((err, client, release) => {
    if (err) {
        console.error('CONNECTION ERROR:', err.stack);
        process.exit(1);
    }
    console.log('CONNECTED TO DB');

    client.query('SELECT current_database(), email, role FROM users', (err, result) => {
        release();
        if (err) {
            console.error('QUERY ERROR:', err.stack);
            process.exit(1);
        }
        console.log('DATABASE:', result.rows[0]?.current_database);
        console.log('TOTAL USERS:', result.rowCount);

        const target = 'girardi.elite@gmail.com';
        const user = result.rows.find(u => u.email.toLowerCase() === target.toLowerCase());

        if (user) {
            console.log('FOUND USER:', user);
            if (user.role !== 'admin') {
                console.log('UPDATING TO ADMIN...');
                pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [user.email], (err2, res2) => {
                    if (err2) console.error('UPDATE ERROR:', err2.stack);
                    else console.log('UPDATE SUCCESSFUL');
                    pool.end();
                });
            } else {
                console.log('ALREADY ADMIN');
                pool.end();
            }
        } else {
            console.log('USER NOT FOUND');
            // Log first 3 for context
            console.log('Context (first 3):', result.rows.slice(0, 3).map(r => r.email));
            pool.end();
        }
    });
});
