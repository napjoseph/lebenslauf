import { format as formatDate, parseISO as parseDate } from "date-fns";

/** Returns a Date in human-readable format. */
export const toReadableDate = (dateString: string): string => {
  return formatDate(parseDate(dateString), "MMMM yyyy");
};
