import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-purple-500/30 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                            CLOAK
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Secure, fraud-proof digital ticketing for events of
                            all sizes. Built with cryptography at its core.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">
                            Product
                        </h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-purple-400 transition"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/services"
                                    className="hover:text-purple-400 transition"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-purple-400 transition"
                                >
                                    Security
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-purple-400 transition"
                                >
                                    API Docs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">
                            Company
                        </h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-purple-400 transition"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-purple-400 transition"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-purple-400 transition"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-purple-400 transition"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">
                            Legal
                        </h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-purple-400 transition"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-purple-400 transition"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-purple-400 transition"
                                >
                                    Cookie Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-purple-400 transition"
                                >
                                    Compliance
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700/50 pt-8 mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} CLOAK. All rights
                        reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition transform hover:scale-125"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition transform hover:scale-125"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition transform hover:scale-125"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:hello@cloak.app"
                            className="text-gray-400 hover:text-purple-400 transition transform hover:scale-125"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
