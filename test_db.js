const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({});
pool.query("SELECT id, name, phone, status FROM leads WHERE phone LIKE '%554791935149%'", (err, res) => {
  if (err) console.error(err);
  else console.log(res.rows);
  process.exit(0);
});
