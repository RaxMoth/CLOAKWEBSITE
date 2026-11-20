import React, { useEffect, useId, useState } from "react";
import { Navigate } from "react-router-dom";
import { Laptop, Lock, LogIn, Mail } from "lucide-react";
import PageHero from "../../components/PageHero";
import { DASHBOARD_PATHS } from "../../config/dashboard";
import { ApiError, API_BASE_URL } from "../api";
import { useSession } from "../session";

const inputClass =
    "w-full rounded-field border-[1.5px] border-line bg-surface py-3.5 pl-12 pr-4 text-ink placeholder:text-ink-faint focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/30";

const explain = (error: unknown): string => {
    if (error instanceof ApiError) {
        if (error.kind === "unauthorized") {
            return "That email and password do not match a venue account.";
        }
        if (error.kind === "rate-limited") {
            return "Too many attempts. Wait a little, then try again.";
        }
        return error.message;
    }
    return error instanceof Error ? error.message : "Signing in failed.";
};

const LoginPage: React.FC = () => {
    const { session, notice, signIn } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const emailId = useId();
    const passwordId = useId();

    useEffect(() => {
        document.title = "Venue sign-in | CLOAK dashboard";
    }, []);

    if (session) return <Navigate to={DASHBOARD_PATHS.overview} replace />;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setError(null);
        try {
            await signIn(email.trim(), password);
        } catch (caught) {
            setError(explain(caught));
            setSubmitting(false);
        }
    };

    return (
        <div>
            <PageHero
                title="Venue sign-in"
                subtitle="Sign in with your venue's email and password to see how full your services are and how many tickets you issue."
            />

            <div className="mx-auto max-w-xl px-6 py-10 sm:px-12">
                {notice && !error && (
                    <p
                        role="status"
                        className="mb-6 rounded-card bg-apricot-light p-4 font-semibold text-apricot-ink"
                    >
                        {notice}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="card p-6 sm:p-8" noValidate>
                    <div className="mb-5">
                        <label
                            htmlFor={emailId}
                            className="mb-2 ml-1.5 block text-sm font-extrabold text-forest"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <Mail
                                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint"
                                aria-hidden="true"
                            />
                            <input
                                id={emailId}
                                type="email"
                                autoComplete="username"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Your venue's email"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor={passwordId}
                            className="mb-2 ml-1.5 block text-sm font-extrabold text-forest"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Lock
                                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint"
                                aria-hidden="true"
                            />
                            <input
                                id={passwordId}
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Your password"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="mb-5 rounded-field bg-terracotta-light p-4 font-semibold text-terracotta-ink"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting || !email || !password}
                        className="btn-primary w-full disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-faint"
                    >
                        <LogIn className="h-5 w-5" aria-hidden="true" />
                        {submitting ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className="mt-6 flex items-start gap-3 rounded-card bg-mint p-4 text-sm text-ink">
                    <Laptop className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
                    <span>
                        Local mode. This dashboard signs in to the CLOAK backend
                        on this computer at{" "}
                        <code className="font-mono">{API_BASE_URL}</code> and is
                        not part of the public website. To try it with the
                        backend's sample venue, see the README.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
