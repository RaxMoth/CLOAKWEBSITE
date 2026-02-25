import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Zap,
    Lock,
    Smartphone,
    BarChart3,
    QrCode,
    CheckCircle,
} from "lucide-react";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Hero Section */}
            <section className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-6xl sm:text-7xl font-black mb-6 leading-tight text-white">
                            The Future of{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Digital Ticketing
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Secure QR-based ticketing system with real-time
                            scanning, HMAC-SHA256 cryptographic signing, and
                            zero fraud. Built for events, venues, and massive
                            gatherings.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/features")}
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 text-white"
                            >
                                Explore Features
                            </button>
                            <button
                                onClick={() => navigate("/services")}
                                className="px-8 py-4 border-2 border-purple-400 rounded-lg font-bold text-lg hover:bg-purple-400/10 transition text-white"
                            >
                                View Pricing
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                        <div className="relative bg-slate-800 rounded-3xl p-12 border border-purple-500/50 shadow-2xl">
                            <div className="flex items-center justify-center h-64 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl">
                                <QrCode
                                    size={120}
                                    className="text-purple-400 opacity-50"
                                />
                            </div>
                            <p className="text-center text-gray-400 mt-6 text-sm">
                                HMAC-SHA256 Signed • Real-time Verification
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6 backdrop-blur">
                        <p className="text-4xl font-bold text-purple-400 mb-2">
                            ∞
                        </p>
                        <p className="text-gray-300">Scalable</p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur">
                        <p className="text-4xl font-bold text-cyan-400 mb-2">
                            0%
                        </p>
                        <p className="text-gray-300">Fraud Rate</p>
                    </div>
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6 backdrop-blur">
                        <p className="text-4xl font-bold text-purple-400 mb-2">
                            &lt;100ms
                        </p>
                        <p className="text-gray-300">Scan Time</p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur">
                        <p className="text-4xl font-bold text-cyan-400 mb-2">
                            ∞ Slots
                        </p>
                        <p className="text-gray-300">Per Event</p>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Why Choose CLOAK?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 transition">
                        <Lock className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Military-Grade Security
                        </h3>
                        <p className="text-gray-400">
                            HMAC-SHA256 signing, bcrypt password hashing, JWT
                            tokens with expiry, encrypted storage.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-400/60 transition">
                        <Zap className="w-12 h-12 text-cyan-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Lightning Fast
                        </h3>
                        <p className="text-gray-400">
                            Sub-100ms scan times, connection pooling, async
                            operations, optimized database queries.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 transition">
                        <Smartphone className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Mobile-First Design
                        </h3>
                        <p className="text-gray-400">
                            Native iOS & Android apps with offline capability,
                            camera integration, and biometric auth.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-400/60 transition">
                        <BarChart3 className="w-12 h-12 text-cyan-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Real-Time Analytics
                        </h3>
                        <p className="text-gray-400">
                            Live dashboards, occupancy tracking, revenue
                            reporting, and detailed audit trails.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 transition">
                        <QrCode className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Smart QR Codes
                        </h3>
                        <p className="text-gray-400">
                            Cryptographically secured, non-transferable, unique
                            per customer, impossible to forge.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-400/60 transition">
                        <CheckCircle className="w-12 h-12 text-cyan-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-3">
                            99.9% Uptime SLA
                        </h3>
                        <p className="text-gray-400">
                            Enterprise-grade infrastructure, automatic backups,
                            redundancy, and disaster recovery.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Built on Modern Technology
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-purple-400 mb-6">
                            Backend
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                Go 1.22+ with Fiber v2 framework
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                PostgreSQL 16 with pgx/v5
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                JWT authentication
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                HMAC-SHA256 QR signing
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                            Frontend
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                Flutter with Riverpod state management
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                go_router for navigation
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                Secure token storage
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                Mobile scanner integration
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/50 rounded-2xl p-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Revolutionize Your Events?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join hundreds of venues already using CLOAK for secure,
                        fraud-proof ticketing.
                    </p>
                    <button
                        onClick={() => navigate("/services")}
                        className="px-12 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 text-white"
                    >
                        Start Your Free Trial
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
