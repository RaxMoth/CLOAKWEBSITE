import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { DASHBOARD_PATHS } from "../config/dashboard";
import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import { SessionProvider, useSession } from "./session";

/**
 * The venue dashboard: sign-in, an overview and a page per service.
 *
 * This module is the only door into `src/dashboard/`. `App.tsx` loads it
 * lazily and only when the dashboard is switched on (see
 * `src/config/dashboard.ts`), so none of this code is in the public build.
 */

const RequireSession: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session } = useSession();
    if (!session) return <Navigate to={DASHBOARD_PATHS.login} replace />;
    return <>{children}</>;
};

const DashboardApp: React.FC = () => (
    <SessionProvider>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={
                    <RequireSession>
                        <StatsPage />
                    </RequireSession>
                }
            />
            <Route
                path="/dashboard/services/:serviceId"
                element={
                    <RequireSession>
                        <ServiceStatsPage />
                    </RequireSession>
                }
            />
            <Route
                path="*"
                element={<Navigate to={DASHBOARD_PATHS.overview} replace />}
            />
        </Routes>
    </SessionProvider>
);

/** A fresh page per service, so no numbers are carried over from another. */
const ServiceStatsPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    return <StatsPage key={serviceId} />;
};

export default DashboardApp;
