import React from "react";
import { Star, Users, TrendingUp, Award } from "lucide-react";

const Portfolio: React.FC = () => {
    const useCases = [
        {
            icon: Users,
            title: "Music Festivals",
            subtitle: "50,000+ attendees",
            description:
                "Large-scale festivals use CLOAK to handle massive ticket volumes with zero fraud. Real-time capacity tracking prevents overbooking. Fast scanning ensures smooth entry even during peak hours.",
            stats: "5M+ tickets issued",
        },
        {
            icon: Award,
            title: "Premium Venues",
            subtitle: "VIP experiences",
            description:
                "Luxury venues and exclusive clubs use CLOAK to verify member status instantly. HMAC-signed QR codes prevent ticket reselling. Premium support ensures never a scan failure during critical moments.",
            stats: "500+ venues",
        },
        {
            icon: TrendingUp,
            title: "Event Networks",
            subtitle: "Multi-event coordination",
            description:
                "Companies managing dozens of concurrent events use CLOAK's white-label platform. Centralized dashboard tracks all events. Custom analytics reveal attendee patterns and optimize future events.",
            stats: "$500M+ revenue protected",
        },
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            title: "Director of Operations, MegaFest Music Festival",
            quote: "CLOAK eliminated our counterfeit ticket problem overnight. The sub-100ms scanning means we never have crowds backing up at the gate. Our revenue protection alone pays for the platform 10x over.",
            avatar: "SC",
        },
        {
            name: "Marcus Rodriguez",
            title: "Owner, The Eden Nightclub",
            quote: "We were losing $50k/month to fake tickets. After switching to CLOAK, that dropped to zero. The security is top-notch, and our staff loves how fast the scanning is.",
            avatar: "MR",
        },
        {
            name: "James Liu",
            title: "VP of Ticketing, Global Events Inc.",
            quote: "CLOAK's API integration was painless. We integrated it into our existing system in 2 weeks. The cryptographic guarantees give us confidence in every ticket we sell.",
            avatar: "JL",
        },
        {
            name: "Emma Thompson",
            title: "Head of Technology, Premier Theater Group",
            quote: "CLOAK isn't just secure—it's scalable. We tested it with 10,000 concurrent scans. Zero failures, under 100ms per scan. This is production-grade infrastructure.",
            avatar: "ET",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Header */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h1 className="text-6xl font-black mb-6 text-white">
                    Use Cases &{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Testimonials
                    </span>
                </h1>
                <p className="text-2xl text-gray-300 max-w-3xl">
                    See how businesses across industries are eliminating ticket
                    fraud with CLOAK.
                </p>
            </section>

            {/* Use Cases */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Industry Applications
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {useCases.map((useCase, index) => {
                        const Icon = useCase.icon;
                        return (
                            <div
                                key={index}
                                className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 transition hover:shadow-xl hover:shadow-purple-500/20"
                            >
                                <Icon className="w-12 h-12 text-purple-400 mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-1">
                                    {useCase.title}
                                </h3>
                                <p className="text-purple-400 text-sm mb-4">
                                    {useCase.subtitle}
                                </p>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {useCase.description}
                                </p>
                                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-2">
                                    <p className="text-cyan-400 font-bold text-sm">
                                        {useCase.stats}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Results Metrics */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Results
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 text-center">
                        <p className="text-5xl font-bold text-purple-400 mb-2">
                            100%
                        </p>
                        <p className="text-gray-300">Fraud Prevention Rate</p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8 text-center">
                        <p className="text-5xl font-bold text-cyan-400 mb-2">
                            &lt;100ms
                        </p>
                        <p className="text-gray-300">Average Scan Time</p>
                    </div>
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 text-center">
                        <p className="text-5xl font-bold text-purple-400 mb-2">
                            99.9%
                        </p>
                        <p className="text-gray-300">System Uptime</p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-8 text-center">
                        <p className="text-5xl font-bold text-cyan-400 mb-2">
                            4.9/5
                        </p>
                        <p className="text-gray-300">Customer Satisfaction</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    What Our Customers Say
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 transition"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-white">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {testimonial.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/50 rounded-2xl p-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Protect Your Revenue?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join hundreds of venues and events already using CLOAK.
                        Start your free trial today.
                    </p>
                    <button className="px-12 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 text-white">
                        Start Your Free Trial
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
