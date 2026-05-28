import "dotenv/config";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const sql = postgres(DATABASE_URL, { ssl: "require" });

async function main() {
  console.log("Seeding…");

  // ── 1. Upsert level ────────────────────────────────────────────────────
  await sql`
    INSERT INTO levels (id, name, description, ordering)
    VALUES (
      'a1111111-0000-0000-0000-000000000001',
      'Foundational',
      'Core concepts for complete beginners — no prior knowledge required.',
      1
    )
    ON CONFLICT (id) DO NOTHING
  `;

  // ── 2. Upsert book ─────────────────────────────────────────────────────
  await sql`
    INSERT INTO books (
      id, slug, title, subtitle,
      reading_level, literacy_level, thesis,
      published_at, status
    )
    VALUES (
      'b1111111-0000-0000-0000-000000000001',
      'household-money-literacy',
      'Household Money Literacy',
      'A plain-language guide to managing household income, expenses, and savings',
      1,
      'foundational',
      'Most households struggle not from a lack of income but from a lack of a simple, consistent system for managing it. This book provides that system.',
      '2025-01-01',
      'published'
    )
    ON CONFLICT (id) DO NOTHING
  `;

  // ── 3. Upsert chapters ─────────────────────────────────────────────────
  const chapters = [
    {
      id: "c1111111-0000-0000-0000-000000000001",
      ordering: 1,
      title: "Understanding Your Income",
      slug: "understanding-your-income",
      body: `## What Is Income?

Income is every amount of money that enters your household in a given month. This includes wages, salaries, casual earnings, business revenue, pension payments, remittances, and any other regular or irregular source.

Before you can manage money, you must know how much money you have. Most households underestimate total income because they count only the primary salary and ignore secondary sources.

### Exercise 1.1 — List Every Source

Take a sheet of paper or open a notebook. Write down every income source your household receives in a typical month. Include:

- Primary employment income (after tax)
- Secondary employment or side work
- Rental income
- Remittances from family members
- Government transfers or social grants
- Any other regular inflow

Total these amounts. This is your **household income baseline**.

### Why Stability Starts With Clarity

A household that knows its exact income is already more stable than one that guesses. The number itself does not determine stability — the clarity does.

> "You cannot plan a journey without knowing your starting point."

In the chapters that follow, we will work through how to allocate this income across essentials, other expenses, and savings in a way that holds even in difficult months.`,
      wordCount: 195,
      readMinutes: 2,
    },
    {
      id: "c1111111-0000-0000-0000-000000000002",
      ordering: 2,
      title: "Mapping Your Essential Expenses",
      slug: "mapping-your-essential-expenses",
      body: `## What Are Essential Expenses?

Essential expenses are the costs that must be paid every month for your household to function. If you do not pay them, a direct and immediate consequence follows — loss of shelter, loss of utilities, loss of nutrition, or loss of transport to work.

Common essential expenses include:

- Rent or bond repayment
- Electricity and water
- Food and basic groceries
- Transport to work or school
- School fees or childcare
- Basic healthcare costs (chronic medication, clinic visits)

### The Distinction That Matters

Many households group all expenses together. The first practical step is to draw a hard line between **essentials** and **everything else**. This is not a moral judgement — it is a planning discipline.

Once you know your essential total, you know the minimum your household must earn to stay stable.

### Exercise 2.1 — Your Essential Floor

Using your income baseline from Chapter 1, list every essential expense and its monthly cost. Add them up. The total is your **essential floor** — the minimum monthly outflow required to maintain your household.

| Expense | Monthly Amount |
|---------|---------------|
| Rent / bond | |
| Electricity | |
| Water | |
| Food | |
| Transport | |
| School fees | |
| Healthcare | |
| **Total Essential Floor** | |

If your income baseline from Chapter 1 is lower than your essential floor, the priority is to reduce essentials or increase income — not to cut savings. We address this in Chapter 4.`,
      wordCount: 228,
      readMinutes: 3,
    },
    {
      id: "c1111111-0000-0000-0000-000000000003",
      ordering: 3,
      title: "Building a Simple Monthly Plan",
      slug: "building-a-simple-monthly-plan",
      body: `## The Three-Line Plan

A household financial plan does not need to be complicated. In its most basic form, it requires only three numbers:

1. **Income** — total monthly inflow (from Chapter 1)
2. **Essential expenses** — total essential outflow (from Chapter 2)
3. **Remaining balance** — income minus essentials

The remaining balance is what you have available for other expenses and savings. Before spending any of it, you allocate it deliberately.

### The Allocation Order

A simple rule that holds across most households:

1. Pay essentials first
2. Set aside a fixed savings amount — even if small
3. Spend what remains on other expenses

This order matters. When savings are placed after other expenses, they disappear. When savings are placed before other expenses, they accumulate.

### Exercise 3.1 — Write Your Three-Line Plan

| | Amount |
|---|---|
| Total monthly income | |
| Total essential expenses | |
| **Remaining balance** | |
| Savings allocation | |
| **Available for other expenses** | |

You do not need to account for every cent. You need to know, before the month begins, that your essentials are covered and that a savings amount has been reserved.

### Consistency Over Perfection

A plan that is used every month — even imperfectly — will outperform a perfect plan that is abandoned. The goal is not to build an optimal budget. The goal is to build a habit of looking at your numbers before the month begins.

In the next chapter, we look at how to handle the months when the plan breaks down.`,
      wordCount: 247,
      readMinutes: 3,
    },
  ];

  for (const ch of chapters) {
    await sql`
      INSERT INTO chapters (
        id, book_id, ordering, title,
        body_markdown, word_count, estimated_read_minutes
      )
      VALUES (
        ${ch.id},
        'b1111111-0000-0000-0000-000000000001',
        ${ch.ordering},
        ${ch.title},
        ${ch.body},
        ${ch.wordCount},
        ${ch.readMinutes}
      )
      ON CONFLICT (id) DO NOTHING
    `;
    console.log(`  ✓ Chapter ${ch.ordering}: ${ch.title}`);
  }

  console.log("Seed complete.");
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
