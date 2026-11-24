import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatDuration, formatShare } from "../dashboard/format";
import { buildSampleStats } from "../dashboard/sampleStats";
import { parseStats } from "../dashboard/types";

/**
 * The venue dashboard exists only when VITE_DASHBOARD=local. The flag is read
 * once when the modules load, so each test sets it and then loads the app
 * fresh.
 */
const loadApp = async (flag: "local" | "") => {
    vi.resetModules();
    vi.stubEnv("VITE_DASHBOARD", flag);
    vi.stubEnv("VITE_API_URL", "http://backend.test");
    vi.stubEnv("VITE_DASHBOARD_STATS", "");
    const { default: App } = await import("../App");
    return App;
};

const renderAt = async (path: string, flag: "local" | "" = "local") => {
    window.history.pushState({}, "", path);
    const App = await loadApp(flag);
    return render(<App />);
};

/** A token whose payload says it expires far in the future. */
const token = `header.${btoa(JSON.stringify({ exp: 4102444800 }))}.signature`;

const statsBody = {
    range: { from: "2026-11-07", to: "2026-11-20", days: 14, timezone: "UTC" },
    generated_at: 1795100000,
    totals: {
        services: 2,
        total_slots: 100,
        occupied: 17,
        free: 83,
        tickets_issued: 240,
        tickets_released: 223,
        tickets_active: 17,
        avg_hold_seconds: 8100,
    },
    services: [
        {
            service_id: "svc-coats",
            name: "Coat Check",
            total_slots: 60,
            occupied: 12,
            free: 48,
            tickets_issued: 180,
            tickets_released: 168,
            tickets_active: 12,
            avg_hold_seconds: 9000,
        },
        {
            service_id: "svc-bags",
            name: "Bag Storage",
            total_slots: 40,
            occupied: 5,
            free: 35,
            tickets_issued: 60,
            tickets_released: 55,
            tickets_active: 5,
            avg_hold_seconds: 5400,
        },
    ],
    days: [
        { date: "2026-11-19", issued: 21, released: 20 },
        { date: "2026-11-20", issued: 17, released: 0 },
    ],
    recent: [
        {
            ticket_id: "t-1",
            service_id: "svc-coats",
            service_name: "Coat Check",
            slot_number: 12,
            event: "issued",
            at: 1795099000,
        },
    ],
};

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });

interface Call {
    url: string;
    method: string;
    authorization: string | null;
    body: unknown;
}

/** Stands in for the backend and records what the dashboard asked it. */
const mockBackend = (
    handler: (call: Call) => Response = (call) =>
        call.url.includes("/auth/business/login")
            ? json({ token, user_id: "biz-1", role: "business" })
            : json(statsBody),
) => {
    const calls: Call[] = [];
    vi.stubGlobal(
        "fetch",
        vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
            const headers = new Headers(init?.headers);
            const call: Call = {
                url: String(input),
                method: init?.method ?? "GET",
                authorization: headers.get("Authorization"),
                body: init?.body ? JSON.parse(String(init.body)) : null,
            };
            calls.push(call);
            return handler(call);
        }),
    );
    return calls;
};

const signIn = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(await screen.findByLabelText("Email"), "venue@example.test");
    await user.type(screen.getByLabelText("Password"), "a-test-password");
    await user.click(screen.getByRole("button", { name: /sign in/i }));
};

beforeEach(() => {
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
    sessionStorage.clear();
});

afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
});

describe("public build (dashboard switched off)", () => {
    it("has no sign-in page, dashboard or Dashboard link", async () => {
        const calls = mockBackend();
        await renderAt("/login", "");
        expect(window.location.pathname).toBe("/");

        window.history.pushState({}, "", "/dashboard");
        const App = await loadApp("");
        render(<App />);
        expect(window.location.pathname).toBe("/");

        expect(screen.queryByRole("link", { name: "Dashboard" })).toBeNull();
        expect(calls).toHaveLength(0);
    });
});

