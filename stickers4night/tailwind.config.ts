import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0b0b10",
        neon: {
          pink: "#FF2E92",
          green: "#00F5A0",
          blue: "#6EE7FF",
          yellow: "#FFE600"
        }
      }
    },
  },
  plugins: [],
};
export default config;
