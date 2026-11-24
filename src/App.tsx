import React, { lazy, Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import { DASHBOARD_IN_BUILD, isDashboardAvailable } from "./config/dashboard";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Features from "./pages/Features";
import Status from "./pages/Status";

// The venue dashboard exists only in local development. In the public build
// DASHBOARD_IN_BUILD is the constant `false`, so the bundler drops this
// import and with it all of `src/dashboard/`.
const DashboardApp = DASHBOARD_IN_BUILD
    ? lazy(() => import("./dashboard/DashboardApp"))
    : null;

const App: React.FC = () => {
    const dashboard =
        DashboardApp && isDashboardAvailable() ? (
            <Suspense
                fallback={
                    <p role="status" className="p-12 text-center text-ink-soft">
                        Loading the dashboard…
                    </p>
                }
            >
                <DashboardApp />
            </Suspense>
        ) : null;

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/status" element={<Status />} />
                    {/* The old pricing page lived here; there is no pricing yet. */}
                    <Route
                        path="/services"
                        element={<Navigate to="/status" replace />}
                    />
                    {/* One pathless parent, so the dashboard (and the session it
                        holds) stays mounted while moving between its pages.
                        DashboardApp does its own routing below these paths. */}
                    {dashboard && (
                        <Route element={dashboard}>
                            <Route path="/login" element={null} />
                            <Route path="/dashboard/*" element={null} />
                        </Route>
                    )}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
