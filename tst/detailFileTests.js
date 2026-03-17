import { splitIntoRecords } from "../src/recordSplitter.js";
import { parseHeaderRecord, parseTrailerRecord, parsePaymentLineRecord } from "../src/parser.js";
import { validateHeaderRecord } from "../src/validators/headerValidator.js";
import { validateFooterRecord } from "../src/validators/footerValidator.js";
import { validatePaymentLine } from "../src/validators/paymentLineValidator.js";
import { finding } from "../src/diagnostics.js";
import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

test('valid file passes detail', () => {
    const findings = [];

    // Export CRONUS 01 - works.txt
    const rawText = fs.readFileSync('./dev/Export CRONUS 01 - works.txt', 'utf-8');
    const records = splitIntoRecords(rawText);

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

    assert.strictEqual(findings.length, 0);
});

test('invalid file fails detail', () => {
    const findings = [];

    // Export CRONUS 02 - bad line lengths.txt
    const rawText = fs.readFileSync('./dev/Export CRONUS 02 - bad line lengths.txt', 'utf-8');
    const records = splitIntoRecords(rawText);

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

    assert.ok(findings.length > 0);
});

test('valid file passes detail', () => {
    const findings = [];

    // Export CRONUS 03 - works payment slots.txt
    const rawText = fs.readFileSync('./dev/Export CRONUS 03 - works payment slots.txt', 'utf-8');
    const records = splitIntoRecords(rawText);

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

    assert.strictEqual(findings.length, 0);
});

test('invalid file fails detail', () => {
    const findings = [];

    // Export CRONUS 04 - misnumbered lines.txt; this will PASS detail checks because structurally the 
    // file is bad, not because the details are bad, AND since we're not doing structural checks here,
    // it will look like a pass.

    const rawText = fs.readFileSync('./dev/Export CRONUS 04 - misnumbered lines.txt', 'utf-8');
    const records = splitIntoRecords(rawText);

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

    console.log(findings.length);
    console.log(findings);

    assert.strictEqual(findings.length, 0);
});
