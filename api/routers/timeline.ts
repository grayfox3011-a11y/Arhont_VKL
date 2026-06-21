import { z } from "zod";
import { getDb } from "../queries/connection";
import { timelineEvents } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";

export const timelineRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          century: z.number().optional(),
          category: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      let query = db
        .select()
        .from(timelineEvents)
        .orderBy(asc(timelineEvents.year));

      if (input?.century) {
        const startYear = (input.century - 1) * 100 + 1;
        const endYear = input.century * 100;
        // Filter in JS since we need range
        const all = await query;
        return all.filter(
          (e) => e.year >= startYear && e.year <= endYear &&
            (!input.category || e.category === input.category)
        );
      }

      const all = await query;
      if (input?.category) {
        return all.filter((e) => e.category === input.category);
      }
      return all;
    }),

  create: adminQuery
    .input(
      z.object({
        year: z.number(),
        title: z.string().min(1),
        titleBe: z.string().optional(),
        titleEn: z.string().optional(),
        description: z.string().min(1),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        category: z.enum(["battle", "diplomacy", "law", "culture"]),
        relatedHeroId: z.number().optional(),
        relatedBattleId: z.number().optional(),
        icon: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      return db.insert(timelineEvents).values(input);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        year: z.number().optional(),
        title: z.string().optional(),
        titleBe: z.string().optional(),
        titleEn: z.string().optional(),
        description: z.string().optional(),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        category: z.enum(["battle", "diplomacy", "law", "culture"]).optional(),
        relatedHeroId: z.number().optional(),
        relatedBattleId: z.number().optional(),
        icon: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = await getDb();
      return db.update(timelineEvents).set(data).where(eq(timelineEvents.id, id));
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(timelineEvents).where(eq(timelineEvents.id, input.id));
      return { success: true };
    }),
});
