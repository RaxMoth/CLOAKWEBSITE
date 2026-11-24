/**
 * Whether the venue dashboard is part of this build.
 *
 * The dashboard talks to a CLOAK backend on the developer's own computer,
 * so it exists only in local development: `npm run dashboard` sets
 * VITE_DASHBOARD=local through `.env.dashboard`. The public build never
 * sets it, and because Vite replaces `import.meta.env.VITE_DASHBOARD` with
 * a constant at build time, the dashboard code is left out of the public
 * bundle entirely. `/login` and `/dashboard` then fall through to the
 * site's normal "unknown address" redirect.
 *
 * Keep this file free of imports from `src/dashboard/`: the public pages
 * import it, and they must not pull dashboard code in.
 */
export const DASHBOARD_IN_BUILD = import.meta.env.VITE_DASHBOARD === "local";

const LOCAL_HOSTS = ["localhost", "127.0.0.1", "[::1]"];

/**
 * A second guard for the case where the flag ends up in a hosted build by
 * mistake: the dashboard only switches on when the page itself is served
 * from this computer.
 */
export const isDashboardAvailable = (): boolean =>
    DASHBOARD_IN_BUILD &&
    typeof window !== "undefined" &&
    LOCAL_HOSTS.includes(window.location.hostname);

export const DASHBOARD_PATHS = {
    login: "/login",
    overview: "/dashboard",
    service: (serviceId: string) =>
        `/dashboard/services/${encodeURIComponent(serviceId)}`,
};
