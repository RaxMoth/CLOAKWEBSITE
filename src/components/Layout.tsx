import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePageMeta } from "../hooks/usePageMeta";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    usePageMeta();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
