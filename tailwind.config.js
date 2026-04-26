/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(220 50% 8%)",
        foreground: "hsl(0 0% 100%)",

        card: "hsl(220 45% 12%)",
        "card-foreground": "hsl(0 0% 100%)",

        popover: "hsl(220 45% 12%)",
        "popover-foreground": "hsl(0 0% 100%)",

        primary: "hsl(217 100% 55%)",
        "primary-foreground": "hsl(0 0% 100%)",

        secondary: "hsl(220 40% 18%)",
        "secondary-foreground": "hsl(0 0% 100%)",

        muted: "hsl(220 30% 20%)",
        "muted-foreground": "hsl(220 20% 70%)",

        accent: "hsl(217 100% 55%)",
        "accent-foreground": "hsl(0 0% 100%)",

        destructive: "hsl(0 84% 60%)",
        "destructive-foreground": "hsl(0 0% 100%)",

        border: "hsl(220 30% 20%)",
        input: "hsl(220 30% 20%)",
        ring: "hsl(217 100% 55%)",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
