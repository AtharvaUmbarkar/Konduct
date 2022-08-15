module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#222831",
        primary_dark: "#15191e",
        secondary: "#EEEEEE",
        secondary_dark: "#cccccc",
        tertiary: "#393E46",
        accent: "#00ADB5",
        accent_dark: "#206E76",
        accent_darker: "#007980",
        compliment: "#B50800",
      },
      fontFamily: {
        'roboto': `"Roboto", sans-serif`,
      },
      boxShadow: {
        custom1: "0px 25px 50px -12px rgb(0 0 0 0.25)"
      }
    },
  },
  plugins: [],
}
