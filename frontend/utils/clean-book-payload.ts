// cleaning the payload from undefined values
// thus causing an error on the back-end
export default function cleanBookPayload(
  book: Partial<BookPayload>,
): BookPayload {
  const cleaned: Partial<BookPayload> = {};

  Object.entries(book).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === "categories") {
        if (Array.isArray(value)) {
          cleaned.categories = value;
        } else if (typeof value === "string") {
          cleaned.categories = [value];
        }
      } else {
        (cleaned as any)[key] = value;
      }
    }
  });

  return cleaned as BookPayload;
}
