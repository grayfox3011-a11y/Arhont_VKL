import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",  // ← измени с mysql на postgresql
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});