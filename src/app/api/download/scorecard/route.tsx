import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const TEAL = "#0F4C5C";
const INK = "#1A1A2E";
const INK_SECONDARY = "#4A4A6A";
const BORDER = "#E2E2EC";

const styles = StyleSheet.create({
  page: { paddingTop: 56, paddingBottom: 72, paddingLeft: 56, paddingRight: 56, backgroundColor: "#FFFFFF", fontFamily: "Helvetica" },
  header: { borderBottomWidth: 1, borderBottomColor: BORDER, paddingBottom: 10, marginBottom: 24 },
  brand: { fontSize: 8, color: TEAL, letterSpacing: 1.5 },
  title: { fontSize: 20, color: INK, fontFamily: "Helvetica-Bold", marginTop: 8 },
  subtitle: { fontSize: 10, color: INK_SECONDARY, marginTop: 4 },
  pillarRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: BORDER, paddingVertical: 10 },
  pillarLabel: { fontSize: 11, color: INK },
  pillarDesc: { fontSize: 9, color: INK_SECONDARY, marginTop: 2 },
  score: { fontSize: 11, color: INK, fontFamily: "Helvetica-Bold" },
  sectionTitle: { fontSize: 10, color: INK_SECONDARY, fontFamily: "Helvetica-Bold", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 12, color: INK, fontFamily: "Helvetica-Bold" },
  totalValue: { fontSize: 14, color: TEAL, fontFamily: "Helvetica-Bold" },
  bands: { flexDirection: "row", gap: 8, marginTop: 16 },
  band: { flex: 1, borderWidth: 1, borderColor: BORDER, padding: 8, borderRadius: 4 },
  bandRange: { fontSize: 9, color: INK_SECONDARY },
  bandLabel: { fontSize: 10, color: INK, fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", bottom: 32, left: 56, right: 56, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 8, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 8, color: INK_SECONDARY },
  note: { fontSize: 9, color: INK_SECONDARY, marginTop: 24, fontStyle: "italic" },
});

const PILLARS = [
  { label: "Income Clarity", desc: "Do you know your exact monthly income from all sources?" },
  { label: "Expense Control", desc: "Do you track where your money goes each month?" },
  { label: "Savings", desc: "Do you set aside a fixed amount each month, however small?" },
  { label: "Protection", desc: "Do you have a buffer or plan for unexpected expenses?" },
  { label: "Discipline", desc: "Do you stick to your plan even when it is inconvenient?" },
];

export async function GET() {
  const doc = (
    <Document title="Stability Scorecard — EILI" author="Economic & Industrial Literacy Institute">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>ECONOMIC &amp; INDUSTRIAL LITERACY INSTITUTE</Text>
          <Text style={styles.title}>Stability Scorecard</Text>
          <Text style={styles.subtitle}>Rate each pillar 0–5. Total out of 25.</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Five Pillars</Text>
        {PILLARS.map((p) => (
          <View key={p.label} style={styles.pillarRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pillarLabel}>{p.label}</Text>
              <Text style={styles.pillarDesc}>{p.desc}</Text>
            </View>
            <Text style={styles.score}>___ / 5</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Score</Text>
          <Text style={styles.totalValue}>___ / 25</Text>
        </View>

        <View style={styles.bands}>
          {[
            { range: "0–10", label: "Low Stability" },
            { range: "11–18", label: "Moderate Stability" },
            { range: "19–25", label: "Strong Stability" },
          ].map((b) => (
            <View key={b.label} style={styles.band}>
              <Text style={styles.bandRange}>{b.range}</Text>
              <Text style={styles.bandLabel}>{b.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          EILI provides structured financial literacy, not personalised financial advice.
        </Text>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>eili.org</Text>
          <Text style={styles.footerText}>Stability Scorecard</Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="eili-stability-scorecard.pdf"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
