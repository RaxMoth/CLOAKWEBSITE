/**
 * How the dashboard words numbers, durations and dates.
 */

const wholeNumber = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
});

export const formatCount = (value: number): string =>
    wholeNumber.format(value);

/** "2 h 15 min", "45 min", "under 1 min"; a dash when there is no value. */
export const formatDuration = (seconds: number | null): string => {
    if (seconds === null) return "–";
    const minutes = Math.round(seconds / 60);
    if (minutes < 1) return "under 1 min";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
};

/** "17%" for a share of a whole; "0%" when the whole is empty. */
export const formatShare = (part: number, whole: number): string =>
    whole > 0 ? `${Math.round((part / whole) * 100)}%` : "0%";

/**
 * A "YYYY-MM-DD" day as a local calendar date. Parsing the parts by hand
 * keeps the day fixed: `new Date("2026-11-20")` would be read as UTC and can
 * land on the day before in some timezones.
 */
const dayToDate = (day: string): Date => {
    const [year, month, date] = day.split("-").map(Number);
    return new Date(year, month - 1, date);
};

const shortDay = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
});
const weekdayDay = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
});
const longDay = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
});
const clock = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
});
const dayAndClock = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
});

/** "20 Nov" */
export const formatDayShort = (day: string): string =>
    shortDay.format(dayToDate(day));

/** "Fri 20 Nov" */
export const formatDayWithWeekday = (day: string): string =>
    weekdayDay.format(dayToDate(day));

/** "Friday 20 November" */
export const formatDayLong = (day: string): string =>
    longDay.format(dayToDate(day));

/** "14:05" for a unix-seconds timestamp. */
export const formatClock = (unixSeconds: number): string =>
    clock.format(new Date(unixSeconds * 1000));

/** "Fri 20 Nov, 14:05" for a unix-seconds timestamp. */
export const formatDayAndClock = (unixSeconds: number): string =>
    dayAndClock.format(new Date(unixSeconds * 1000));

/** "today", "yesterday", or the weekday and date. */
export const formatRelativeDay = (
    unixSeconds: number,
    now: Date = new Date(),
): string => {
    const then = new Date(unixSeconds * 1000);
    const startOfDay = (d: Date) =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const days = Math.round((startOfDay(now) - startOfDay(then)) / 86_400_000);
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    return weekdayDay.format(then);
};

/** The browser's timezone, e.g. "Europe/Berlin". */
export const localTimezone = (): string =>
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
