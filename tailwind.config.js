module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      red: "#ef4444",
      black: {
        1: "#252525",
        2: "#3b3b3b",
        3: "#434343",
      },
      orange: {
        1: "#d3766a",
      },
      grey: {
        1: "#cccccc",
        2: "#9a9a9a",
        3: "#757575"
      },
    },
    screens: {
      xs: "360px",
      // => @media (min-width: 360px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      '2xl': "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      spacing: {
        '100': "6.25rem",
        '72': "4.5rem",
        '0.8': "10px"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
