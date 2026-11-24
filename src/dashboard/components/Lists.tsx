import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PackageCheck, Ticket } from "lucide-react";
import { IconBlob } from "../../components/CloakUI";
import {
    formatClock,
    formatCount,
    formatDayAndClock,
    formatDuration,
    formatRelativeDay,
} from "../format";
import { RecentEvent, ServiceStats } from "../types";
import { OccupancyMeter } from "./Tiles";

/**
 * One row per service: its name, how full it is right now, and its ticket
 * numbers for the period. Each row leads to that service's own page.
 */
export const ServiceList: React.FC<{
    services: ServiceStats[];
    periodLabel: string;
    /** Where a service's name leads. */
    linkTo: (serviceId: string) => string;
}> = ({ services, periodLabel, linkTo }) => {
    if (services.length === 0) {
        return (
            <p className="rounded-field bg-sand p-5 text-ink-soft">
                This venue has no services yet. Create one in the app, then
                refresh.
            </p>
        );
    }
    return (
        <ul className="space-y-4">
            {services.map((service) => (
                <li key={service.serviceId} className="card p-5 sm:p-6">
                    <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto]">
                        <div className="min-w-0">
                            <h3 className="truncate text-xl">
                                <Link
                                    to={linkTo(service.serviceId)}
                                    className="inline-flex items-center gap-2 text-ink transition hover:text-leaf"
                                >
                                    {service.name}
                                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                                </Link>
                            </h3>
                            <OccupancyMeter
                                occupied={service.occupied}
                                total={service.totalSlots}
                                label={`${service.name}: slots occupied now`}
                                className="mt-3"
                            />
                        </div>
                        <dl className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <dt className="font-bold text-ink-soft">Issued</dt>
                                <dd className="text-xl font-extrabold text-ink">
                                    {formatCount(service.ticketsIssued)}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-bold text-ink-soft">Released</dt>
                                <dd className="text-xl font-extrabold text-ink">
                                    {formatCount(service.ticketsReleased)}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-bold text-ink-soft">Average hold</dt>
                                <dd className="text-xl font-extrabold text-ink">
                                    {formatDuration(service.avgHoldSeconds)}
                                </dd>
                            </div>
                        </dl>
                        <p className="text-sm text-ink-soft lg:text-right">{periodLabel}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

/** The latest tickets issued and released, newest first. */
export const RecentList: React.FC<{
    events: RecentEvent[];
    /** Leave the service name out when the page is about one service. */
    showService?: boolean;
}> = ({ events, showService = true }) => {
    if (events.length === 0) {
        return (
            <p className="rounded-field bg-sand p-5 text-ink-soft">
                No ticket activity to show yet.
            </p>
        );
    }
    return (
        <ul className="divide-y divide-line">
            {events.map((event) => (
                <li
                    key={`${event.ticketId}-${event.event}-${event.at}`}
                    className="flex items-center gap-4 py-3"
                >
                    <IconBlob
                        icon={event.event === "issued" ? Ticket : PackageCheck}
                        tone={event.event === "issued" ? "mint" : "sand"}
                        size="sm"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="font-extrabold text-ink">
                            Slot {formatCount(event.slotNumber)}{" "}
                            {event.event === "issued" ? "issued" : "released"}
                        </p>
                        {showService && (
                            <p className="truncate text-sm text-ink-soft">
                                {event.serviceName}
                            </p>
                        )}
                    </div>
                    <time
                        dateTime={new Date(event.at * 1000).toISOString()}
                        title={formatDayAndClock(event.at)}
                        className="shrink-0 text-right text-sm text-ink-soft"
                    >
                        <span className="block font-bold text-ink">
                            {formatClock(event.at)}
                        </span>
                        {formatRelativeDay(event.at)}
                    </time>
                </li>
            ))}
        </ul>
    );
};
