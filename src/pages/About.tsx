import React from "react";
import { Users, Target, Zap, Globe } from "lucide-react";

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Header */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h1 className="text-6xl font-black mb-6 text-white">
                    About{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        CLOAK
                    </span>
                </h1>
                <p className="text-2xl text-gray-300 max-w-3xl">
                    We're building the most secure, scalable, and user-friendly
                    digital ticketing platform on the planet.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8">
                        <Target className="w-16 h-16 text-purple-400 mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            To eliminate ticket fraud forever. We empower
                            venues, events, and organizations with
                            cryptographically-secured ticketing technology
                            that's impossible to counterfeit, while providing
                            customers with a seamless and secure entry
                            experience.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8">
                        <Globe className="w-16 h-16 text-cyan-400 mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Our Vision
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            A world where every ticket is verifiable in under
                            100 milliseconds, where venues never lose revenue to
                            fraud, and where customers trust their entry
                            experience. CLOAK powers events of all sizes—from
                            intimate gatherings to massive stadiums.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Problem We Solve */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12">
                    The Problem
                </h2>
                <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-8 max-w-3xl">
                    <p className="text-xl text-gray-300 mb-6">
                        The ticketing industry loses{" "}
                        <span className="font-bold text-red-400">
                            $3+ billion annually
                        </span>{" "}
                        to fraud:
                    </p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            Counterfeit tickets sold online
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            Screenshot-based duplicate entries
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            Manual entry credential sharing
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            Scalping at venues with slow scanning
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            Customer data breaches from centralized systems
                        </li>
                    </ul>
                </div>
            </section>

            {/* Our Solution */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12">
                    How CLOAK Works
                </h2>
                <div className="space-y-8">
                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
                                <span className="text-white font-bold">1</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Business Creates Event
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Event organizers define slots, capacity, and
                                pricing in the CLOAK dashboard. Each event has a
                                unique HMAC secret key.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
                                <span className="text-white font-bold">2</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Customer Purchases Ticket
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Customers buy tickets through the app and
                                receive a unique QR code signed with
                                HMAC-SHA256. This signature proves authenticity.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
                                <span className="text-white font-bold">3</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Real-Time Scanning
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Staff or automated kiosks scan the QR code.
                                CLOAK verifies the signature cryptographically,
                                checks slot availability, and marks entry in
                                &lt;100ms.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
                                <span className="text-white font-bold">4</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Analytics & Reporting
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Real-time dashboards show occupancy, revenue,
                                no-shows, and fraud attempts. Machine learning
                                detects anomalies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Our Core Values
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">
                            Security First
                        </h3>
                        <p className="text-gray-400">
                            Cryptography at every layer. No shortcuts.
                        </p>
                    </div>
                    <div className="text-center">
                        <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">
                            Built for Scale
                        </h3>
                        <p className="text-gray-400">
                            From 100 to 100M attendees per year.
                        </p>
                    </div>
                    <div className="text-center">
                        <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">
                            User-Centric
                        </h3>
                        <p className="text-gray-400">
                            Simple for end users, powerful for admins.
                        </p>
                    </div>
                    <div className="text-center">
                        <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">
                            Transparent
                        </h3>
                        <p className="text-gray-400">
                            Open APIs, detailed audit trails, full compliance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <p className="text-5xl font-bold text-purple-400 mb-2">
                            500+
                        </p>
                        <p className="text-gray-300">Venues & Events</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold text-cyan-400 mb-2">
                            10M+
                        </p>
                        <p className="text-gray-300">Tickets Issued</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold text-purple-400 mb-2">
                            $500M+
                        </p>
                        <p className="text-gray-300">Revenue Protected</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
