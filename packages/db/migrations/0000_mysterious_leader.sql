CREATE TYPE "public"."book_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."literacy_level" AS ENUM('foundational', 'developing', 'structural', 'institutional');--> statement-breakpoint
CREATE TYPE "public"."scorecard_band" AS ENUM('low', 'moderate', 'strong');--> statement-breakpoint
CREATE TYPE "public"."user_category" AS ENUM('household', 'student');--> statement-breakpoint
CREATE TYPE "public"."literacy_assessment" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"series_id" uuid,
	"reading_level" smallint NOT NULL,
	"literacy_level" "literacy_level" NOT NULL,
	"isbn" text,
	"published_at" date,
	"cover_url" text,
	"thesis" text,
	"formats" jsonb,
	"citation_apa" text,
	"citation_chicago" text,
	"citation_mla" text,
	"status" "book_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "books_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "chapters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_id" uuid NOT NULL,
	"ordering" smallint NOT NULL,
	"title" text NOT NULL,
	"body_markdown" text NOT NULL,
	"body_html_cached" text,
	"word_count" smallint,
	"estimated_read_minutes" smallint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "levels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"ordering" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "series_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "themes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "themes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "chapter_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reader_session_id" uuid NOT NULL,
	"chapter_id" uuid NOT NULL,
	"percent_complete" smallint DEFAULT 0 NOT NULL,
	"completed_at" timestamp with time zone,
	"device_hint" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reader_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid,
	"anon_session_id" uuid,
	"book_id" uuid NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reader_session_owner_check" CHECK (("reader_sessions"."profile_id" IS NOT NULL AND "reader_sessions"."anon_session_id" IS NULL) OR ("reader_sessions"."profile_id" IS NULL AND "reader_sessions"."anon_session_id" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "planner_drafts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid,
	"anon_session_id" uuid,
	"month" date NOT NULL,
	"income_monthly" numeric(12, 2) NOT NULL,
	"essentials" numeric(12, 2) NOT NULL,
	"other_expenses" numeric(12, 2) NOT NULL,
	"savings" numeric(12, 2) NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "planner_owner_check" CHECK (("planner_drafts"."profile_id" IS NOT NULL AND "planner_drafts"."anon_session_id" IS NULL) OR ("planner_drafts"."profile_id" IS NULL AND "planner_drafts"."anon_session_id" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "reset_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid,
	"anon_session_id" uuid,
	"week" smallint NOT NULL,
	"items_completed" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reset_owner_check" CHECK (("reset_progress"."profile_id" IS NOT NULL AND "reset_progress"."anon_session_id" IS NULL) OR ("reset_progress"."profile_id" IS NULL AND "reset_progress"."anon_session_id" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "scorecards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid,
	"anon_session_id" uuid,
	"month" date NOT NULL,
	"pillars" jsonb NOT NULL,
	"total" smallint NOT NULL,
	"interpretation_band" "scorecard_band" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "scorecard_owner_check" CHECK (("scorecards"."profile_id" IS NOT NULL AND "scorecards"."anon_session_id" IS NULL) OR ("scorecards"."profile_id" IS NULL AND "scorecards"."anon_session_id" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "anon_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cookie_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"merged_into_profile_id" uuid,
	CONSTRAINT "anon_sessions_cookie_id_unique" UNIQUE("cookie_id")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"display_name" text NOT NULL,
	"country_iso2" text NOT NULL,
	"category" "user_category" NOT NULL,
	"literacy_self_assessment" "literacy_assessment",
	"consents" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapter_progress" ADD CONSTRAINT "chapter_progress_reader_session_id_reader_sessions_id_fk" FOREIGN KEY ("reader_session_id") REFERENCES "public"."reader_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reader_sessions" ADD CONSTRAINT "reader_sessions_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reader_sessions" ADD CONSTRAINT "reader_sessions_anon_session_id_anon_sessions_id_fk" FOREIGN KEY ("anon_session_id") REFERENCES "public"."anon_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reader_sessions" ADD CONSTRAINT "reader_sessions_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "planner_drafts" ADD CONSTRAINT "planner_drafts_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "planner_drafts" ADD CONSTRAINT "planner_drafts_anon_session_id_anon_sessions_id_fk" FOREIGN KEY ("anon_session_id") REFERENCES "public"."anon_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reset_progress" ADD CONSTRAINT "reset_progress_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reset_progress" ADD CONSTRAINT "reset_progress_anon_session_id_anon_sessions_id_fk" FOREIGN KEY ("anon_session_id") REFERENCES "public"."anon_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scorecards" ADD CONSTRAINT "scorecards_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scorecards" ADD CONSTRAINT "scorecards_anon_session_id_anon_sessions_id_fk" FOREIGN KEY ("anon_session_id") REFERENCES "public"."anon_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "anon_sessions" ADD CONSTRAINT "anon_sessions_merged_into_profile_id_profiles_id_fk" FOREIGN KEY ("merged_into_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;