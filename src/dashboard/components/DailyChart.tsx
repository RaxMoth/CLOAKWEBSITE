import React, { useEffect, useId, useMemo, useState } from "react";
import { formatCount, formatDayLong, formatDayShort } from "../format";
import { DayStats } from "../types";

/**
 * Tickets issued and released per day, as two thin columns per day.
 *
 * The two series colours are a deeper leaf green and a deeper apricot from
 * the CLOAK palette. They were checked together on the card colour with the
 * dataviz palette validator: lightness band, chroma floor, colour-blind
 * separation (ΔE 8.7), normal-vision separation and 3:1 contrast all pass.
 * Do not swap them for the plain brand green: it reads as grey in a chart.
 *
 * Every value is reachable without hovering: each day is a keyboard stop
 * with the numbers in its label, and the table view lists them all.
 */

const SERIES = [
    { key: "issued", label: "Issued", color: "#1F7A4D" },
    { key: "released", label: "Released", color: "#D07A2E" },
] as const;

const GRID = "#E5DAC0"; // the palette's warm line colour, one step off the card
const HIGHLIGHT = "#F4EBD6"; // sand
const INK = "#22382C";
const INK_SOFT = "#5D6E63";

const HEIGHT = 280;
const MARGIN = { top: 24, right: 8, bottom: 30, left: 36 };
const MAX_BAR = 24;
const BAR_GAP = 2;

/** Round the top of the scale up to a clean number with at most 4 steps. */
const niceScale = (max: number): { top: number; step: number } => {
    if (max <= 4) return { top: 4, step: 1 };
    const steps = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000];
    const step = steps.find((candidate) => max / candidate <= 4) ?? Math.ceil(max / 4);
    return { top: Math.ceil(max / step) * step, step };
};

/** A column that is square at the baseline and rounded at the data end. */
const columnPath = (x: number, top: number, width: number, baseline: number): string => {
    const height = baseline - top;
    const radius = Math.min(4, width / 2, height);
    return [
        `M${x},${baseline}`,
        `L${x},${top + radius}`,
        `Q${x},${top} ${x + radius},${top}`,
        `L${x + width - radius},${top}`,
        `Q${x + width},${top} ${x + width},${top + radius}`,
        `L${x + width},${baseline}`,
        "Z",
    ].join(" ");
};

/** The width of the chart's container, followed as it resizes. */
const useWidth = (element: HTMLDivElement | null): number => {
    const [width, setWidth] = useState(640);
    useEffect(() => {
        if (!element) return;
        const update = () => setWidth(element.clientWidth || 640);
        update();
        if (typeof ResizeObserver === "undefined") return;
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
    }, [element]);
    return width;
};

const weekday = new Intl.DateTimeFormat(undefined, { weekday: "short" });

const axisLabel = (day: string, compact: boolean): string => {
    if (compact) return formatDayShort(day);
    const [year, month, date] = day.split("-").map(Number);
    return `${weekday.format(new Date(year, month - 1, date))} ${date}`;
};

const describeDay = (day: DayStats): string =>
    `${formatDayLong(day.date)}: ${formatCount(day.issued)} issued, ${formatCount(day.released)} released`;

interface DailyChartProps {
    days: DayStats[];
    /** Dims the chart while newer numbers are loading. */
    loading?: boolean;
}

