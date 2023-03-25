import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    screens: {
      "2xs": "480px",
      xs: "532px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      screens: {
        print: { raw: "print" },
      },
      width: {
        a4: "210mm",
      },
      height: {
        a4: "297mm",
      },
    },
  },
} as Options;
