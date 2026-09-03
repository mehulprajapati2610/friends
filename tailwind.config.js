/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "inverse-primary": "#d5baff",
        "on-primary-container": "#ead9ff",
        "background": "#fef7ff",
        "primary-fixed-dim": "#d5baff",
        "tertiary-fixed": "#96f2ee",
        "surface-container-low": "#f8f1f9",
        "surface-dim": "#ded8e0",
        "on-primary": "#ffffff",
        "on-tertiary-container": "#93f0eb",
        "secondary": "#785a00",
        "secondary-container": "#fec733",
        "on-error-container": "#93000a",
        "surface": "#fef7ff",
        "on-secondary-fixed": "#251a00",
        "on-tertiary-fixed-variant": "#00504e",
        "on-secondary": "#ffffff",
        "primary-fixed": "#ecdcff",
        "on-tertiary": "#ffffff",
        "secondary-fixed-dim": "#f5bf2a",
        "surface-tint": "#6d4e9f",
        "tertiary-fixed-dim": "#79d6d2",
        "on-error": "#ffffff",
        "tertiary-container": "#006f6c",
        "inverse-on-surface": "#f6eef6",
        "on-primary-fixed-variant": "#553685",
        "on-surface": "#1d1b20",
        "on-secondary-container": "#705400",
        "tertiary": "#005553",
        "primary": "#593b8a",
        "surface-container-high": "#ede6ee",
        "error": "#ba1a1a",
        "inverse-surface": "#322f35",
        "on-primary-fixed": "#270057",
        "surface-container-highest": "#e7e0e8",
        "primary-container": "#7253a4",
        "on-surface-variant": "#4a4550",
        "outline": "#7b7581",
        "outline-variant": "#ccc3d2",
        "surface-container": "#f3ecf3",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#5a4300",
        "on-background": "#1d1b20",
        "surface-container-lowest": "#ffffff",
        "secondary-fixed": "#ffdf9b",
        "surface-variant": "#e7e0e8",
        "surface-bright": "#fef7ff",
        "on-tertiary-fixed": "#00201f"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin": "20px",
        "card-padding": "24px",
        "gutter": "12px",
        "button-padding": "16px 24px"
      },
      fontFamily: {
        "body-lg": ["Quicksand", "sans-serif"],
        "headline-xl": ["'Bricolage Grotesque'", "sans-serif"],
        "headline-lg": ["'Bricolage Grotesque'", "sans-serif"],
        "headline-md": ["'Bricolage Grotesque'", "sans-serif"],
        "body-md": ["Quicksand", "sans-serif"],
        "label-bold": ["Quicksand", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", { "lineHeight": "24px", "fontWeight": "600" }],
        "headline-xl": ["42px", { "lineHeight": "48px", "letterSpacing": "-1px", "fontWeight": "800" }],
        "headline-lg": ["32px", { "lineHeight": "36px", "fontWeight": "800" }],
        "headline-md": ["24px", { "lineHeight": "28px", "fontWeight": "700" }],
        "body-md": ["16px", { "lineHeight": "22px", "fontWeight": "500" }],
        "label-bold": ["14px", { "lineHeight": "18px", "fontWeight": "700" }]
      }
    }
  },
  plugins: [],
}
