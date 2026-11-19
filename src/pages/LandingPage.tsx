import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, QrCode, ScanLine, Ticket } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import { APP_CONFIG, APP_SCREENSHOTS } from "../config/app";

const capabilities = [
    {
        icon: LayoutGrid,
        title: "Services with numbered slots",
        description:
            "Set up a service such as a cloakroom or bag storage and say how many slots it has. CLOAK creates the numbered slots for you.",
    },
    {
        icon: QrCode,
        title: "One-tap QR tickets",
        description:
            "Issuing a ticket claims the next free slot and shows a signed QR code together with the slot number.",
    },
    {
        icon: ScanLine,
        title: "Verify, then release",
        description:
            "The server checks a ticket's signature and tells staff which slot it belongs to. Releasing the ticket frees the slot for the next guest.",
    },
    {
        icon: Ticket,
        title: "A ticket list for guests",
        description:
            "Guests sign in with an email address and phone number and see which of their tickets are active and which were released.",
    },
];

const glance = [
    { value: "2 roles", label: "Venue and guest" },
    { value: "1 slot", label: "Per ticket, reused after release" },
    { value: "HMAC-SHA256", label: "Signature on every QR code" },
    { value: "iPhone", label: "Where the app runs today" },
];

const steps = [
    {
        title: "Set up a service",
        description:
            "Register your venue, name a service and choose its number of slots.",
    },
    {
        title: "Issue a ticket",
        description:
            "Tap the service. The next free slot is claimed and a QR ticket appears.",
    },
    {
        title: "Scan and release",
        description:
            "At pickup the ticket is verified, the slot is shown, and releasing it frees the slot.",
    },
];

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Hero Section */}
            <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-1.5 text-sm font-semibold text-amber-300">
                            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                            {APP_CONFIG.stage} · not publicly released yet
                        </p>
                        <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight text-white">
                            QR tickets for every{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                coat, bag and locker
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                            CLOAK is a digital ticketing system for venues. Each
                            service has a fixed number of numbered slots. Staff
                            issue a signed QR ticket in one tap, and at pickup
                            the ticket is verified and its slot is free again.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/about"
                                className="px-8 py-4 text-center bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition text-white"
                            >
                                See how it works
                            </Link>
                            <Link
                                to="/status"
                                className="px-8 py-4 text-center border-2 border-purple-400 rounded-lg font-bold text-lg hover:bg-purple-400/10 transition text-white"
                            >
                                What works today
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-3xl opacity-20"></div>
                        <PhoneFrame
                            {...APP_SCREENSHOTS.ticketQr}
                            caption="A real screen from the app: a ticket for slot 4"
                            eager
                            className="relative"
                        />
                    </div>
                </div>
            </section>

            {/* At a glance */}
            <section className="py-10 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {glance.map((item, index) => (
                        <div
                            key={item.value}
                            className={`bg-slate-800/50 border rounded-xl p-5 sm:p-6 backdrop-blur ${
                                index % 2 === 0
                                    ? "border-purple-500/30"
                                    : "border-cyan-500/30"
                            }`}
                        >
                            <p
                                className={`text-xl sm:text-2xl font-bold mb-2 ${
                                    index % 2 === 0
                                        ? "text-purple-400"
                                        : "text-cyan-400"
                                }`}
                            >
                                {item.value}
                            </p>
                            <p className="text-sm text-gray-300">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What it does today */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
                    What CLOAK does today
                </h2>
                <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
                    Four things, all in the current build. Anything not listed
                    here is on the{" "}
                    <Link
                        to="/status"
                        className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
                    >
                        status page
                    </Link>
                    .
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                    {capabilities.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className={`bg-slate-800/50 border rounded-xl p-8 ${
                                    index % 2 === 0
                                        ? "border-purple-500/30"
                                        : "border-cyan-500/30"
                                }`}
                            >
                                <Icon
                                    className={`w-12 h-12 mb-4 ${
                                        index % 2 === 0
                                            ? "text-purple-400"
                                            : "text-cyan-400"
                                    }`}
                                />
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Screens */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
                    The app as it is right now
                </h2>
                <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
                    Unedited screens from the current build, filled with demo
                    data.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <PhoneFrame {...APP_SCREENSHOTS.welcome} />
                    <PhoneFrame {...APP_SCREENSHOTS.dashboard} />
                    <PhoneFrame {...APP_SCREENSHOTS.ticketQr} />
                    <PhoneFrame {...APP_SCREENSHOTS.guestTickets} />
                </div>
            </section>

            {/* How it works, short */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
                    Three steps at the counter
                </h2>
                <ol className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <li
                            key={step.title}
                            className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 font-bold text-white">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ol>
                <p className="mt-10 text-center">
                    <Link
                        to="/about"
                        className="text-cyan-400 font-semibold underline underline-offset-4 hover:text-cyan-300"
                    >
                        The full walkthrough, with screens
                    </Link>
                </p>
            </section>

            {/* Tech Stack */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
                    What it is built with
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-purple-400 mb-6">
                            Backend
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Go 1.22 with the Fiber v2 framework",
                                "PostgreSQL 16 through pgx v5",
                                "JWT sign-in with venue and guest roles",
                                "HMAC-SHA256 signed QR payloads",
                            ].map((line) => (
                                <li
                                    key={line}
                                    className="flex items-center gap-3 text-gray-300"
                                >
                                    <div className="w-2 h-2 shrink-0 bg-purple-400 rounded-full"></div>
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                            Mobile app
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Flutter, one codebase for venues and guests",
                                "flutter_bloc for state, wired up with Riverpod",
                                "go_router for navigation by role",
                                "mobile_scanner and qr_flutter for QR codes",
                            ].map((line) => (
                                <li
                                    key={line}
                                    className="flex items-center gap-3 text-gray-300"
                                >
                                    <div className="w-2 h-2 shrink-0 bg-cyan-400 rounded-full"></div>
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Status note */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/50 rounded-2xl p-8 sm:p-12 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        CLOAK is still being built
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        There is no public release, hosted service or pricing
                        yet. The status page lists what works, what is half
                        done and what is missing.
                    </p>
                    <Link
                        to="/status"
                        className="inline-block px-10 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition text-white"
                    >
                        See the project status
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
