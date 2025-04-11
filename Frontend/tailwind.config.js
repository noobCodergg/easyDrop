/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #582682, #C90F60)',
        'mouve1': '#82227C',
        'bg1': "#522E8E",
        'color1': "#492191",
        'color2': "#1F3AAB",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        'dark-gray': '#454545',
        'mouve': '#82227C',
        'up': '#811F74',
        'color1': "#492191",
        'color2': "#1F3AAB",
        'custom-green': '#E8F5E9',
        'custom-blue': '#E3F2FD',
        'custom-purple': '#F3E5F5',
        'custom-orange': '#FFF3E0',
        'login':"#522683",
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.3s ease-out forwards',
      },
      textStrokeWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
      textStrokeColor: {
        'mouve': '#82227C',
        'up': '#811F74',
        'color1': '#492191',
        'color2': '#1F3AAB',
        'dark-gray': '#454545',
        'black': '#000000',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for text stroke
    function ({ addUtilities }) {
      const newUtilities = {
        // Stroke width
        '.stroke-1': {
          '-webkit-text-stroke-width': '1px',
        },
        '.stroke-2': {
          '-webkit-text-stroke-width': '2px',
        },
        '.stroke-3': {
          '-webkit-text-stroke-width': '3px',
        },
        // Stroke colors
        '.stroke-mouve': {
          '-webkit-text-stroke-color': '#82227C',
        },
        '.stroke-up': {
          '-webkit-text-stroke-color': '#811F74',
        },
        '.stroke-color1': {
          '-webkit-text-stroke-color': '#492191',
        },
        '.stroke-color2': {
          '-webkit-text-stroke-color': '#1F3AAB',
        },
        '.stroke-dark-gray': {
          '-webkit-text-stroke-color': '#454545',
        },
        '.stroke-black': {
          '-webkit-text-stroke-color': '#000000',
        },
        '.stroke-white': {
          '-webkit-text-stroke-color': '#FFFFFF',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
