import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

// ─── Enums (SQLite uses text with enum constraint) ───────────────
const userRoleEnum = ["user", "admin"] as const;
const localRoleEnum = ["user", "admin"] as const;
const eventCategoryEnum = ["battle", "diplomacy", "law", "culture"] as const;
const manuscriptCategoryEnum = ["statute", "metric", "chronicle", "privilege"] as const;
const mediaTypeEnum = ["image", "video", "audio"] as const;
const mediaCategoryEnum = ["artifact", "armor", "weapon", "coin", "reconstruction", "ballad"] as const;
const chatRoleEnum = ["user", "assistant"] as const;

// ─── Users (OAuth) ────────────────────────────────────────────────
export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  unionId: text("union_id", { length: 255 }).notNull().unique(),
  name: text("name", { length: 255 }),
  email: text("email", { length: 320 }),
  avatar: text("avatar"),
  role: text("role", { enum: userRoleEnum }).default("user").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  lastSignInAt: integer("last_sign_in_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Local Users (Username/Password Auth) ─────────────────────────
export const localUsers = sqliteTable("local_users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text("username", { length: 255 }).notNull().unique(),
  displayName: text("display_name", { length: 255 }),
  email: text("email", { length: 255 }).unique(),
  passwordHash: text("password_hash", { length: 255 }).notNull(),
  role: text("role", { enum: localRoleEnum }).default("user").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type LocalUser = typeof localUsers.$inferSelect;
export type InsertLocalUser = typeof localUsers.$inferInsert;

// ─── Heroes (Biographies) ─────────────────────────────────────────
export const heroes = sqliteTable("heroes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  nameBe: text("name_be", { length: 255 }),
  nameEn: text("name_en", { length: 255 }),
  title: text("title", { length: 255 }).notNull(),
  titleBe: text("title_be", { length: 255 }),
  titleEn: text("title_en", { length: 255 }),
  years: text("years", { length: 100 }).notNull(),
  bio: text("bio").notNull(),
  bioBe: text("bio_be"),
  bioEn: text("bio_en"),
  achievements: text("achievements").notNull(),
  achievementsBe: text("achievements_be"),
  achievementsEn: text("achievements_en"),
  battles: text("battles").notNull(),
  heraldry: text("heraldry"),
  imageUrl: text("image_url", { length: 500 }),
  orderIdx: integer("order_idx", { mode: "number" }).default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type Hero = typeof heroes.$inferSelect;

// ─── Battles ──────────────────────────────────────────────────────
export const battles = sqliteTable("battles", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  nameBe: text("name_be", { length: 255 }),
  nameEn: text("name_en", { length: 255 }),
  year: integer("year", { mode: "number" }).notNull(),
  date: text("date", { length: 100 }),
  location: text("location", { length: 255 }).notNull(),
  locationBe: text("location_be", { length: 255 }),
  locationEn: text("location_en", { length: 255 }),
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
  imageUrl: text("image_url", { length: 500 }),
  orderIdx: integer("order_idx", { mode: "number" }).default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type Battle = typeof battles.$inferSelect;

// ─── Timeline Events ──────────────────────────────────────────────
export const timelineEvents = sqliteTable("timeline_events", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  year: integer("year", { mode: "number" }).notNull(),
  title: text("title", { length: 255 }).notNull(),
  titleBe: text("title_be", { length: 255 }),
  titleEn: text("title_en", { length: 255 }),
  description: text("description").notNull(),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  category: text("category", { enum: eventCategoryEnum }).notNull(),
  relatedHeroId: integer("related_hero_id", { mode: "number" }),
  relatedBattleId: integer("related_battle_id", { mode: "number" }),
  icon: text("icon", { length: 50 }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type TimelineEvent = typeof timelineEvents.$inferSelect;

// ─── Manuscripts ──────────────────────────────────────────────────
export const manuscripts = sqliteTable("manuscripts", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title", { length: 255 }).notNull(),
  titleBe: text("title_be", { length: 255 }),
  titleEn: text("title_en", { length: 255 }),
  description: text("description").notNull(),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  originalText: text("original_text"),
  translatedText: text("translated_text").notNull(),
  translatedTextBe: text("translated_text_be"),
  translatedTextEn: text("translated_text_en"),
  imageUrl: text("image_url", { length: 500 }),
  year: integer("year", { mode: "number" }),
  author: text("author", { length: 255 }),
  category: text("category", { enum: manuscriptCategoryEnum }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type Manuscript = typeof manuscripts.$inferSelect;

// ─── Castles ──────────────────────────────────────────────────────
export const castles = sqliteTable("castles", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  nameBe: text("name_be", { length: 255 }),
  nameEn: text("name_en", { length: 255 }),
  location: text("location", { length: 255 }).notNull(),
  locationBe: text("location_be", { length: 255 }),
  locationEn: text("location_en", { length: 255 }),
  description: text("description").notNull(),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  yearBuilt: text("year_built", { length: 100 }),
  owners: text("owners"),
  ownersBe: text("owners_be"),
  ownersEn: text("owners_en"),
  defenseSystem: text("defense_system"),
  defenseSystemBe: text("defense_system_be"),
  defenseSystemEn: text("defense_system_en"),
  imageUrl: text("image_url", { length: 500 }),
  gallery: text("gallery"),
  orderIdx: integer("order_idx", { mode: "number" }).default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type Castle = typeof castles.$inferSelect;

// ─── Media ────────────────────────────────────────────────────────
export const media = sqliteTable("media", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title", { length: 255 }).notNull(),
  titleBe: text("title_be", { length: 255 }),
  titleEn: text("title_en", { length: 255 }),
  description: text("description"),
  descriptionBe: text("description_be"),
  descriptionEn: text("description_en"),
  type: text("type", { enum: mediaTypeEnum }).notNull(),
  url: text("url", { length: 500 }).notNull(),
  thumbnailUrl: text("thumbnail_url", { length: 500 }),
  category: text("category", { enum: mediaCategoryEnum }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type Media = typeof media.$inferSelect;

// ─── Contact Messages ─────────────────────────────────────────────
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 255 }).notNull(),
  subject: text("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: integer("is_read", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;

// ─── Chat Messages (AI Assistant) ─────────────────────────────────
export const chatMessages = sqliteTable("chat_messages", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  sessionId: text("session_id", { length: 255 }).notNull(),
  role: text("role", { enum: chatRoleEnum }).notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;