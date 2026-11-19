import React from "react";

/**
 * The wave shapes of the CLOAK look, ported from the mobile app
 * (CLOAKMobile/lib/shared/components/cloak_ui.dart): layered sine waves
 * under the green header, soft waves at the bottom of a page, and a
 * squiggly line under section headings.
 *
 * The strips are drawn in a fixed 1440-wide box and stretched to the
 * element's width, so the number of waves across the page stays the same
 * at every screen size, as it does in the app.
 */

const WIDTH = 1440;

interface WaveSpec {
    baseline: number;
    amplitude: number;
    waves: number;
    phase: number;
}

/** Points of a sine wave running left to right across the strip. */
const wavePoints = ({ baseline, amplitude, waves, phase }: WaveSpec) => {
    const points: string[] = [];
    for (let x = 0; x <= WIDTH; x += 12) {
        const y =
            baseline +
            amplitude * Math.sin((x / WIDTH) * waves * 2 * Math.PI + phase);
        points.push(`${x},${y.toFixed(2)}`);
    }
    return points.join(" L");
};

/** A closed shape filled from the top edge down to a wave. */
const waveDown = (spec: WaveSpec) =>
    `M0,0 L${wavePoints(spec)} L${WIDTH},0 Z`;

/** A closed shape filled from a wave down to the bottom edge. */
const waveUp = (spec: WaveSpec, height: number) =>
    `M0,${height} L${wavePoints(spec)} L${WIDTH},${height} Z`;

const HEADER_HEIGHT = 64;

// Three overlapping waves, lightest at the back (same numbers as the app's
// header painter, measured from the bottom of the header).
const headerBack = waveDown({ baseline: HEADER_HEIGHT - 12, amplitude: 11, waves: 1.4, phase: 0.4 });
const headerMid = waveDown({ baseline: HEADER_HEIGHT - 25, amplitude: 12, waves: 1.1, phase: 2.6 });
const headerFront = waveDown({ baseline: HEADER_HEIGHT - 39, amplitude: 11, waves: 0.9, phase: 4.4 });

/**
 * The wavy bottom edge of a green header. Place it directly after an
 * element with the `bg-gradient-to-r from-forest to-leaf` background: the
 * front wave uses the same left-to-right gradient, so the two join
 * without a seam.
 */
export const HeaderWaves: React.FC<{ className?: string }> = ({
    className = "",
}) => (
    <svg
        viewBox={`0 0 ${WIDTH} ${HEADER_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`-mt-px block h-12 w-full sm:h-16 lg:h-20 ${className}`}
    >
        <defs>
            <linearGradient
                id="cloak-header-green"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2={WIDTH}
                y2="0"
            >
                <stop offset="0" stopColor="#244F38" />
                <stop offset="1" stopColor="#387452" />
            </linearGradient>
        </defs>
        <path d={headerBack} fill="#9CCBAA" fillOpacity="0.6" />
        <path d={headerMid} fill="#5C9A76" />
        <path d={headerFront} fill="url(#cloak-header-green)" />
    </svg>
);

const BOTTOM_HEIGHT = 120;

const bottomBack = waveUp({ baseline: 30, amplitude: 14, waves: 1.2, phase: 1.0 }, BOTTOM_HEIGHT);
const bottomMid = waveUp({ baseline: 58, amplitude: 12, waves: 1.0, phase: 3.3 }, BOTTOM_HEIGHT);
const bottomFront = waveUp({ baseline: 86, amplitude: 9, waves: 1.6, phase: 5.2 }, BOTTOM_HEIGHT);

/**
 * Soft waves for the bottom of a page: mint, sand, then the footer's
 * sage wash, so the footer can follow directly underneath.
 */
export const BottomWaves: React.FC<{ className?: string }> = ({
    className = "",
}) => (
    <svg
        viewBox={`0 0 ${WIDTH} ${BOTTOM_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`block h-20 w-full sm:h-28 ${className}`}
    >
        <path d={bottomBack} fill="#DDEEDC" fillOpacity="0.75" />
        <path d={bottomMid} fill="#F4EBD6" />
        <path d={bottomFront} fill="#D5E0C7" />
    </svg>
);

/** A squiggly line to sit under a heading instead of a straight rule. */
export const Squiggle: React.FC<{
    width?: number;
    color?: string;
    className?: string;
}> = ({ width = 96, color = "#9CCBAA", className = "" }) => {
    const amplitude = 3;
    const wavelength = 20;
    const height = 14;
    const mid = height / 2;
    const points: string[] = [];
    for (let x = 0; x <= width; x += 2) {
        const y = mid + amplitude * Math.sin((x / wavelength) * 2 * Math.PI);
        points.push(`${x},${y.toFixed(2)}`);
    }
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden="true"
            className={`block ${className}`}
        >
            <path
                d={`M${points.join(" L")}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};
