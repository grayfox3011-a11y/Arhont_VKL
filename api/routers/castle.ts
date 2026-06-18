import { z } from "zod";
import { getDb } from "../queries/connection";
import { castles } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";

export const castleRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(castles).orderBy(asc(castles.orderIdx));
  }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(castles)
        .where(eq(castles.id, input.id))
        .limit(1);
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        nameBe: z.string().optional(),
        nameEn: z.string().optional(),
        location: z.string().min(1),
        locationBe: z.string().optional(),
        locationEn: z.string().optional(),
        description: z.string().min(1),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        yearBuilt: z.string().optional(),
        owners: z.string().optional(),
        ownersBe: z.string().optional(),
        ownersEn: z.string().optional(),
        defenseSystem: z.string().optional(),
        defenseSystemBe: z.string().optional(),
        defenseSystemEn: z.string().optional(),
        imageUrl: z.string().optional(),
        gallery: z.string().optional(),
        orderIdx: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      return db.insert(castles).values(input);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        nameBe: z.string().optional(),
        nameEn: z.string().optional(),
        location: z.string().optional(),
        locationBe: z.string().optional(),
        locationEn: z.string().optional(),
        description: z.string().optional(),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        yearBuilt: z.string().optional(),
        owners: z.string().optional(),
        ownersBe: z.string().optional(),
        ownersEn: z.string().optional(),
        defenseSystem: z.string().optional(),
        defenseSystemBe: z.string().optional(),
        defenseSystemEn: z.string().optional(),
        imageUrl: z.string().optional(),
        gallery: z.string().optional(),
        orderIdx: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();
      return db.update(castles).set(data).where(eq(castles.id, id));
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(castles).where(eq(castles.id, input.id));
      return { success: true };
    }),
});
