export function formatDate(dateString) {
  if (dateString.length > 10) {
    dateString = dateString.substring(0, 10);
  }
  return dateString;
}
