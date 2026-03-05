const { Client } = require('pg');
const fs = require('fs');

const connectionString = "postgresql://postgres:e347b46720637d00cfcb96d2d5d0753f@62.171.145.215:5432/kogna_develop";
const logFile = 'all_users_log.txt';

function log(msg) {
    fs.appendFileSync(logFile, msg + '\n');
}

async function listUsers() {
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        const res = await client.query('SELECT id, email, role, name FROM users');
        log('Users in the database:');
        res.rows.forEach(row => log(`${row.name} (${row.email}): ${row.role}`));

    } catch (err) {
        log('Error: ' + err.stack);
    } finally {
        await client.end();
    }
}

listUsers();
