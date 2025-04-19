/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import circleCheck from "../../../assets/images/svgs/circle-check.svg";
import circleExclamation from "../../../assets/images/svgs/circle-exclamation.svg";
// import menuWhite from '../../../assets/images/svgs/menu-white.svg';
import trophy from "../../../assets/images/svgs/trophy.svg";
import starAward from "../../../assets/images/svgs/star-award.svg";
import diamond from "../../../assets/images/pngs/diamond.png";
// import ruby from '../../../assets/images/pngs/ruby.png';
// import silver from '../../../assets/images/pngs/silver-bar.png';
// import coin from '../../../assets/images/pngs/orange-gem.png';
import horse from "../../../assets/images/svgs/horse.svg";
import trendUpIcon from "../../../assets/images/svgs/trend-up.svg";
import messageIcon from "../../../assets/images/svgs/message.svg";
import micIcon from "../../../assets/images/svgs/mic.svg";
import speakerIcon from "../../../assets/images/svgs/speaker.svg";
import tvIcon from "../../../assets/images/svgs/tv.svg";
import filter from "../../../assets/images/svgs/filter.svg";
import select from "../../../assets/images/svgs/select.svg";
import ActionModal from "@/components/modals/modalVariants/ActionModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SegmentedProgressBar from "@/components/dashboard/SegmentedProgressBar";
import ShadSelect from "@/components/dashboard/Select";
import StatsCardSection from "@/components/dashboard/StatusCard";
import ShadLineChart from "@/components/dashboard/ShadLineChart";
import PresentationMetricsTable from "@/components/tables/performance-metric-table/user";
import { RecentSessionsTable } from "@/components/tables/recent-sessions-table/user";
import { sessions } from "@/components/tables/recent-sessions-table/user/data";
import { useSearchParams } from "react-router-dom";
import { columns } from "@/components/tables/performance-metric-table/user/columns";
import { data } from "@/components/tables/performance-metric-table/user/data";
import SequenceSelector, {
  Sequence,
} from "@/components/dashboard/SequenceSelect";
import RecentAchievementsModal from "@/components/modals/modalVariants/RecentAchievementsModal";

interface Achievement {
  id: number;
  title: string;
  level: number;
  score: number;
  total: number;
  note: string;
}

