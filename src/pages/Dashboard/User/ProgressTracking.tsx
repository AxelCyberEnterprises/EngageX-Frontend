/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import circleCheck from "../../../assets/images/svgs/circle-check.svg";
import circleExclamation from "../../../assets/images/svgs/circle-exclamation.svg";
import graphUP from "../../../assets/images/svgs/graph-up.svg";
import micIcon from "../../../assets/images/svgs/mic.svg";
import speakerIcon from "../../../assets/images/svgs/speaker.svg";
import tvIcon from "../../../assets/images/svgs/tv.svg";
import filter from "../../../assets/images/svgs/filter.svg";
import select from "../../../assets/images/svgs/select.svg";
import ActionModal from "@/components/modals/modalVariants/ActionModal";
import ShadSelect from "@/components/dashboard/Select";
import StatsCardSection from "@/components/dashboard/StatusCard";
import { RecentSessionsTable } from "@/components/tables/recent-sessions-table/user";
import { Session } from "@/components/tables/recent-sessions-table/user/data";
import { Link } from "react-router-dom";
import RecentAchievementsModal from "@/components/modals/modalVariants/RecentAchievementsModal";
import { useGoalsAndAchievement } from "@/hooks/goalsAndAchievement";
import { useProgressTracking } from "@/hooks/progressTracking";
import { toast } from "sonner";
import ShadBarChart from "@/components/dashboard/ShadBarChart";

interface Achievement {
  id: number;
  title: string;
  level: number;
  score: number;
  total: number;
  note: string;
}

export interface Metric {
  metric: string;
  category: string;
  session1: number;
  session2: number;
  session3: number;
  trend: 'Progressing' | 'Declining' | 'Stable';
};


