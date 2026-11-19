import React from "react";
import { Link } from "react-router-dom";
import { APP_CONFIG } from "../config/app";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-purple-500/30 text-white">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
                    {/* Brand Section */}
                    <div className="md:col-span-2 max-w-md">
                        <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                            {APP_CONFIG.name}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {APP_CONFIG.description}
                        </p>
                        <p className="mt-4 text-sm text-amber-300">
                            {APP_CONFIG.stage}. Not publicly released yet.
                        </p>
                    </div>

                    {/* Site links */}
                    <nav aria-label="Footer">
                        <h3 className="text-lg font-bold mb-5 text-white">
                            Explore
                        </h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            {APP_CONFIG.navigation.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        to={item.href}
                                        className="hover:text-purple-400 transition"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between gap-3 text-gray-400 text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} {APP_CONFIG.name}.
                        All rights reserved.
                    </p>
                    <p>Status last updated {APP_CONFIG.lastUpdated}.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
