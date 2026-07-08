/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1E1B3C",
        indigo: "#2D2C6B",
        royal: "#40399B",
        bright: "#3B6BBF",
        lavender: "#815A9E",
        pinkpurple: "#B983B5",
        gold: "#E5BD9C",
        terracotta: "#C27D67",
        brown: "#79494D",
        cream: "#E8E9E9",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "dusk-gradient": "linear-gradient(180deg, #1E1B3C 0%, #2D2C6B 45%, #40399B 100%)",
        "paper-gradient": "linear-gradient(180deg, #FBF9F6 0%, #F3ECE4 55%, #F6EFE9 100%)",
        "story-path": "linear-gradient(90deg, #3B6BBF, #815A9E, #C27D67)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(229,189,156,0.45)",
        soft: "0 10px 30px -10px rgba(30,27,60,0.15)",
      },
      keyframes: {
        twinkle: {
          "0%,100%": { opacity: 0.3, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.3)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
