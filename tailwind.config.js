/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.tsx"],
  theme: {
    extend: {
      colors: {
        placeholder: "#ABB4BD",
        customBlue: "#6d3bef",
      },
      borderColor: {
        customGray: "rgba(171, 180, 189, 0.5)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
