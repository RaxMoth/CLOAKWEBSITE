import React from "react";
import { Link } from "react-router-dom";
import { Check, CircleDashed, Minus } from "lucide-react";
import PageHero from "../components/PageHero";
import { Chip, IconBlob, SectionHeading } from "../components/CloakUI";
import { APP_CONFIG } from "../config/app";
import { STATUS_GROUPS, StatusGroup } from "../config/status";

const groupStyle: Record<
    StatusGroup["id"],
    {
        icon: typeof Check;
        tone: "mint" | "apricot" | "sand";
        number: string;
    }
> = {
    working: { icon: Check, tone: "mint", number: "text-leaf" },
    partial: { icon: CircleDashed, tone: "apricot", number: "text-apricot-dark" },
    missing: { icon: Minus, tone: "sand", number: "text-ink-soft" },
};

const Status: React.FC = () => {
    return (
        <div>
            <PageHero
                title={
                    <>
                        Project <span className="text-sage">status</span>
                    </>
                }
                subtitle="CLOAK is in development and has not been released. This page lists what works in the current build, what is half done and what does not exist yet."
            >
                <p className="font-semibold text-on-leaf/95">
                    Last updated {APP_CONFIG.lastUpdated}.
                </p>
            </PageHero>

            {/* Summary */}
            <section className="mx-auto max-w-7xl px-6 py-8 sm:px-12 lg:px-20">
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                    {STATUS_GROUPS.map((group) => {
                        const style = groupStyle[group.id];
                        return (
                            <a
                                key={group.id}
                                href={`#${group.id}`}
                                className="card p-4 text-center transition hover:shadow-lift sm:p-6"
                            >
                                <p
                                    className={`mb-1 font-display text-4xl font-semibold sm:text-5xl ${style.number}`}
                                >
                                    {group.items.length}
                                </p>
                                <p className="text-sm font-bold text-ink-soft sm:text-base">
                                    {group.title}
                                </p>
                            </a>
                        );
                    })}
                </div>
            </section>

            {/* Groups */}
            {STATUS_GROUPS.map((group) => {
                const style = groupStyle[group.id];
                return (
                    <section
                        key={group.id}
                        id={group.id}
                        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-10 sm:px-12 sm:py-12 lg:px-20"
                    >
                        <SectionHeading
                            title={group.title}
                            intro={group.summary}
                            className="mb-4"
                        />
                        <Chip tone={style.tone} className="mb-8">
                            {group.items.length} items
                        </Chip>
                        <ul className="grid gap-5 md:grid-cols-2">
                            {group.items.map((item) => (
                                <li
                                    key={item.title}
                                    className="card flex gap-4 p-5 sm:p-6"
                                >
                                    <IconBlob
                                        icon={style.icon}
                                        tone={style.tone}
                                        size="sm"
                                    />
                                    <div>
                                        <h3 className="mb-1 text-lg">
                                            {item.title}
                                        </h3>
                                        <p className="leading-relaxed text-ink-soft">
                                            {item.detail}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}

            {/* Next */}
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-16 lg:px-20">
                <div className="rounded-panel bg-mint p-8 text-center sm:p-12">
                    <h2 className="mb-4 text-3xl text-forest sm:text-4xl">
                        Want the details?
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-ink">
                        The walkthrough shows each step with real screens, and
                        the features page explains how tickets are signed and
                        slots are locked.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link to="/about" className="btn-primary">
                            How it works
                        </Link>
                        <Link to="/features" className="btn-outline">
                            Features
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Status;