const ProgressTracking: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [
    showRecentAchievementsModal,
    setShowRecentAchievementsModal,
  ] = useState(false);
  const {
    data: goalsAndAchievement,
    error: fetchGoalsAndAchievement,
  } = useGoalsAndAchievement();
  const {
    data: progressTracking,
    isLoading: progressTrackingLoading,
    error: progressTrackingEerror,
  } = useProgressTracking();

  useEffect(() => {
    if (fetchGoalsAndAchievement) {
      toast.error(
        "Failed to fetch goals and achievement: " +
        (fetchGoalsAndAchievement.message || "Unknown error")
      );
    }
  }, []);

  useEffect(() => {
    if (progressTrackingEerror) {
      toast.error(
        "Failed to fetch goals and achievement: " +
        (progressTrackingEerror.message || "Unknown error")
      );
    }
  }, []);

  const getLevel = (score: number) => {
    if (score >= 1 && score <= 3) return 1;
    if (score >= 4 && score <= 7) return 2;
    if (score >= 8 && score <= 10) return 3;
    return 1;
  };
  const achievementData: Achievement[] = [
    {
      id: 1,
      title: "Vocal Variety Mastery",
      score: goalsAndAchievement?.vocal_variety ?? 0,
      level: getLevel(Math.round(goalsAndAchievement?.vocal_variety ?? 0)),
      total: 10,
      note: "Pitch, tone, pace, and pauses.",
    },
    {
      id: 2,
      title: "Overall Captured Impact Mastery",
      score: goalsAndAchievement?.overall_captured_impact ?? 0,
      level: getLevel(Math.round(goalsAndAchievement?.overall_captured_impact ?? 0)),
      total: 10,
      note: "The impact of the overall speech.",
    },
    {
      id: 3,
      title: "Emotional Impact Mastery",
      score: goalsAndAchievement?.emotional_impact ?? 0,
      level: getLevel(Math.round(goalsAndAchievement?.emotional_impact ?? 0)),
      total: 10,
      note: "Compels to the audience's emotions.",
    },
    {
      id: 4,
      title: "Body Language Mastery",
      score: goalsAndAchievement?.body_language ?? 0,
      level: getLevel(Math.round(goalsAndAchievement?.body_language ?? 0)),
      total: 10,
      note: "Body posture, motion and hand gestures.",
    },
    {
      id: 5,
      title: "Transformative Communication Mastery",
      score: goalsAndAchievement?.transformative_communication ?? 0,
      level: getLevel(Math.round(goalsAndAchievement?.transformative_communication ?? 0)),
      total: 10,
      note: "Inspires change or shifts thinking.",
    },
    {
      id: 6,
      title: "Audience Engagement Mastery",
      score: goalsAndAchievement?.audience_engagement ?? 0,
      level: getLevel(Math.round(goalsAndAchievement?.audience_engagement ?? 0)),
      total: 10,
      note: "Triggers the audience to respond.",
    },
    {
      id: 7,
      title: "Structure & Clarity Mastery",
      score: goalsAndAchievement?.structure_and_clarity ?? 0,
      level: getLevel(Math.round(goalsAndAchievement?.structure_and_clarity ?? 0)),
      total: 10,
      note: "How clearly ideas are organized and expressed.",
    },
    {
      id: 8,
      title: "Language & Word Choice Mastery",
      score: goalsAndAchievement?.language_and_word_choice ?? 0,
      level: getLevel(Math.round(goalsAndAchievement?.language_and_word_choice ?? 0)),
      total: 10,
      note: "Avoid filler words and use good grammar.",
    },
  ];
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
      iconAlt: "Content icon",
      title: "Impact",
      value: `${(goalsAndAchievement?.overall_captured_impact * 10) || 0}%`,
      subtext: "The impact of the overall speech",
    },
    {
      icon: graphUP,
      iconAlt: "Focus icon",
      title: "Transformative Communication",
      value: `${(goalsAndAchievement?.structure_and_clarity * 10 || 0)}%`,
      subtext: "Delivery's transformative effect",
    },
  ];

  const sessions: Session[] =
    progressTracking?.recent_session.map((session: any) => {
      // Format the date for display
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
        duration: session.formatted_duration,
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
    const maxValue = Math.max(
      ...progressTracking.graph_data.flatMap((item: GraphDataItem) => [
        item.impact,
        item.trigger_response,
        item.conviction,
      ])
    );
    return progressTracking.graph_data.map((item: GraphDataItem, index: number) => {
      const date = new Date(item.month);
      const monthName = date.toLocaleString("default", { month: "long" });
      return {
        month: index * 10,
        monthLabel: monthName,
        Impact: (item.impact / maxValue) * 100,
        TriggerResponse: (item.trigger_response / maxValue) * 100,
        Conviction: (item.conviction / maxValue) * 100,
      };
    });
  }, [progressTracking]);

  const chartColors = {
    Impact: "#252A39",
    TriggerResponse: "#64BA9F",
    Conviction: '#40B869'
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
    console.log("Selected time:", value);
  };

  const filterOptions: { value: string; label: string }[] = [
    { value: "all", label: "All Sessions" },
    { value: "pitch", label: "Pitch Practice" },
    { value: "public", label: "Public Speaking" },
    { value: "presentation", label: "Presentation Practice" },
  ];

  const sortOptions: { value: string; label: string }[] = [
    { value: "date-desc", label: "Date (Newest First)" },
    { value: "date-asc", label: "Date (Oldest First)" },
    { value: "impact-desc", label: "Impact (Highest)" },
    { value: "impact-asc", label: "Impact (Lowest)" },
    { value: "duration-desc", label: "Duration (Longest)" },
    { value: "duration-asc", label: "Duration (Shortest)" },
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("date-desc");

  const filteredSessions =
    activeFilter === "all"
      ? sessions
      : sessions.filter((session) =>
        session.type.toLowerCase().includes(activeFilter.toLowerCase())
      );

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
  };

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    console.log(activeSort);
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
      <RecentAchievementsModal
        show={showRecentAchievementsModal}
        onClose={() => setShowRecentAchievementsModal(false)}
        achievementData={achievementData}
      />
      <div className="scrollbar-hide md:px-8 px-4">
        <section className="py-5 flex md:flex-row flex-col md:gap-2 gap-3 items-start justify-between">
          <div>
            <h3 className="xl:text-2xl text-xl text-[#262B3A]">
              Progress Tracking
            </h3>

          </div>
        </section>

        <div>
          <section>
            <div className="md:mt-5 mt-10 mb-6">
              <h3 className="text-xl font-medium text-#252A39">
                Performance Overview
              </h3>
              <p className="text-sm text-[#6F7C8E] mt-1">
                Here’s a quick overview of your performance
              </p>
            </div>
          </section>
          <section className="mt-10">
            <StatsCardSection
              cards={performanceCardsData}
              loadingCards={progressTrackingLoading}
            />
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
                    className="w-fit sm:rounded-[7px] rounded-[5px] shadow-none sm:py-3 py-1 sm:px-4 px-2 sm:h-9 h-7 text-[#333333] focus-visible:ring-0 active:shadow-none"
                    showIcon={false}
                  />
                  <small className="underline cursor-pointer gunmetal ml-4">
                    View Report
                  </small>
                </div>
              </div>

              <div className="chart__div">
                <ShadBarChart
                  data={chartData}
                  colors={chartColors}
                  height={350}
                  barSize={40}
                />
              </div>
            </div>
            <div className="pl-6 pt-4 rounded-lg border border-gray-200 bg-white shadow-none">
              <div className="flex justify-between gap-4 items-center mb-6 mr-6 overflow-auto scrollbar-hide">
                <h2 className="md:text-xl text-lg font-medium whitespace-nowrap">
                  Recent Sessions
                </h2>

                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <ShadSelect
                      options={filterOptions}
                      onChange={handleFilterChange}
                      placeholder="Filter"
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
                      className="rounded-lg border px-4 py-2 text-sm font-medium"
                      showIcon={true}
                      placeholderClassname="sm:flex hidden"
                      icon={select}
                      hideChevron={true}
                    />
                  </div>

                  <Link to="../session-history" className="text-sm underline cursor-pointer whitespace-nowrap">
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
