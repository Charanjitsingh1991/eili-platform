import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const TEAL = "#0F4C5C";
const INK = "#1A1A2E";
const INK_SECONDARY = "#4A4A6A";
const BORDER = "#E2E2EC";

const styles = StyleSheet.create({
  page: { paddingTop: 48, paddingBottom: 72, paddingLeft: 56, paddingRight: 56, backgroundColor: "#FFFFFF", fontFamily: "Helvetica" },
  header: { borderBottomWidth: 1, borderBottomColor: BORDER, paddingBottom: 10, marginBottom: 20 },
  brand: { fontSize: 8, color: TEAL, letterSpacing: 1.5 },
  title: { fontSize: 18, color: INK, fontFamily: "Helvetica-Bold", marginTop: 8 },
  subtitle: { fontSize: 9, color: INK_SECONDARY, marginTop: 4 },
  weekBlock: { marginBottom: 16 },
  weekHeader: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#F4F4F8", padding: 6, marginBottom: 4 },
  weekNum: { fontSize: 9, color: TEAL, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
  weekLabel: { fontSize: 10, color: INK, fontFamily: "Helvetica-Bold" },
  taskRow: { flexDirection: "row", alignItems: "flex-start", borderBottomWidth: 1, borderBottomColor: BORDER, paddingVertical: 5 },
  checkbox: { width: 10, height: 10, borderWidth: 1, borderColor: BORDER, marginRight: 8, marginTop: 1 },
  taskText: { fontSize: 9, color: INK, flex: 1, lineHeight: 1.5 },
  dayLabel: { fontSize: 8, color: INK_SECONDARY, width: 32, marginRight: 4, marginTop: 1 },
  footer: { position: "absolute", bottom: 32, left: 56, right: 56, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 8, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 8, color: INK_SECONDARY },
  note: { fontSize: 8, color: INK_SECONDARY, marginTop: 16, fontStyle: "italic" },
});

const WEEKS = [
  {
    week: 1, label: "Awareness",
    tasks: [
      "Write down every source of income your household receives",
      "List all regular monthly expenses from memory",
      "Compare your list to your actual bank or mobile money records",
      "Note the three largest expenses you did not expect",
      "Calculate your total monthly income",
      "Calculate your total known monthly expenses",
      "Record the gap (income minus expenses) without judging it",
    ],
  },
  {
    week: 2, label: "Control",
    tasks: [
      "Separate your expenses into essential and non-essential",
      "Calculate your essential floor (minimum monthly cost)",
      "Identify one non-essential expense you can reduce this month",
      "Set a simple daily spending limit for discretionary items",
      "Track every expense today — write it down before spending",
      "Review yesterday's tracking — were there any surprises?",
      "Write a one-sentence plan for the rest of the month",
    ],
  },
  {
    week: 3, label: "Adjustment",
    tasks: [
      "Open the Monthly Planner and enter your current income and expenses",
      "Identify the single largest gap in your plan",
      "Find one action to close that gap (increase income or reduce expense)",
      "Set a savings target — even a small fixed amount counts",
      "Review your plan mid-week and note what is on track",
      "Adjust one line item based on what you have learned",
      "Calculate your updated remaining balance",
    ],
  },
  {
    week: 4, label: "Stabilization",
    tasks: [
      "Check your Stability Scorecard from the start of the Reset",
      "Re-score all five pillars based on the past 3 weeks",
      "Compare your before and after scores",
      "Write one habit you will continue next month",
      "Set a reminder to revisit your plan at the start of next month",
      "Share your plan with one other person in your household",
      "Mark this Reset complete — repeat next month",
    ],
  },
];

export async function GET() {
  const doc = (
    <Document title="30-Day Reset — EILI" author="Economic & Industrial Literacy Institute">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>ECONOMIC &amp; INDUSTRIAL LITERACY INSTITUTE</Text>
          <Text style={styles.title}>30-Day Reset Plan</Text>
          <Text style={styles.subtitle}>Four weeks of structured actions. Tick each task as you complete it.</Text>
        </View>

        {WEEKS.map((w) => (
          <View key={w.week} style={styles.weekBlock} wrap={false}>
            <View style={styles.weekHeader}>
              <Text style={styles.weekNum}>Week {w.week}</Text>
              <Text style={styles.weekLabel}>{w.label}</Text>
            </View>
            {w.tasks.map((task, i) => (
              <View key={i} style={styles.taskRow}>
                <View style={styles.checkbox} />
                <Text style={styles.dayLabel}>Day {i + 1}</Text>
                <Text style={styles.taskText}>{task}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.note}>
          EILI provides structured financial literacy, not personalised financial advice.
        </Text>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>eili.org</Text>
          <Text style={styles.footerText}>30-Day Reset</Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="eili-30-day-reset.pdf"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
