import { z } from "zod";
import { getDb } from "../queries/connection";
import { battles } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";

export const battleRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = await getDb();
    return db.select().from(battles).orderBy(asc(battles.orderIdx));
  }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const result = await db
        .select()
        .from(battles)
        .where(eq(battles.id, input.id))
        .limit(1);
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        nameBe: z.string().optional(),
        nameEn: z.string().optional(),
        year: z.number(),
        date: z.string().optional(),
        location: z.string().min(1),
        locationBe: z.string().optional(),
        locationEn: z.string().optional(),
        description: z.string().min(1),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        tactics: z.string().min(1),
        tacticsBe: z.string().optional(),
        tacticsEn: z.string().optional(),
        result: z.string().min(1),
        resultBe: z.string().optional(),
        resultEn: z.string().optional(),
        belligerents: z.string().min(1),
        belligerentsBe: z.string().optional(),
        belligerentsEn: z.string().optional(),
        imageUrl: z.string().optional(),
        orderIdx: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      return db.insert(battles).values(input);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        nameBe: z.string().optional(),
        nameEn: z.string().optional(),
        year: z.number().optional(),
        date: z.string().optional(),
        location: z.string().optional(),
        locationBe: z.string().optional(),
        locationEn: z.string().optional(),
        description: z.string().optional(),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        tactics: z.string().optional(),
        tacticsBe: z.string().optional(),
        tacticsEn: z.string().optional(),
        result: z.string().optional(),
        resultBe: z.string().optional(),
        resultEn: z.string().optional(),
        belligerents: z.string().optional(),
        belligerentsBe: z.string().optional(),
        belligerentsEn: z.string().optional(),
        imageUrl: z.string().optional(),
        orderIdx: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = await getDb();
      return db.update(battles).set(data).where(eq(battles.id, id));
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(battles).where(eq(battles.id, input.id));
      return { success: true };
    }),
});
