import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Simple markdown → plain text strip for PDF body
// (PDF renderer does not support HTML — strip markers, keep structure)
function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, "")      // headings
    .replace(/\*\*(.*?)\*\*/g, "$1")   // bold
    .replace(/\*(.*?)\*/g, "$1")       // italic
    .replace(/`{1,3}[^`]*`{1,3}/g, "") // code
    .replace(/^\s*[-*]\s+/gm, "• ")    // bullet lists
    .replace(/^\s*\d+\.\s+/gm, "")     // ordered lists
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/^>\s+/gm, "")            // blockquotes
    .replace(/\|.*\|/g, "")            // tables
    .replace(/^-{3,}$/gm, "")          // hr
    .trim();
}

// Split into paragraphs for PDF layout
function toParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

const TEAL = "#0F4C5C";
const INK = "#1A1A2E";
const INK_SECONDARY = "#4A4A6A";
const BORDER = "#E2E2EC";

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingLeft: 56,
    paddingRight: 56,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 10,
    marginBottom: 20,
  },
  brand: {
    fontSize: 8,
    color: TEAL,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  chapterLabel: {
    fontSize: 9,
    color: INK_SECONDARY,
    marginTop: 14,
  },
  title: {
    fontSize: 20,
    color: INK,
    fontFamily: "Helvetica-Bold",
    marginTop: 4,
    lineHeight: 1.3,
  },
  bookTitle: {
    fontSize: 10,
    color: INK_SECONDARY,
    marginTop: 6,
  },
  body: {
    marginTop: 20,
  },
  paragraph: {
    fontSize: 10.5,
    color: INK,
    lineHeight: 1.7,
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 56,
    right: 56,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: INK_SECONDARY,
  },
  disclaimer: {
    fontSize: 8,
    color: INK_SECONDARY,
    fontStyle: "italic",
  },
});

interface Props {
  bookTitle: string;
  chapterOrdering: number;
  chapterTitle: string;
  bodyMarkdown: string;
}

export function ChapterPdf({
  bookTitle,
  chapterOrdering,
  chapterTitle,
  bodyMarkdown,
}: Props) {
  const plain = stripMarkdown(bodyMarkdown);
  const paragraphs = toParagraphs(plain);

  return (
    <Document
      title={`${chapterTitle} — ${bookTitle}`}
      author="Economic & Industrial Literacy Institute (EILI)"
      subject={bookTitle}
      creator="EILI Platform"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>
            Economic &amp; Industrial Literacy Institute
          </Text>
          <Text style={styles.chapterLabel}>
            Chapter {chapterOrdering}
          </Text>
          <Text style={styles.title}>{chapterTitle}</Text>
          <Text style={styles.bookTitle}>{bookTitle}</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {paragraphs.map((para, i) => (
            <Text key={i} style={styles.paragraph}>
              {para}
            </Text>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>eili.org</Text>
          <Text style={styles.disclaimer}>
            Structured financial literacy, not personalised financial advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
