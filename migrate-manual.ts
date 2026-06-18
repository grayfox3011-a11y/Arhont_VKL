import { getDb } from "./api/queries/connection";
import fs from "fs";

async function main() {
  const db = getDb();
  
  // Читаем SQL-файл миграции
  const sql = fs.readFileSync("./db/migrations/0000_early_rogue.sql", "utf8");
  
  // Разбиваем на отдельные команды (по statement-breakpoint)
  const statements = sql
    .split("--> statement-breakpoint")
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  for (const stmt of statements) {
    try {
      await db.execute(stmt);
      console.log("✓ Applied:", stmt.substring(0, 60) + "...");
    } catch (e: any) {
      console.error("✗ Failed:", stmt.substring(0, 60) + "...");
      console.error("  Error:", e.message);
    }
  }
  
  console.log("\nDone! Check tables:");
  const tables = await db.execute("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
  console.log(tables.rows.map((r: any) => r.tablename));
}

main();