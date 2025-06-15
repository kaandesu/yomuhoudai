export default function cleanBookPayload(
  book: Partial<BookPayload>,
): BookPayload {
  const cleaned: Partial<BookPayload> = {};

  Object.entries(book).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === "categories") {
        if (typeof value === "string") {
          cleaned.categories = value
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => cat.length > 0);
        } else if (Array.isArray(value)) {
          cleaned.categories = value;
        }
      } else {
        (cleaned as any)[key] = value;
      }
    }
  });

  return cleaned as BookPayload;
}