describe("local dashboard", () => {
    it("asks for sign-in before showing anything", async () => {
        const calls = mockBackend();
        await renderAt("/dashboard");
        expect(
            await screen.findByRole("heading", { level: 1, name: "Venue sign-in" }),
        ).toBeInTheDocument();
        expect(window.location.pathname).toBe("/login");
        expect(calls).toHaveLength(0);
    });

    it("signs a venue in and shows its numbers", async () => {
        const user = userEvent.setup();
        const calls = mockBackend();
        await renderAt("/login");
        await signIn(user);

        expect(
            await screen.findByRole("heading", { level: 1, name: "Dashboard" }),
        ).toBeInTheDocument();
        expect(window.location.pathname).toBe("/dashboard");

        // Sign-in went to the backend's business login, with what was typed.
        expect(calls[0]).toMatchObject({
            url: "http://backend.test/api/v1/auth/business/login",
            method: "POST",
            body: { email: "venue@example.test", password: "a-test-password" },
        });

        // Statistics were asked for with the session and the default period.
        const statsCall = calls.find((call) => call.url.includes("/api/v1/stats"));
        expect(statsCall?.authorization).toBe(`Bearer ${token}`);
        const query = new URL(statsCall!.url).searchParams;
        expect(query.get("days")).toBe("14");
        expect(query.get("tz")).toBeTruthy();
        expect(query.get("service_id")).toBeNull();

        // Headline numbers.
        expect(await screen.findByText("Occupied now")).toBeInTheDocument();
        const meter = screen.getByRole("meter", { name: "All services: slots occupied now" });
        expect(meter).toHaveAttribute("aria-valuenow", "17");
        expect(meter).toHaveAttribute("aria-valuemax", "100");
        expect(screen.getByText("240")).toBeInTheDocument();
        expect(screen.getByText("223")).toBeInTheDocument();
        expect(screen.getByText("2 h 15 min")).toBeInTheDocument();

        // Each service, linking to its own page.
        expect(screen.getByRole("link", { name: /coat check/i })).toHaveAttribute(
            "href",
            "/dashboard/services/svc-coats",
        );
        expect(screen.getByRole("link", { name: /bag storage/i })).toBeInTheDocument();

        // Recent activity.
        expect(screen.getByText("Slot 12 issued")).toBeInTheDocument();
    });

    it("gives every chart value without hovering", async () => {
        const user = userEvent.setup();
        mockBackend();
        await renderAt("/login");
        await signIn(user);
        await screen.findByRole("heading", { level: 2, name: "Tickets per day" });

        // Each day is a labelled stop in the chart...
        expect(
            // Day and month order follow the browser's locale.
            screen.getByRole("img", {
                name: /(19 november|november 19).*21 issued, 20 released/i,
            }),
        ).toBeInTheDocument();

        // ...and the table view lists the same numbers.
        await user.click(screen.getByRole("button", { name: "Show as table" }));
        const table = screen.getByRole("table");
        const rows = within(table).getAllByRole("row");
        expect(rows).toHaveLength(3);
        expect(within(rows[1]).getByText("21")).toBeInTheDocument();
        expect(within(rows[1]).getByText("20")).toBeInTheDocument();
    });

    it("asks the backend again when the period changes", async () => {
        const user = userEvent.setup();
        const calls = mockBackend();
        await renderAt("/login");
        await signIn(user);
        await screen.findByText("Occupied now");

        await user.click(screen.getByRole("radio", { name: "Last 30 days" }));
        await vi.waitFor(() => {
            const last = calls[calls.length - 1];
            expect(new URL(last.url).searchParams.get("days")).toBe("30");
        });
        expect(window.location.search).toBe("?days=30");
    });

    it("shows one service's own numbers on its page", async () => {
        const user = userEvent.setup();
        const calls = mockBackend((call) => {
            if (call.url.includes("/auth/business/login")) {
                return json({ token, user_id: "biz-1", role: "business" });
            }
            const serviceId = new URL(call.url).searchParams.get("service_id");
            if (!serviceId) return json(statsBody);
            const service = statsBody.services.find((s) => s.service_id === serviceId)!;
            return json({ ...statsBody, totals: { ...service, services: 1 }, services: [service] });
        });
        await renderAt("/login");
        await signIn(user);
        await user.click(await screen.findByRole("link", { name: /bag storage/i }));

        expect(
            await screen.findByRole("heading", { level: 1, name: "Bag Storage" }),
        ).toBeInTheDocument();
        expect(window.location.pathname).toBe("/dashboard/services/svc-bags");
        expect(
            new URL(calls[calls.length - 1].url).searchParams.get("service_id"),
        ).toBe("svc-bags");
        const meter = screen.getByRole("meter", { name: "Bag Storage: slots occupied now" });
        expect(meter).toHaveAttribute("aria-valuenow", "5");
        expect(screen.getByText("1 h 30 min")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "All services" })).toHaveAttribute(
            "href",
            "/dashboard",
        );
    });

    it("explains a wrong password without leaving the sign-in page", async () => {
        const user = userEvent.setup();
        mockBackend(() => json({ code: "UNAUTHORIZED", message: "invalid credentials" }, 401));
        await renderAt("/login");
        await signIn(user);

        expect(await screen.findByRole("alert")).toHaveTextContent(
            "That email and password do not match a venue account.",
        );
        expect(window.location.pathname).toBe("/login");
        expect(sessionStorage.length).toBe(0);
    });

    it("sends the venue back to sign-in when the session has ended", async () => {
        const user = userEvent.setup();
        mockBackend((call) =>
            call.url.includes("/auth/business/login")
                ? json({ token, user_id: "biz-1", role: "business" })
                : json({ code: "UNAUTHORIZED", message: "Invalid or expired token" }, 401),
        );
        await renderAt("/login");
        await signIn(user);

        expect(
            await screen.findByText("Your session has ended. Sign in again."),
        ).toBeInTheDocument();
        expect(window.location.pathname).toBe("/login");
        expect(sessionStorage.length).toBe(0);
    });

    it("says so when the backend has no statistics endpoint", async () => {
        const user = userEvent.setup();
        mockBackend((call) =>
            call.url.includes("/auth/business/login")
                ? json({ token, user_id: "biz-1", role: "business" })
                : json({ code: 404, message: "Cannot GET /api/v1/stats" }, 404),
        );
        await renderAt("/login");
        await signIn(user);

        expect(await screen.findByRole("alert")).toHaveTextContent(
            "This backend has no statistics yet",
        );
    });

    it("signs out and forgets the session", async () => {
        const user = userEvent.setup();
        mockBackend();
        await renderAt("/login");
        await signIn(user);
        await user.click(await screen.findByRole("button", { name: "Sign out" }));

        expect(
            await screen.findByRole("heading", { level: 1, name: "Venue sign-in" }),
        ).toBeInTheDocument();
        expect(sessionStorage.length).toBe(0);
    });
});

