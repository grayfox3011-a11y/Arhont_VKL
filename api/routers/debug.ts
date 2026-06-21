import { getDb } from "../queries/connection";
import { createRouter, publicQuery } from "../middleware";

export const debugRouter = createRouter({
  checkDb: publicQuery.query(async () => {
    const db = getDb();
    
    try {
      const tables = await db.execute(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
      );
      
      const heroesCount = await db.execute("SELECT COUNT(*) as count FROM heroes");
      const battlesCount = await db.execute("SELECT COUNT(*) as count FROM battles");
      const castlesCount = await db.execute("SELECT COUNT(*) as count FROM castles");
      
      return {
        databaseUrl: process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':***@'),
        tables: tables.rows.map((r: any) => r.tablename),
        heroesCount: heroesCount.rows[0]?.count,
        battlesCount: battlesCount.rows[0]?.count,
        castlesCount: castlesCount.rows[0]?.count,
      };
    } catch (e: any) {
      return {
        error: e.message,
        databaseUrl: process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':***@'),
      };
    }
  }),
  
  seed: publicQuery.query(async () => {
    // Временно запускаем сид
    const { execSync } = await import("child_process");
    try {
      execSync("npx tsx db/seed.ts", { stdio: "pipe" });
      return { success: true, message: "Seed executed" };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }),
});