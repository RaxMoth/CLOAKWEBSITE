import { useCallback, useEffect, useState } from "react";
import { ApiError, fetchStats } from "./api";
import { localTimezone } from "./format";
import { useSession } from "./session";
import { Stats } from "./types";

interface StatsState {
    stats: Stats | null;
    loading: boolean;
    error: Error | null;
}

/**
 * Loads the signed-in venue's statistics for the last `days` days,
 * optionally for one service.
 *
 * While a new period is loading the previous numbers stay in `stats`, so
 * the page can keep showing them (dimmed) instead of jumping to a spinner.
 * A 401 means the session has ended: the venue is signed out and the
 * sign-in page explains why.
 */
export const useStats = (days: number, serviceId?: string) => {
    const { session, signOut } = useSession();
    const token = session?.token;
    const [state, setState] = useState<StatsState>({
        stats: null,
        loading: true,
        error: null,
    });
    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        if (!token) return;
        const controller = new AbortController();
        setState((previous) => ({ ...previous, loading: true, error: null }));

        fetchStats(token, { days, timezone: localTimezone(), serviceId }, controller.signal)
            .then((stats) => {
                if (controller.signal.aborted) return;
                setState({ stats, loading: false, error: null });
            })
            .catch((error: unknown) => {
                if (controller.signal.aborted) return;
                if (error instanceof ApiError && error.kind === "unauthorized") {
                    signOut("Your session has ended. Sign in again.");
                    return;
                }
                setState((previous) => ({
                    stats: previous.stats,
                    loading: false,
                    error: error instanceof Error ? error : new Error(String(error)),
                }));
            });

        return () => controller.abort();
    }, [token, days, serviceId, reloadCount, signOut]);

    const reload = useCallback(() => setReloadCount((count) => count + 1), []);

    return { ...state, reload };
};
