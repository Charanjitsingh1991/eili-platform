/**
 * Cloudflare Worker — Supabase anti-pause cron
 *
 * Pings the Supabase REST health endpoint every 6 days so the free-tier
 * project does not auto-pause (Supabase pauses after 7 days of inactivity).
 *
 * Deploy:
 *   1. wrangler login
 *   2. Set secret: wrangler secret put SUPABASE_URL
 *   3. wrangler deploy
 *
 * Schedule is defined in wrangler.toml (every 6 days = "0 0 */6 * *").
 */

export default {
  async scheduled(_event, env, _ctx) {
    const url = `${env.SUPABASE_URL}/rest/v1/`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) {
      console.error(`Supabase ping failed: ${res.status} ${res.statusText}`);
    } else {
      console.log(`Supabase ping OK: ${res.status}`);
    }
  },
};
