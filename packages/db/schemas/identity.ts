import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("user_category", [
  "household",
  "student",
]);

export const literacyAssessmentEnum = pgEnum("literacy_assessment", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().unique(),
  displayName: text("display_name"),
  countryIso2: text("country_iso2"),
  category: categoryEnum("category"),
  literacySelfAssessment: literacyAssessmentEnum("literacy_self_assessment"),
  onboardingCompletedAt: timestamp("onboarding_completed_at", {
    withTimezone: true,
  }),
  consents: jsonb("consents").$type<{
    terms?: boolean;
    termsVersion?: string;
    marketing?: boolean;
    research?: boolean;
  }>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const anonSessions = pgTable("anon_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  cookieId: text("cookie_id").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  mergedIntoProfileId: uuid("merged_into_profile_id").references(
    () => profiles.id,
  ),
});
