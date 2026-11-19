/**
 * App Configuration
 * Central facts about CLOAK that several pages share.
 *
 * Everything here describes the product as it is built today. When the app
 * or backend changes, update this file and `src/config/status.ts` first.
 */

export const APP_CONFIG = {
    name: "CLOAK",
    tagline: "Digital Ticketing System",
    description:
        "Slot-based QR ticketing for venues. Every coat, bag or locker gets a numbered slot and a signed QR ticket.",

    // Shown in the header, footer and on the status page.
    stage: "In development",
    lastUpdated: "19 November 2026",

    // Same palette as the mobile app (CLOAKMobile/lib/core/colors/app_colors.dart)
    colors: {
        primary: "#7C3AED",
        secondary: "#06B6D4",
        background: "#0F172A",
        surface: "#1E293B",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",
    },

    // Navigation
    navigation: [
        { label: "Home", href: "/" },
        { label: "How it works", href: "/about" },
        { label: "Features", href: "/features" },
        { label: "Status", href: "/status" },
    ],

    // Timeouts (in ms)
    timeouts: {
        api: 10000,
        notification: 5000,
        debounce: 300,
    },
};

/** Real screens of the mobile app, captured from the current build with demo data. */
export const APP_SCREENSHOTS = {
    welcome: {
        src: "/screenshots/app-welcome.jpg",
        alt: "CLOAK welcome screen with the choice between Business and Customer",
        caption: "Choose a role: venue or guest",
    },
    dashboard: {
        src: "/screenshots/app-dashboard.jpg",
        alt: "Venue dashboard listing the services Bag Storage with 40 slots and Main Cloakroom with 150 slots",
        caption: "A venue's services and their slots",
    },
    ticketQr: {
        src: "/screenshots/app-ticket-qr.jpg",
        alt: "A generated ticket for the Main Cloakroom: a QR code, slot number 4 and the ticket ID",
        caption: "A signed QR ticket for slot 4",
    },
    guestTickets: {
        src: "/screenshots/app-guest-tickets.jpg",
        alt: "A guest's ticket list with one active ticket for slot 5 and one released ticket for slot 4",
        caption: "A guest's active and released tickets",
    },
} as const;
