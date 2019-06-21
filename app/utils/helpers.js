export function stripHtmlTags(string) {
  return string.replace(/<[^>]*>?/gm, "");
}
