import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, CircleDashed, CircleOff } from "lucide-react";
import { APP_CONFIG } from "../config/app";
import { STATUS_GROUPS, StatusGroup } from "../config/status";

const groupStyle: Record<
    StatusGroup["id"],
    { icon: typeof CheckCircle; border: string; text: string; badge: string }
> = {
    working: {
        icon: CheckCircle,
        border: "border-green-500/40",
        text: "text-green-400",
        badge: "bg-green-500/15 text-green-300",
    },
    partial: {
        icon: CircleDashed,
        border: "border-amber-400/40",
        text: "text-amber-300",
        badge: "bg-amber-400/15 text-amber-200",
    },
    missing: {
        icon: CircleOff,
        border: "border-slate-500/50",
        text: "text-gray-400",
        badge: "bg-slate-500/20 text-gray-300",
    },
};

const Status: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            {/* Header */}
            <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-black mb-6 text-white">
                    Project{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        status
                    </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl">
                    CLOAK is in development and has not been released. This
                    page lists what works in the current build, what is half
                    done and what does not exist yet.
                </p>
                <p className="mt-6 text-gray-400">
                    Last updated {APP_CONFIG.lastUpdated}.
                </p>
            </section>

            {/* Summary */}
            <section className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-3 gap-4 sm:gap-8">
                    {STATUS_GROUPS.map((group) => {
                        const style = groupStyle[group.id];
                        return (
                            <a
                                key={group.id}
                                href={`#${group.id}`}
                                className={`bg-slate-800/50 border rounded-xl p-4 sm:p-6 text-center transition hover:bg-slate-800 ${style.border}`}
                            >
                                <p
                                    className={`text-3xl sm:text-5xl font-bold mb-2 ${style.text}`}
                                >
                                    {group.items.length}
                                </p>
                                <p className="text-sm sm:text-base text-gray-300">
                                    {group.title}
                                </p>
                            </a>
                        );
                    })}
                </div>
            </section>

            {/* Groups */}
            {STATUS_GROUPS.map((group) => {
                const style = groupStyle[group.id];
                const Icon = style.icon;
                return (
                    <section
                        key={group.id}
                        id={group.id}
                        className="py-12 sm:py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto scroll-mt-24"
                    >
                        <div className="mb-8 flex flex-wrap items-center gap-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                {group.title}
                            </h2>
                            <span
                                className={`rounded-full px-3 py-1 text-sm font-semibold ${style.badge}`}
                            >
                                {group.items.length} items
                            </span>
                        </div>
                        <p className="text-gray-300 text-lg mb-8">
                            {group.summary}
                        </p>
                        <ul className="grid md:grid-cols-2 gap-6">
                            {group.items.map((item) => (
                                <li
                                    key={item.title}
                                    className={`flex gap-4 bg-slate-800/50 border rounded-xl p-6 ${style.border}`}
                                >
                                    <Icon
                                        className={`mt-1 h-6 w-6 shrink-0 ${style.text}`}
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {item.detail}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}

            {/* Next */}
            <section className="py-12 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/50 rounded-2xl p-8 sm:p-12 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Want the details?
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        The walkthrough shows each step with real screens, and
                        the features page explains how tickets are signed and
                        slots are locked.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/about"
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition text-white"
                        >
                            How it works
                        </Link>
                        <Link
                            to="/features"
                            className="px-8 py-4 border-2 border-purple-400 rounded-lg font-bold text-lg hover:bg-purple-400/10 transition text-white"
                        >
                            Features
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Status;
