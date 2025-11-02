export function formatDate(dateString, options = {}) {
  if (!dateString) return "N/A";

  try {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
}
