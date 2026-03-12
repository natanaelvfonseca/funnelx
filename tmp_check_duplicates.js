require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const q = await pool.query("SELECT id, name, phone, status FROM leads WHERE phone LIKE '%554791935149%' OR phone LIKE '%4791935149%'");
  console.log("Leads encontrados:", q.rows);
  
  // se houver mais de um, vamos ver
  process.exit(0);
}

check().catch(e => {
  console.error(e);
  process.exit(1);
});
