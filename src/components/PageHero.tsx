import React from "react";
import { HeaderWaves } from "./Waves";

interface PageHeroProps {
    /** Small line above the title, e.g. a status marker. */
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    /** Buttons or other content under the subtitle. */
    children?: React.ReactNode;
    /** Content shown beside the text on wide screens, e.g. a phone. */
    aside?: React.ReactNode;
}

/**
 * The green wave header that opens every page, like the app's WaveHeader:
 * a forest-to-leaf gradient with two soft bubbles and a layered wave edge.
 * It continues the site header's gradient, so the two read as one block.
 */
const PageHero: React.FC<PageHeroProps> = ({
    eyebrow,
    title,
    subtitle,
    children,
    aside,
}) => {
    return (
        <div>
            <section className="relative overflow-hidden bg-gradient-to-r from-forest to-leaf text-on-leaf">
                {/* Two soft bubbles so the green is not a flat block */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-white/[0.07]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/[0.07]"
                />

                <div
                    className={`relative mx-auto max-w-7xl px-6 pb-10 pt-12 sm:px-12 sm:pt-16 lg:px-20 ${
                        aside
                            ? "grid items-center gap-12 md:grid-cols-2"
                            : ""
                    }`}
                >
                    <div className={aside ? "" : "max-w-3xl"}>
                        {eyebrow && <div className="mb-6">{eyebrow}</div>}
                        <h1 className="text-4xl text-on-leaf sm:text-6xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-6 text-lg font-semibold leading-relaxed text-on-leaf/95 sm:text-xl">
                                {subtitle}
                            </p>
                        )}
                        {children && <div className="mt-8">{children}</div>}
                    </div>
                    {aside && <div className="relative">{aside}</div>}
                </div>
            </section>
            <HeaderWaves />
        </div>
    );
};

export default PageHero;
