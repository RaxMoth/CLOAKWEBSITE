/**
 * Built-in sample numbers for `npm run dashboard:sample`
 * (VITE_DASHBOARD_STATS=sample).
 *
 * They stand in for `GET /api/v1/stats` while a backend has no statistics
 * endpoint, and they are shaped like the backend's development seed: three
 * services, busier Fridays and Saturdays, visits of a few hours. The body is
 * returned in the backend's own snake_case form and goes through the same
 * parser as a real response, so the pages cannot tell the difference. The
 * dashboard shows a banner whenever these numbers are on screen.
 */

interface SampleService {
    id: string;
    name: string;
    slots: number;
    active: number;
    perDay: number;
    holdSeconds: number;
}

const SERVICES: SampleService[] = [
    { id: "sample-coat-check", name: "Coat Check", slots: 60, active: 12, perDay: 14, holdSeconds: 3 * 3600 + 20 * 60 },
    { id: "sample-bag-storage", name: "Bag Storage", slots: 40, active: 5, perDay: 7, holdSeconds: 2 * 3600 + 45 * 60 },
    { id: "sample-phone-locker", name: "Phone Locker", slots: 20, active: 3, perDay: 4, holdSeconds: 3600 + 50 * 60 },
];

/** A small repeatable pattern, so the bars are not all the same height. */
const WOBBLE = [0, 2, -1, 1, -2, 3, 0, -1, 2, 1, -2, 0, 1, -1];

const isoDay = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
};

const visitsOn = (service: SampleService, date: Date, index: number): number => {
    const weekend = date.getDay() === 5 || date.getDay() === 6;
    const base = weekend ? Math.round(service.perDay * 1.6) : service.perDay;
    const wobble = Math.round((WOBBLE[index % WOBBLE.length] * service.perDay) / 14);
    return Math.max(base + wobble, 0);
};

export const buildSampleStats = (
    days: number,
    timezone: string,
    serviceId?: string,
    now: Date = new Date(),
): unknown => {
    const services = serviceId
        ? SERVICES.filter((service) => service.id === serviceId)
        : SERVICES;
    const dates = Array.from({ length: days }, (_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        date.setDate(date.getDate() - (days - 1 - index));
        return date;
    });
    const today = dates.length - 1;

    // Earlier days: everything issued was collected again the same night.
    // Today: only what is checked in right now.
    const issuedBy = (service: SampleService, index: number): number =>
        index === today ? service.active : visitsOn(service, dates[index], index);
    const releasedBy = (service: SampleService, index: number): number =>
        index === today ? 0 : visitsOn(service, dates[index], index);

    const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

    const perService = services.map((service) => {
        const issued = sum(dates.map((_, index) => issuedBy(service, index)));
        const released = sum(dates.map((_, index) => releasedBy(service, index)));
        return {
            service_id: service.id,
            name: service.name,
            total_slots: service.slots,
            occupied: service.active,
            free: service.slots - service.active,
            tickets_issued: issued,
            tickets_released: released,
            tickets_active: service.active,
            avg_hold_seconds: released > 0 ? service.holdSeconds : null,
        };
    });

    const released = sum(perService.map((service) => service.tickets_released));
    const heldSeconds = sum(
        perService.map(
            (service) => (service.avg_hold_seconds ?? 0) * service.tickets_released,
        ),
    );

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const at = (minutesAgo: number) =>
        Math.floor(
            Math.max(now.getTime() - minutesAgo * 60_000, startOfToday.getTime()) / 1000,
        );
    const recent = services.flatMap((service, serviceIndex) =>
        Array.from({ length: Math.min(service.active, 4) }, (_, index) => ({
            ticket_id: `${service.id}-ticket-${index + 1}`,
            service_id: service.id,
            service_name: service.name,
            slot_number: index + 1,
            event: "issued",
            at: at(9 + serviceIndex * 7 + index * 23),
        })),
    );
    recent.sort((a, b) => b.at - a.at);

    return {
        range: {
            from: isoDay(dates[0]),
            to: isoDay(dates[today]),
            days,
            timezone,
        },
        generated_at: Math.floor(now.getTime() / 1000),
        totals: {
            services: perService.length,
            total_slots: sum(perService.map((service) => service.total_slots)),
            occupied: sum(perService.map((service) => service.occupied)),
            free: sum(perService.map((service) => service.free)),
            tickets_issued: sum(perService.map((service) => service.tickets_issued)),
            tickets_released: released,
            tickets_active: sum(perService.map((service) => service.tickets_active)),
            avg_hold_seconds: released > 0 ? Math.round(heldSeconds / released) : null,
        },
        services: perService,
        days: dates.map((date, index) => ({
            date: isoDay(date),
            issued: sum(services.map((service) => issuedBy(service, index))),
            released: sum(services.map((service) => releasedBy(service, index))),
        })),
        recent,
    };
};
