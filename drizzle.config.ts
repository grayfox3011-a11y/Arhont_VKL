import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { resolve } from "path";

export default defineConfig({
  schema: resolve("app/db/schema.ts"),
  out: resolve("app/db/migrations"),
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});