describe("reading the statistics response", () => {
    it("reads the agreed shape", () => {
        const stats = parseStats(statsBody);
        expect(stats.totals).toMatchObject({
            services: 2,
            totalSlots: 100,
            occupied: 17,
            free: 83,
            ticketsIssued: 240,
            ticketsReleased: 223,
            ticketsActive: 17,
            avgHoldSeconds: 8100,
        });
        expect(stats.services.map((service) => service.name)).toEqual([
            "Coat Check",
            "Bag Storage",
        ]);
        expect(stats.days).toHaveLength(2);
        expect(stats.recent[0]).toMatchObject({ slotNumber: 12, event: "issued" });
        expect(stats.range?.timezone).toBe("UTC");
    });

    it("fills in what a thinner response leaves out", () => {
        const stats = parseStats({
            totals: { total_slots: 10, occupied: 4, tickets_total: 9 },
            services: [{ id: "s1", total_slots: 10, occupied: 4 }],
            days: [
                { date: "2026-11-20", issued: 3 },
                { date: "not-a-date", issued: 99 },
                { date: "2026-11-19", issued: 6, released: 6 },
            ],
        });
        expect(stats.totals.free).toBe(6);
        expect(stats.totals.ticketsIssued).toBe(9);
        expect(stats.totals.avgHoldSeconds).toBeNull();
        expect(stats.totals.services).toBe(1);
        expect(stats.services[0]).toMatchObject({ serviceId: "s1", name: "Unnamed service" });
        // Bad dates are dropped and the rest is put oldest first.
        expect(stats.days.map((day) => day.date)).toEqual(["2026-11-19", "2026-11-20"]);
        expect(stats.days[1].released).toBe(0);
        expect(stats.recent).toEqual([]);
        expect(stats.range).toBeNull();
    });

    it("survives a response that is not an object at all", () => {
        const stats = parseStats(null);
        expect(stats.totals.totalSlots).toBe(0);
        expect(stats.services).toEqual([]);
        expect(stats.days).toEqual([]);
    });
});

describe("sample numbers", () => {
    it("cover every day of the period and add up", () => {
        const now = new Date(2026, 10, 20, 21, 30);
        const stats = parseStats(buildSampleStats(14, "Europe/Berlin", undefined, now));
        expect(stats.days).toHaveLength(14);
        expect(stats.days[13].date).toBe("2026-11-20");
        expect(stats.totals.ticketsIssued).toBe(
            stats.days.reduce((sum, day) => sum + day.issued, 0),
        );
        expect(stats.totals.occupied).toBe(
            stats.services.reduce((sum, service) => sum + service.occupied, 0),
        );
        expect(stats.totals.free).toBe(stats.totals.totalSlots - stats.totals.occupied);
    });

    it("can be narrowed to one service", () => {
        const stats = parseStats(buildSampleStats(7, "UTC", "sample-bag-storage"));
        expect(stats.services).toHaveLength(1);
        expect(stats.services[0].name).toBe("Bag Storage");
        expect(stats.days).toHaveLength(7);
    });
});

describe("wording numbers", () => {
    it("words durations", () => {
        expect(formatDuration(null)).toBe("–");
        expect(formatDuration(20)).toBe("under 1 min");
        expect(formatDuration(45 * 60)).toBe("45 min");
        expect(formatDuration(2 * 3600)).toBe("2 h");
        expect(formatDuration(8100)).toBe("2 h 15 min");
    });

    it("words shares", () => {
        expect(formatShare(17, 100)).toBe("17%");
        expect(formatShare(0, 0)).toBe("0%");
    });
});
