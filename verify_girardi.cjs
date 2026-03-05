
const { Client } = require('pg');
const connectionString = "postgresql://postgres:e347b46720637d00cfcb96d2d5d0753f@62.171.145.215:5432/kogna_develop";

async function verify() {
    const client = new Client({ connectionString });
    try {
        await client.connect();
        const res = await client.query("SELECT email, role FROM users WHERE email = 'girardi.elite@gmail.com'");
        console.log('Verification Results:');
        console.table(res.rows);
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}
verify();
