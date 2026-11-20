import React from "react";
import { FlaskConical, RefreshCw } from "lucide-react";
import { ApiError, API_BASE_URL } from "../api";

export const PERIODS = [7, 14, 30] as const;
export type Period = (typeof PERIODS)[number];

/**
 * The one filter row above everything it scopes: the period, as presets.
 * Every number, chart and list below is for the chosen period.
 */
export const PeriodFilter: React.FC<{
    value: Period;
    onChange: (period: Period) => void;
    onReload: () => void;
    loading: boolean;
}> = ({ value, onChange, onReload, loading }) => (
    <div className="flex flex-wrap items-center gap-3">
        <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Period</legend>
            {PERIODS.map((period) => (
                <label key={period} className="cursor-pointer">
                    <input
                        type="radio"
                        name="dashboard-period"
                        value={period}
                        checked={value === period}
                        onChange={() => onChange(period)}
                        className="peer sr-only"
                    />
                    <span className="block rounded-full border-2 border-line bg-surface px-4 py-2 text-sm font-extrabold text-leaf transition hover:bg-mint peer-checked:border-leaf peer-checked:bg-leaf peer-checked:text-on-leaf peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-leaf">
                        Last {period} days
                    </span>
                </label>
            ))}
        </fieldset>
        <button
            type="button"
            onClick={onReload}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-extrabold text-leaf transition hover:bg-mint disabled:opacity-60"
        >
            <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                aria-hidden="true"
            />
            {loading ? "Loading" : "Refresh"}
        </button>
    </div>
);

/** Shown whenever the numbers on screen are the built-in sample ones. */
export const SampleBanner: React.FC = () => (
    <p className="flex items-start gap-3 rounded-card bg-apricot-light p-4 font-semibold text-apricot-ink">
        <FlaskConical className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <span>
            Sample numbers. This page is running with{" "}
            <code className="font-mono text-sm">VITE_DASHBOARD_STATS=sample</code>,
            so the figures below are built in and do not come from your backend.
            Run <code className="font-mono text-sm">npm run dashboard</code> for
            real numbers.
        </span>
    </p>
);

/** What went wrong while loading statistics, and what to do about it. */
export const LoadError: React.FC<{ error: Error; onRetry: () => void }> = ({
    error,
    onRetry,
}) => {
    let title = "The statistics could not be loaded";
    let detail = error.message;
    if (error instanceof ApiError && error.kind === "not-found") {
        title = "This backend has no statistics yet";
        detail = `${API_BASE_URL} answered 404 for GET /api/v1/stats. Update the backend to a version with that endpoint, or run "npm run dashboard:sample" to see the dashboard with sample numbers.`;
    } else if (error instanceof ApiError && error.kind === "unreachable") {
        title = "The backend is not answering";
        detail = `Nothing answered at ${API_BASE_URL}. Start the CLOAK backend on this computer and try again.`;
    }
    return (
        <div role="alert" className="card p-6 sm:p-8">
            <h2 className="mb-2 text-xl">{title}</h2>
            <p className="mb-5 max-w-2xl leading-relaxed text-ink-soft">{detail}</p>
            <button type="button" onClick={onRetry} className="btn-outline">
                Try again
            </button>
        </div>
    );
};
