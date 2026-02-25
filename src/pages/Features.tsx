import React from "react";
import {
    Shield,
    Zap,
    Database,
    Users,
    Smartphone,
    BarChart3,
    Lock,
    RefreshCw,
} from "lucide-react";

const Features: React.FC = () => {
    const features = [
        {
            icon: Shield,
            title: "HMAC-SHA256 Signed QR Codes",
            description:
                "Every ticket QR contains a cryptographic signature using a secret key unique to the event. The signature proves authenticity and cannot be forged without the server secret. Customers cannot modify their QR code without breaking the signature.",
            tech: "HMAC-SHA256, Base64 encoding",
        },
        {
            icon: Lock,
            title: "Bcrypt Password Hashing",
            description:
                "User passwords are never stored in plaintext. We hash them with bcrypt (cost=12) which uses adaptive time-hashing to resist brute-force attacks. Even if the database is compromised, passwords remain secure.",
            tech: "Bcrypt (cost=12), Salt generation",
        },
        {
            icon: RefreshCw,
            title: "JWT Token Authentication",
            description:
                "Secure stateless authentication using JSON Web Tokens. Tokens include role information (Business, Customer, Admin) and expiry times. Tokens are cryptographically signed and validated on every request without database lookups.",
            tech: "JWT (HS256), Token expiry, Role claims",
        },
        {
            icon: Database,
            title: "Row-Level Locking for Slots",
            description:
                "When claiming a slot, we lock the row with SELECT ... FOR UPDATE SKIP LOCKED. This prevents race conditions where two users could claim the same slot simultaneously. Only one transaction succeeds.",
            tech: "PostgreSQL SELECT ... FOR UPDATE, Transaction isolation",
        },
        {
            icon: Zap,
            title: "Sub-100ms Scan Times",
            description:
                "Optimized database queries with connection pooling (pgxpool). QR verification happens in-memory. We cache business secrets to avoid database lookups per scan. Lightning-fast scanning ensures smooth entry flow.",
            tech: "pgx connection pooling, Query optimization, In-memory caching",
        },
        {
            icon: Users,
            title: "Multi-Tenant Architecture",
            description:
                "Each business has isolated data. Queries automatically filter by business_id. Row-level security ensures one business cannot access another's events, customers, or tickets. Complete data isolation at the database level.",
            tech: "Business ID scoping, Row-level filtering, Tenant isolation",
        },
        {
            icon: Smartphone,
            title: "Native Mobile Apps",
            description:
                "Flutter enables code sharing between iOS and Android. Apps work offline with local QR generation. Biometric authentication and encrypted token storage provide security. Zero network calls required for basic scanning.",
            tech: "Flutter, Riverpod state management, flutter_secure_storage",
        },
        {
            icon: BarChart3,
            title: "Real-Time Analytics",
            description:
                "Live dashboards track occupancy, check-ins, revenue, and fraud signals. WebSocket support for live updates. Historical data stored for trend analysis. Export reports in CSV/PDF formats.",
            tech: "Real-time updates, Time-series data, Aggregations",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Header */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h1 className="text-6xl font-black mb-6 text-white">
                    Deep{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Technical Features
                    </span>
                </h1>
                <p className="text-2xl text-gray-300 max-w-3xl">
                    Built with cryptography, performance, and security as core
                    principles. Explore the technical depth that makes CLOAK
                    fraud-proof.
                </p>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transition"
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
                                        Technology Stack:
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {feature.tech}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Architecture Overview */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    System Architecture
                </h2>
                <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-12">
                    <div className="space-y-12">
                        {/* Layer 1: API Layer */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        API Layer (Go/Fiber)
                                    </h3>
                                    <p className="text-gray-400">
                                        RESTful endpoints with JWT middleware
                                        and role-based access control
                                    </p>
                                </div>
                            </div>
                            <div className="ml-12 space-y-2 text-gray-300">
                                <p>
                                    • /auth/* → User login, registration, token
                                    refresh
                                </p>
                                <p>
                                    • /businesses/* → Business dashboard
                                    operations
                                </p>
                                <p>
                                    • /tickets/* → Ticket purchasing and QR
                                    retrieval
                                </p>
                                <p>• /scan/* → QR verification and check-in</p>
                            </div>
                        </div>

                        {/* Layer 2: Business Logic */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        Business Logic Layer (Usecase)
                                    </h3>
                                    <p className="text-gray-400">
                                        Domain-driven design with clear
                                        separation of concerns
                                    </p>
                                </div>
                            </div>
                            <div className="ml-12 space-y-2 text-gray-300">
                                <p>
                                    • AuthUsecase: Registration, login, token
                                    generation
                                </p>
                                <p>
                                    • TicketUsecase: Purchasing, QR generation,
                                    signature verification
                                </p>
                                <p>
                                    • ServiceUsecase: Event CRUD, slot
                                    management
                                </p>
                            </div>
                        </div>

                        {/* Layer 3: Data Access */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        Data Access Layer (Repository Pattern)
                                    </h3>
                                    <p className="text-gray-400">
                                        5 specialized repositories with
                                        optimized queries
                                    </p>
                                </div>
                            </div>
                            <div className="ml-12 space-y-2 text-gray-300">
                                <p>
                                    • BusinessRepository: Company data, settings
                                </p>
                                <p>
                                    • CustomerRepository: User profiles,
                                    authentication
                                </p>
                                <p>
                                    • ServiceRepository: Events, capacity
                                    management
                                </p>
                                <p>
                                    • SlotRepository: Availability with
                                    row-level locking
                                </p>
                                <p>
                                    • TicketRepository: Purchase history, QR
                                    tracking
                                </p>
                            </div>
                        </div>

                        {/* Layer 4: Database */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        Database Layer (PostgreSQL 16)
                                    </h3>
                                    <p className="text-gray-400">
                                        ACID-compliant with advanced concurrency
                                        control
                                    </p>
                                </div>
                            </div>
                            <div className="ml-12 space-y-2 text-gray-300">
                                <p>• Normalized schema with foreign keys</p>
                                <p>
                                    • Indexes on filtered columns for query
                                    performance
                                </p>
                                <p>
                                    • Connection pooling (pgxpool) for
                                    efficiency
                                </p>
                                <p>
                                    • Transaction isolation level: READ
                                    COMMITTED
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Principles */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Security Principles
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-8">
                        <Shield className="w-12 h-12 text-red-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">
                            No Trust in Client
                        </h3>
                        <p className="text-gray-300">
                            Server validates everything. Client QR codes are
                            always re-verified cryptographically before any
                            action is taken. Business secrets never leave the
                            server.
                        </p>
                    </div>
                    <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-8">
                        <Lock className="w-12 h-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">
                            Zero Trust Architecture
                        </h3>
                        <p className="text-gray-300">
                            Every request is authenticated and authorized.
                            Role-based access control (RBAC) enforced at
                            middleware level. No implicit grants.
                        </p>
                    </div>
                    <div className="bg-blue-900/30 border border-blue-500/50 rounded-xl p-8">
                        <Zap className="w-12 h-12 text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">
                            Defense in Depth
                        </h3>
                        <p className="text-gray-300">
                            Multiple layers of security: cryptography, rate
                            limiting, input validation, SQL injection
                            prevention, CORS policies, X-Frame-Options headers.
                        </p>
                    </div>
                    <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-8">
                        <Users className="w-12 h-12 text-yellow-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">
                            Least Privilege
                        </h3>
                        <p className="text-gray-300">
                            Database users have minimal required permissions.
                            API endpoints return only necessary data. Audit
                            trails track all sensitive operations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Performance Metrics */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Performance Benchmarks
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 text-center">
                        <p className="text-5xl font-bold text-purple-400 mb-2">
                            &lt;50ms
                        </p>
                        <p className="text-gray-300">Average QR Verification</p>
                        <p className="text-sm text-gray-400 mt-4">
                            Cryptographic signature validation
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8 text-center">
                        <p className="text-5xl font-bold text-cyan-400 mb-2">
                            99.9%
                        </p>
                        <p className="text-gray-300">Uptime SLA</p>
                        <p className="text-sm text-gray-400 mt-4">
                            Enterprise grade infrastructure
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 text-center">
                        <p className="text-5xl font-bold text-purple-400 mb-2">
                            10k+
                        </p>
                        <p className="text-gray-300">Concurrent Scans</p>
                        <p className="text-sm text-gray-400 mt-4">
                            Simultaneous processing capacity
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;
