// tailwind.config.ts
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        accent: "var(--accent)", // hover/active state
        secondary: "var(--secondary)",
        light: "var(--light)",
        "light-lighter": "var(--light-lighter)",
        white: "var(--white)",
        black: "var(--black)",
        error: "var(--error)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: [
          "var(--font-manrope)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontSize: {
        h1: ["56px", { lineHeight: "58px", fontWeight: "700", letterSpacing: "2px" }],
        h2: ["40px", { lineHeight: "44px", fontWeight: "700", letterSpacing: "1.5px" }],
        h3: ["32px", { lineHeight: "36px", fontWeight: "700", letterSpacing: "1.15px" }],
        h4: ["28px", { lineHeight: "38px", fontWeight: "700", letterSpacing: "2px" }],
        h5: ["24px", { lineHeight: "33px", fontWeight: "700", letterSpacing: "1.7px" }],
        h6: ["18px", { lineHeight: "24px", fontWeight: "700", letterSpacing: "1.3px" }],
        overline: ["14px", { lineHeight: "19px", fontWeight: "400", letterSpacing: "10px"}],
        subtitle: ["30px", { lineHeight: "25px", fontWeight: "700", letterSpacing: "2px", color: "red" }],
        body: ["15px", { lineHeight: "25px", fontWeight: "500" }],
      },
      boxShadow: {
        card: "0px 2px 4px rgba(0,0,0,0.05)",
        button: "0px 4px 8px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
}

export default config
