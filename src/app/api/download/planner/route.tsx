import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const TEAL = "#0F4C5C";
const INK = "#1A1A2E";
const INK_SECONDARY = "#4A4A6A";
const BORDER = "#E2E2EC";

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 72,
    paddingLeft: 56,
    paddingRight: 56,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 10,
    marginBottom: 24,
  },
  brand: { fontSize: 8, color: TEAL, letterSpacing: 1.5 },
  title: { fontSize: 20, color: INK, fontFamily: "Helvetica-Bold", marginTop: 8 },
  subtitle: { fontSize: 10, color: INK_SECONDARY, marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 10, color: INK_SECONDARY, fontFamily: "Helvetica-Bold", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 },
  row: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: BORDER, paddingVertical: 8 },
  rowLabel: { fontSize: 11, color: INK },
  rowValue: { fontSize: 11, color: INK, fontFamily: "Helvetica-Bold" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingTop: 10, marginTop: 4 },
  totalLabel: { fontSize: 12, color: INK, fontFamily: "Helvetica-Bold" },
  totalValue: { fontSize: 14, color: TEAL, fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", bottom: 32, left: 56, right: 56, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 8, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 8, color: INK_SECONDARY },
  note: { fontSize: 9, color: INK_SECONDARY, marginTop: 24, fontStyle: "italic" },
});

// This route returns a blank planner template (no user data — user fills it in)
export async function GET() {
  const now = new Date();
  const monthLabel = now.toLocaleString("en", { month: "long", year: "numeric" });

  const doc = (
    <Document title="Monthly Planner — EILI" author="Economic & Industrial Literacy Institute">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>ECONOMIC &amp; INDUSTRIAL LITERACY INSTITUTE</Text>
          <Text style={styles.title}>Monthly Planner</Text>
          <Text style={styles.subtitle}>{monthLabel}</Text>
        </View>

        {/* Income */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Monthly income (after tax)</Text>
            <Text style={styles.rowValue}>$____________</Text>
          </View>
        </View>

        {/* Expenses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Essential Expenses</Text>
          {["Rent / bond", "Electricity & water", "Food & groceries", "Transport", "School fees", "Healthcare", "Other essential"].map((item) => (
            <View key={item} style={styles.row}>
              <Text style={styles.rowLabel}>{item}</Text>
              <Text style={styles.rowValue}>$____________</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Expenses</Text>
          {["Item 1", "Item 2", "Item 3"].map((item) => (
            <View key={item} style={styles.row}>
              <Text style={styles.rowLabel}>{item}</Text>
              <Text style={styles.rowValue}>$____________</Text>
            </View>
          ))}
        </View>

        {/* Savings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Savings</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Fixed monthly savings</Text>
            <Text style={styles.rowValue}>$____________</Text>
          </View>
        </View>

        {/* Remaining */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Remaining Balance</Text>
          <Text style={styles.totalValue}>$____________</Text>
        </View>

        <Text style={styles.note}>
          EILI provides structured financial literacy, not personalised financial advice.
        </Text>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>eili.org</Text>
          <Text style={styles.footerText}>Monthly Planner Template</Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="eili-monthly-planner.pdf"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
