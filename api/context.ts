import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { authenticateRequest } from "./kimi/auth";
import { verifyLocalToken } from "./local-auth";

export type UnifiedUser = {
  id: number;
  name: string;
  email?: string | null;
  avatar?: string | null;
  role: "user" | "admin";
  authType: "oauth" | "local";
};

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: UnifiedUser;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try OAuth first
  try {
    const oauthUser = await authenticateRequest(opts.req.headers);
    if (oauthUser) {
      ctx.user = {
        id: oauthUser.id,
        name: oauthUser.name || "User",
        email: oauthUser.email,
        avatar: oauthUser.avatar,
        role: (oauthUser.role as "user" | "admin") || "user",
        authType: "oauth",
      };
      return ctx;
    }
  } catch {
    // OAuth auth failed, try local
  }

  // Try local auth
  try {
    const localUser = await verifyLocalToken(opts.req.headers);
    if (localUser) {
      ctx.user = {
        id: localUser.id,
        name: localUser.displayName || localUser.username,
        email: localUser.email,
        avatar: null,
        role: (localUser.role as "user" | "admin") || "user",
        authType: "local",
      };
    }
  } catch {
    // Local auth also failed
  }

  return ctx;
}
