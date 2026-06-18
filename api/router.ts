import { authRouter } from "./auth-router";
import { localAuthRouter } from "./routers/localAuth";
import { heroRouter } from "./routers/hero";
import { battleRouter } from "./routers/battle";
import { timelineRouter } from "./routers/timeline";
import { manuscriptRouter } from "./routers/manuscript";
import { castleRouter } from "./routers/castle";
import { mediaRouter } from "./routers/media";
import { contactRouter } from "./routers/contact";
import { adminRouter } from "./routers/admin";
import { chatRouter } from "./routers/chat";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  hero: heroRouter,
  battle: battleRouter,
  timeline: timelineRouter,
  manuscript: manuscriptRouter,
  castle: castleRouter,
  media: mediaRouter,
  contact: contactRouter,
  admin: adminRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
