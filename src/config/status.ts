/**
 * Project status
 *
 * The single list of what CLOAK can and cannot do right now. The Status page
 * renders it and the landing page links to it. Keep it in step with
 * CLOAKMobile and CLOAKBE: an item moves to `working` only once it has been
 * seen working end to end.
 */

export interface StatusItem {
    title: string;
    detail: string;
}

export interface StatusGroup {
    id: "working" | "partial" | "missing";
    title: string;
    summary: string;
    items: StatusItem[];
}

export const STATUS_GROUPS: StatusGroup[] = [
    {
        id: "working",
        title: "Works today",
        summary: "Built and working in the current build.",
        items: [
            {
                title: "Venue sign-up and sign-in",
                detail: "A venue registers with a name, email and password and signs in again later.",
            },
            {
                title: "Services with numbered slots",
                detail: "Create a service such as a cloakroom and set how many slots it has. The slots are created with it.",
            },
            {
                title: "Service dashboard",
                detail: "The venue sees its services and can add more at any time.",
            },
            {
                title: "Issuing QR tickets",
                detail: "One tap claims the next free slot and shows a signed QR code with the slot number.",
            },
            {
                title: "Verifying and releasing tickets",
                detail: "The backend checks a ticket's signature and owner, reports its slot, and frees the slot on release. Freed slots are handed out again.",
            },
            {
                title: "Guest sign-in and ticket list",
                detail: "A guest signs in with a 6-digit code sent to their email address and sees their tickets as active or released.",
            },
            {
                title: "Staying signed in",
                detail: "Reopening the app brings venues back to their dashboard and guests back to their tickets.",
            },
            {
                title: "Running on iPhone",
                detail: "The app has been installed and run on a real iPhone.",
            },
        ],
    },
    {
        id: "partial",
        title: "Built, not finished",
        summary: "Part of it exists, but it is not complete or not yet proven.",
        items: [
            {
                title: "Camera scanner",
                detail: "The scanner screen sends a scanned code to the backend and offers to release the slot. It has not been tested end to end on a phone yet.",
            },
            {
                title: "Emailing guest sign-in codes",
                detail: "Sending the code needs a mail server, and none is set up yet. Until then the code only appears in the backend's log on the development machine.",
            },
            {
                title: "Guest self check-in",
                detail: "The backend lets a guest check in to a service. In the app, the guest's list of services still shows sample entries.",
            },
            {
                title: "Occupancy numbers",
                detail: "The backend reports free and occupied slots per service. The dashboard shows total slots only and the Analytics screen is a placeholder.",
            },
            {
                title: "Service descriptions",
                detail: "The app asks for a description when you create a service, but it is not stored.",
            },
            {
                title: "Android",
                detail: "The Flutter project includes an Android app. It has not been built or tested.",
            },
        ],
    },
    {
        id: "missing",
        title: "Not available",
        summary: "Not built, or not offered at this stage.",
        items: [
            {
                title: "Public release",
                detail: "CLOAK is not in the App Store or on Google Play.",
            },
            {
                title: "Hosted service",
                detail: "There is no hosted backend. It currently runs in a local development setup only.",
            },
            {
                title: "Pricing and plans",
                detail: "There are no prices, plans or trials. CLOAK is not sold as a service yet.",
            },
            {
                title: "Analytics and reporting",
                detail: "No dashboards, exports or reports beyond the per-service slot counts in the backend.",
            },
            {
                title: "Offline use",
                detail: "Issuing and scanning tickets both need a connection to the backend.",
            },
        ],
    },
];
