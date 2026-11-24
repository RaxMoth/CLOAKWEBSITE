import React from "react";
import { AlertTriangle, CircleSlash } from "lucide-react";
import { formatCount, formatShare } from "../format";

/**
 * A single number with its label: the form for a value that is a headline,
 * not a trend. Values use the body font with proportional figures.
 */
export const StatTile: React.FC<{
    label: string;
    value: string;
    hint?: string;
    /** The one number the page leads with. */
    hero?: boolean;
    children?: React.ReactNode;
    className?: string;
}> = ({ label, value, hint, hero = false, children, className = "" }) => (
    <div className={`card flex flex-col p-5 sm:p-6 ${className}`}>
        <p className="text-sm font-bold text-ink-soft">{label}</p>
        <p
            className={`mt-1 font-sans font-extrabold text-ink ${
                hero ? "text-5xl" : "text-3xl"
            }`}
        >
            {value}
        </p>
        {hint && <p className="mt-1 text-sm text-ink-soft">{hint}</p>}
        {children}
    </div>
);

type MeterLevel = "normal" | "almost-full" | "full";

const levelOf = (occupied: number, total: number): MeterLevel => {
    if (total <= 0) return "normal";
    if (occupied >= total) return "full";
    if (occupied / total >= 0.85) return "almost-full";
    return "normal";
};

// The fill carries the state; the track is a lighter step of the same hue.
const levelStyles: Record<MeterLevel, { fill: string; track: string }> = {
    normal: { fill: "bg-leaf", track: "bg-mint" },
    "almost-full": { fill: "bg-apricot-dark", track: "bg-apricot-light" },
    full: { fill: "bg-danger", track: "bg-terracotta-light" },
};

/**
 * How full a set of slots is. "Almost full" and "Full" are also said in
 * words with an icon, so the state never depends on colour alone.
 */
export const OccupancyMeter: React.FC<{
    occupied: number;
    total: number;
    /** What is being measured, for screen readers. */
    label: string;
    className?: string;
}> = ({ occupied, total, label, className = "" }) => {
    const level = levelOf(occupied, total);
    const style = levelStyles[level];
    const share = total > 0 ? Math.min(occupied / total, 1) : 0;
    return (
        <div className={className}>
            <div
                role="meter"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={occupied}
                aria-valuetext={`${formatCount(occupied)} of ${formatCount(total)} slots occupied`}
                className={`h-2.5 w-full overflow-hidden rounded-full ${style.track}`}
            >
                <div
                    className={`h-full rounded-full ${style.fill}`}
                    style={{ width: `${share * 100}%` }}
                ></div>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
                <span>
                    {formatCount(occupied)} of {formatCount(total)} slots,{" "}
                    {formatShare(occupied, total)}
                </span>
                {level === "almost-full" && (
                    <span className="inline-flex items-center gap-1 font-extrabold text-apricot-ink">
                        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                        Almost full
                    </span>
                )}
                {level === "full" && (
                    <span className="inline-flex items-center gap-1 font-extrabold text-terracotta-ink">
                        <CircleSlash className="h-4 w-4" aria-hidden="true" />
                        Full
                    </span>
                )}
            </p>
        </div>
    );
};
