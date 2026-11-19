import React from "react";
import { Link } from "react-router-dom";
import { APP_CONFIG } from "../config/app";
import { Chip, HangerMark } from "./CloakUI";
import { BottomWaves } from "./Waves";

const Footer: React.FC = () => {
    return (
        <footer className="mt-10 text-ink">
            {/* The app's bottom waves lead into the footer */}
            <BottomWaves />
            <div className="bg-sagewash">
                <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 sm:px-12 lg:px-20">
                    <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3">
                        {/* Brand Section */}
                        <div className="max-w-md md:col-span-2">
                            <p className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold text-forest">
                                <HangerMark size={38} />
                                {APP_CONFIG.name}
                            </p>
                            <p className="leading-relaxed text-forest">
                                {APP_CONFIG.description}
                            </p>
                            <Chip tone="apricot" className="mt-4">
                                <span className="h-2 w-2 rounded-full bg-apricot-dark"></span>
                                {APP_CONFIG.stage}. Not publicly released yet.
                            </Chip>
                        </div>

                        {/* Site links */}
                        <nav aria-label="Footer">
                            <h2 className="mb-4 text-xl text-forest">
                                Explore
                            </h2>
                            <ul className="space-y-2">
                                {APP_CONFIG.navigation.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            to={item.href}
                                            className="font-bold text-forest underline-offset-4 transition hover:underline"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="flex flex-col justify-between gap-2 border-t border-forest/15 pt-6 text-sm font-semibold text-forest md:flex-row">
                        <p>
                            &copy; {new Date().getFullYear()}{" "}
                            {APP_CONFIG.name}. All rights reserved.
                        </p>
                        <p>Status last updated {APP_CONFIG.lastUpdated}.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
