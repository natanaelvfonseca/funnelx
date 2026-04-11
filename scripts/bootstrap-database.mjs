import "dotenv/config";
import pg from "pg";

const { Client } = pg;

function quoteSqlIdentifier(identifier) {
  const normalized = String(identifier || "").trim();

  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(normalized)) {
    throw new Error(`Invalid SQL identifier: ${identifier}`);
  }

  return `"${normalized}"`;
}

function getSchemaFromConnectionString(connectionValue) {
  if (!connectionValue) return null;

  try {
    const parsed = new URL(connectionValue);
    const schema = parsed.searchParams.get("schema");
    return schema ? schema.trim() : null;
  } catch (_) {
    return null;
  }
}

function shouldUseSsl(connectionValue) {
  return Boolean(
    connectionValue &&
      !connectionValue.includes("localhost") &&
      !connectionValue.includes("127.0.0.1") &&
      !connectionValue.includes("sslmode=disable") &&
      !connectionValue.includes("ssl=false") &&
      process.env.DB_SSL !== "false",
  );
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to prepare the FunnelX database.");
}

const schemaName =
  process.env.DATABASE_SCHEMA ||
  getSchemaFromConnectionString(process.env.PRISMA_DATABASE_URL) ||
  getSchemaFromConnectionString(process.env.DATABASE_URL) ||
  "funnelx";

const client = new Client({
  connectionString,
  application_name: process.env.APP_SLUG || "funnelx-bootstrap",
  ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : false,
});

try {
  await client.connect();
  await client.query(`CREATE SCHEMA IF NOT EXISTS ${quoteSqlIdentifier(schemaName)}`);
  await client.query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
  console.log(`Schema "${schemaName}" pronto para o FunnelX.`);
} finally {
  await client.end().catch(() => {});
}
