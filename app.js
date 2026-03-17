import { splitIntoRecords } from "./src/recordSplitter.js";
import { validateFileStructure } from "./src/validators/fileValidator.js";
import { parseHeaderRecord, parseTrailerRecord, parsePaymentLineRecord } from "./src/parser.js";
import { validateHeaderRecord } from "./src/validators/headerValidator.js";
import { validateFooterRecord } from "./src/validators/footerValidator.js";
import { validatePaymentLine } from "./src/validators/paymentLineValidator.js";

const fileInput = document.getElementById("fileInput");
const validateButton = document.getElementById("validateButton");
const summaryEl = document.getElementById("summary");
const resultsEl = document.getElementById("results");

validateButton.addEventListener("click", async () => {
  resultsEl.innerHTML = "";
  summaryEl.textContent = "Working...";

  const findings = [];

  const file = fileInput.files?.[0];
  if (!file) {
    summaryEl.textContent = "No file selected.";
    return;
  }

  try {
    // file structure first
    const rawText = await file.text();
    const records = splitIntoRecords(rawText);
    findings.push(...validateFileStructure(records));

    // check header record
    const header = parseHeaderRecord(records[0].raw);
    findings.push(...validateHeaderRecord(header, 1));

    // check detail record(s)
    for (let i = 1; i < records.length-1; i++) {
      const paymentLine = parsePaymentLineRecord(records[i].raw, i + 1);
      findings.push(...validatePaymentLine(paymentLine));
    }

    // check footer record
    const footer = parseTrailerRecord(records[records.length - 1].raw);
    findings.push(...validateFooterRecord(footer, records.length));

    renderSummary(file.name, records, findings);
    renderFindings(findings);

  } catch (error) {
    summaryEl.textContent = "Validation failed.";
    renderFindings([
      {
        severity: "fatal",
        message: `Unhandled error: ${error.message}`
      }
    ]);
  }
});

function renderSummary(fileName, records, findings) {
  const fatalCount = findings.filter(f => f.severity === "fatal").length;
  const errorCount = findings.filter(f => f.severity === "error").length;
  const warningCount = findings.filter(f => f.severity === "warning").length;
  const infoCount = findings.filter(f => f.severity === "info").length;

  summaryEl.innerHTML = `
    <div><strong>File:</strong> ${escapeHtml(fileName)}</div>
    <div><strong>Records detected:</strong> ${records.length}</div>
    <div><strong>Fatal:</strong> ${fatalCount}</div>
    <div><strong>Errors:</strong> ${errorCount}</div>
    <div><strong>Warnings:</strong> ${warningCount}</div>
    <div><strong>Info:</strong> ${infoCount}</div>
  `;
}

function renderFindings(findings) {
  if (findings.length === 0) {
    resultsEl.innerHTML = `<div class="finding info">No issues found in the current validation scope.</div>`;
    return;
  }

  resultsEl.innerHTML = findings
    .map(f => `
      <div class="finding ${escapeHtml(f.severity)}">
        <strong>${escapeHtml(f?.severity?.toUpperCase())}</strong>
        ${f.lineNumber ? ` - Line ${f.lineNumber}` : ""}
        <div>${escapeHtml(f.message)}</div>
      </div>
    `)
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

