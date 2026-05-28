import {
  pgTable,
  uuid,
  smallint,
  timestamp,
  text,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { books } from "./content";
import { profiles, anonSessions } from "./identity";

export const readerSessions = pgTable(
  "reader_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id").references(() => profiles.id),
    anonSessionId: uuid("anon_session_id").references(() => anonSessions.id),
    bookId: uuid("book_id")
      .references(() => books.id)
      .notNull(),
    startedAt: timestamp("started_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "reader_session_owner_check",
      sql`(${table.profileId} IS NOT NULL AND ${table.anonSessionId} IS NULL) OR (${table.profileId} IS NULL AND ${table.anonSessionId} IS NOT NULL)`,
    ),
  ],
);

export const chapterProgress = pgTable("chapter_progress", {
  id: uuid("id").defaultRandom().primaryKey(),
  readerSessionId: uuid("reader_session_id")
    .references(() => readerSessions.id)
    .notNull(),
  chapterId: uuid("chapter_id").notNull(),
  percentComplete: smallint("percent_complete").notNull().default(0),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  deviceHint: text("device_hint"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
