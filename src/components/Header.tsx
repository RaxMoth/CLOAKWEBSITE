import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { APP_CONFIG } from "../config/app";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition font-medium hover:text-purple-400 ${
        isActive ? "text-purple-400" : "text-white"
    }`;

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-slate-950 to-slate-900 border-b border-purple-500/30 text-white shadow-lg sticky top-0 z-50 backdrop-blur">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition"
                    >
                        {APP_CONFIG.name}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        aria-label="Main"
                        className="hidden md:flex gap-8 items-center"
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
                            className="flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-1.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20"
                        >
                            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                            {APP_CONFIG.stage}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav
                        aria-label="Main"
                        className="md:hidden mt-4 flex flex-col gap-4 pb-6"
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
                        <p className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                            {APP_CONFIG.stage}
                        </p>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
