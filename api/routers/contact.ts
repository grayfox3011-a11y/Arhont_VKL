import { z } from "zod";
import { getDb } from "../queries/connection";
import { contactMessages } from "@db/schema";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        subject: z.string().min(1),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      return db.insert(contactMessages).values(input);
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }),

  markRead: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      return db
        .update(contactMessages)
        .set({ isRead: true })
        .where(eq(contactMessages.id, input.id));
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(contactMessages).where(eq(contactMessages.id, input.id));
      return { success: true };
    }),
});
