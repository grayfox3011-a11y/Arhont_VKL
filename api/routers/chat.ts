import { z } from "zod";
import { getDb } from "../queries/connection";
import { chatMessages } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery } from "../middleware";

export const chatRouter = createRouter({
  send: publicQuery
    .input(
      z.object({
        message: z.string().min(1).max(2000),
        sessionId: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Store user message
      await db.insert(chatMessages).values({
        sessionId: input.sessionId,
        role: "user",
        content: input.message,
      });

      // Get conversation history for context
      const history = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, input.sessionId))
        .orderBy(asc(chatMessages.createdAt))
        .limit(10);

      // Build system prompt
      const systemPrompt = `You are an expert historian specializing in the Grand Duchy of Lithuania (GDL, 13th-16th centuries), Belarusian chivalry, medieval warfare, and Eastern European history. You are knowledgeable about knights, battles, castles, manuscripts, and the Statutes of the GDL. Answer in the same language as the user's question. Be historically accurate, cite dates and names, be concise but thorough. Respond as a scholarly but accessible historian.`;

      // Build messages array
      const apiMessages = [
        { role: "system" as const, content: systemPrompt },
        ...history.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ];

      // Call AI service
      try {
        const response = await fetch("https://api.moonshot.cn/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.APP_SECRET}`,
          },
          body: JSON.stringify({
            model: "moonshot-v1-8k",
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 1500,
          }),
        });

        if (!response.ok) {
          throw new Error(`AI API error: ${response.status}`);
        }

        const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
        const assistantContent = data.choices?.[0]?.message?.content || "Извините, я не смог обработать ваш запрос.";

        // Store assistant response
        await db.insert(chatMessages).values({
          sessionId: input.sessionId,
          role: "assistant",
          content: assistantContent,
        });

        return { response: assistantContent };
      } catch {
        // Fallback response if AI service fails
        const fallback = "Прошу прощения, служба исторических консультаций временно недоступна. Попробуйте задать вопрос позже, и я с удовольствием расскажу вам о рыцарстве Великого Княжества Литовского.";

        await db.insert(chatMessages).values({
          sessionId: input.sessionId,
          role: "assistant",
          content: fallback,
        });

        return { response: fallback };
      }
    }),

  history: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, input.sessionId))
        .orderBy(asc(chatMessages.createdAt));
    }),
});
