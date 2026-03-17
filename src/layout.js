// Developer's note:
//
// This layout definition was derived from the Toronto Dominion (TD) Bank
// documentation for the CPA005 1464-byte file format.
//
// While CPA005 is intended to be a standard format, individual financial
// institutions may implement minor variations in areas such as filler fields,
// field naming, or interpretation of certain values.
//
// This validator focuses on structural validation of the file format and does
// not attempt to enforce institution-specific rules beyond what is required
// for basic CPA005 conformance.

export const RECORD_LENGTH = 1464;                      // every line
export const DETAIL_CONTROL_AREA_LENGTH = 24;           // common controls
export const DETAIL_TRANSACTION_SLOT_LENGTH = 240;      // actual payment record length
export const DETAIL_TRANSACTION_SLOT_COUNT = 6;         // per line

// this exists to align the spec sheet with JS functionality; JS is zero-indexed exclusive 
// whereas the spec sheets are almost always 1 indexed inclusive
function spec(start, end) {
    return [start - 1, end];
}

export const RECORD_TYPES = {
    HEADER: "A",
    CREDIT: "C",
    DEBIT: "D",
    TRAILER: "Z"
};

export const ALLOWED_RECORD_TYPES = new Set([
    RECORD_TYPES.HEADER,
    RECORD_TYPES.CREDIT,
    RECORD_TYPES.DEBIT,
    RECORD_TYPES.TRAILER
]);

// NOTE:
// CPA005 specs are written using 1-based inclusive character ranges (e.g. 36–1464).
// JavaScript slice() uses 0-based indexing with an exclusive end.
// The helper function spec(start, end) converts spec positions to JS slice ranges.
// Always use spec() when defining layout fields so the code matches the spec sheet exactly.

export const COMMON_LAYOUT = {
    recordType: spec(1, 1),
    recordCount: spec(2, 10)
}

export const HEADER_LAYOUT = {
    recordType: spec(1, 1),
    recordCount: spec(2, 10),
    originatorId: spec(11, 20),
    fileCreationNumber: spec(21, 24),
    fileCreationDate: spec(25, 30),
    dataCenter: spec(31, 35),
    filler: spec(36, 1464)
};

// Payment slots are 240-character repeating blocks starting at spec position 25.
// Slot start position (spec indexing):
//   start = 25 + ((slotNumber - 1) * 240)
//
// Example:
//   Slot 1: 25–264
//   Slot 2: 265–504
//   Slot 3: 505–744

export const PAYMENT_SLOT_DETAIL_LAYOUT = {
    paymentCode: spec(1, 3),
    amount: spec(4, 13),
    dueDate: spec(14, 19),
    institutionId: spec(20, 23),
    transitNumber: spec(24, 28),
    accountNumber: spec(29, 40),
    reservedFieldOne: spec(41, 62),
    reservedFieldTwo: spec(63, 65),
    originatorShortName: spec(66, 80),
    counterPartyName: spec(81, 110),
    originatorLongName: spec(111, 140),
    originatorId: spec(141, 150),
    originatorReferenceNumber: spec(151, 169),
    returnedInstitutionId: spec(170, 173),
    returnedTransitNumber: spec(174, 178),
    returnedAccountNumber: spec(179, 190),
    originatorSundryInfo: spec(191, 205),
    reservedFieldThree: spec(206, 227),
    reservedFieldFour: spec(228, 229),
    reservedFieldFive: spec(230, 240)

}

export const DETAIL_LAYOUT = {
    recordType: spec(1, 1),
    recordCount: spec(2, 10),
    originatorId: spec(11, 20),
    fileCreationNumber: spec(21, 24),
    paymentSlot1: spec(25, 264),
    paymentSlot2: spec(265, 504),
    paymentSlot3: spec(505, 744),
    paymentSlot4: spec(745, 984),
    paymentSlot5: spec(985, 1224),
    paymentSlot6: spec(1225, 1464)
}

export const TRAILER_LAYOUT = {
    recordType: spec(1, 1),
    recordCount: spec(2, 10),
    originatorId: spec(11, 20),
    fileCreationNumber: spec(21, 24),
    totalDebitAmount: spec(25, 38),
    totalDebitCount: spec(39, 46),
    totalCreditAmount: spec(47, 60),
    totalCreditCount: spec(61, 68),
    filler: spec(69, 1464)
}