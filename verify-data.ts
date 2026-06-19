import { getDb } from "./app/api/queries/connection";

async function main() {
  const db = getDb();
  const heroes = await db.execute("SELECT COUNT(*) as count FROM heroes");
  console.log("Heroes count:", heroes.rows[0].count);
}
main();