import { finding } from "./diagnostics.js";

const RECORD_LENGTH = 1464;
const ALLOWED_RECORD_TYPES = new Set(["A", "C", "D", "Z"]);

export function validateFileStructure(records) {
  const findings = [];

  if (!records || records.length === 0) {
    findings.push(finding("fatal", "File is empty or no records could be detected."));
    return findings;
  }

  let hasDetailRecord = false;

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const recordNumber = i + 1;
    const raw = record.raw ?? "";

    if (raw.length !== RECORD_LENGTH) {
      findings.push(
        finding(
          "error",
          `Record length is ${raw.length}; expected ${RECORD_LENGTH}.`,
          recordNumber
        )
      );
    }

    const recordType = raw.charAt(0);

    if (!ALLOWED_RECORD_TYPES.has(recordType)) {
      findings.push(
        finding(
          "error",
          `Record starts with invalid type '${recordType || "(blank)"}'. Expected A, C, D, or Z.`,
          recordNumber
        )
      );
    }

    if (recordType === "C" || recordType === "D") {
      hasDetailRecord = true;
    }

    validateRecordCount(raw, recordNumber, findings);
  }

  const firstType = records[0].raw.charAt(0);
  const lastType = records[records.length - 1].raw.charAt(0);

  if (firstType !== "A") {
    findings.push(finding("error", `First record must start with 'A', found '${firstType || "(blank)"}'.`, 1));
  }

  if (lastType !== "Z") {
    findings.push(
      finding(
        "error",
        `Last record must start with 'Z', found '${lastType || "(blank)"}'.`,
        records.length
      )
    );
  }

  if (!hasDetailRecord) {
    findings.push(finding("error", "File must contain at least one detail record starting with C or D."));
  }

  return findings;
}

function validateRecordCount(raw, recordNumber, findings) {
  if (raw.length < 10) {
    findings.push(finding("fatal", "Record is too short to contain record count field.", recordNumber));
    return;
  }

  const recordCount = raw.slice(1, 10);

  if (!/^\d{9}$/.test(recordCount)) {
    findings.push(
      finding(
        "error",
        `Record count '${recordCount}' is not a 9-digit numeric value.`,
        recordNumber
      )
    );
    return;
  }

  const parsed = Number(recordCount);
  if (parsed !== recordNumber) {
    findings.push(
      finding(
        "error",
        `Record count is ${recordCount}; expected ${String(recordNumber).padStart(9, "0")}.`,
        recordNumber
      )
    );
  }
}