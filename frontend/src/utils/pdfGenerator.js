import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportMissionPDF(mission) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(30, 58, 138);
  doc.text("SentinelAI", 14, 20);

  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text("AI Decision Intelligence Report", 14, 28);

  // Divider
  doc.setDrawColor(30, 58, 138);
  doc.line(14, 34, 196, 34);

  // Mission Info
  doc.setFontSize(12);
  doc.setTextColor(0);

  doc.text(`Scenario: ${mission.scenario}`, 14, 45);
  doc.text(`Mission: ${mission.mission}`, 14, 53);
  doc.text(`Risk Level: ${mission.risk_level}`, 14, 61);
  doc.text(`AI Confidence: ${mission.confidence}%`, 14, 69);

  // Executive Summary
  doc.setFontSize(15);
  doc.setTextColor(30, 58, 138);
  doc.text("Executive Summary", 14, 85);

  doc.setFontSize(11);
  doc.setTextColor(0);

  const summary = doc.splitTextToSize(
    mission.summary || "No summary available.",
    180
  );

  doc.text(summary, 14, 93);

  // Recommended Strategy
  let y = 105 + summary.length * 6;

  doc.setFontSize(15);
  doc.setTextColor(30, 58, 138);
  doc.text("Recommended Strategy", 14, y);

  y += 8;

  doc.setFontSize(11);
  doc.setTextColor(0);

  const strategy = doc.splitTextToSize(
    mission.recommended_strategy || "N/A",
    180
  );

  doc.text(strategy, 14, y);

  y += strategy.length * 6 + 10;

  // Key Risks Table
  autoTable(doc, {
    startY: y,
    head: [["Key Risks"]],
    body: (mission.key_risks || []).map((risk) => [risk]),
    theme: "striped",
    headStyles: {
      fillColor: [30, 58, 138],
    },
  });

  // Footer
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(10);
  doc.setTextColor(120);

  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    14,
    pageHeight - 10
  );

  doc.save(`${mission.scenario}_Report.pdf`);
}