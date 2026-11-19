import React from "react";
import { Link } from "react-router-dom";
import { KeyRound, ScrollText, Ticket, User } from "lucide-react";
import PageHero from "../components/PageHero";
import PhoneFrame from "../components/PhoneFrame";
import { IconBlob, SectionHeading, TicketCard } from "../components/CloakUI";
import { Squiggle } from "../components/Waves";
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

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="max-w-3xl rounded-card bg-apricot-light p-5 font-semibold text-apricot-ink">
        {children}
    </p>
);

const About: React.FC = () => {
    return (
        <div>
            <PageHero
                title={
                    <>
                        How <span className="text-sage">CLOAK</span> works
                    </>
                }
                subtitle="CLOAK is a digital ticketing system for venues that take something in and hand it back: cloakrooms, bag storage, lockers. A service has a fixed number of numbered slots, and a ticket occupies one slot until it is released."
            />

            {/* Why */}
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-14 lg:px-20">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="card p-6 sm:p-8">
                        <IconBlob
                            icon={ScrollText}
                            tone="terracotta"
                            className="mb-5"
                        />
                        <h2 className="mb-3 text-2xl sm:text-3xl">
                            The paper slip
                        </h2>
                        <p className="text-lg leading-relaxed text-ink-soft">
                            A numbered paper slip gets lost, torn or mixed up,
                            and the number on it proves nothing: anyone can
                            write the same number on another slip.
                        </p>
                    </div>
                    <div className="card p-6 sm:p-8">
                        <IconBlob icon={KeyRound} className="mb-5" />
                        <h2 className="mb-3 text-2xl sm:text-3xl">
                            The signed ticket
                        </h2>
                        <p className="text-lg leading-relaxed text-ink-soft">
                            CLOAK replaces the slip with a QR code that the
                            venue's server has signed. The server can check
                            that it issued the ticket and that nothing in it
                            was changed, instead of trusting a number.
                        </p>
                    </div>
                </div>
            </section>

            {/* For venues */}
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-14 lg:px-20">
                <SectionHeading title="For venues" className="mb-10" />
                <div className="grid items-start gap-12 lg:grid-cols-3">
                    <ol className="space-y-5 lg:col-span-2">
                        {venueSteps.map((step, index) => (
                            <li
                                key={step.title}
                                className="card flex gap-5 p-5 sm:p-6"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-leaf font-display text-xl font-semibold text-on-leaf">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="mb-1 text-xl sm:text-2xl">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-ink-soft">
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
                <div className="mt-8">
                    <Note>
                        Steps 4 and 5 work in the backend today. The app's
                        camera scanner that drives them has not been tested
                        end to end on a phone yet. See the{" "}
                        <Link
                            to="/status"
                            className="font-extrabold underline decoration-2 underline-offset-4"
                        >
                            status page
                        </Link>
                        .
                    </Note>
                </div>
            </section>

            {/* For guests */}
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-14 lg:px-20">
                <SectionHeading title="For guests" className="mb-10" />
                <div className="grid items-start gap-12 lg:grid-cols-3">
                    <div className="space-y-5 lg:col-span-2">
                        <div className="card flex gap-5 p-6 sm:p-8">
                            <IconBlob icon={User} tone="apricot" />
                            <div>
                                <h3 className="mb-2 text-xl sm:text-2xl">
                                    Sign in with email and phone number
                                </h3>
                                <p className="text-lg leading-relaxed text-ink-soft">
                                    Guests do not set a password. Entering an
                                    email address and phone number signs them
                                    in, and the first sign-in creates their
                                    account.
                                </p>
                            </div>
                        </div>
                        <div className="card flex gap-5 p-6 sm:p-8">
                            <IconBlob icon={Ticket} />
                            <div>
                                <h3 className="mb-2 text-xl sm:text-2xl">
                                    See your tickets
                                </h3>
                                <p className="text-lg leading-relaxed text-ink-soft">
                                    The home screen lists the guest's tickets
                                    with their slot number, issue time and
                                    whether they are active or released.
                                </p>
                            </div>
                        </div>
                        <Note>
                            Guests cannot yet pick a venue and check
                            themselves in from the app. The backend supports
                            it, but the app's service list for guests still
                            shows sample entries.
                        </Note>
                    </div>
                    <PhoneFrame {...APP_SCREENSHOTS.guestTickets} />
                </div>
            </section>

            {/* What is in a ticket */}
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-14 lg:px-20">
                <SectionHeading
                    title="What is inside a ticket"
                    intro="The QR code is not just a number. Next to a format version it holds these fields, and the last one is why an edited or invented ticket fails: each venue has its own secret key, the key never leaves the server, and changing any field breaks the signature."
                    className="mb-10"
                />
                <TicketCard className="max-w-3xl">
                    <dl>
                        {payloadFields.map((field, index) => (
                            <div key={field.name}>
                                {index > 0 && (
                                    <div className="my-3 overflow-hidden">
                                        <Squiggle width={720} color="#E5DAC0" />
                                    </div>
                                )}
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                                    <dt className="w-36 shrink-0 font-display text-lg font-semibold text-leaf">
                                        {field.name}
                                    </dt>
                                    <dd className="text-ink-soft">
                                        {field.detail}
                                    </dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </TicketCard>
                <p className="mt-10">
                    <Link to="/features" className="link">
                        More technical detail
                    </Link>
                </p>
            </section>
        </div>
    );
};

export default About;
