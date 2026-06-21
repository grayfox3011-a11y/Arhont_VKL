import { z } from "zod";
import { getDb } from "../queries/connection";
import { media } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";

export const mediaRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          type: z.string().optional(),
          category: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      const all = await db.select().from(media).orderBy(asc(media.createdAt));
      if (!input) return all;
      return all.filter((m) => {
        if (input.type && m.type !== input.type) return false;
        if (input.category && m.category !== input.category) return false;
        return true;
      });
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const result = await db
        .select()
        .from(media)
        .where(eq(media.id, input.id))
        .limit(1);
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        titleBe: z.string().optional(),
        titleEn: z.string().optional(),
        description: z.string().optional(),
        descriptionBe: z.string().optional(),
        descriptionEn: z.string().optional(),
        type: z.enum(["image", "video", "audio"]),
        url: z.string().min(1),
        thumbnailUrl: z.string().optional(),
        category: z.enum(["artifact", "armor", "weapon", "coin", "reconstruction", "ballad"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      return db.insert(media).values(input);
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
        type: z.enum(["image", "video", "audio"]).optional(),
        url: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        category: z.enum(["artifact", "armor", "weapon", "coin", "reconstruction", "ballad"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = await getDb();
      return db.update(media).set(data).where(eq(media.id, id));
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(media).where(eq(media.id, input.id));
      return { success: true };
    }),
});
