import postgres from "postgres";
import { readFileSync } from "fs";
import { join } from "path";

async function main() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("Missing DATABASE_URL env var");
    process.exit(1);
  }

  const sql = postgres(dbUrl, { ssl: "require", max: 1 });

  const migration = readFileSync(
    join(process.cwd(), "packages/db/migrations/0003_profiles_onboarding.sql"),
    "utf-8",
  );

  try {
    await sql.unsafe(migration);
    console.log("✅ Migration 0003 applied successfully");
  } catch (err) {
    console.error("❌ Failed to apply migration 0003:", err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
