import { finding } from "../diagnostics.js";
import { parsePaymentSlot } from "../parser.js";

export function validatePaymentLine(paymentLine, lineNumber) {
    const findings = [];

    if ((paymentLine.recordType !== 'C') && (paymentLine.recordType !== 'D')) {
        findings.push(finding(lineNumber, 'error', "The payment line record must start with a 'C' or a 'D'."));
    }

    const pmtSlot1 = parsePaymentSlot(paymentLine.paymentSlot1);
    const pmtSlot2 = parsePaymentSlot(paymentLine.paymentSlot2);
    const pmtSlot3 = parsePaymentSlot(paymentLine.paymentSlot3);
    const pmtSlot4 = parsePaymentSlot(paymentLine.paymentSlot4);
    const pmtSlot5 = parsePaymentSlot(paymentLine.paymentSlot5);
    const pmtSlot6 = parsePaymentSlot(paymentLine.paymentSlot6);

    findings.push(...paymentSlotValidation(pmtSlot1, 1, lineNumber));
    findings.push(...paymentSlotValidation(pmtSlot2, 2, lineNumber));
    findings.push(...paymentSlotValidation(pmtSlot3, 3, lineNumber));
    findings.push(...paymentSlotValidation(pmtSlot4, 4, lineNumber));
    findings.push(...paymentSlotValidation(pmtSlot5, 5, lineNumber));
    findings.push(...paymentSlotValidation(pmtSlot6, 6, lineNumber));

    return findings;
}

function paymentSlotValidation(paymentSlot, slotNumber, lineNumber) {
    const findings = [];

    if ((!/^\d{3}$/.test(paymentSlot.paymentCode)) && (!/^ {3}$/.test(paymentSlot.paymentCode))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} payment code must be numeric or blank.`));
    }

    if ((!/^\d{10}$/.test(paymentSlot.amount)) && (!/^ {10}$/.test(paymentSlot.amount))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} amount must be numeric without decimals or currency indicators, or blank.`));
    }

    if ((!/^\d{6}$/.test(paymentSlot.dueDate)) && (!/^ {6}$/.test(paymentSlot.dueDate))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} due date must be numeric or blank.`));
    }

    if ((!/^\d{4}$/.test(paymentSlot.institutionId)) && (!/^ {4}$/.test(paymentSlot.institutionId))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} institution id must be numeric or blank.`));
    }

    if ((!/^\d{5}$/.test(paymentSlot.transitNumber)) && (!/^ {5}$/.test(paymentSlot.transitNumber))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} transit number must be numeric or blank.`));
    }

    if ((!/^\d+ *$/.test(paymentSlot.accountNumber)) && (!/^ {12}$/.test(paymentSlot.accountNumber))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} account number must be left-justified numeric followed by blanks, or entirely blank.`));
    }

    if ((!/^ {22}$/.test(paymentSlot.reservedFieldOne))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} reserved field one must be blank.`));
    }

    if ((!/^ {3}$/.test(paymentSlot.reservedFieldTwo))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} reserved field two must be blank.`));
    }

    if ((!/^[A-Za-z0-9 .,]+$/.test(paymentSlot.originatorShortName)) && (!/^ {15}$/.test(paymentSlot.originatorShortName))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} originator short name must be left-justified alphanumeric followed by blanks, or entirely blank.`));
    }

    if ((!/^[A-Za-z0-9 .,]+$/.test(paymentSlot.counterPartyName)) && (!/^ {30}$/.test(paymentSlot.counterPartyName))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} counter party name must be left-justified alphanumeric followed by blanks, or entirely blank.`));
    }

    if ((!/^[A-Za-z0-9 .,]+$/.test(paymentSlot.originatorLongName)) && (!/^ {30}$/.test(paymentSlot.originatorLongName))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} originator long name must be left-justified alphanumeric followed by blanks, or entirely blank.`));
    }

    if ((!/^[A-Za-z0-9 .,]+$/.test(paymentSlot.originatorReferenceNumber)) && (!/^ {30}$/.test(paymentSlot.originatorReferenceNumber))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} originator reference info must be left-justified alphanumeric followed by blanks, or entirely blank.`));
    }

    if ((!/^\d{4}$/.test(paymentSlot.returnedInstitutionId)) && (!/^ {4}$/.test(paymentSlot.returnedInstitutionId))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} returned institution id must be numeric or blank.`));
    }

    if ((!/^\d{5}$/.test(paymentSlot.returnedTransitNumber)) && (!/^ {5}$/.test(paymentSlot.returnedTransitNumber))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} returned transit number must be numeric or blank.`));
    }

    if ((!/^\d+ *$/.test(paymentSlot.returnedAccountNumber)) && (!/^ {12}$/.test(paymentSlot.returnedAccountNumber))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} returned account number must be left-justified numeric followed by blanks, or entirely blank.`));
    }    

    if ((!/^[A-Za-z0-9 .,]+$/.test(paymentSlot.originatorSundryInfo)) && (!/^ {15}$/.test(paymentSlot.originatorSundryInfo))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} originator sundry info must be left-justified alphanumeric followed by blanks, or entirely blank.`));
    }

    if ((!/^ {22}$/.test(paymentSlot.reservedFieldThree))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} reserved field three must be blank.`));
    }

    if ((!/^ {2}$/.test(paymentSlot.reservedFieldFour))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} reserved field four must be blank.`));
    }

    if ((!/^ {11}$/.test(paymentSlot.reservedFieldFive))) {
        findings.push(finding(lineNumber, "error", `Payment slot ${slotNumber} reserved field five must be blank.`));
    }

    return findings;
}