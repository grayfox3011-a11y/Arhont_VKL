import { z } from "zod";
import { getDb } from "../queries/connection";
import { heroes } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";

export const heroRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(heroes).orderBy(asc(heroes.orderIdx));
  }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(heroes)
        .where(eq(heroes.id, input.id))
        .limit(1);
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        nameBe: z.string().optional(),
        nameEn: z.string().optional(),
        title: z.string().min(1),
        titleBe: z.string().optional(),
        titleEn: z.string().optional(),
        years: z.string().min(1),
        bio: z.string().min(1),
        bioBe: z.string().optional(),
        bioEn: z.string().optional(),
        achievements: z.string().min(1),
        achievementsBe: z.string().optional(),
        achievementsEn: z.string().optional(),
        battles: z.string().default(""),
        heraldry: z.string().optional(),
        imageUrl: z.string().optional(),
        orderIdx: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(heroes).values(input);
      return result;
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        nameBe: z.string().optional(),
        nameEn: z.string().optional(),
        title: z.string().optional(),
        titleBe: z.string().optional(),
        titleEn: z.string().optional(),
        years: z.string().optional(),
        bio: z.string().optional(),
        bioBe: z.string().optional(),
        bioEn: z.string().optional(),
        achievements: z.string().optional(),
        achievementsBe: z.string().optional(),
        achievementsEn: z.string().optional(),
        battles: z.string().default(""),
        heraldry: z.string().optional(),
        imageUrl: z.string().optional(),
        orderIdx: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();
      const result = await db.update(heroes).set(data).where(eq(heroes.id, id));
      return result;
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(heroes).where(eq(heroes.id, input.id));
      return { success: true };
    }),
});
