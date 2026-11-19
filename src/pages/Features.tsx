import React from "react";
import {
    Shield,
    Database,
    Users,
    Smartphone,
    BarChart3,
    Lock,
    KeyRound,
    Repeat,
    FileCheck,
    ServerCog,
    Gauge,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { IconBlob, SectionHeading } from "../components/CloakUI";

const features = [
    {
        icon: Shield,
        tone: "mint" as const,
        title: "HMAC-SHA256 signed QR codes",
        description:
            "Every ticket's QR code carries a signature computed with a secret key that is unique to the venue. The server recomputes the signature on every scan, so an edited or invented code is rejected. The key never leaves the server.",
        tech: "HMAC-SHA256, base64url-encoded JSON payload",
    },
    {
        icon: KeyRound,
        tone: "apricot" as const,
        title: "Passwords and sign-in",
        description:
            "Venue passwords are stored only as bcrypt hashes. Signing in returns a token that is valid for 24 hours and carries the account's role, business or customer. Every protected endpoint checks the token and the role.",
        tech: "bcrypt, JWT (HS256), role middleware",
    },
    {
        icon: Database,
        tone: "mint" as const,
        title: "Row-level locking for slots",
        description:
            "Issuing a ticket claims the next free slot inside a database transaction that locks the row. Two tickets issued at the same moment never get the same slot.",
        tech: "PostgreSQL SELECT ... FOR UPDATE SKIP LOCKED",
    },
    {
        icon: Repeat,
        tone: "terracotta" as const,
        title: "A ticket and its slot change together",
        description:
            "Claiming a slot and saving its ticket happen in one transaction, and so do releasing a ticket and freeing its slot. A ticket can only be released once, and the database itself refuses a second active ticket for the same slot.",
        tech: "Transactions, unique partial index",
    },
    {
        icon: Users,
        tone: "apricot" as const,
        title: "Each account sees only its own",
        description:
            "A venue can issue, scan and release tickets only for its own services, and a QR code issued by another venue is refused. A guest can only list their own tickets.",
        tech: "Ownership checks on every request",
    },
    {
        icon: Gauge,
        tone: "mint" as const,
        title: "Rate limits and security headers",
        description:
            "Requests to the API are rate limited, sign-in and registration more tightly, and repeated failed sign-ins for one account are blocked for a while. Responses carry standard security headers.",
        tech: "Fiber limiter and helmet middleware",
    },
    {
        icon: Smartphone,
        tone: "terracotta" as const,
        title: "One Flutter app for both roles",
        description:
            "Venue staff get a service dashboard, QR generation and a camera scanner. Guests get their ticket list. The app runs on iPhone today; the Android build has not been tested.",
        tech: "Flutter, flutter_bloc, Riverpod, go_router, mobile_scanner, qr_flutter",
    },
    {
        icon: BarChart3,
        tone: "apricot" as const,
        title: "Occupancy per service",
        description:
            "The backend reports total, occupied and free slots for each service. The app does not show these numbers yet.",
        tech: "GET /api/v1/services/:id/stats",
    },
];

const layers = [
    {
        title: "API layer (Go, Fiber)",
        summary: "REST endpoints under /api/v1 with token and role middleware",
        points: [
            "POST /auth/business/register, /auth/business/login, /auth/customer/login",
            "POST and GET /services, GET /services/:id, GET /services/:id/stats",
            "POST /tickets/checkin, /tickets/scan, /tickets/:id/release",
            "GET /customers/:id/tickets",
        ],
    },
    {
        title: "Business logic layer (use cases)",
        summary: "The rules live here, separate from HTTP and SQL",
        points: [
            "AuthUsecase: registration, sign-in, token generation",
            "ServiceUsecase: creating services and their slots, occupancy",
            "TicketUsecase: check-in, QR signing, scan verification, release",
        ],
    },
    {
        title: "Data access layer (repositories)",
        summary: "Five repositories, one per table",
        points: [
            "BusinessRepository: venue accounts and their signing keys",
            "CustomerRepository: guest accounts",
            "ServiceRepository: services and their slot totals",
            "SlotRepository: free and occupied slots, with row-level locking",
            "TicketRepository: issued tickets and their status",
        ],
    },
    {
        title: "Database (PostgreSQL 16)",
        summary: "Five tables linked by foreign keys",
        points: [
            "businesses, customers, services, slots, tickets",
            "Uniqueness rules for account emails, active tickets per slot and QR signatures",
            "Indexes on the columns used for lookups",
            "Connection pooling with pgxpool",
        ],
    },
];

const principles = [
    {
        icon: ServerCog,
        tone: "terracotta" as const,
        title: "The server decides",
        description:
            "A QR code is always re-verified on the server before anything happens. Signing keys never leave the server, so the app cannot mint or alter tickets.",
    },
    {
        icon: Lock,
        tone: "mint" as const,
        title: "Every service and ticket request is checked",
        description:
            "Service and ticket endpoints require a valid token. Role checks run in middleware, and a venue can only act on its own services and tickets.",
    },
    {
        icon: FileCheck,
        tone: "apricot" as const,
        title: "Tamper-evident tickets",
        description:
            "The signature covers the ticket ID, service, venue, slot number and issue time. Changing any of them makes the ticket invalid.",
    },
    {
        icon: Database,
        tone: "sand" as const,
        title: "Parameterised queries",
        description:
            "All SQL is sent with bound parameters, so values from requests are never pasted into query text.",
    },
];

const Features: React.FC = () => {
    return (
        <div>
            <PageHero
                title={
                    <>
                        Under the <span className="text-sage">hood</span>
                    </>
                }
                subtitle="What the current build of CLOAK actually does and how. No benchmarks or guarantees here: nothing has been measured under load yet."
            />

            {/* Features Grid */}
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-14 lg:px-20">
                <div className="grid gap-6 md:grid-cols-2">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="card flex flex-col p-6 sm:p-8"
                        >
                            <IconBlob
                                icon={feature.icon}
                                tone={feature.tone}
                                className="mb-5"
                            />
                            <h3 className="mb-3 text-2xl">{feature.title}</h3>
                            <p className="mb-5 leading-relaxed text-ink-soft">
                                {feature.description}
                            </p>
                            <div className="mt-auto rounded-field bg-sand px-4 py-3">
                                <p className="mb-0.5 text-xs font-extrabold text-forest">
                                    Built with
                                </p>
                                <p className="break-words text-sm text-ink-soft">
                                    {feature.tech}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Architecture Overview */}
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-14 lg:px-20">
                <SectionHeading
                    align="center"
                    title="System architecture"
                    className="mb-12"
                />
                <ol className="space-y-5">
                    {layers.map((layer, index) => (
                        <li key={layer.title} className="card p-6 sm:p-8">
                            <div className="mb-5 flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-leaf font-display text-xl font-semibold text-on-leaf">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl">
                                        {layer.title}
                                    </h3>
                                    <p className="text-ink-soft">
                                        {layer.summary}
                                    </p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-ink-soft sm:ml-16">
                                {layer.points.map((point) => (
                                    <li
                                        key={point}
                                        className="flex gap-3 break-words"
                                    >
                                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-sage"></span>
                                        <span className="min-w-0">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Security Principles */}
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-16 lg:px-20">
                <SectionHeading
                    align="center"
                    title="How tickets stay trustworthy"
                    className="mb-12"
                />
                <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                    {principles.map((principle) => (
                        <div
                            key={principle.title}
                            className="card p-6 sm:p-8"
                        >
                            <IconBlob
                                icon={principle.icon}
                                tone={principle.tone}
                                className="mb-5"
                            />
                            <h3 className="mb-3 text-xl">
                                {principle.title}
                            </h3>
                            <p className="leading-relaxed text-ink-soft">
                                {principle.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Features;
