/**
 * The statistics a venue sees on the dashboard, and how they are read from
 * the backend's `GET /api/v1/stats` response.
 *
 * The backend speaks snake_case and its statistics endpoint is new, so the
 * parser is deliberately forgiving: a field that is missing becomes 0, null
 * or an empty list instead of breaking the page. A wrong type is treated the
 * same as a missing field.
 */

export interface StatsRange {
    /** First day of the range, "YYYY-MM-DD". */
    from: string;
    /** Last day of the range (today), "YYYY-MM-DD". */
    to: string;
    days: number;
    timezone: string;
}

export interface TicketCounts {
    totalSlots: number;
    /** Slots holding something right now. */
    occupied: number;
    free: number;
    /** Tickets issued within the range. */
    ticketsIssued: number;
    /** Tickets released within the range. */
    ticketsReleased: number;
    /** Tickets that are active right now. */
    ticketsActive: number;
    /** Mean time between issue and release, null if nothing was released. */
    avgHoldSeconds: number | null;
}

export interface StatsTotals extends TicketCounts {
    services: number;
}

export interface ServiceStats extends TicketCounts {
    serviceId: string;
    name: string;
}

export interface DayStats {
    /** "YYYY-MM-DD" in the requested timezone. */
    date: string;
    issued: number;
    released: number;
}

export interface RecentEvent {
    ticketId: string;
    serviceId: string;
    serviceName: string;
    slotNumber: number;
    event: "issued" | "released";
    /** Unix seconds. */
    at: number;
}

export interface Stats {
    /** Echo of the request, when the backend sends it. */
    range: StatsRange | null;
    /** Unix seconds, when the backend sends it. */
    generatedAt: number | null;
    totals: StatsTotals;
    services: ServiceStats[];
    /** One entry per day, oldest first. */
    days: DayStats[];
    recent: RecentEvent[];
}

type Raw = Record<string, unknown>;

const isObject = (value: unknown): value is Raw =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const num = (value: unknown, fallback = 0): number =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

const numOrNull = (value: unknown): number | null =>
    typeof value === "number" && Number.isFinite(value) ? value : null;

const str = (value: unknown, fallback = ""): string =>
    typeof value === "string" ? value : fallback;

const list = (value: unknown): Raw[] =>
    Array.isArray(value) ? value.filter(isObject) : [];

const parseCounts = (raw: Raw): TicketCounts => {
    const totalSlots = num(raw.total_slots);
    const occupied = num(raw.occupied);
    return {
        totalSlots,
        occupied,
        // Older shapes may leave `free` out; it follows from the other two.
        free: num(raw.free, Math.max(totalSlots - occupied, 0)),
        // `tickets_total` was the first name proposed for tickets issued.
        ticketsIssued: num(raw.tickets_issued, num(raw.tickets_total)),
        ticketsReleased: num(raw.tickets_released),
        ticketsActive: num(raw.tickets_active, occupied),
        avgHoldSeconds: numOrNull(raw.avg_hold_seconds),
    };
};

const parseRange = (raw: unknown): StatsRange | null => {
    if (!isObject(raw)) return null;
    const from = str(raw.from);
    const to = str(raw.to);
    if (!from || !to) return null;
    return {
        from,
        to,
        days: num(raw.days),
        timezone: str(raw.timezone, "UTC"),
    };
};

/** Reads a `GET /api/v1/stats` response body. Never throws. */
export const parseStats = (body: unknown): Stats => {
    const raw = isObject(body) ? body : {};
    const totals = isObject(raw.totals) ? raw.totals : {};
    const services = list(raw.services).map((service) => ({
        ...parseCounts(service),
        serviceId: str(service.service_id, str(service.id)),
        name: str(service.name, "Unnamed service"),
    }));

    return {
        range: parseRange(raw.range),
        generatedAt: numOrNull(raw.generated_at),
        totals: {
            ...parseCounts(totals),
            services: num(totals.services, services.length),
        },
        services,
        days: list(raw.days)
            .map((day) => ({
                date: str(day.date),
                issued: num(day.issued),
                released: num(day.released),
            }))
            .filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(day.date))
            .sort((a, b) => a.date.localeCompare(b.date)),
        recent: list(raw.recent)
            .map((entry) => ({
                ticketId: str(entry.ticket_id),
                serviceId: str(entry.service_id),
                serviceName: str(entry.service_name, "Unknown service"),
                slotNumber: num(entry.slot_number),
                event:
                    entry.event === "released"
                        ? ("released" as const)
                        : ("issued" as const),
                at: num(entry.at),
            }))
            .filter((entry) => entry.at > 0),
    };
};
