/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Official Polaris Color System with proper contrast
        border: "223 227 232", /* #dfe3e8 */
        input: "223 227 232", /* #dfe3e8 */
        ring: "92 106 196", /* #5c6ac4 */
        background: "255 255 255", /* #ffffff - White background */
        foreground: "33 43 54", /* #212b36 - Dark text for contrast */
        card: "255 255 255", /* #ffffff */
        "card-foreground": "33 43 54", /* #212b36 */
        popover: "255 255 255", /* #ffffff */
        "popover-foreground": "33 43 54", /* #212b36 */
        primary: {
          DEFAULT: "92 106 196", /* #5c6ac4 - Main purple */
          foreground: "255 255 255", /* #ffffff */
        },
        secondary: {
          DEFAULT: "99 115 129", /* #637381 - Muted text */
          foreground: "255 255 255", /* #ffffff */
        },
        muted: {
          DEFAULT: "244 246 248", /* #f4f6f8 */
          foreground: "99 115 129", /* #637381 */
        },
        accent: {
          DEFAULT: "80 184 60", /* #50b83c - Success */
          foreground: "255 255 255", /* #ffffff */
        },
        destructive: {
          DEFAULT: "222 54 24", /* #de3618 - Critical */
          foreground: "255 255 255", /* #ffffff */
        },
        
        // Shopify Polaris Official Colors
        polaris: {
          purple: "#5c6ac4",
          blue: "#006fbb",
          "light-grey-bg": "#f4f6f8",
          white: "#ffffff",
          text: "#212b36",
          "muted-text": "#637381",
          border: "#dfe3e8",
          success: "#50b83c",
          critical: "#de3618",
        },
        
        surface: {
          DEFAULT: "#ffffff",
          subdued: "#fafbfb",
          disabled: "#f6f6f7",
          hovered: "#f1f2f3",
          pressed: "#e8e9ea",
          depressed: "#edeeef",
        },
        
        text: {
          DEFAULT: "#212b36",
          subdued: "#637381",
          disabled: "#8c9196",
        },
        
        interactive: {
          DEFAULT: "#006fbb", /* Blue for actions */
          hovered: "#005a9b",
          pressed: "#004a7c",
          disabled: "#bdc1cc",
        },
        
        critical: {
          DEFAULT: "#de3618",
          subdued: "#fef7f6",
          surface: "#fed3d1",
        },
        
        warning: {
          DEFAULT: "#ffc453",
          subdued: "#fffbf4",
          surface: "#fff5d6",
        },
        
        success: {
          DEFAULT: "#50b83c",
          subdued: "#f6fffe",
          surface: "#d1f7ee",
        },
        
        highlight: {
          DEFAULT: "#5bcdda",
          subdued: "#f7fcfd",
          surface: "#c7f0f4",
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'caption': ['11px', { lineHeight: '16px', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '20px', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'subheading': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'heading': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'display-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'display': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'display-lg': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'display-xl': ['32px', { lineHeight: '40px', fontWeight: '600' }],
      },
      spacing: {
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
      boxShadow: {
        'polaris-sm': '0 1px 0 0 rgba(22, 29, 37, 0.05)',
        'polaris': '0 1px 0 0 rgba(22, 29, 37, 0.05), 0 1px 1px 0 rgba(22, 29, 37, 0.1)',
        'polaris-md': '0 4px 8px -2px rgba(22, 29, 37, 0.1), 0 1px 0 0 rgba(22, 29, 37, 0.05)',
        'polaris-lg': '0 8px 16px -4px rgba(22, 29, 37, 0.1), 0 1px 0 0 rgba(22, 29, 37, 0.05)',
        'polaris-inset': 'inset 0 1px 0 0 rgba(22, 29, 37, 0.05)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0, transform: "translateY(4px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}