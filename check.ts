import { getDb } from "./api/queries/connection";

async function main() {
  const db = getDb();
  
  try {
    const result = await db.execute("SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'heroes'");
    console.log("Heroes table exists:", result.rows);
  } catch (e) {
    console.error("Error checking heroes:", e);
  }
  
  try {
    const migrations = await db.execute("SELECT * FROM drizzle.__drizzle_migrations");
    console.log("Migrations:", migrations.rows);
  } catch (e) {
    console.log("No migrations table found");
  }
}
main();