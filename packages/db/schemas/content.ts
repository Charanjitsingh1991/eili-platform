import {
  pgTable,
  uuid,
  text,
  smallint,
  date,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const bookStatusEnum = pgEnum("book_status", [
  "draft",
  "published",
  "archived",
]);

export const literacyLevelEnum = pgEnum("literacy_level", [
  "foundational",
  "developing",
  "structural",
  "institutional",
]);

export const series = pgTable("series", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const themes = pgTable("themes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const levels = pgTable("levels", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ordering: smallint("ordering").notNull(),
});

export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  seriesId: uuid("series_id").references(() => series.id),
  readingLevel: smallint("reading_level").notNull(),
  literacyLevel: literacyLevelEnum("literacy_level").notNull(),
  isbn: text("isbn"),
  publishedAt: date("published_at"),
  coverUrl: text("cover_url"),
  thesis: text("thesis"),
  formats: jsonb("formats").$type<{
    print?: string;
    pdf?: string;
    online?: boolean;
    audio?: string;
  }>(),
  citationApa: text("citation_apa"),
  citationChicago: text("citation_chicago"),
  citationMla: text("citation_mla"),
  status: bookStatusEnum("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const chapters = pgTable("chapters", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookId: uuid("book_id")
    .references(() => books.id)
    .notNull(),
  ordering: smallint("ordering").notNull(),
  title: text("title").notNull(),
  bodyMarkdown: text("body_markdown").notNull(),
  bodyHtmlCached: text("body_html_cached"),
  wordCount: smallint("word_count"),
  estimatedReadMinutes: smallint("estimated_read_minutes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
