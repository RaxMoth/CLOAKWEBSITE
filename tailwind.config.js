/**
 * The CLOAK look, shared with the mobile app
 * (CLOAKMobile/lib/core/colors/app_colors.dart and core/theme/app_theme.dart):
 * warm cream surfaces, leafy greens and an apricot accent; Fredoka headings
 * and Nunito body text; soft, rounded shapes.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Neutrals (cream)
                cream: "#FBF5E6", // page
                surface: "#FFFDF8", // warm white card
                sand: "#F4EBD6", // deeper cream tint
                line: "#E5DAC0", // warm beige line

                // Greens (brand)
                leaf: "#387452", // primary
                sage: "#9CCBAA", // primary light
                forest: "#244F38", // primary dark
                fern: "#5C9A76", // between leaf and sage
                mint: "#DDEEDC", // pale green tint
                sagewash: "#D5E0C7", // sage over sand, the footer colour

                // Warm accents
                apricot: {
                    DEFAULT: "#EFA35C",
                    light: "#FBE2C4",
                    dark: "#B8691F",
                    ink: "#7A4210", // readable text on apricot-light
                },
                terracotta: {
                    DEFAULT: "#E6835A",
                    light: "#F7D2C0",
                    dark: "#B85B35",
                    ink: "#7E3519", // readable text on terracotta-light
                },

                // Text
                ink: {
                    DEFAULT: "#22382C", // deep green-black
                    soft: "#5D6E63",
                    faint: "#94A198",
                },
                "on-leaf": "#FFFBF0", // cream on green

                // Status
                success: "#3F9B62",
                warning: "#D9922B",
                danger: "#C9523D",
                info: "#3A8585",
            },
            fontFamily: {
                display: ["Fredoka", "ui-rounded", "system-ui", "sans-serif"],
                sans: ["Nunito", "ui-rounded", "system-ui", "sans-serif"],
            },
            boxShadow: {
                // Soft warm shadows, like the app's cards
                soft: "0 6px 18px rgba(74, 59, 20, 0.12)",
                lift: "0 16px 36px rgba(74, 59, 20, 0.18)",
            },
            borderRadius: {
                card: "24px",
                field: "18px",
                panel: "32px",
            },
        },
    },
    plugins: [],
};
