import { z } from "zod";
import { getDb } from "../queries/connection";
import { manuscripts } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";

export const manuscriptRouter = createRouter({
  list: publicQuery
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const all = await db.select().from(manuscripts).orderBy(asc(manuscripts.year));
      if (input?.category) {
        return all.filter((m) => m.category === input.category);
      }
      return all;
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(manuscripts)
        .where(eq(manuscripts.id, input.id))
        .limit(1);
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        titleBe: z.string().optional(),
        titleEn: z.string().optional(),
        description: z.string().min(1),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        originalText: z.string().optional(),
        translatedText: z.string().min(1),
        translatedTextBe: z.string().optional(),
        translatedTextEn: z.string().optional(),
        imageUrl: z.string().optional(),
        year: z.number().optional(),
        author: z.string().optional(),
        category: z.enum(["statute", "metric", "chronicle", "privilege"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      return db.insert(manuscripts).values(input);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        titleBe: z.string().optional(),
        titleEn: z.string().optional(),
        description: z.string().optional(),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        originalText: z.string().optional(),
        translatedText: z.string().optional(),
        translatedTextBe: z.string().optional(),
        translatedTextEn: z.string().optional(),
        imageUrl: z.string().optional(),
        year: z.number().optional(),
        author: z.string().optional(),
        category: z.enum(["statute", "metric", "chronicle", "privilege"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();
      return db.update(manuscripts).set(data).where(eq(manuscripts.id, id));
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(manuscripts).where(eq(manuscripts.id, input.id));
      return { success: true };
    }),
});
