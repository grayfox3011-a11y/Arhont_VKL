import { pgTable, serial, varchar, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

// ─── Enums (PostgreSQL uses text with check constraint) ──────────
const userRoleEnum = ["user", "admin"] as const;
const localRoleEnum = ["user", "admin"] as const;
const eventCategoryEnum = ["battle", "diplomacy", "law", "culture"] as const;
const manuscriptCategoryEnum = ["statute", "metric", "chronicle", "privilege"] as const;
const mediaTypeEnum = ["image", "video", "audio"] as const;
const mediaCategoryEnum = ["artifact", "armor", "weapon", "coin", "reconstruction", "ballad"] as const;
const chatRoleEnum = ["user", "assistant"] as const;

// ─── Users (OAuth) ────────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("union_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: varchar("role", { length: 10 }).default("user").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  lastSignInAt: timestamp("last_sign_in_at", { mode: "date" }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Local Users (Username/Password Auth) ─────────────────────────
export const localUsers = pgTable("local_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  displayName: varchar("display_name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 10 }).default("user").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type LocalUser = typeof localUsers.$inferSelect;
export type InsertLocalUser = typeof localUsers.$inferInsert;

// ─── Heroes (Biographies) ─────────────────────────────────────────
export const heroes = pgTable("heroes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameBe: varchar("name_be", { length: 255 }),
  nameEn: varchar("name_en", { length: 255 }),
  title: varchar("title", { length: 255 }).notNull(),
  titleBe: varchar("title_be", { length: 255 }),
  titleEn: varchar("title_en", { length: 255 }),
  years: varchar("years", { length: 100 }).notNull(),
  bio: text("bio").notNull(),
  bioBe: text("bio_be"),
  bioEn: text("bio_en"),
  achievements: text("achievements").notNull(),
  achievementsBe: text("achievements_be"),
  achievementsEn: text("achievements_en"),
  battles: text("battles"),
  heraldry: text("heraldry"),
  imageUrl: varchar("image_url", { length: 500 }),
  orderIdx: integer("order_idx").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type Hero = typeof heroes.$inferSelect;

// ─── Battles ──────────────────────────────────────────────────────
export const battles = pgTable("battles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameBe: varchar("name_be", { length: 255 }),
  nameEn: varchar("name_en", { length: 255 }),
  year: integer("year").notNull(),
  date: varchar("date", { length: 100 }),
  location: varchar("location", { length: 255 }).notNull(),
  locationBe: varchar("location_be", { length: 255 }),
  locationEn: varchar("location_en", { length: 255 }),
  description: text("description").notNull(),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  tactics: text("tactics").notNull(),
  tacticsBe: text("tactics_be"),
  tacticsEn: text("tactics_en"),
  result: text("result").notNull(),
  resultBe: text("result_be"),
  resultEn: text("result_en"),
  belligerents: text("belligerents").notNull(),
  belligerentsBe: text("belligerents_be"),
  belligerentsEn: text("belligerents_en"),
  imageUrl: varchar("image_url", { length: 500 }),
  orderIdx: integer("order_idx").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type Battle = typeof battles.$inferSelect;

// ─── Timeline Events ──────────────────────────────────────────────
export const timelineEvents = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  titleBe: varchar("title_be", { length: 255 }),
  titleEn: varchar("title_en", { length: 255 }),
  description: text("description").notNull(),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  category: varchar("category", { length: 20 }).notNull(),
  relatedHeroId: integer("related_hero_id"),
  relatedBattleId: integer("related_battle_id"),
  icon: varchar("icon", { length: 50 }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type TimelineEvent = typeof timelineEvents.$inferSelect;

// ─── Manuscripts ──────────────────────────────────────────────────
export const manuscripts = pgTable("manuscripts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleBe: varchar("title_be", { length: 255 }),
  titleEn: varchar("title_en", { length: 255 }),
  description: text("description").notNull(),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  originalText: text("original_text"),
  translatedText: text("translated_text").notNull(),
  translatedTextBe: text("translated_text_be"),
  translatedTextEn: text("translated_text_en"),
  imageUrl: varchar("image_url", { length: 500 }),
  year: integer("year"),
  author: varchar("author", { length: 255 }),
  category: varchar("category", { length: 20 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type Manuscript = typeof manuscripts.$inferSelect;

// ─── Castles ──────────────────────────────────────────────────────
export const castles = pgTable("castles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameBe: varchar("name_be", { length: 255 }),
  nameEn: varchar("name_en", { length: 255 }),
  location: varchar("location", { length: 255 }).notNull(),
  locationBe: varchar("location_be", { length: 255 }),
  locationEn: varchar("location_en", { length: 255 }),
  description: text("description").notNull(),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  yearBuilt: varchar("year_built", { length: 100 }),
  owners: text("owners"),
  ownersBe: text("owners_be"),
  ownersEn: text("owners_en"),
  defenseSystem: text("defense_system"),
  defenseSystemBe: text("defense_system_be"),
  defenseSystemEn: text("defense_system_en"),
  imageUrl: varchar("image_url", { length: 500 }),
  gallery: text("gallery"),
  orderIdx: integer("order_idx").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type Castle = typeof castles.$inferSelect;

// ─── Media ────────────────────────────────────────────────────────
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleBe: varchar("title_be", { length: 255 }),
  titleEn: varchar("title_en", { length: 255 }),
  description: text("description"),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  type: varchar("type", { length: 10 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  category: varchar("category", { length: 20 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type Media = typeof media.$inferSelect;

// ─── Contact Messages ─────────────────────────────────────────────
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;

// ─── Chat Messages (AI Assistant) ─────────────────────────────────
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  role: varchar("role", { length: 10 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;