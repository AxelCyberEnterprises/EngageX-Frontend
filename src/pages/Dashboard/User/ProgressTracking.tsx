/* eslint-disable react-hooks/exhaustive-deps */
import ShadSelect from "@/components/dashboard/Select";
import ShadBarChart from "@/components/dashboard/ShadBarChart";
import StatsCardSection from "@/components/dashboard/StatusCard";
import ActionModal from "@/components/modals/modalVariants/ActionModal";
import EnterpriseTrainingGoalsTable from "@/components/tables/enterprice-training-goals-table/user";
import { RecentSessionsTable } from "@/components/tables/recent-sessions-table/user";
import { Session } from "@/components/tables/recent-sessions-table/user/data";
import { SortOption, TimeFrame, useProgressTracking } from "@/hooks/progressTracking";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import circleCheck from "../../../assets/images/svgs/circle-check.svg";
import circleExclamation from "../../../assets/images/svgs/circle-exclamation.svg";
import filter from "../../../assets/images/svgs/filter.svg";
import graphUP from "../../../assets/images/svgs/graph-up.svg";
import micIcon from "../../../assets/images/svgs/mic.svg";
import select from "../../../assets/images/svgs/select.svg";
import speakerIcon from "../../../assets/images/svgs/speaker.svg";
import tvIcon from "../../../assets/images/svgs/tv.svg";

export interface Metric {
    metric: string;
    category: string;
    session1: number;
    session2: number;
    session3: number;
    trend: "Progressing" | "Declining" | "Stable";
}

