import { z } from "zod";
import { getDb } from "../queries/connection";
import {
  users,
  localUsers,
  heroes,
  battles,
  timelineEvents,
  manuscripts,
  castles,
  media,
  contactMessages,
} from "@db/schema";
import { eq, sql } from "drizzle-orm";
import { createRouter, adminQuery } from "../middleware";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = await getDb();

    const [heroCount] = await db.select({ count: sql<number>`count(*)` }).from(heroes);
    const [battleCount] = await db.select({ count: sql<number>`count(*)` }).from(battles);
    const [eventCount] = await db.select({ count: sql<number>`count(*)` }).from(timelineEvents);
    const [manuscriptCount] = await db.select({ count: sql<number>`count(*)` }).from(manuscripts);
    const [castleCount] = await db.select({ count: sql<number>`count(*)` }).from(castles);
    const [mediaCount] = await db.select({ count: sql<number>`count(*)` }).from(media);
    const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
    const [localUserCount] = await db.select({ count: sql<number>`count(*)` }).from(localUsers);
    const [messageCount] = await db.select({ count: sql<number>`count(*)` }).from(contactMessages);
    const [unreadCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages)
      .where(eq(contactMessages.isRead, false));

    return {
      heroes: heroCount.count,
      battles: battleCount.count,
      timelineEvents: eventCount.count,
      manuscripts: manuscriptCount.count,
      castles: castleCount.count,
      media: mediaCount.count,
      users: userCount.count + localUserCount.count,
      contactMessages: messageCount.count,
      unreadMessages: unreadCount.count,
    };
  }),

  users: adminQuery.query(async () => {
    const db = await getDb();
    const oauthUsers = await db.select().from(users);
    const local = await db.select({
      id: localUsers.id,
      username: localUsers.username,
      displayName: localUsers.displayName,
      email: localUsers.email,
      role: localUsers.role,
      createdAt: localUsers.createdAt,
    }).from(localUsers);

    return {
      oauth: oauthUsers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        authType: "oauth" as const,
      })),
      local: local.map((u) => ({
        id: u.id,
        name: u.displayName || u.username,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        authType: "local" as const,
      })),
    };
  }),

  updateUserRole: adminQuery
    .input(
      z.object({
        id: z.number(),
        authType: z.enum(["oauth", "local"]),
        role: z.enum(["user", "admin"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (input.authType === "oauth") {
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.id));
      } else {
        await db.update(localUsers).set({ role: input.role }).where(eq(localUsers.id, input.id));
      }
      return { success: true };
    }),
});
