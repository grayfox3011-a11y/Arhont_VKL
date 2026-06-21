import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

export function createPostgresConnection(dbUrl: string) {
  console.log("[DB] Connecting to PostgreSQL...");
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });
  return drizzle(pool, { schema: fullSchema });
}