import { finding } from "../diagnostics.js";

export function validateFooterRecord(footer, lineNumber) {
    const findings = [];

    if (footer.recordType !== 'Z') {
        findings.push(finding(lineNumber, 'error', "The trailer record must start with a 'Z'."));
    }

    if (!/^\d{14}$/.test(footer.totalDebitAmount)) {
        findings.push(finding(lineNumber, "error", "Total debit amount must be a numeric value with no decimals or currency markers."));
    }
    
    if (!/^\d{8}$/.test(footer.totalDebitCount)) {
        findings.push(finding(lineNumber, "error", "Total debit count must be numeric."));
    }

    if (!/^\d{14}$/.test(footer.totalCreditAmount)) {
        findings.push(finding(lineNumber, "error", "Total credit amount must be a numeric value with no decimals or currency markers."));
    }

    if (!/^\d{8}$/.test(footer.totalCreditCount)) {
        findings.push(finding(lineNumber, "error", "Total credit count must be numeric."));
    }

    if (!/^[ ]*$/.test(footer.filler)) {
        findings.push(finding(lineNumber, "warning", "Trailer filler area should contain spaces only."));
    }    

    return findings;
}
