import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
                        CLOAK
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8 items-center">
                        <Link
                            to="/"
                            className="hover:text-purple-400 transition font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="hover:text-purple-400 transition font-medium"
                        >
                            About
                        </Link>
                        <Link
                            to="/features"
                            className="hover:text-purple-400 transition font-medium"
                        >
                            Features
                        </Link>
                        <Link
                            to="/services"
                            className="hover:text-purple-400 transition font-medium"
                        >
                            Pricing
                        </Link>
                        <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105">
                            Get Started
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 space-y-4 pb-6">
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block hover:text-purple-400 transition font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block hover:text-purple-400 transition font-medium"
                        >
                            About
                        </Link>
                        <Link
                            to="/features"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block hover:text-purple-400 transition font-medium"
                        >
                            Features
                        </Link>
                        <Link
                            to="/services"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block hover:text-purple-400 transition font-medium"
                        >
                            Pricing
                        </Link>
                        <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition">
                            Get Started
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
