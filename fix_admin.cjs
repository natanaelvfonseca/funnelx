
const pg = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost') ? { rejectUnauthorized: false } : false
});

async function checkUsers() {
    try {
        console.log("Checking database...");
        const res = await pool.query("SELECT email, role FROM users");
        console.log("USERS FOUND:");
        console.table(res.rows);

        const target = 'girardi.elite@gmail.com';
        const user = res.rows.find(u => u.email.toLowerCase() === target.toLowerCase());

        if (user) {
            console.log(`Found ${target}. Current role: ${user.role}`);
            if (user.role !== 'admin') {
                console.log("Updating to admin...");
                await pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [user.email]);
                console.log("Update complete.");
            } else {
                console.log("Already admin.");
            }
        } else {
            console.log(`${target} NOT found.`);
        }
    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        await pool.end();
    }
}

checkUsers();
