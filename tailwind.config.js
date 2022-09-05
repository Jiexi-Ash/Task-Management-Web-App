/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primaryPurple: "hsl(242,48%,58%)",
        lightPurple: "hsl(243,100%,82%)",
        primaryBlack: "hsl(237,100%,4%)",
        paleBlack: "hsl(235,16%,15%)",
        paleBlack2: "hsl(235,12%,19%)",
        paleGrey: "hsl(216,15%,57%)",
        paleBlack3: "hsl(236,11%,27%)",
        lightishGrey: "hsl(221,69%,94%)",
        lightishGrey2: "hsl(220, 69%, 97%)",
        primaryRed: "hsl(0,78%,63%)",
        lightRed: "hsl(0,100%,80%)",
      },
      fontFamily: {
        PlusJakartaSans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
