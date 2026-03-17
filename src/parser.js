import { DETAIL_LAYOUT, HEADER_LAYOUT, PAYMENT_SLOT_DETAIL_LAYOUT, TRAILER_LAYOUT } from "./layout.js";

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

export function parseTrailerRecord(raw) {
    return {
        recordType: getField(raw, TRAILER_LAYOUT.recordType),
        recordCount: getField(raw, TRAILER_LAYOUT.recordCount),
        originatorId: getField(raw, TRAILER_LAYOUT.originatorId),
        fileCreationNumber: getField(raw, TRAILER_LAYOUT.fileCreationNumber),
        totalDebitAmount: getField(raw, TRAILER_LAYOUT.totalDebitAmount),
        totalDebitCount: getField(raw, TRAILER_LAYOUT.totalDebitCount),
        totalCreditAmount: getField(raw, TRAILER_LAYOUT.totalCreditAmount),
        totalCreditCount: getField(raw, TRAILER_LAYOUT.totalCreditCount),
        filler: getField(raw, TRAILER_LAYOUT.filler)
    }
}

export function parsePaymentLineRecord(raw) {
    return {
        recordType: getField(raw, DETAIL_LAYOUT.recordType),
        recordCount: getField(raw, DETAIL_LAYOUT.recordCount),
        originatorId: getField(raw, DETAIL_LAYOUT.originatorId),
        fileCreationNumber: getField(raw, DETAIL_LAYOUT.fileCreationNumber),
        paymentSlot1: getField(raw, DETAIL_LAYOUT.paymentSlot1),
        paymentSlot2: getField(raw, DETAIL_LAYOUT.paymentSlot2),
        paymentSlot3: getField(raw, DETAIL_LAYOUT.paymentSlot3),
        paymentSlot4: getField(raw, DETAIL_LAYOUT.paymentSlot4),
        paymentSlot5: getField(raw, DETAIL_LAYOUT.paymentSlot5),
        paymentSlot6: getField(raw, DETAIL_LAYOUT.paymentSlot6)
    }
}

export function parsePaymentSlot(rawSlice) {
    return {
        paymentCode: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.paymentCode),
        amount: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.amount),
        dueDate: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.dueDate),
        institutionId: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.institutionId),
        transitNumber: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.transitNumber),
        accountNumber: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.accountNumber),
        reservedFieldOne: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.reservedFieldOne),
        reservedFieldTwo: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.reservedFieldTwo),
        originatorShortName: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.originatorShortName),
        counterPartyName: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.counterPartyName),
        originatorLongName: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.originatorLongName),
        originatorId: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.originatorId),
        originatorReferenceNumber: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.originatorReferenceNumber),
        returnedInstitutionId: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.returnedInstitutionId),
        returnedTransitNumber: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.returnedTransitNumber),
        returnedAccountNumber: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.returnedAccountNumber),
        originatorSundryInfo: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.originatorSundryInfo),
        reservedFieldThree: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.reservedFieldThree),
        reservedFieldFour: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.reservedFieldFour),
        reservedFieldFive: getField(rawSlice, PAYMENT_SLOT_DETAIL_LAYOUT.reservedFieldFive)
    }
}