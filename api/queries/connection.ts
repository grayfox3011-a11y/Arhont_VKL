import { env } from "../lib/env";

type DbInstance = any;
let instance: DbInstance;

export async function getDb(): Promise<DbInstance> {
  if (!instance) {
    const dbUrl = env.databaseUrl;

    if (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://")) {
      const { createPostgresConnection } = await import("./connection-postgres");
      instance = createPostgresConnection(dbUrl);
    }
    else if (dbUrl.startsWith("file:") || dbUrl.endsWith(".db")) {
      const { createSQLiteConnection } = await import("./connection-sqlite");
      instance = createSQLiteConnection(dbUrl);
    }
    else {
      throw new Error(`Unsupported database URL: ${dbUrl}`);
    }
  }
  return instance;
}