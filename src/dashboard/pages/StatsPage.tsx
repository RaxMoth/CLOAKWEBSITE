import React, { useCallback, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import PageHero from "../../components/PageHero";
import { SectionHeading } from "../../components/CloakUI";
import { DASHBOARD_PATHS } from "../../config/dashboard";
import { USING_SAMPLE_STATS } from "../api";
import DailyChart from "../components/DailyChart";
import {
    LoadError,
    Period,
    PERIODS,
    PeriodFilter,
    SampleBanner,
} from "../components/Controls";
import { RecentList, ServiceList } from "../components/Lists";
import { OccupancyMeter, StatTile } from "../components/Tiles";
import { formatCount, formatDuration } from "../format";
import { useSession } from "../session";
import { ServiceStats, Stats, TicketCounts } from "../types";
import { useStats } from "../useStats";

const SignOutButton: React.FC = () => {
    const { signOut } = useSession();
    return (
        <button
            type="button"
            onClick={() => signOut()}
            className="btn-ghost-on-leaf !px-5 !py-2 text-sm"
        >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
        </button>
    );
};

/** The headline numbers: slots right now, tickets in the period. */
const Tiles: React.FC<{
    counts: TicketCounts;
    period: Period;
    meterLabel: string;
}> = ({ counts, period, meterLabel }) => (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-6">
        <StatTile
            hero
            label="Occupied now"
            value={formatCount(counts.occupied)}
            className="col-span-2"
        >
            <OccupancyMeter
                occupied={counts.occupied}
                total={counts.totalSlots}
                label={meterLabel}
                className="mt-4"
            />
        </StatTile>
        <StatTile
            label="Free now"
            value={formatCount(counts.free)}
            hint="slots"
        />
        <StatTile
            label="Tickets issued"
            value={formatCount(counts.ticketsIssued)}
            hint={`last ${period} days`}
        />
        <StatTile
            label="Tickets released"
            value={formatCount(counts.ticketsReleased)}
            hint={`last ${period} days`}
        />
        <StatTile
            label="Average hold"
            value={formatDuration(counts.avgHoldSeconds)}
            hint="issue to release"
        />
    </div>
);

/**
 * When a service is asked for, a backend that supports the filter answers
 * with that one service. An older one ignores the filter and answers for the
 * whole venue; then only the service's own row can be trusted, not the
 * per-day series or the totals.
 */
const pickService = (
    stats: Stats,
    serviceId: string,
): { service: ServiceStats | null; filtered: boolean } => {
    const service =
        stats.services.find((entry) => entry.serviceId === serviceId) ?? null;
    return { service, filtered: stats.services.length <= 1 };
};

const DEFAULT_PERIOD: Period = 14;

const readPeriod = (value: string | null): Period => {
    const days = Number(value);
    return PERIODS.find((period) => period === days) ?? DEFAULT_PERIOD;
};

const StatsPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId?: string }>();
    const { session } = useSession();

    // The period lives in the address (?days=30), so it stays the same when
    // moving between the overview and a service, and survives a reload.
    const [searchParams, setSearchParams] = useSearchParams();
    const period = readPeriod(searchParams.get("days"));
    const setPeriod = useCallback(
        (next: Period) =>
            setSearchParams(next === DEFAULT_PERIOD ? {} : { days: String(next) }, {
                replace: true,
            }),
        [setSearchParams],
    );
    const withPeriod = (path: string) =>
        period === DEFAULT_PERIOD ? path : `${path}?days=${period}`;
    const { stats, loading, error, reload } = useStats(period, serviceId);

    const picked = stats && serviceId ? pickService(stats, serviceId) : null;
    const title = serviceId ? (picked?.service?.name ?? "Service") : "Dashboard";

    useEffect(() => {
        document.title = `${title} | CLOAK dashboard`;
    }, [title]);

    const counts: TicketCounts | null = !stats
        ? null
        : serviceId
          ? (picked?.service ?? null)
          : stats.totals;
    const showPerDay = !serviceId || picked?.filtered === true;
    const recent =
        stats && serviceId
            ? stats.recent.filter((event) => event.serviceId === serviceId)
            : (stats?.recent ?? []);

    return (
        <div>
            <PageHero
                eyebrow={
                    serviceId ? (
                        <Link
                            to={withPeriod(DASHBOARD_PATHS.overview)}
                            className="inline-flex items-center gap-2 font-extrabold text-on-leaf underline-offset-4 hover:underline focus-visible:outline-on-leaf"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            All services
                        </Link>
                    ) : undefined
                }
                title={title}
                subtitle={
                    serviceId
                        ? "This service's slots right now and its tickets over time."
                        : `Signed in as ${session?.email ?? "your venue"}. Slots right now and tickets over time, across all services.`
                }
            >
                <SignOutButton />
            </PageHero>

            <div className="mx-auto max-w-7xl space-y-8 px-6 py-8 sm:px-12 lg:px-20">
                {USING_SAMPLE_STATS && <SampleBanner />}

                {/* One filter row; everything below is for this period. */}
                <PeriodFilter
                    value={period}
                    onChange={setPeriod}
                    onReload={reload}
                    loading={loading}
                />

                {error && <LoadError error={error} onRetry={reload} />}

                {!stats && loading && (
                    <p role="status" className="card p-8 text-center text-ink-soft">
                        Loading the numbers…
                    </p>
                )}

                {stats && serviceId && !picked?.service && (
                    <div className="card p-6 sm:p-8">
                        <h2 className="mb-2 text-xl">Service not found</h2>
                        <p className="mb-5 text-ink-soft">
                            This venue has no service with that address.
                        </p>
                        <Link
                            to={withPeriod(DASHBOARD_PATHS.overview)}
                            className="btn-outline"
                        >
                            Back to all services
                        </Link>
                    </div>
                )}

                {stats && counts && (
                    <div
                        className={`space-y-8 transition-opacity ${
                            loading ? "opacity-60" : ""
                        }`}
                        aria-busy={loading}
                    >
                        <Tiles
                            counts={counts}
                            period={period}
                            meterLabel={
                                serviceId
                                    ? `${title}: slots occupied now`
                                    : "All services: slots occupied now"
                            }
                        />

                        <section className="card p-5 sm:p-8">
                            {showPerDay ? (
                                <DailyChart days={stats.days} loading={loading} />
                            ) : (
                                <>
                                    <h2 className="mb-2 text-xl">Tickets per day</h2>
                                    <p className="max-w-2xl text-ink-soft">
                                        This backend does not report per-day
                                        numbers for a single service yet. The
                                        figures above are this service's own;
                                        the per-day chart for the whole venue is
                                        on the overview.
                                    </p>
                                </>
                            )}
                        </section>

                        {!serviceId && (
                            <section>
                                <SectionHeading
                                    title="Services"
                                    className="mb-6"
                                />
                                <ServiceList
                                    services={stats.services}
                                    periodLabel={`last ${period} days`}
                                    linkTo={(id) =>
                                        withPeriod(DASHBOARD_PATHS.service(id))
                                    }
                                />
                            </section>
                        )}

                        <section>
                            <SectionHeading
                                title="Recent activity"
                                className="mb-6"
                            />
                            <div className="card px-5 py-2 sm:px-8">
                                <RecentList
                                    events={recent}
                                    showService={!serviceId}
                                />
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsPage;
