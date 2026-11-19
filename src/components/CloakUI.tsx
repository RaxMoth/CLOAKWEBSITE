import React from "react";
import type { LucideIcon } from "lucide-react";
import { Squiggle } from "./Waves";

/**
 * Small building blocks of the CLOAK look, matching the mobile app's
 * `cloak_ui.dart`: the hanger mark, icon pebbles, chips, section headings
 * with a squiggle, and the scalloped ticket card.
 */

type Tone = "mint" | "apricot" | "terracotta" | "sand";

const toneStyles: Record<Tone, { surface: string; ink: string }> = {
    mint: { surface: "bg-mint", ink: "text-forest" },
    apricot: { surface: "bg-apricot-light", ink: "text-apricot-ink" },
    terracotta: { surface: "bg-terracotta-light", ink: "text-terracotta-ink" },
    sand: { surface: "bg-sand", ink: "text-ink-soft" },
};

/** The coat hanger from the app's welcome screen. */
export const HangerIcon: React.FC<{ className?: string }> = ({
    className = "",
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
    >
        <path d="M12 9.4V8.6a2.3 2.3 0 1 0-2.3-2.3" />
        <path d="M12 9.4 3.7 15.5a1.25 1.25 0 0 0 .74 2.25h15.12a1.25 1.25 0 0 0 .74-2.25L12 9.4Z" />
    </svg>
);

/** The logo: the hanger on a cream disc with a sage ring. */
export const HangerMark: React.FC<{ size?: number; className?: string }> = ({
    size = 40,
    className = "",
}) => (
    <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-cream text-leaf ${className}`}
        style={{
            width: size,
            height: size,
            boxShadow: `0 0 0 ${Math.max(2, Math.round(size / 16))}px #9CCBAA`,
        }}
    >
        <HangerIcon className="h-[58%] w-[58%]" />
    </span>
);

/** An icon on a soft, slightly uneven pebble instead of a perfect circle. */
export const IconBlob: React.FC<{
    icon: LucideIcon | React.FC<{ className?: string }>;
    tone?: Tone;
    size?: "sm" | "md" | "lg";
    className?: string;
}> = ({ icon: Icon, tone = "mint", size = "md", className = "" }) => {
    const box = { sm: "h-11 w-11", md: "h-14 w-14", lg: "h-20 w-20" }[size];
    const glyph = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-10 w-10" }[size];
    const style = toneStyles[tone];
    return (
        <span
            className={`blob inline-flex shrink-0 items-center justify-center ${box} ${style.surface} ${style.ink} ${className}`}
        >
            <Icon className={glyph} aria-hidden="true" />
        </span>
    );
};

/** Small rounded label, e.g. a status or a count. */
export const Chip: React.FC<{
    tone?: Tone;
    children: React.ReactNode;
    className?: string;
}> = ({ tone = "mint", children, className = "" }) => {
    const style = toneStyles[tone];
    return (
        <span className={`chip ${style.surface} ${style.ink} ${className}`}>
            {children}
        </span>
    );
};

/** Section heading with the squiggle underneath and an optional intro line. */
export const SectionHeading: React.FC<{
    title: React.ReactNode;
    intro?: React.ReactNode;
    align?: "left" | "center";
    as?: "h2" | "h3";
    className?: string;
}> = ({ title, intro, align = "left", as: Tag = "h2", className = "" }) => {
    const centered = align === "center";
    return (
        <div
            className={`${centered ? "text-center" : ""} ${className}`}
        >
            <Tag className="text-3xl sm:text-4xl">{title}</Tag>
            <Squiggle className={`mt-3 ${centered ? "mx-auto" : ""}`} />
            {intro && (
                <p
                    className={`mt-4 max-w-2xl text-lg text-ink-soft ${
                        centered ? "mx-auto" : ""
                    }`}
                >
                    {intro}
                </p>
            )}
        </div>
    );
};

/**
 * A card shaped like a torn-off ticket: rounded top, scalloped bottom edge.
 * The shadow is a drop-shadow filter so it follows the scallops.
 */
export const TicketCard: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = "" }) => (
    <div
        className={className}
        style={{ filter: "drop-shadow(0 8px 14px rgba(74, 59, 20, 0.16))" }}
    >
        <div className="rounded-t-[26px] bg-surface px-6 pb-5 pt-6 sm:px-8 sm:pt-8">
            {children}
        </div>
        <div
            aria-hidden="true"
            className="h-[9px]"
            style={{
                backgroundImage:
                    "radial-gradient(ellipse 12px 9px at 12px 0, #FFFDF8 98%, transparent 100%)",
                backgroundSize: "24px 9px",
                backgroundRepeat: "repeat-x",
            }}
        />
    </div>
);