const ProgressTracking: React.FC = () => {
  const [selectedSequence, setSelectedSequence] = useState<Sequence>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [
    showRecentAchievementsModal,
    setShowRecentAchievementsModal,
  ] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionFromUrl = searchParams.get("section");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const sectionItems = ["Goals & Achievements", "Performance Analysis"];

  const cardData = [
    {
      title: "Vocal Variety",
      wordRate: "85% pitch score",
      percentage: 20,
    },
    {
      title: "Overall ⁠Captured Impact",
      wordRate: "85% impact score",
      percentage: 80,
    },
    {
      title: "Emotional Impact",
      wordRate: "85% speaker",
      percentage: 40,
    },
    {
      title: "Body Language",
      wordRate: "85% clarity score",
      percentage: 60,
    },
    {
      title: "Transformative Communication",
      wordRate: "85% brevity score",
      percentage: 80,
    },
    {
      title: "Audience Engagement",
      wordRate: "85% posture",
      percentage: 40,
    },
    {
      title: "Structure & Clarity",
      wordRate: "85% posture",
      percentage: 40,
    },
    {
      title: "Language & Word Choice",
      wordRate: "85% posture",
      percentage: 40,
    },
  ];

  const achievementData: Achievement[] = [
    {
      id: 1,
      title: "Vocal Variety Mastery",
      level: 1,
      score: 2,
      total: 10,
      note: "Pitch, tone, pace, and pauses.",
    },
    {
      id: 2,
      title: "Overall Captured Impact Mastery",
      level: 2,
      score: 5,
      total: 10,
      note: "The impact of the overall speech.",
    },
    {
      id: 3,
      title: "Emotional Impact Mastery",
      level: 3,
      score: 10,
      total: 10,
      note: "Compels to the audience's emotions.",
    },
    {
      id: 4,
      title: "Body Language Mastery",
      level: 2,
      score: 6,
      total: 10,
      note: "Body posture, motion and hand gestures.",
    },
    {
      id: 5,
      title: "Transformative Communication Mastery",
      level: 2,
      score: 7,
      total: 10,
      note: "Inspires change or shifts thinking.",
    },
    {
      id: 6,
      title: "Audience Engagement Mastery",
      level: 3,
      score: 8,
      total: 10,
      note: "Triggers the audience to respond.",
    },
    {
      id: 7,
      title: "Structure & Clarity Mastery",
      level: 2,
      score: 7,
      total: 10,
      note: "How clearly ideas are organized and expressed.",
    },
    {
      id: 8,
      title: "Language & Word Choice Mastery",
      level: 3,
      score: 8,
      total: 10,
      note: "Avoid filler words and use good grammar.",
    },
  ];

  const streakStats = [
    {
      icon: diamond,
      number: "15",
      text: "Day Growth",
    },
    // {
    //   icon: ruby,
    //   number: "373",
    //   text: "Total XP"
    // },
    // {
    //   icon: silver,
    //   number: "Silver",
    //   text: "Current League"
    // },
    // {
    //   icon: coin,
    //   number: "10",
    //   text: "Top 10 finishes"
    // },
  ];

  const getProgressBarColor = (score: number) => {
    const level = getLevel(score);
    if (level === 1) return "#C1C2B4";
    if (level === 2) return "#ECB25E";
    if (level === 3) return "#64BA9F";
    return "#C1C2B4";
  };

  const getProgressBarColorCard = (score: number) => {
    if (score >= 1 && score <= 30) return "#C1C2B4"; // Light gray/beige for Level 1
    if (score >= 40 && score <= 70) return "#ECB25E"; // Gold/Yellow for Level 2
    if (score >= 80 && score <= 100) return "#64BA9F"; // Green for Level 3
    return "#C1C2B4";
  };

  const getPercentage = (score: number, total: number) => {
    return (score / total) * 100;
  };

  const getLevelImage = (score: number) => {
    const level = getLevel(score);
    if (level === 1) return starAward;
    if (level === 2) return trophy;
    if (level === 3) return horse;
    return starAward;
  };

  const getLevel = (score: number) => {
    if (score >= 1 && score <= 3) return 1;
    if (score >= 4 && score <= 7) return 2;
    if (score >= 8 && score <= 10) return 3;
    return 1;
  };

  const getLevelColor = (score: number) => {
    if (score >= 1 && score <= 3) return "bg-[#C1C2B4]";
    if (score >= 4 && score <= 7) return "bg-[#ECB25E]";
    if (score >= 8 && score <= 10) return "bg-[#64BA9F]";
    return "bg-[#C1C2B4]";
  };

  const performanceCardsData = [
    {
      icon: micIcon,
      iconAlt: "Progress icon",
      title: "Speaking Time",
      value: "12.5 hrs",
      subtext: "Total practice time",
      isPositive: true,
    },
    {
      icon: tvIcon,
      iconAlt: "Performance icon",
      title: "Total Sessions",
      value: "28",
      subtext: "Completed sessions",
    },
    {
      icon: speakerIcon,
      iconAlt: "Content icon",
      title: "Vocal Range",
      value: "85%",
      subtext: "Voice modulation score",
    },
    {
      icon: messageIcon,
      iconAlt: "Focus icon",
      title: "Clarity",
      value: "92%",
      subtext: "Speech clarity score",
    },
  ];

  const chartData = [
    {
      month: "January",
      Impact: 186,
      AudienceEngagement: 80,
      Clarity: 33,
      Confidence: 90,
    },
    {
      month: "February",
      Impact: 305,
      AudienceEngagement: 200,
      Clarity: 33,
      Confidence: 100,
    },
    {
      month: "March",
      Impact: 237,
      AudienceEngagement: 120,
      Clarity: 33,
      Confidence: 100,
    },
    {
      month: "April",
      Impact: 73,
      AudienceEngagement: 190,
      Clarity: 33,
      Confidence: 100,
    },
    {
      month: "May",
      Impact: 209,
      AudienceEngagement: 130,
      Clarity: 33,
      Confidence: 100,
    },
    {
      month: "June",
      Impact: 214,
      AudienceEngagement: 140,
      Clarity: 33,
      Confidence: 100,
    },
  ];

  const chartColors = {
    Impact: "#252A39",
    AudienceEngagement: "#64BA9F",
    Clarity: "#40B869",
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
    { value: "keynote", label: "Keynote Practice" },
    { value: "presentation", label: "Presentation Practice" },
  ];

  const sortOptions: { value: string; label: string }[] = [
    { value: "date-desc", label: "Date (Newest First)" },
    { value: "date-asc", label: "Date (Oldest First)" },
    { value: "improvement-desc", label: "Improvement (Highest)" },
    { value: "improvement-asc", label: "Improvement (Lowest)" },
    { value: "duration-desc", label: "Duration (Longest)" },
    { value: "duration-asc", label: "Duration (Shortest)" },
  ];

  const sequences: Sequence[] = [
    {
      id: "1",
      title: "Keynote Delivery Refinement",
      startDate: "February 15, 2025",
      lastUpdated: "February 22, 2025",
      totalCompleted: 3,
    },
    {
      id: "2",
      title: "Pitch Mastery Programme",
      startDate: "February 15, 2025",
      lastUpdated: "February 22, 2025",
      totalCompleted: 3,
      inProgress: 1,
    },
    {
      id: "3",
      title: "Presentation Programme",
      startDate: "February 15, 2025",
      lastUpdated: "February 22, 2025",
      totalCompleted: 3,
      inProgress: 1,
    },
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

  const handleSectionChange = (index: number) => {
    const sectionName = sectionItems[index].split("&")[0].trim();
    setActiveIndex(index);
    setSearchParams({ section: sectionName });
    console.log("ggs");
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    const index = sectionItems.findIndex(
      (item) => item.toLowerCase() === section?.toLowerCase()
    );
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, []);

  useEffect(() => {
    if (sectionFromUrl) {
      const newIndex = sectionItems.indexOf(sectionFromUrl);
      if (newIndex !== -1) setActiveIndex(newIndex);
    }
  }, [sectionFromUrl]);

  const handleSelectSequence = (sequence: Sequence) => {
    console.log("Selected sequence:", sequence);
    setSelectedSequence(sequence);
  };

  const handleNewSession = (sequenceId: number | string) => {
    console.log("New session for sequence:", sequenceId);
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
            <div className="bg-[#F2F2F2] rounded-[10px] p-1 my-5">
              {sectionItems.map((item, index) => (
                <Button
                  onClick={() => handleSectionChange(index)}
                  className={`${
                    activeIndex === index
                      ? "bg-white text-[#252A39] hover:bg-white "
                      : "text-[#6F7C8E] bg-[#F2F2F2] hover:bg-[#F2F2F2]"
                  } py-1 px-3 rounded-[6px] shadow-none hover:text-inherit hover:shadow-none`}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </section>
        {activeIndex === 0 && (
          <div>
            <section className="flex justify-between md:items-start items-center gap-5 mb-6 sm:mt-0 mt-4">
              <div>
                <h3 className="text-xl font-medium">
                  Gold Standard for EngageX™{" "}
                </h3>
                <p className="text-sm text-[#6F7C8E]">
                  Here’s a quick overview of your active goals{" "}
                </p>
              </div>
              {/* <Button
              type="button"
              onClick={() => { }}
              className="w-auto text-white px-6 bg-[#252A39]"
            >
              <img
                src={menuWhite}
                alt="Plus Circle"
                className="w-5 h-5 sm:text-base text-sm"
              />
              View all goals
            </Button> */}
            </section>
            <section className="grid lg:grid-cols-3 grid-cols-1 md:gap-6 gap-4">
              {cardData.map((item, index) => (
                <Card
                  key={index}
                  className="gap-0 px-4 py-4 rounded-[12px] border border-[#E0E0E0] shadow-[0px_2px_8px_0px_#252A3914]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="lg:text-lg text-base text-[#333333]">
                      {item.title}
                    </h4>
                    {/* <p className='text-sm text-[#6F7C8E]'>{item.wordRate}</p> */}
                  </div>
                  <SegmentedProgressBar
                    percent={item.percentage}
                    color={getProgressBarColorCard(item.percentage)}
                    divisions={10}
                    height="0.375rem"
                  />
                  <p className="text-[#252A39D9] mt-3">
                    {item.percentage}% complete
                  </p>
                </Card>
              ))}
              <div className="gap-0 px-4 py-4 rounded-[12px] flex bg-sidebar flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="lg:text-xl text-base text-[#C1C2B4]">
                    Level 1
                  </h4>
                  <div className="w-[50%]">
                    <SegmentedProgressBar
                      percent={30}
                      color="#C1C2B4"
                      divisions={10}
                      height="0.375rem"
                    />
                  </div>
                  <h4 className="lg:text-xl text-base text-[#C1C2B4]">0 - 3</h4>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="lg:text-xl text-base text-[#ECB25E]">
                    Level 2
                  </h4>
                  <div className="w-[50%]">
                    <SegmentedProgressBar
                      percent={50}
                      color="#ECB25E"
                      divisions={10}
                      height="0.375rem"
                    />
                  </div>
                  <h4 className="lg:text-xl text-base text-[#ECB25E]">4 - 7</h4>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="lg:text-xl text-base text-[#64BA9F]">
                    Level 3
                  </h4>
                  <div className="w-[50%]">
                    <SegmentedProgressBar
                      percent={100}
                      color="#64BA9F"
                      divisions={10}
                      height="0.375rem"
                    />
                  </div>
                  <h4 className="lg:text-xl text-base text-[#64BA9F]">
                    8 - 10
                  </h4>
                </div>
              </div>
            </section>
            <section className="grid lg:grid-cols-[2fr_3fr] grid-cols-1 lg:gap-4 md:gap-10 gap-6 lg:mt-6 md:mt-10 mt-6 mb-12">
              <div className="gap-0 px-4 py-2 rounded-[12px] border border-[#E0E0E0] shadow-[0px_2px_8px_0px_#252A3914]">
                <div className="flex justify-between gap-4 items-center">
                  <div>
                    <h3 className="text-[#252A39] lg:text-lg text-base lg:mt-0 mt-2">
                      Recent Achievements
                    </h3>
                    <p className="sm:text-sm text-xs text-[#6F7C8E] py-2">
                      Here’s a list your of your earned achievements
                    </p>
                  </div>
                  <p
                    onClick={() => setShowRecentAchievementsModal(true)}
                    className="text-[#262B3A] border-b border-[#262B3A] sm:text-sm text-xs whitespace-nowrap cursor-pointer"
                  >
                    View All
                  </p>
                </div>
                {achievementData.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex gap-3 mb-6 px-2">
                    <div
                      className={`flex flex-col items-center justify-between p-2 rounded-[6px] ${getLevelColor(
                        item.score
                      )}`}
                    >
                      <div className="bg-[#FFFFFF33] rounded-full w-[50px] h-[50px] grid place-content-center">
                        <img src={getLevelImage(item.score)} alt="level icon" />
                      </div>
                      <p className="text-white text-xs whitespace-nowrap">
                        LEVEL {getLevel(item.score)}
                      </p>
                    </div>

                    <Card className="border-none shadow-none py-2 gap-2 w-full">
                      <div className="flex justify-between items-center">
                        <h4 className="lg:text-lg text-base text-[#333333]">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[#6F7C8E]">
                          {item.score}/{item.total}
                        </p>
                      </div>
                      <SegmentedProgressBar
                        percent={getPercentage(item.score, item.total)}
                        color={getProgressBarColor(item.score)}
                        divisions={10}
                        className="h-1.5"
                      />
                      <p className="text-[#252A39D9] mt-1 sm:text-sm text-xs">
                        {item.note}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="border border-[#E0E0E0] rounded-[12px] p-5 h-fit">
                <h4 className="text-[#252A39] lg:text-lg text-base">
                  Daily Progress Tracker
                </h4>
                <p className="text-[#6F7C8E] text-sm">
                  Display daily progress tracker
                </p>
                <div className="grid grid-cols-1 md:gap-x-6">
                  {streakStats.map((item) => (
                    <div className="border border-[#E0E0E0] p-3 flex gap-3 rounded-[12px] mt-4 mb-2">
                      <img src={item.icon} alt="diamond" className="h-fit" />
                      <div>
                        <p className="text-[#252A39]">{item.number}</p>
                        <p className="text-[#6F7C8E] sm:text-base text-sm">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeIndex === 1 && (
          <div>
            <section>
              <div className="md:mt-0 mt-5 mb-6">
                <h3 className="text-xl font-medium text-#252A39">
                  Performance Overview
                </h3>
                <p className="text-sm text-[#6F7C8E] mt-1">
                  Here’s a quick overview of your performance
                </p>
              </div>
            </section>
            <section className="mt-10">
              <StatsCardSection cards={performanceCardsData} />
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
                  <ShadLineChart data={chartData} colors={chartColors} />
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

                    <p className="text-sm underline cursor-pointer whitespace-nowrap">
                      View All
                    </p>
                  </div>
                </div>
                <RecentSessionsTable
                  data={filteredSessions}
                  hidePagination={true}
                />
              </div>
            </section>
            <section className="mb-10">
              <SequenceSelector
                sequences={sequences}
                onNewSession={handleNewSession}
                onSelectSequence={handleSelectSequence}
                trendUpIcon={trendUpIcon}
              />
            </section>
            {selectedSequence && (
              <section className="mt-10 mb-6 border border-[#E0E0E0] sm:p-6 p-4 bg-white rounded-[16px]">
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-#252A39">
                    Performance Metrics Comparison
                  </h3>
                  <p className="text-sm text-[#6F7C8E] mt-1">
                    Track your progress across key speaking metrics{" "}
                  </p>
                </div>
                <PresentationMetricsTable
                  columns={columns}
                  data={data}
                  pageSize={7}
                />
              </section>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProgressTracking;
