import {
  format as formatDate,
  formatDuration,
  intervalToDuration,
  parseISO as parseDate,
} from "date-fns";

/** Returns a Date in human-readable format. */
export const toReadableDate = (
  dateString: string,
  formatString = "MMMM yyyy",
): string => {
  return formatDate(parseDate(dateString), formatString);
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

/** Calculates the total usage based on the number of months. */
export const calculateTotalUsage = (totalMonths: number): string => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const items: string[] = [];
  if (years !== 0) {
    items.push(addUnits(years, "year", "years"));
  }
  if (months !== 0) {
    items.push(addUnits(months, "month", "months"));
  }

  return items.join(" and ");
};

/** Returns the number with proper units. */
export const addUnits = (
  someNumber: number,
  unitSingular: string,
  unitPlural: string,
): string => {
  switch (someNumber) {
    case 0:
      return "";
    case 1:
      return `${someNumber} ${unitSingular}`;
    default:
      return `${someNumber} ${unitPlural}`;
  }
};
