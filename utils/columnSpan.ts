import { tw } from "@twind";

/**
 * Returns the proper column span.
 *
 * Due to a limitation in Babel, we need to do it like this.
 */
export const columnSpan = (width: number) => ({
  1: tw`col-span-1`,
  2: tw`col-span-2`,
  3: tw`col-span-3`,
  4: tw`col-span-4`,
  5: tw`col-span-5`,
  6: tw`col-span-6`,
  7: tw`col-span-7`,
  8: tw`col-span-8`,
  9: tw`col-span-9`,
  10: tw`col-span-10`,
  11: tw`col-span-11`,
  12: tw`col-span-12`,
}[width]);
