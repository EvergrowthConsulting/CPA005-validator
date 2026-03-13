export function finding(severity, message, recordNumber = null) {
  return {
    severity,
    message,
    recordNumber
  };
}