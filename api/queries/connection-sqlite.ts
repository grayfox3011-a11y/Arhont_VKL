import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

export function createSQLiteConnection(dbUrl: string) {
  console.log("[DB] Connecting to SQLite...");
  const sqlitePath = dbUrl.replace("file:", "");
  const sqlite = new Database(sqlitePath);
  return drizzle(sqlite, { schema: fullSchema });
}