import test from 'node:test';
import assert from 'node:assert';
import { validateFileStructure } from '../src/validators/fileValidator.js';
import { splitIntoRecords } from '../src/recordSplitter.js';
import fs from 'fs';

test('valid sample file passes', () => {
    const data = fs.readFileSync('../dev/Export CRONUS 01 - works.txt', 'utf-8');
    const records = splitIntoRecords(data);
    const findings = validateFileStructure(records);

    assert.strictEqual(findings.length, 0);
});

test('invalid sample file fails', () => {
    const data = fs.readFileSync('../dev/Export CRONUS 02 - bad line lengths.txt', 'utf-8');
    const records = splitIntoRecords(data);
    const findings = validateFileStructure(records);

    assert.ok(findings.length > 0);
});