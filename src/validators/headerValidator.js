import { finding } from "../diagnostics.js";

export function validateHeaderRecord(header) {
    const findings = [];

    if (header.recordType !== "A") {
        findings.push(finding("error", "Header record must start with an 'A'."));
    }

    if (!/^\d{6}$/.test(header.fileCreationDate)) {
        findings.push(finding("error", "File creation date must be a 6-digit Julian date (YYYDDD)."));
    }

    if (!/^\d{5}$/.test(header.dataCenter)) {
        findings.push(finding("error", "Data center must be a 5-digit numeric value."));
    }

    if (!/^[ ]*$/.test(header.filler)) {
        findings.push(finding("warning", "Header filler area should contain spaces only."));
    }

    return findings;
}    
