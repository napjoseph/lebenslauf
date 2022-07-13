import {
  format as formatDate,
  formatDuration,
  intervalToDuration,
  parseISO as parseDate,
} from "date-fns";

/** Returns a Date in human-readable format. */
export const toReadableDate = (dateString: string): string => {
  return formatDate(parseDate(dateString), "MMMM yyyy");
};

/** Returns a Duration in human-readable format. */
export const toReadableDuration = (
  dateString1: string,
  dateString2: string,
): string => {
  return formatDuration(
    intervalToDuration({
      start: parseDate(dateString1),
      end: parseDate(dateString2),
    }),
    {
      format: ["years", "months"],
      // Since we're only checking for "years" and "months", if "months" exist,
      // we will add " and " to make it more readable.
      delimiter: " and ",
    },
  );
};
