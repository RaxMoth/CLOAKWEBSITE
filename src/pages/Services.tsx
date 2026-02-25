import React from "react";
import { Check, X } from "lucide-react";

const Services: React.FC = () => {
    const tiers = [
        {
            name: "Startup",
            price: "$299",
            period: "/month",
            description: "Perfect for smaller events and venues",
            features: [
                "Up to 10,000 tickets/month",
                "1 event manager account",
                "Basic analytics dashboard",
                "Email support",
                "Custom QR branding",
                "Mobile app access",
            ],
            notIncluded: [
                "API access",
                "White-label option",
                "Priority support",
                "Advanced analytics",
            ],
            highlight: false,
        },
        {
            name: "Professional",
            price: "$999",
            period: "/month",
            description: "For growing venues and event networks",
            features: [
                "Up to 100,000 tickets/month",
                "Up to 5 team members",
                "Advanced analytics & reporting",
                "Priority email & chat support",
                "Custom QR branding",
                "Mobile app access",
                "API access (rate limited)",
                "Webhook integration",
            ],
            notIncluded: [
                "White-label option",
                "Phone support",
                "Custom integrations",
            ],
            highlight: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "pricing",
            description: "For large-scale operations and networks",
            features: [
                "Unlimited tickets/month",
                "Unlimited team members",
                "Custom analytics & reporting",
                "24/7 phone support",
                "White-label platform",
                "Full API access",
                "Custom integrations",
                "Dedicated account manager",
                "SLA guarantee (99.9% uptime)",
                "On-premise deployment option",
            ],
            notIncluded: [],
            highlight: false,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Header */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h1 className="text-6xl font-black mb-6 text-white">
                    Pricing{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Plans
                    </span>
                </h1>
                <p className="text-2xl text-gray-300 max-w-3xl">
                    Flexible pricing designed for venues of all sizes. Start
                    small, grow with us.
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl overflow-hidden transition transform hover:scale-105 ${
                                tier.highlight
                                    ? "ring-2 ring-purple-500 bg-gradient-to-br from-purple-900/50 to-slate-800/50 border border-purple-500/50"
                                    : "bg-slate-800/50 border border-slate-700/50"
                            }`}
                        >
                            {tier.highlight && (
                                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 text-center">
                                    <span className="text-white font-bold">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {tier.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    {tier.description}
                                </p>

                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">
                                        {tier.price}
                                    </span>
                                    <span className="text-gray-400 ml-2">
                                        {tier.period}
                                    </span>
                                </div>

                                <button
                                    className={`w-full py-3 rounded-lg font-bold mb-8 transition ${
                                        tier.highlight
                                            ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-purple-500/50"
                                            : "bg-slate-700 text-white hover:bg-slate-600"
                                    }`}
                                >
                                    Get Started
                                </button>

                                <div className="space-y-4 mb-8">
                                    <p className="text-sm font-bold text-gray-300">
                                        Included:
                                    </p>
                                    {tier.features.map((feature, fIndex) => (
                                        <div
                                            key={fIndex}
                                            className="flex items-start gap-3"
                                        >
                                            <Check
                                                size={20}
                                                className="text-cyan-400 flex-shrink-0 mt-0.5"
                                            />
                                            <span className="text-gray-300 text-sm">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {tier.notIncluded.length > 0 && (
                                    <div className="space-y-4 border-t border-slate-700 pt-6">
                                        <p className="text-sm font-bold text-gray-400">
                                            Not included:
                                        </p>
                                        {tier.notIncluded.map(
                                            (feature, fIndex) => (
                                                <div
                                                    key={fIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <X
                                                        size={20}
                                                        className="text-gray-500 flex-shrink-0 mt-0.5"
                                                    />
                                                    <span className="text-gray-500 text-sm">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Add-ons */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Optional Add-ons
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                            White-Label Platform
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Re-brand CLOAK as your own. Custom domain, theme,
                            emails.
                        </p>
                        <p className="text-2xl font-bold text-purple-400">
                            $2,000/mo
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                            24/7 Phone Support
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Dedicated support line for your venue's critical
                            operations.
                        </p>
                        <p className="text-2xl font-bold text-cyan-400">
                            $500/mo
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                            Custom Integration
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Connect CLOAK with your existing ticketing or POS
                            systems.
                        </p>
                        <p className="text-2xl font-bold text-purple-400">
                            Custom Quote
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                            Dedicated Onboarding
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Personal implementation specialist for smooth
                            launch.
                        </p>
                        <p className="text-2xl font-bold text-cyan-400">
                            $1,500
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-3">
                            Can I change plans anytime?
                        </h3>
                        <p className="text-gray-300">
                            Yes! You can upgrade or downgrade your plan at any
                            time. Changes take effect on your next billing
                            cycle.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-3">
                            Do you offer annual discounts?
                        </h3>
                        <p className="text-gray-300">
                            Absolutely! Pay annually and receive 20% off.
                            Contact sales for details.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-3">
                            Is there a free trial?
                        </h3>
                        <p className="text-gray-300">
                            Yes, we offer a 14-day free trial for Startup plans.
                            No credit card required.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-3">
                            What if I exceed my ticket limit?
                        </h3>
                        <p className="text-gray-300">
                            We'll notify you when approaching your limit. You
                            can upgrade anytime, or we can set overage pricing.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/50 rounded-2xl p-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Need a Custom Quote?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        For enterprise deployments or special requirements, our
                        sales team can create a tailored package for you.
                    </p>
                    <button className="px-12 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 text-white">
                        Contact Sales
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Services;
