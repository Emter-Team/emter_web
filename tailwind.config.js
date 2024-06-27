/** @type {import('tailwindcss').Config} */
const bgPatterns = require("tailwindcss-bg-patterns");

module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./src/**/*.{js,jsx}",
    ],
    prefix: "",
    theme: {
        colors: {
            white: "#ffffff",
            primary: "#3f3f46",
            secondary: "#475569",
            danger: "#ef4444",
            warning: "#565584",
            success: "#22c55e",
        },
        fontFamily: {
            sans: ["Work Sans", "Poppins", "sans-serif"],
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            keyframes: {
                shine: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(400%)" },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                shine: "shine 1.5s linear infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), bgPatterns],
};