const DailyChart: React.FC<DailyChartProps> = ({ days, loading = false }) => {
    // A state ref, so the width is measured again when the chart comes back
    // after the table view.
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const width = useWidth(container);
    const [active, setActive] = useState<number | null>(null);
    const [showTable, setShowTable] = useState(false);
    const titleId = useId();

    const layout = useMemo(() => {
        const plotWidth = Math.max(width - MARGIN.left - MARGIN.right, 120);
        const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
        const baseline = MARGIN.top + plotHeight;
        const max = Math.max(0, ...days.map((day) => Math.max(day.issued, day.released)));
        const scale = niceScale(max);
        const band = days.length > 0 ? plotWidth / days.length : plotWidth;
        const barWidth = Math.max(
            2,
            Math.min(MAX_BAR, Math.floor((band - BAR_GAP - Math.max(band * 0.3, 4)) / 2)),
        );
        const y = (value: number) => baseline - (value / scale.top) * plotHeight;
        const ticks: number[] = [];
        for (let tick = 0; tick <= scale.top; tick += scale.step) ticks.push(tick);

        // Label about seven days at most, always including the last (today).
        const every = days.length <= 8 ? 1 : Math.ceil(days.length / 7);
        const labelled = (index: number) => (days.length - 1 - index) % every === 0;

        const peak = days.reduce(
            (best, day, index) => (day.issued > (days[best]?.issued ?? 0) ? index : best),
            0,
        );

        return { plotWidth, plotHeight, baseline, band, barWidth, y, ticks, labelled, peak, max };
    }, [days, width]);

    const empty = days.length === 0 || layout.max === 0;
    const activeDay = active !== null ? days[active] : undefined;

    return (
        <figure aria-labelledby={titleId} className="m-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 id={titleId} className="text-xl">
                        Tickets per day
                    </h2>
                    {/* Two series, so a legend is always shown. */}
                    <ul className="mt-2 flex gap-4 text-sm font-bold text-ink-soft">
                        {SERIES.map((series) => (
                            <li key={series.key} className="flex items-center gap-2">
                                <span
                                    aria-hidden="true"
                                    className="h-3 w-3 rounded-[3px]"
                                    style={{ backgroundColor: series.color }}
                                ></span>
                                {series.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    type="button"
                    aria-pressed={showTable}
                    onClick={() => setShowTable((shown) => !shown)}
                    className="rounded-full border-2 border-line bg-surface px-4 py-2 text-sm font-extrabold text-leaf transition hover:bg-mint"
                >
                    {showTable ? "Show as chart" : "Show as table"}
                </button>
            </div>

            {showTable ? (
                <div className="max-h-80 overflow-auto rounded-field border border-line">
                    <table className="w-full text-left text-sm">
                        <thead className="sticky top-0 bg-sand text-forest">
                            <tr>
                                <th scope="col" className="px-4 py-2 font-extrabold">Day</th>
                                <th scope="col" className="px-4 py-2 text-right font-extrabold">Issued</th>
                                <th scope="col" className="px-4 py-2 text-right font-extrabold">Released</th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day) => (
                                <tr key={day.date} className="border-t border-line">
                                    <th scope="row" className="px-4 py-2 font-bold text-ink">
                                        {formatDayLong(day.date)}
                                    </th>
                                    <td className="px-4 py-2 text-right tabular-nums text-ink">
                                        {formatCount(day.issued)}
                                    </td>
                                    <td className="px-4 py-2 text-right tabular-nums text-ink">
                                        {formatCount(day.released)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div
                    ref={setContainer}
                    className={`relative transition-opacity ${loading ? "opacity-60" : ""}`}
                >
                    {empty ? (
                        <p
                            className="flex items-center justify-center rounded-field bg-sand text-ink-soft"
                            style={{ height: HEIGHT }}
                        >
                            No tickets were issued or released in this period.
                        </p>
                    ) : (
                        <>
                            <svg
                                width={width}
                                height={HEIGHT}
                                viewBox={`0 0 ${width} ${HEIGHT}`}
                                className="block"
                                role="group"
                                aria-label="Tickets issued and released per day. Each day is a stop with its numbers."
                            >
                                {/* Recessive hairline grid and the y scale */}
                                {layout.ticks.map((tick) => (
                                    <g key={tick}>
                                        <line
                                            x1={MARGIN.left}
                                            x2={MARGIN.left + layout.plotWidth}
                                            y1={layout.y(tick)}
                                            y2={layout.y(tick)}
                                            stroke={GRID}
                                            strokeWidth={1}
                                        />
                                        <text
                                            x={MARGIN.left - 8}
                                            y={layout.y(tick)}
                                            dy="0.32em"
                                            textAnchor="end"
                                            fontSize={11}
                                            fill={INK_SOFT}
                                            style={{ fontVariantNumeric: "tabular-nums" }}
                                        >
                                            {formatCount(tick)}
                                        </text>
                                    </g>
                                ))}

                                {days.map((day, index) => {
                                    const bandStart = MARGIN.left + index * layout.band;
                                    const groupWidth = layout.barWidth * 2 + BAR_GAP;
                                    const x = bandStart + (layout.band - groupWidth) / 2;
                                    const isActive = active === index;
                                    return (
                                        <g key={day.date}>
                                            {isActive && (
                                                <rect
                                                    x={bandStart}
                                                    y={MARGIN.top}
                                                    width={layout.band}
                                                    height={layout.plotHeight}
                                                    fill={HIGHLIGHT}
                                                    rx={6}
                                                />
                                            )}
                                            {SERIES.map((series, seriesIndex) => {
                                                const value = day[series.key];
                                                if (value <= 0) return null;
                                                return (
                                                    <path
                                                        key={series.key}
                                                        d={columnPath(
                                                            x + seriesIndex * (layout.barWidth + BAR_GAP),
                                                            layout.y(value),
                                                            layout.barWidth,
                                                            layout.baseline,
                                                        )}
                                                        fill={series.color}
                                                    />
                                                );
                                            })}
                                            {/* One direct label only: the busiest day. */}
                                            {index === layout.peak && day.issued > 0 && (
                                                <text
                                                    x={x + layout.barWidth / 2}
                                                    y={layout.y(day.issued) - 6}
                                                    textAnchor="middle"
                                                    fontSize={11}
                                                    fontWeight={800}
                                                    fill={INK}
                                                >
                                                    {formatCount(day.issued)}
                                                </text>
                                            )}
                                            {layout.labelled(index) && (
                                                <text
                                                    x={bandStart + layout.band / 2}
                                                    y={layout.baseline + 18}
                                                    textAnchor="middle"
                                                    fontSize={11}
                                                    fill={INK_SOFT}
                                                >
                                                    {axisLabel(day.date, days.length > 8)}
                                                </text>
                                            )}
                                            {/* The whole day column is the hover and focus target. */}
                                            <rect
                                                x={bandStart}
                                                y={MARGIN.top}
                                                width={layout.band}
                                                height={layout.plotHeight + MARGIN.bottom}
                                                fill="transparent"
                                                tabIndex={0}
                                                role="img"
                                                aria-label={describeDay(day)}
                                                onPointerEnter={() => setActive(index)}
                                                onPointerLeave={() =>
                                                    setActive((current) => (current === index ? null : current))
                                                }
                                                onFocus={() => setActive(index)}
                                                onBlur={() =>
                                                    setActive((current) => (current === index ? null : current))
                                                }
                                            />
                                        </g>
                                    );
                                })}

                                {/* Baseline, drawn last so it sits on top of the columns' square ends */}
                                <line
                                    x1={MARGIN.left}
                                    x2={MARGIN.left + layout.plotWidth}
                                    y1={layout.baseline}
                                    y2={layout.baseline}
                                    stroke={GRID}
                                    strokeWidth={1}
                                />
                            </svg>

                            {activeDay && active !== null && (
                                <div
                                    role="status"
                                    className="pointer-events-none absolute top-0 z-10 w-44 rounded-field bg-surface px-4 py-3 shadow-lift"
                                    style={{
                                        left: Math.min(
                                            Math.max(
                                                MARGIN.left + (active + 0.5) * layout.band - 88,
                                                0,
                                            ),
                                            Math.max(width - 176, 0),
                                        ),
                                    }}
                                >
                                    <p className="mb-2 text-xs font-bold text-ink-soft">
                                        {formatDayLong(activeDay.date)}
                                    </p>
                                    {SERIES.map((series) => (
                                        <p key={series.key} className="flex items-center gap-2 text-sm">
                                            <span
                                                aria-hidden="true"
                                                className="h-[3px] w-3 rounded-full"
                                                style={{ backgroundColor: series.color }}
                                            ></span>
                                            <span className="font-extrabold text-ink">
                                                {formatCount(activeDay[series.key])}
                                            </span>
                                            <span className="text-ink-soft">{series.label.toLowerCase()}</span>
                                        </p>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </figure>
    );
};

export default DailyChart;
