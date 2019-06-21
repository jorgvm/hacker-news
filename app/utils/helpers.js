export function stripHtmlTags(string) {
  return String(string).replace(/<[^>]*>?/gm, "");
}
