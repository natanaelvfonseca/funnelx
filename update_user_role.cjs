const { Client } = require('pg');
const fs = require('fs');

const connectionString = "postgresql://postgres:e347b46720637d00cfcb96d2d5d0753f@62.171.145.215:5432/kogna_develop";
const logFile = 'update_log.txt';

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function updateRole() {
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        log('Connected to the database.');

        const email = 'girardi.elite@gmail.com';
        const newRole = 'admin';

        // Check if user exists
        const res = await client.query('SELECT id, email, role FROM users WHERE email = $1', [email]);

        if (res.rows.length === 0) {
            log(`User with email ${email} not found.`);
            return;
        }

        const user = res.rows[0];
        log(`Found user: ${JSON.stringify(user)}`);

        // Update role
        const updateRes = await client.query('UPDATE users SET role = $1 WHERE email = $2 RETURNING id, email, role', [newRole, email]);

        if (updateRes.rows.length > 0) {
            log(`Successfully updated user role to: ${updateRes.rows[0].role}`);
        } else {
            log('Failed to update user role.');
        }

    } catch (err) {
        log('Error executing query: ' + err.stack);
    } finally {
        await client.end();
    }
}

updateRole();
