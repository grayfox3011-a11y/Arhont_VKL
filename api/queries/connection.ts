import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { Pool } from "pg";
import Database from "better-sqlite3";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

// Тип для единого интерфейса БД
type DbInstance = ReturnType<typeof drizzle<typeof fullSchema>>;

let instance: DbInstance;

export function getDb(): DbInstance {
  if (!instance) {
    const dbUrl = env.databaseUrl;

    // Если URL начинается с postgres:// — используем PostgreSQL
    if (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://")) {
      console.log("[DB] Connecting to PostgreSQL...");
      const pool = new Pool({
        connectionString: dbUrl,
        ssl: { rejectUnauthorized: false },
      });
      instance = drizzle(pool, { schema: fullSchema });
    }
    // Если URL начинается с file: или .db — используем SQLite
    else if (dbUrl.startsWith("file:") || dbUrl.endsWith(".db")) {
      console.log("[DB] Connecting to SQLite...");
      const sqlitePath = dbUrl.replace("file:", "");
      const sqlite = new Database(sqlitePath);
      instance = drizzleSqlite(sqlite, { schema: fullSchema }) as unknown as DbInstance;
    }
    else {
      throw new Error(`Unsupported database URL: ${dbUrl}`);
    }
  }
  return instance;
}