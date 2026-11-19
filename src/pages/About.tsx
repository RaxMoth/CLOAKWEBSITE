import React from "react";
import { Link } from "react-router-dom";
import { KeyRound, Ticket, User } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import { APP_SCREENSHOTS } from "../config/app";

const venueSteps = [
    {
        title: "Register your venue",
        description:
            "Create a venue account with a name, an email address and a password. From then on you sign in with the email and password.",
    },
    {
        title: "Create a service",
        description:
            "Give the service a name, for example Main Cloakroom, and set its total number of slots. CLOAK creates one numbered slot for each. You can add more services from the dashboard at any time.",
    },
    {
        title: "Issue a ticket",
        description:
            "Tap the plus button on a service and generate a QR code. The next free slot is claimed and the screen shows the QR code, the slot number and the ticket ID.",
    },
    {
        title: "Verify the ticket at pickup",
        description:
            "The ticket's QR code is sent to the server, which checks its signature and that it belongs to your venue, then answers with the slot number and whether the ticket is still active.",
    },
    {
        title: "Release the slot",
        description:
            "Releasing an active ticket frees its slot, and the next ticket you issue can use it again. A ticket can only be released once.",
    },
];

const payloadFields = [
    { name: "Ticket ID", detail: "Unique for every ticket" },
    { name: "Service", detail: "Which service the ticket belongs to" },
    { name: "Venue", detail: "Which venue issued it" },
    { name: "Slot number", detail: "The slot the ticket occupies" },
    { name: "Issue time", detail: "When the ticket was created" },
    {
        name: "Signature",
        detail: "HMAC-SHA256 over all of the above, made with the venue's key",
    },
];

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Header */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-black mb-6 text-white">
                    How{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        CLOAK
                    </span>{" "}
                    works
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl">
                    CLOAK is a digital ticketing system for venues that take
                    something in and hand it back: cloakrooms, bag storage,
                    lockers. A service has a fixed number of numbered slots,
                    and a ticket occupies one slot until it is released.
                </p>
            </section>

            {/* Why */}
            <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8">
                        <Ticket className="w-12 h-12 text-purple-400 mb-4" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            The paper slip
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            A numbered paper slip gets lost, torn or mixed up,
                            and the number on it proves nothing: anyone can
                            write the same number on another slip.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8">
                        <KeyRound className="w-12 h-12 text-cyan-400 mb-4" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            The signed ticket
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            CLOAK replaces the slip with a QR code that the
                            venue's server has signed. The server can check
                            that it issued the ticket and that nothing in it
                            was changed, instead of trusting a number.
                        </p>
                    </div>
                </div>
            </section>

            {/* For venues */}
            <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
                    For venues
                </h2>
                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    <ol className="space-y-8 lg:col-span-2">
                        {venueSteps.map((step, index) => (
                            <li key={step.title} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
                                        <span className="text-white font-bold">
                                            {index + 1}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <PhoneFrame {...APP_SCREENSHOTS.dashboard} />
                        <PhoneFrame {...APP_SCREENSHOTS.ticketQr} />
                    </div>
                </div>
                <p className="mt-10 max-w-3xl rounded-xl border border-amber-400/40 bg-amber-400/10 p-5 text-amber-100">
                    Steps 4 and 5 work in the backend today. The app's camera
                    scanner that drives them has not been tested end to end on
                    a phone yet. See the{" "}
                    <Link
                        to="/status"
                        className="font-semibold underline underline-offset-4"
                    >
                        status page
                    </Link>
                    .
                </p>
            </section>

            {/* For guests */}
            <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
                    For guests
                </h2>
                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8">
                            <User className="w-12 h-12 text-cyan-400 mb-4" />
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                                Sign in with email and phone number
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Guests do not set a password. Entering an email
                                address and phone number signs them in, and the
                                first sign-in creates their account.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8">
                            <Ticket className="w-12 h-12 text-purple-400 mb-4" />
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                                See your tickets
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                The home screen lists the guest's tickets with
                                their slot number, issue time and whether they
                                are active or released.
                            </p>
                        </div>
                        <p className="max-w-3xl rounded-xl border border-amber-400/40 bg-amber-400/10 p-5 text-amber-100">
                            Guests cannot yet pick a venue and check
                            themselves in from the app. The backend supports
                            it, but the app's service list for guests still
                            shows sample entries.
                        </p>
                    </div>
                    <PhoneFrame {...APP_SCREENSHOTS.guestTickets} />
                </div>
            </section>

            {/* What is in a ticket */}
            <section className="py-12 sm:py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    What is inside a ticket
                </h2>
                <p className="text-gray-300 text-lg max-w-3xl mb-10">
                    The QR code is not just a number. Next to a format
                    version it holds these fields, and the last one is why an
                    edited or invented ticket fails: each venue has its own
                    secret key, the key never leaves the server, and changing
                    any field breaks the signature.
                </p>
                <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payloadFields.map((field) => (
                        <div
                            key={field.name}
                            className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6"
                        >
                            <dt className="text-lg font-bold text-white mb-2">
                                {field.name}
                            </dt>
                            <dd className="text-gray-400">{field.detail}</dd>
                        </div>
                    ))}
                </dl>
                <p className="mt-10">
                    <Link
                        to="/features"
                        className="text-cyan-400 font-semibold underline underline-offset-4 hover:text-cyan-300"
                    >
                        More technical detail
                    </Link>
                </p>
            </section>
        </div>
    );
};

export default About;
