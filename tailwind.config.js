/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    // Keep the existing global reset so the current visual system stays stable.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        page: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "border-bright": "var(--border-bright)",
        accent: "var(--green)",
        "accent-dim": "var(--green-dim)",
        text: "var(--text)",
        muted: "var(--muted)",
        faint: "var(--faint)",
      },
      fontFamily: {
        mono: ["var(--font)"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
