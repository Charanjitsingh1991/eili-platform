import {
  pgTable,
  uuid,
  text,
  smallint,
  date,
  numeric,
  timestamp,
  jsonb,
  pgEnum,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { profiles, anonSessions } from "./identity";

export const scorecardBandEnum = pgEnum("scorecard_band", [
  "low",
  "moderate",
  "strong",
]);

export const plannerDrafts = pgTable(
  "planner_drafts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id").references(() => profiles.id),
    anonSessionId: uuid("anon_session_id").references(() => anonSessions.id),
    month: date("month").notNull(),
    incomeMonthly: numeric("income_monthly", {
      precision: 12,
      scale: 2,
    }).notNull(),
    essentials: numeric("essentials", { precision: 12, scale: 2 }).notNull(),
    otherExpenses: numeric("other_expenses", {
      precision: 12,
      scale: 2,
    }).notNull(),
    savings: numeric("savings", { precision: 12, scale: 2 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "planner_owner_check",
      sql`(${table.profileId} IS NOT NULL AND ${table.anonSessionId} IS NULL) OR (${table.profileId} IS NULL AND ${table.anonSessionId} IS NOT NULL)`,
    ),
  ],
);

export const scorecards = pgTable(
  "scorecards",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id").references(() => profiles.id),
    anonSessionId: uuid("anon_session_id").references(() => anonSessions.id),
    month: date("month").notNull(),
    pillars: jsonb("pillars")
      .$type<{
        income_clarity: number;
        expense_control: number;
        savings: number;
        protection: number;
        discipline: number;
      }>()
      .notNull(),
    total: smallint("total").notNull(),
    interpretationBand: scorecardBandEnum("interpretation_band").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "scorecard_owner_check",
      sql`(${table.profileId} IS NOT NULL AND ${table.anonSessionId} IS NULL) OR (${table.profileId} IS NULL AND ${table.anonSessionId} IS NOT NULL)`,
    ),
  ],
);

export const resetProgress = pgTable(
  "reset_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id").references(() => profiles.id),
    anonSessionId: uuid("anon_session_id").references(() => anonSessions.id),
    week: smallint("week").notNull(),
    itemsCompleted: jsonb("items_completed")
      .$type<Record<string, boolean>>()
      .notNull()
      .default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "reset_owner_check",
      sql`(${table.profileId} IS NOT NULL AND ${table.anonSessionId} IS NULL) OR (${table.profileId} IS NULL AND ${table.anonSessionId} IS NOT NULL)`,
    ),
  ],
);
