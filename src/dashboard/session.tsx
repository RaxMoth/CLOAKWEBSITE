import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { signInBusiness } from "./api";

/**
 * The signed-in venue.
 *
 * The session lives in sessionStorage: it survives a reload, and it is gone
 * when the tab is closed. The token is the backend's own 24-hour token; when
 * it has expired the venue is asked to sign in again.
 */

export interface Session {
    token: string;
    userId: string;
    email: string;
    /** Unix seconds, read from the token; null if it could not be read. */
    expiresAt: number | null;
}

const STORAGE_KEY = "cloak.dashboard.session";

/** Reads the expiry out of a JWT without verifying it (the backend does). */
const readExpiry = (token: string): number | null => {
    try {
        const payload = token.split(".")[1];
        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        const exp = (JSON.parse(json) as { exp?: unknown }).exp;
        return typeof exp === "number" ? exp : null;
    } catch {
        return null;
    }
};

const isExpired = (session: Session): boolean =>
    session.expiresAt !== null && session.expiresAt * 1000 <= Date.now();

const loadSession = (): Session | null => {
    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        const parsed = JSON.parse(stored) as Partial<Session>;
        if (typeof parsed.token !== "string" || !parsed.token) return null;
        const session: Session = {
            token: parsed.token,
            userId: typeof parsed.userId === "string" ? parsed.userId : "",
            email: typeof parsed.email === "string" ? parsed.email : "",
            expiresAt: readExpiry(parsed.token),
        };
        return isExpired(session) ? null : session;
    } catch {
        return null;
    }
};

const storeSession = (session: Session | null) => {
    try {
        if (session) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
        // Storage can be unavailable (private windows); the session then
        // simply lasts until the page is reloaded.
    }
};

interface SessionContextValue {
    session: Session | null;
    /** Why the last session ended, shown once on the sign-in page. */
    notice: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: (notice?: string) => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [session, setSession] = useState<Session | null>(loadSession);
    const [notice, setNotice] = useState<string | null>(null);

    const signIn = useCallback(async (email: string, password: string) => {
        const result = await signInBusiness(email, password);
        if (result.role && result.role !== "business") {
            throw new Error("This sign-in is for venues. That account is not a venue account.");
        }
        const next: Session = {
            token: result.token,
            userId: result.userId,
            email,
            expiresAt: readExpiry(result.token),
        };
        storeSession(next);
        setNotice(null);
        setSession(next);
    }, []);

    const signOut = useCallback((reason?: string) => {
        storeSession(null);
        setNotice(reason ?? null);
        setSession(null);
    }, []);

    const value = useMemo(
        () => ({ session, notice, signIn, signOut }),
        [session, notice, signIn, signOut],
    );

    return (
        <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = (): SessionContextValue => {
    const value = useContext(SessionContext);
    if (!value) throw new Error("useSession needs a SessionProvider above it.");
    return value;
};
