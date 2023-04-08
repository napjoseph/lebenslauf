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
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
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
