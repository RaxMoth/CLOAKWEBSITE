/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Base URL of the CLOAK backend. Defaults to http://localhost:8080. */
    readonly VITE_API_URL?: string;
    /** "local" switches the venue dashboard on (see .env.dashboard). */
    readonly VITE_DASHBOARD?: string;
    /** "sample" replaces GET /api/v1/stats with built-in sample numbers. */
    readonly VITE_DASHBOARD_STATS?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
