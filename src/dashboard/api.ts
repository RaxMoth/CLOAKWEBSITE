/**
 * The dashboard's calls to the CLOAK backend.
 *
 * It only reads: a venue signs in and the dashboard fetches its statistics.
 * Nothing here creates, changes or deletes data.
 */

import { buildSampleStats } from "./sampleStats";
import { parseStats, Stats } from "./types";

export const API_BASE_URL = (
    import.meta.env.VITE_API_URL ?? "http://localhost:8080"
).replace(/\/+$/, "");

/** True when statistics come from built-in sample numbers, not the backend. */
export const USING_SAMPLE_STATS =
    import.meta.env.VITE_DASHBOARD_STATS === "sample";

export type ApiErrorKind =
    | "unreachable" // no answer at all: the backend is not running
    | "unauthorized" // 401: wrong sign-in details, or the session has ended
    | "forbidden" // 403
    | "not-found" // 404: for /stats, a backend without that endpoint
    | "rate-limited" // 429
    | "failed"; // anything else

export class ApiError extends Error {
    readonly kind: ApiErrorKind;
    readonly status: number;

    constructor(kind: ApiErrorKind, status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.kind = kind;
        this.status = status;
    }
}

const kindOf = (status: number): ApiErrorKind => {
    if (status === 401) return "unauthorized";
    if (status === 403) return "forbidden";
    if (status === 404) return "not-found";
    if (status === 429) return "rate-limited";
    return "failed";
};

interface RequestOptions {
    method?: "GET" | "POST";
    body?: unknown;
    token?: string;
    signal?: AbortSignal;
}

const request = async (path: string, options: RequestOptions = {}): Promise<unknown> => {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (options.body !== undefined) headers["Content-Type"] = "application/json";
    if (options.token) headers.Authorization = `Bearer ${options.token}`;

    let response: Response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            method: options.method ?? "GET",
            headers,
            body: options.body === undefined ? undefined : JSON.stringify(options.body),
            signal: options.signal,
        });
    } catch (error) {
        // A cancelled request is not a failure; let the caller ignore it.
        if (error instanceof DOMException && error.name === "AbortError") throw error;
        throw new ApiError(
            "unreachable",
            0,
            `The backend at ${API_BASE_URL} did not answer. Is it running?`,
        );
    }

    let payload: unknown = null;
    try {
        payload = await response.json();
    } catch {
        // An empty or non-JSON body; the status code still tells the story.
    }

    if (!response.ok) {
        const message =
            typeof payload === "object" &&
            payload !== null &&
            typeof (payload as { message?: unknown }).message === "string"
                ? (payload as { message: string }).message
                : `The backend answered with status ${response.status}.`;
        throw new ApiError(kindOf(response.status), response.status, message);
    }
    return payload;
};

export interface SignInResult {
    token: string;
    userId: string;
    role: string;
}

/** Signs a venue in with `POST /api/v1/auth/business/login`. */
export const signInBusiness = async (
    email: string,
    password: string,
): Promise<SignInResult> => {
    const payload = await request("/api/v1/auth/business/login", {
        method: "POST",
        body: { email, password },
    });
    const data = (payload ?? {}) as Record<string, unknown>;
    if (typeof data.token !== "string" || data.token === "") {
        throw new ApiError("failed", 200, "The backend did not return a session.");
    }
    return {
        token: data.token,
        userId: typeof data.user_id === "string" ? data.user_id : "",
        role: typeof data.role === "string" ? data.role : "",
    };
};

export interface StatsQuery {
    days: number;
    timezone: string;
    serviceId?: string;
}

/** Fetches a venue's statistics with `GET /api/v1/stats`. */
export const fetchStats = async (
    token: string,
    query: StatsQuery,
    signal?: AbortSignal,
): Promise<Stats> => {
    if (USING_SAMPLE_STATS) {
        return parseStats(
            buildSampleStats(query.days, query.timezone, query.serviceId),
        );
    }
    const params = new URLSearchParams({
        days: String(query.days),
        tz: query.timezone,
    });
    if (query.serviceId) params.set("service_id", query.serviceId);
    const payload = await request(`/api/v1/stats?${params}`, { token, signal });
    return parseStats(payload);
};
