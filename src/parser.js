import { HEADER_LAYOUT } from "./layout.js";

export function getField(raw, [start, end]) {
    return raw.slice(start, end);
}

export function parseHeaderRecord(raw) {
    return {
        recordType: getField(raw, HEADER_LAYOUT.recordType),
        recordCount: getField(raw, HEADER_LAYOUT.recordCount),
        originatorId: getField(raw, HEADER_LAYOUT.originatorId),
        fileCreationNumber: getField(raw, HEADER_LAYOUT.fileCreationNumber),
        fileCreationDate: getField(raw, HEADER_LAYOUT.fileCreationDate),
        dataCenter: getField(raw, HEADER_LAYOUT.dataCenter),
        filler: getField(raw, HEADER_LAYOUT.filler)
    }
}