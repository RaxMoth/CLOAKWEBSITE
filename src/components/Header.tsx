import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { APP_CONFIG } from "../config/app";
import { HangerMark } from "./CloakUI";

// The selected link sits in a mint pill, like the tabs of the app's
// bottom navigation.
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 font-extrabold transition focus-visible:outline-on-leaf ${
        isActive
            ? "bg-mint text-forest"
            : "text-on-leaf/90 hover:bg-white/15 hover:text-on-leaf"
    }`;

const StageMarker: React.FC = () => (
    <>
        <span className="h-2 w-2 rounded-full bg-apricot"></span>
        {APP_CONFIG.stage}
    </>
);

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-forest to-leaf text-on-leaf">
            <div className="mx-auto max-w-7xl px-6 py-3 sm:px-12 lg:px-20">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 font-display text-2xl font-semibold text-on-leaf transition hover:opacity-90 focus-visible:outline-on-leaf"
                    >
                        <HangerMark size={38} />
                        {APP_CONFIG.name}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        aria-label="Main"
                        className="hidden items-center gap-1 md:flex"
                    >
                        {APP_CONFIG.navigation.map((item) => (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                end={item.href === "/"}
                                className={navLinkClass}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <Link
                            to="/status"
                            className="chip ml-3 bg-apricot-light text-apricot-ink transition hover:bg-apricot focus-visible:outline-on-leaf"
                        >
                            <StageMarker />
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25 focus-visible:outline-on-leaf md:hidden"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav
                        aria-label="Main"
                        className="mt-3 flex flex-col items-start gap-2 pb-4 md:hidden"
                    >
                        {APP_CONFIG.navigation.map((item) => (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                end={item.href === "/"}
                                onClick={() => setMobileMenuOpen(false)}
                                className={navLinkClass}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <p className="chip ml-1 mt-1 bg-apricot-light text-apricot-ink">
                            <StageMarker />
                        </p>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
