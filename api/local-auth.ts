import { SignJWT, jwtVerify } from "jose";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = new TextEncoder().encode(
  process.env.APP_SECRET || "local-auth-secret-key-change-me"
);

export async function createLocalToken(userId: number): Promise<string> {
  return new SignJWT({ sub: String(userId), type: "local" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyLocalToken(headers: Headers) {
  try {
    const authHeader = headers.get("x-local-auth-token");
    if (!authHeader) return null;

    const { payload } = await jwtVerify(authHeader, JWT_SECRET, {
      clockTolerance: 60,
    });

    const userId = Number(payload.sub);
    if (!userId) return null;

    const db = await getDb();  // <-- ИСПРАВЛЕНО: добавлен await
    const user = await db
      .select()
      .from(localUsers)
      .where(eq(localUsers.id, userId))
      .limit(1);

    return user[0] || null;
  } catch {
    return null;
  }
}