const RECORD_LENGTH = 1464;

export function splitIntoRecords(rawText) {
  if (!rawText || rawText.length === 0) {
    return [];
  }

  // Normalize BOM.
  if (rawText.charCodeAt(0) === 0xfeff) {
    rawText = rawText.slice(1);
  }

  // First try newline-delimited records.
  const normalized = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n").filter(line => line.length > 0);

  const looksLineDelimited = lines.length > 1;

  if (looksLineDelimited) {
    return lines.map((line, index) => ({
      index,
      raw: line
    }));
  }

  // Fallback: fixed-width continuous block.
  const compactText = normalized.replace(/\n/g, "");

  const records = [];
  for (let i = 0; i < compactText.length; i += RECORD_LENGTH) {
    records.push({
      index: records.length,
      raw: compactText.slice(i, i + RECORD_LENGTH)
    });
  }

  return records;
}