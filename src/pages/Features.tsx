import React from "react";
import {
    Shield,
    Database,
    Users,
    Smartphone,
    BarChart3,
    Lock,
    RefreshCw,
    Repeat,
    FileCheck,
    ServerCog,
} from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "HMAC-SHA256 signed QR codes",
        description:
            "Every ticket's QR code carries a signature computed with a secret key that is unique to the venue. The server recomputes the signature on every scan, so an edited or invented code is rejected. The key never leaves the server.",
        tech: "HMAC-SHA256, base64url-encoded JSON payload",
    },
    {
        icon: Lock,
        title: "Hashed passwords",
        description:
            "Venue passwords are stored only as bcrypt hashes, never in plain text.",
        tech: "bcrypt",
    },
    {
        icon: RefreshCw,
        title: "Token sign-in with roles",
        description:
            "Signing in returns a token that is valid for 24 hours and carries the account's role: business or customer. Every protected endpoint checks the token, and the service and ticket endpoints also check the role.",
        tech: "JWT (HS256), role middleware",
    },
    {
        icon: Database,
        title: "Row-level locking for slots",
        description:
            "Issuing a ticket claims the next free slot inside a database transaction that locks the row. Two tickets issued at the same moment never get the same slot.",
        tech: "PostgreSQL SELECT ... FOR UPDATE SKIP LOCKED",
    },
    {
        icon: Repeat,
        title: "Slots are reused safely",
        description:
            "Releasing a ticket frees its slot for the next guest. A ticket can only be released once, so a repeated release cannot free a slot that already belongs to someone else. If issuing a ticket fails halfway, the claimed slot is handed back.",
        tech: "Release guard, slot hand-back on failure",
    },
    {
        icon: Users,
        title: "Each venue sees only its own",
        description:
            "A venue can issue, scan and release tickets only for its own services. A QR code issued by another venue is refused.",
        tech: "Ownership checks in the business logic",
    },
    {
        icon: Smartphone,
        title: "One Flutter app for both roles",
        description:
            "Venue staff get a service dashboard, QR generation and a camera scanner. Guests get their ticket list. The app runs on iPhone today; the Android build has not been tested.",
        tech: "Flutter, flutter_bloc, Riverpod, go_router, mobile_scanner, qr_flutter",
    },
    {
        icon: BarChart3,
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
            "Indexes on the columns used for lookups",
            "Connection pooling with pgxpool",
        ],
    },
];

const principles = [
    {
        icon: ServerCog,
        title: "The server decides",
        description:
            "A QR code is always re-verified on the server before anything happens. Signing keys never leave the server, so the app cannot mint or alter tickets.",
        style: "bg-red-900/30 border-red-500/50",
        iconStyle: "text-red-400",
    },
    {
        icon: Lock,
        title: "Every service and ticket request is checked",
        description:
            "Service and ticket endpoints require a valid token. Role checks run in middleware, and a venue can only act on its own services and tickets.",
        style: "bg-green-900/30 border-green-500/50",
        iconStyle: "text-green-400",
    },
    {
        icon: FileCheck,
        title: "Tamper-evident tickets",
        description:
            "The signature covers the ticket ID, service, venue, slot number and issue time. Changing any of them makes the ticket invalid.",
        style: "bg-blue-900/30 border-blue-500/50",
        iconStyle: "text-blue-400",
    },
    {
        icon: Database,
        title: "Parameterised queries",
        description:
            "All SQL is sent with bound parameters, so values from requests are never pasted into query text.",
        style: "bg-yellow-900/30 border-yellow-500/50",
        iconStyle: "text-yellow-400",
    },
];

const Features: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Header */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-black mb-6 text-white">
                    Under the{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        hood
                    </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl">
                    What the current build of CLOAK actually does and how. No
                    benchmarks or guarantees here: nothing has been measured
                    under load yet.
                </p>
            </section>

            {/* Features Grid */}
            <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 transition"
                            >
                                <Icon className="w-12 h-12 text-purple-400 mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2">
                                    <p className="text-xs font-bold text-cyan-400 mb-1">
                                        Built with:
                                    </p>
                                    <p className="text-sm text-gray-400 break-words">
                                        {feature.tech}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Architecture Overview */}
            <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
                    System architecture
                </h2>
                <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-6 sm:p-12">
                    <ol className="space-y-12">
                        {layers.map((layer, index) => (
                            <li key={layer.title}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                                            {layer.title}
                                        </h3>
                                        <p className="text-gray-400">
                                            {layer.summary}
                                        </p>
                                    </div>
                                </div>
                                <ul className="sm:ml-16 space-y-2 text-gray-300">
                                    {layer.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex gap-3 break-words"
                                        >
                                            <span className="text-purple-400">
                                                •
                                            </span>
                                            <span className="min-w-0">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Security Principles */}
            <section className="py-12 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
                    How tickets stay trustworthy
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {principles.map((principle) => {
                        const Icon = principle.icon;
                        return (
                            <div
                                key={principle.title}
                                className={`border rounded-xl p-8 ${principle.style}`}
                            >
                                <Icon
                                    className={`w-12 h-12 mb-4 ${principle.iconStyle}`}
                                />
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {principle.title}
                                </h3>
                                <p className="text-gray-300">
                                    {principle.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Features;