const ProgressTracking: React.FC = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);
    const [timeFrame, setTimeFrame] = useState<TimeFrame>("weekly");
    const [sortOption, setSortOption] = useState<SortOption>("max-date");
    const [searchParams] = useSearchParams();
    const memberId = searchParams.get("memberId");
    console.log("member: ", memberId);
    const {
        data: progressTracking,
        isLoading: progressTrackingLoading,
        error: progressTrackingError,
        refetch,
    } = useProgressTracking({
        timeFrame: timeFrame,
        sort: sortOption,
        memberId: memberId || "0",
    });
    useEffect(() => {
        refetch();
    }, [timeFrame, sortOption]);

    useEffect(() => {
        if (progressTrackingError) {
            toast.error(
                "Failed to fetch goals and achievement: " +
                    ((progressTrackingError as Error).message || "Unknown error"),
            );
        }
    }, [progressTrackingError]);

    const performanceCardsData = [
        {
            icon: micIcon,
            iconAlt: "Progress icon",
            title: "Speaking Time",
            value: progressTracking?.overview_card.speaking_time || "0:00:00",
            subtext: "Total practice time",
            isPositive: true,
        },
        {
            icon: tvIcon,
            iconAlt: "Performance icon",
            title: "Total Sessions",
            value: progressTracking?.overview_card.total_session?.toString() || "0",
            subtext: "Completed sessions",
        },
        {
            icon: speakerIcon,
            iconAlt: "Impact icon",
            title: "Average Impact",
            value:
                progressTracking?.overview_card.impact !== undefined
                    ? `${progressTracking.overview_card.impact}%`
                    : "0",
            subtext: "The impact of the overall speech",
        },
        {
            icon: graphUP,
            iconAlt: "Focus icon",
            title: "Average Transformative Communication",
            value:
                progressTracking?.overview_card.transformative_communication !== undefined
                    ? `${progressTracking.overview_card.transformative_communication}%`
                    : "0",
            subtext: "Delivery's transformative effect",
        },
    ];

    const sessions: Session[] =
        progressTracking?.recent_session.map((session: any) => {
            const date = new Date(session.date);
            const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });

            return {
                id: session.id.toString(),
                name: session.session_name,
                date: formattedDate,
                type: session.session_type_display,
                duration: session.formatted_duration || "N/A",
                improvement: session.impact,
            };
        }) || [];

    type GraphDataItem = {
        month: string;
        impact: number;
        trigger_response: number;
        conviction: number;
    };

    const chartData = useMemo(() => {
        if (!progressTracking?.graph_data) return [];
        return progressTracking.graph_data.map((item: GraphDataItem, index: number) => {
            const date = new Date(item.month);
            const monthName = date.toLocaleString("default", { month: "long" });
            return {
                month: index * 10,
                monthLabel: monthName,
                Impact: item.impact,
                TriggerResponse: item.trigger_response,
                Conviction: item.conviction,
            };
        });
    }, [progressTracking]);

    const chartColors = {
        Impact: "#252A39",
        TriggerResponse: "#64BA9F",
        Conviction: "#40B869",
    };

    const timeOptions = [
        {
            value: "weekly",
            label: "Weekly",
        },
        {
            value: "monthly",
            label: "Monthly",
        },
        {
            value: "yearly",
            label: "Yearly",
        },
    ];

    const handleTimeFrameChange = (value: string) => {
        setTimeFrame(value as TimeFrame);
    };

    const filterOptions: { value: string; label: string }[] = [
        { value: "all", label: "All Sessions" },
        { value: "pitch", label: "Pitch Practice" },
        { value: "public", label: "Public Speaking" },
        { value: "presentation", label: "Presentation Practice" },
    ];
    const sortOptions: { value: SortOption; label: string }[] = [
        { value: "max-date", label: "Date (Newest First)" },
        { value: "min-date", label: "Date (Oldest First)" },
        { value: "max-impact", label: "Impact (Highest)" },
        { value: "min-impact", label: "Impact (Lowest)" },
        { value: "max-duration", label: "Duration (Longest)" },
        { value: "min-duration", label: "Duration (Shortest)" },
    ];

    const [activeFilter, setActiveFilter] = useState("all");

    const filteredSessions =
        activeFilter === "all"
            ? sessions
            : sessions.filter((session) => session.type.toLowerCase().includes(activeFilter.toLowerCase()));

    const handleFilterChange = (value: string) => {
        setActiveFilter(value);
    };

    const handleSortChange = (value: string) => {
        setSortOption(value as SortOption);
    };

    return (
        <>
            <ActionModal
                show={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                icon={circleCheck}
                head="Payment Successful"
                message="Your credit has been successfully processed! Thank you for your transaction."
                cta="Confirm"
                ctaClassName="border border-[#D5D7DA] text-[#FFFFFF]"
            />
            <ActionModal
                show={showFailureModal}
                onClose={() => setShowFailureModal(false)}
                icon={circleExclamation}
                head="Payment Unsuccessful"
                message="Your payment could not be processed. Please try again or check your payment details."
                cta="Cancel"
                ctaClassName="bg-[#262B3A] text-[#414651]"
            />
            <div className="scrollbar-hide md:px-8 px-4">
                <section className="py-5 flex md:flex-row flex-col md:gap-2 gap-3 items-start justify-between">
                    <div>
                        <h3 className="xl:text-2xl text-xl text-[#262B3A]">Progress Tracking</h3>
                    </div>
                </section>

                <div>
                    <section>
                        <div className="md:mt-5 mt-10 mb-6">
                            <h3 className="text-xl font-medium text-#252A39">Performance Overview</h3>
                            <p className="text-sm text-[#6F7C8E] mt-1">Here's a quick overview of your performance</p>
                        </div>
                    </section>

                    <section className="mt-10 mb-8">
                        <StatsCardSection cards={performanceCardsData} loadingCards={progressTrackingLoading} />
                    </section>

                    <section className="px-4 py-6 rounded-[8px] border border-[#E4E7EC]">
                        <p className="big mb-6">Enterprise Training Goals</p>

                        <EnterpriseTrainingGoalsTable />
                    </section>

                    <section className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-10">
                        <div className="analytics sm:px-5 px-4 sm:py-7 py-5 h-fit rounded-[8px] border border-[#E4E7EC] shadow-none">
                            <div className="flex justify-between items-center mb-6">
                                <p className="big chinese__black">Performance Analytics</p>
                                <div className="flex items-center">
                                    <ShadSelect
                                        options={timeOptions}
                                        onChange={handleTimeFrameChange}
                                        placeholder="Weekly"
                                        defaultValue={timeFrame}
                                        className="w-fit sm:rounded-[7px] rounded-[5px] shadow-none sm:py-3 py-1 sm:px-4 px-2 sm:h-9 h-7 text-[#333333] focus-visible:ring-0 active:shadow-none"
                                        showIcon={false}
                                    />
                                </div>
                            </div>

                            <div className="chart__div">
                                <ShadBarChart
                                    data={chartData}
                                    colors={chartColors}
                                    height={350}
                                    barSize={40}
                                    timeFrame={timeFrame}
                                />
                            </div>
                        </div>
                        <div className="pl-6 pt-4 rounded-lg border border-gray-200 bg-white shadow-none">
                            <div className="flex justify-between gap-4 items-center mb-6 mr-6 overflow-auto scrollbar-hide">
                                <h2 className="md:text-xl text-lg font-medium whitespace-nowrap">Recent Sessions</h2>

                                <div className="flex gap-2 items-center">
                                    <div className="relative">
                                        <ShadSelect
                                            options={filterOptions}
                                            onChange={handleFilterChange}
                                            placeholder="Filter"
                                            defaultValue={activeFilter}
                                            className="rounded-lg border px-4 py-2 text-sm font-medium"
                                            showIcon={true}
                                            placeholderClassname="sm:flex hidden"
                                            icon={filter}
                                            hideChevron={true}
                                        />
                                    </div>

                                    <div className="relative">
                                        <ShadSelect
                                            options={sortOptions}
                                            onChange={handleSortChange}
                                            placeholder="Sort"
                                            defaultValue={sortOption}
                                            className="rounded-lg border px-4 py-2 text-sm font-medium"
                                            showIcon={true}
                                            placeholderClassname="sm:flex hidden"
                                            icon={select}
                                            hideChevron={true}
                                        />
                                    </div>

                                    <Link
                                        to="../session-history"
                                        className="text-sm underline cursor-pointer whitespace-nowrap"
                                    >
                                        View All
                                    </Link>
                                </div>
                            </div>
                            <RecentSessionsTable
                                data={filteredSessions}
                                hidePagination={true}
                                loadingRecentSessions={progressTrackingLoading}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ProgressTracking;
