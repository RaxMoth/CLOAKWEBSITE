import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { APP_CONFIG } from "../config/app";
import { PAGE_META } from "../config/seo";
import { STATUS_GROUPS } from "../config/status";

const renderAt = (path: string) => {
    window.history.pushState({}, "", path);
    return render(<App />);
};

describe("CLOAK website pages", () => {
    beforeEach(() => {
        // jsdom has no scrolling; the layout scrolls to the top on navigation.
        window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
    });

    it("renders the home page with real app screenshots", () => {
        renderAt("/");
        expect(
            screen.getByRole("heading", { level: 1, name: /qr tickets/i }),
        ).toBeInTheDocument();
        const screenshots = screen
            .getAllByRole("img")
            .map((img) => img.getAttribute("src"));
        expect(screenshots).toContain("/screenshots/app-ticket-qr.jpg");
        expect(document.title).toBe(PAGE_META["/"].title);
    });

    it.each([
        ["/about", /how\s+cloak\s+works/i],
        ["/features", /under the\s+hood/i],
        ["/status", /project\s+status/i],
    ])("renders %s", (path, heading) => {
        renderAt(path);
        expect(
            screen.getByRole("heading", { level: 1, name: heading }),
        ).toBeInTheDocument();
        expect(document.title).toBe(PAGE_META[path].title);
    });

    it("lists every status item on the status page", () => {
        renderAt("/status");
        for (const group of STATUS_GROUPS) {
            expect(
                screen.getByRole("heading", { level: 2, name: group.title }),
            ).toBeInTheDocument();
            for (const item of group.items) {
                expect(
                    screen.getByRole("heading", { level: 3, name: item.title }),
                ).toBeInTheDocument();
            }
        }
    });

    it("sends the old pricing URL to the status page", () => {
        renderAt("/services");
        expect(window.location.pathname).toBe("/status");
    });

    it("sends unknown URLs to the home page", () => {
        renderAt("/portfolio");
        expect(window.location.pathname).toBe("/");
    });

    it("navigates with the header links", async () => {
        const user = userEvent.setup();
        renderAt("/");
        const nav = screen.getAllByRole("navigation", { name: "Main" })[0];
        for (const item of APP_CONFIG.navigation) {
            expect(
                within(nav).getByRole("link", { name: item.label }),
            ).toHaveAttribute("href", item.href);
        }
        await user.click(within(nav).getByRole("link", { name: "Status" }));
        expect(window.location.pathname).toBe("/status");
        // The router renders the new page in a transition, so wait for it.
        expect(
            await screen.findByRole("heading", {
                level: 1,
                name: /project\s+status/i,
            }),
        ).toBeInTheDocument();
    });
});
