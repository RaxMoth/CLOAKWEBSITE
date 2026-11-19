/**
 * SEO Configuration for the CLOAK website
 */

import { MetaTags } from "../types";
import { APP_CONFIG } from "./app";

export const SITE_CONFIG = {
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
};

/** Page metadata, keyed by route path. */
export const PAGE_META: Record<string, MetaTags> = {
    "/": {
        title: "CLOAK | Digital Ticketing System",
        description:
            "Slot-based QR ticketing for venues. Every coat, bag or locker gets a numbered slot and a signed QR ticket. In development.",
        keywords: ["QR tickets", "cloakroom", "coat check", "venues", "slots"],
        ogType: "website",
    },
    "/about": {
        title: "How it works | CLOAK",
        description:
            "How CLOAK issues, verifies and releases slot-based QR tickets, step by step for venues and guests.",
        keywords: ["how it works", "QR ticket", "cloakroom ticket", "scan"],
        ogType: "website",
    },
    "/features": {
        title: "Features | CLOAK",
        description:
            "What is inside CLOAK: HMAC-signed QR codes, role-based sign-in, row-level slot locking and a Flutter app.",
        keywords: ["HMAC", "JWT", "PostgreSQL", "Go", "Flutter"],
        ogType: "website",
    },
    "/status": {
        title: "Project status | CLOAK",
        description:
            "What works in CLOAK today, what is half built and what is not available yet.",
        keywords: ["status", "roadmap", "in development"],
        ogType: "website",
    },
};

export const DEFAULT_META = PAGE_META["/"];
