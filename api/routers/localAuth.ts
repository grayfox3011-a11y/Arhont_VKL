import { z } from "zod";
import bcrypt from "bcryptjs";
import { getDb } from "../queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import { createLocalToken } from "../local-auth";
import { createRouter, publicQuery } from "../middleware";
import { TRPCError } from "@trpc/server";

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(50),
        displayName: z.string().min(1).max(100).optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).max(100),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();

      // Check if username already exists
      const existing = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 10);

      await db.insert(localUsers).values({
        username: input.username,
        displayName: input.displayName || input.username,
        email: input.email,
        passwordHash,
      });

      return { success: true };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();

      const users = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      const user = users[0];
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      const token = await createLocalToken(user.id);

      return {
        token,
        user: {
          id: user.id,
          name: user.displayName || user.username,
          username: user.username,
          role: user.role,
        },
      };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const authHeader = ctx.req.headers.get("x-local-auth-token");
    if (!authHeader) return null;

    const { verifyLocalToken } = await import("../local-auth");
    const user = await verifyLocalToken(ctx.req.headers);
    if (!user) return null;

    return {
      id: user.id,
      name: user.displayName || user.username,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      role: user.role,
    };
  }),
});
