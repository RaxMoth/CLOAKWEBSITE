import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid, QrCode, ScanLine, Ticket } from "lucide-react";
import PageHero from "../components/PageHero";
import PhoneFrame from "../components/PhoneFrame";
import { Chip, IconBlob, SectionHeading } from "../components/CloakUI";
import { APP_CONFIG, APP_SCREENSHOTS } from "../config/app";

const capabilities = [
    {
        icon: LayoutGrid,
        tone: "mint" as const,
        title: "Services with numbered slots",
        description:
            "Set up a service such as a cloakroom or bag storage and say how many slots it has. CLOAK creates the numbered slots for you.",
    },
    {
        icon: QrCode,
        tone: "apricot" as const,
        title: "One-tap QR tickets",
        description:
            "Issuing a ticket claims the next free slot and shows a signed QR code together with the slot number.",
    },
    {
        icon: ScanLine,
        tone: "terracotta" as const,
        title: "Verify, then release",
        description:
            "The server checks a ticket's signature and tells staff which slot it belongs to. Releasing the ticket frees the slot for the next guest.",
    },
    {
        icon: Ticket,
        tone: "mint" as const,
        title: "A ticket list for guests",
        description:
            "Guests sign in with a 6-digit code sent to their email address and see which of their tickets are active and which were released.",
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

const backend = [
    "Go with the Fiber v2 framework",
    "PostgreSQL 16 through pgx v5",
    "JWT sign-in with venue and guest roles",
    "HMAC-SHA256 signed QR payloads",
];

const mobile = [
    "Flutter, one codebase for venues and guests",
    "flutter_bloc for state, wired up with Riverpod",
    "go_router for navigation by role",
    "mobile_scanner and qr_flutter for QR codes",
];

const LandingPage: React.FC = () => {
    return (
        <div>
            <PageHero
                eyebrow={
                    <Chip tone="apricot">
                        <span className="h-2 w-2 rounded-full bg-apricot-dark"></span>
                        {APP_CONFIG.stage} · not publicly released yet
                    </Chip>
                }
                title={
                    <>
                        QR tickets for every{" "}
                        <span className="text-sage">coat, bag and locker</span>
                    </>
                }
                subtitle="CLOAK is a digital ticketing system for venues. Each service has a fixed number of numbered slots. Staff issue a signed QR ticket in one tap, and at pickup the ticket is verified and its slot is free again."
                aside={
                    <PhoneFrame
                        {...APP_SCREENSHOTS.ticketQr}
                        caption="A real screen from the app: a ticket for slot 4"
                        eager
                        onLeaf
                    />
                }
            >
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Link to="/about" className="btn-on-leaf">
                        See how it works
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    <Link to="/status" className="btn-ghost-on-leaf">
                        What works today
                    </Link>
                </div>
            </PageHero>

            {/* At a glance */}
            <section className="mx-auto max-w-7xl px-6 py-10 sm:px-12 lg:px-20">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                    {glance.map((item) => (
                        <div key={item.value} className="card p-5 sm:p-6">
                            <p className="mb-1 font-display text-xl font-semibold text-leaf sm:text-2xl">
                                {item.value}
                            </p>
                            <p className="text-sm text-ink-soft">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What it does today */}
            <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 sm:py-16 lg:px-20">
                <SectionHeading
                    align="center"
                    title="What CLOAK does today"
                    intro={
                        <>
                            Four things, all in the current build. Anything
                            not listed here is on the{" "}
                            <Link to="/status" className="link">
                                status page
                            </Link>
                            .
                        </>
                    }
                    className="mb-12"
                />
                <div className="grid gap-6 sm:grid-cols-2">
                    {capabilities.map((item) => (
                        <div
                            key={item.title}
                            className="card flex gap-5 p-6 sm:p-8"
                        >
                            <IconBlob icon={item.icon} tone={item.tone} />
                            <div>
                                <h3 className="mb-2 text-xl sm:text-2xl">
                                    {item.title}
                                </h3>
                                <p className="leading-relaxed text-ink-soft">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Screens */}
            <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 sm:py-16 lg:px-20">
                <SectionHeading
                    align="center"
                    title="The app as it is right now"
                    intro="Unedited screens from the current build, filled with demo data."
                    className="mb-12"
                />
                <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
                    <PhoneFrame {...APP_SCREENSHOTS.welcome} />
                    <PhoneFrame {...APP_SCREENSHOTS.dashboard} />
                    <PhoneFrame {...APP_SCREENSHOTS.ticketQr} />
                    <PhoneFrame {...APP_SCREENSHOTS.guestTickets} />
                </div>
            </section>

            {/* How it works, short */}
            <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 sm:py-16 lg:px-20">
                <SectionHeading
                    align="center"
                    title="Three steps at the counter"
                    className="mb-12"
                />
                <ol className="grid gap-6 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <li key={step.title} className="card p-6 sm:p-8">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-leaf font-display text-xl font-semibold text-on-leaf">
                                {index + 1}
                            </div>
                            <h3 className="mb-2 text-xl">{step.title}</h3>
                            <p className="leading-relaxed text-ink-soft">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ol>
                <p className="mt-10 text-center">
                    <Link to="/about" className="link">
                        The full walkthrough, with screens
                    </Link>
                </p>
            </section>

            {/* Tech Stack */}
            <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 sm:py-16 lg:px-20">
                <SectionHeading
                    align="center"
                    title="What it is built with"
                    className="mb-12"
                />
                <div className="grid gap-6 md:grid-cols-2">
                    {[
                        { title: "Backend", lines: backend, dot: "bg-leaf" },
                        {
                            title: "Mobile app",
                            lines: mobile,
                            dot: "bg-apricot",
                        },
                    ].map((group) => (
                        <div key={group.title} className="card p-6 sm:p-8">
                            <h3 className="mb-5 text-2xl">{group.title}</h3>
                            <ul className="space-y-3">
                                {group.lines.map((line) => (
                                    <li
                                        key={line}
                                        className="flex items-center gap-3 text-ink-soft"
                                    >
                                        <span
                                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${group.dot}`}
                                        ></span>
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Status note */}
            <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 sm:py-16 lg:px-20">
                <div className="rounded-panel bg-mint p-8 text-center sm:p-12">
                    <h2 className="mb-4 text-3xl text-forest sm:text-4xl">
                        CLOAK is still being built
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-ink">
                        There is no public release, hosted service or pricing
                        yet. The status page lists what works, what is half
                        done and what is missing.
                    </p>
                    <Link to="/status" className="btn-primary">
                        See the project status
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
