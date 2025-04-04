/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import circleCheck from '../../../assets/images/svgs/circle-check.svg';
import circleExclamation from '../../../assets/images/svgs/circle-exclamation.svg';
import menuWhite from '../../../assets/images/svgs/menu-white.svg';
import trophy from '../../../assets/images/svgs/trophy.svg';
import download from '../../../assets/images/svgs/download.svg';
import starAward from '../../../assets/images/svgs/star-award.svg';
import diamond from '../../../assets/images/pngs/diamond.png';
// import ruby from '../../../assets/images/pngs/ruby.png';
// import silver from '../../../assets/images/pngs/silver-bar.png';
// import coin from '../../../assets/images/pngs/orange-gem.png';
import horse from '../../../assets/images/svgs/horse.svg';
import trendUpIcon from "../../../assets/images/svgs/trend-up.svg";
import starIcon from "../../../assets/images/svgs/award.svg";
import documentIcon from "../../../assets/images/svgs/document.svg";
import messageIcon from "../../../assets/images/svgs/message.svg";
import micIcon from "../../../assets/images/svgs/mic.svg";
import speakerIcon from "../../../assets/images/svgs/speaker.svg";
import tvIcon from "../../../assets/images/svgs/tv.svg";
import calendar from '../../../assets/images/svgs/calendar.svg';
import filter from '../../../assets/images/svgs/filter.svg';
import select from '../../../assets/images/svgs/select.svg';
import ActionModal from '@/components/modals/modalVariants/ActionModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SegmentedProgressBar from '@/components/dashboard/SegmentedProgressBar';
import ShadSelect from '@/components/dashboard/Select';
import StatsCardSection from '@/components/dashboard/StatusCard';
import ShadLineChart from '@/components/dashboard/ShadLineChart';
import AIInsights from '@/components/dashboard/AiInsights';
import PresentationMetricsTable from '@/components/tables/performance-metric-table/user';
import { RecentSessionsTable } from '@/components/tables/recent-sessions-table/user';
import { sessions } from '@/components/tables/recent-sessions-table/user/data';
import { useSearchParams } from 'react-router-dom';
import { columns } from "@/components/tables/performance-metric-table/user/columns";
import { data } from "@/components/tables/performance-metric-table/user/data";
import SequenceSelector, { Sequence } from '@/components/dashboard/SequenceSelect';

const ProgressTracking: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionFromUrl = searchParams.get("section");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const sectionItems = [
    "Goals & Achievements",
    "Performance Analysis",
  ];

  const cardData = [
    {
      title: 'Improve Speech Pace',
      wordRate: '120-150 words/min',
      percentage: 60
    },
    {
      title: 'Reduce filler words',
      wordRate: '>3 per min',
      percentage: 80
    },
    {
      title: 'Enhance content structure',
      wordRate: 'Daily Practice',
      percentage: 40
    },
  ]

  const achievementData = [
    {
      title: 'Speech Master',
      portion: 2,
      total: 3,
      level: 1,
      note: 'Complete 50 speeches'
    },
    {
      title: 'Pace Perfect',
      portion: 30,
      total: 50,
      level: 2,
      note: 'Maintain ideal pace for 5 speeches'
    },
    {
      title: 'Audience Favorite',
      portion: 90,
      total: 100,
      level: 3,
      note: 'Get 95% engagement score'
    },
  ]


  const streakStats = [
    {
      icon: diamond,
      number: "15",
      text: "Day Streak"
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

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80 && percentage <= 100) return '#40B869';
    if (percentage >= 60 && percentage < 80) return '#F5B546';
    return '#DD524D';
  };

  const getPercentage = (portion: number, total: number) => {
    const decimal = portion / total;
    const percentage = decimal * 100;
    const fixedPercentage = percentage.toFixed(0)
    return Number(fixedPercentage);
  }

  const getLevelImage = (level: number) => {
    if (level === 1) return horse;
    if (level === 2) return trophy;
    if (level === 3) return starAward;
    return '';
  };

  const userDetails = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@gmail.com',
    company: 'Tangerine Plc',
    pfp: ''
  }

  const eventOptions = [
    {
      value: "keynote-feb-2025",
      label: "Keynote Practice Series",
      date: "Feb 2025"
    },
    {
      value: "sales-pitch-jan-2025",
      label: "Sales Pitch Improvements",
      date: "Jan 2025"
    },
    {
      value: "team-updates-dec-2024",
      label: "Team Updates Practice",
      date: "Dec 2024"
    }
  ];

  const statCardsData = [
    {
      icon: trendUpIcon,
      iconAlt: "Progress icon",
      title: "Overall Progress",
      value: "+25%",
      subtext: "Improvement since first session",
      isPositive: true
    },
    {
      icon: starIcon,
      iconAlt: "Performance icon",
      title: "Best Performance",
      value: "87%",
      subtext: "Audience engagement (March 2024)"
    },
    {
      icon: documentIcon,
      iconAlt: "Content icon",
      title: "Content Structure",
      value: "87%",
      subtext: "Content improvement score"
    },
    {
      icon: messageIcon,
      iconAlt: "Focus icon",
      title: "Focus Area",
      value: "Vocal Clarity",
      subtext: "Recommended improvement area"
    }
  ];


  const performanceCardsData = [
    {
      icon: micIcon,
      iconAlt: "Progress icon",
      title: "Speaking Time",
      value: "+25%",
      subtext: "Total practice time",
      isPositive: true
    },
    {
      icon: tvIcon,
      iconAlt: "Performance icon",
      title: "Total Sessions",
      value: "28",
      subtext: "Completed sessions"
    },
    {
      icon: speakerIcon,
      iconAlt: "Content icon",
      title: "Vocal Range",
      value: "85%",
      subtext: "Voice modulation score"
    },
    {
      icon: messageIcon,
      iconAlt: "Focus icon",
      title: "Clarity",
      value: "92",
      subtext: "Speech clarity score"
    }
  ];

  const handleEventChange = (value: string) => {
    console.log("Selected event:", value);
  };

  const chartData = [
    { month: "January", Voice: 186, AudienceEngagement: 80, Clarity: 33, Confidence: 90 },
    { month: "February", Voice: 305, AudienceEngagement: 200, Clarity: 33, Confidence: 100 },
    { month: "March", Voice: 237, AudienceEngagement: 120, Clarity: 33, Confidence: 100 },
    { month: "April", Voice: 73, AudienceEngagement: 190, Clarity: 33, Confidence: 100 },
    { month: "May", Voice: 209, AudienceEngagement: 130, Clarity: 33, Confidence: 100 },
    { month: "June", Voice: 214, AudienceEngagement: 140, Clarity: 33, Confidence: 100 },
  ];

  const chartColors = {
    Voice: "#252A39",
    AudienceEngagement: "#40B869",
    Clarity: '#40B869', Confidence: "#F5B546",
  };

  const insightsData = {
    improvement: {
      percentage: "19%",
      sessions: 5
    },
    strength: {
      area: "content structure",
      score: "80%"
    },
    focusRecommendation: "Work on vocal variety and pitch modulation to increase audience engagement further",
    pattern: {
      observation: "Your performance peaks in the middle of presentations.",
      recommendation: "strengthening your openings and closings"
    }
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
    }
  ];

  const handleTimeFrameChange = (value: string) => {
    console.log("Selected time:", value);
  };

  const filterOptions: { value: string, label: string }[] = [
    { value: "all", label: "All Sessions" },
    { value: "pitch", label: "Pitch Practice" },
    { value: "keynote", label: "Keynote Practice" },
    { value: "presentation", label: "Presentation Practice" }
  ];

  const sortOptions: { value: string, label: string }[] = [
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
      inProgress: 1
    },
    {
      id: "3",
      title: "Presentation Programme",
      startDate: "February 15, 2025",
      lastUpdated: "February 22, 2025",
      totalCompleted: 3,
      inProgress: 1
    }
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("date-desc");

  const filteredSessions = activeFilter === "all"
    ? sessions
    : sessions.filter(session =>
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
    console.log('ggs')
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    const index = sectionItems.findIndex((item) => item.toLowerCase() === section?.toLowerCase());
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
  };

  const handleNewSession = (sequenceId: number | string) => {
    console.log('New session for sequence:', sequenceId);
  };

  return (
    <>
      <ActionModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        icon={circleCheck}
        head='Payment Successful'
        message='Your credit has been successfully processed! Thank you for your transaction.'
        cta='Confirm'
        ctaClassName='border border-[#D5D7DA] text-[#FFFFFF]'
      />
      <ActionModal
        show={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        icon={circleExclamation}
        head='Payment Unsuccessful'
        message='Your payment could not be processed. Please try again or check your payment details.'
        cta='Cancel'
        ctaClassName='bg-[#262B3A] text-[#414651]'
      />
      <div className='scrollbar-hide md:px-8 px-4'>
        <section className='py-5 flex md:flex-row flex-col md:gap-2 gap-3 items-start justify-between'>
          <div>
            <h3 className='xl:text-2xl text-xl text-[#262B3A]'>Progress Tracking</h3>
            <div className='bg-[#F2F2F2] rounded-[10px] p-1 my-5'>
              {sectionItems.map((item, index) => (
                <Button
                  onClick={() => handleSectionChange(index)}
                  className={`${activeIndex === index ? 'bg-white text-[#252A39] hover:bg-white ' : 'text-[#6F7C8E] bg-[#F2F2F2] hover:bg-[#F2F2F2]'} py-1 px-3 rounded-[6px] shadow-none hover:text-inherit hover:shadow-none`}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          {<div className='flex mr-[5%]'>
            <div className='flex gap-2 items-center pr-4 mr-4 border-r border-[#E4E7EC]'>
              <div className={`${!userDetails.pfp && 'border border-[#D5D7DA] w-10 h-10 grid place-content-center rounded-full'}`}>
                {userDetails?.pfp ? <img
                  src={userDetails.pfp}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border"
                /> :
                  <p className="capitalize text-sm">{`${userDetails.firstname[0]}${userDetails.lastname[0]}`.toUpperCase()}</p>
                }
              </div>

              <div>
                <p>{userDetails.firstname} {userDetails.lastname}</p>
                <p className='text-[#474D63] text-sm font-light'>{userDetails.email}</p>
              </div>
            </div>
            <div>
              <p>Company</p>
              <p className='text-[#474D63] text-sm font-light'>{userDetails.company}</p>
            </div>
          </div>}
        </section>
        {activeIndex === 0 && <div>
          <section className='flex justify-between md:items-start items-center gap-5 mb-6 sm:mt-0 mt-4'>
            <div>
              <h3 className="text-xl font-medium">Active Goals</h3>
              <p className="text-sm text-[#6F7C8E]">Here’s a quick overview of your active goals </p>
            </div>
            <Button
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
            </Button>
          </section>
          <section className='grid lg:grid-cols-3 grid-cols-1 md:gap-12 gap-6'>
            {cardData.map((item) => (
              <Card className='gap-0 px-4 py-2 rounded-[12px] border border-[#E0E0E0] shadow-[0px_2px_8px_0px_#252A3914]'>
                <div className='flex justify-between items-center mb-10'>
                  <h4 className='lg:text-lg text-base text-[#333333]'>{item.title}</h4>
                  <p className='text-sm text-[#6F7C8E]'>{item.wordRate}</p>
                </div>
                <SegmentedProgressBar percent={item.percentage} color={getProgressBarColor(item.percentage)} divisions={5} />
                <p className='text-[#252A39D9] mt-3'>{item.percentage}% complete</p>
              </Card>
            ))}
          </section>
          <section className='grid lg:grid-cols-[2fr_3fr] grid-cols-1 lg:gap-4 md:gap-10 gap-6 lg:mt-6 md:mt-10 mt-6'>
            <div className='gap-0 px-4 py-2 rounded-[12px] border border-[#E0E0E0] shadow-[0px_2px_8px_0px_#252A3914]'>
              <div className='flex justify-between gap-4 items-center'>
                <div>
                  <h3 className='text-[#252A39] lg:text-lg text-base lg:mt-0 mt-2'>Recent Achievements</h3>
                  <p className='sm:text-sm text-xs text-[#6F7C8E] py-2'>Here’s a list your of your earned achievements</p>
                </div>
                <p className='text-[#262B3A] border-b border-[#262B3A] sm:text-sm text-xs whitespace-nowrap'>View All</p>
              </div>
              {achievementData.map((item) => (
                <div className='flex gap-3 mb-6 px-2'>
                  <div className={`flex flex-col items-center justify-between p-2 rounded-[6px] ${item.level === 1 && 'bg-[#64BA9F]'}  ${item.level === 2 && 'bg-[#ECB25E]'}  ${item.level === 3 && 'bg-[#C1C2B4]'}`}>
                    <div className='bg-[#FFFFFF33] rounded-full w-[50px] h-[50px] grid place-content-center'>
                      <img src={getLevelImage(item.level)} alt="level image" />
                    </div>
                    <p className='text-white md:text-xs text-[11px] whitespace-nowrap'>LEVEL {item.level}</p>
                  </div>
                  <Card className='border-none shadow-none py-2 gap-2 w-full'>
                    <div className='flex justify-between items-center'>
                      <h4 className='lg:text-lg text-base text-[#333333]'>{item.title}</h4>
                      <p className='text-sm text-[#6F7C8E]'>{item.portion}/{item.total}</p>
                    </div>
                    <SegmentedProgressBar
                      percent={getPercentage(item.portion, item.total)}
                      color={getProgressBarColor(getPercentage(item.portion, item.total))}
                      divisions={1} />
                    <p className='text-[#252A39D9] mt-1 sm:text-sm text-xs'>{item.note}</p>
                  </Card>
                </div>

              ))}
            </div>
            <div className='border border-[#E0E0E0] rounded-[12px] p-5 h-fit'>
              <h4 className='text-[#252A39] lg:text-lg text-base'>Streak Statistics</h4>
              <p className='text-[#6F7C8E] text-sm'>Display streaks of  goal progress</p>
              <div className='grid grid-cols-1 md:gap-x-6'>
                {streakStats.map((item) => (
                  <div className='border border-[#E0E0E0] p-3 flex gap-3 rounded-[12px] mt-4 mb-2'>
                    <img src={item.icon} alt="diamond" className='h-fit' />
                    <div>
                      <p className='text-[#252A39]'>{item.number}</p>
                      <p className='text-[#6F7C8E] sm:text-base text-sm'>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>


            </div>

          </section>
          <section className='flex items-center justify-between sm:mt-18 mt-12'>
            <div>
              <h3 className="lg:text-2xl text-xl font-medium">Performance Improvement Analysis</h3>
              <p className="lg:text-lg text-base text-[#6F7C8E] mb-6">Track your speaking progress across multiples sessions</p>
            </div>
            <Button
              type="button"
              onClick={() => { }}
              className="w-auto text-white px-6 bg-[#252A39] sm:flex hidden"
            >
              <img
                src={download}
                alt="Plus Circle"
                className="xl:w-[18px] xl:h-[18px] w-5 h-5 sm:text-base text-sm"
              />
              Download Report
            </Button>
          </section>
          <section className='flex md:flex-row flex-col-reverse md:items-center justify-between md:mt-10 mt-4 md:mb-6 mb-3 gap-6'>
            <div>
              <h3 className="lg:text-xl text-lg font-medium">Session Sequence</h3>
              <p className="sm:text-sm text-xs text-[#6F7C8E] mb-6 flex gap-2">
                <span className='text-[#6F7C8E]'>Feb 10 - Mar 15, 2025</span>
                <span className='text-[#252A39]'>• 5 sessions analyzed</span>
              </p>
            </div>
            <div>
              <ShadSelect
                options={eventOptions}
                onChange={handleEventChange}
                placeholder="Keynote Practice Series (Feb 2025)"
                className='w-fit rounded-[8px] shadow-none py-5 md:ml-0 ml-auto  focus:shadow-none active:shadow-none'
                icon={calendar}
              />
              <p className='text-[#6F7C8E] sm:text-sm text-xs mt-1'>Choose improvement sequence to get full info.</p>
            </div>
          </section>
          <section>
            <StatsCardSection cards={statCardsData} />
          </section>
          <section className='grid lg:grid-cols-2 gap-6 mt-16'>
            <div className="analytics px-5 py-7 h-fit rounded-[8px] border border-[#E4E7EC]">
              <div className="flex justify-between items-center mb-6">
                <p className="big chinese__black">Performance Analytics</p>
                <div className="flex items-center">
                  <ShadSelect
                    options={timeOptions}
                    onChange={handleTimeFrameChange}
                    placeholder="Weekly"
                    className='w-fit sm:rounded-[7px] rounded-[5px] shadow-none sm:py-3 py-1 sm:px-4 px-2 sm:h-9 h-7 text-[#333333] focus-visible:ring-0 active:shadow-none'
                    showIcon={false}
                  />
                  <small className="underline cursor-pointer gunmetal ml-4">View Report</small>
                </div>
              </div>

              <div className="chart__div">
                <ShadLineChart data={chartData} colors={chartColors} />
              </div>
            </div>
            <div>
              <AIInsights
                insights={insightsData}
              />
            </div>
          </section>
          <section className='mt-16 mb-6 border border-[#E0E0E0] sm:p-6 p-4 bg-white rounded-[16px]'>
            <div className='mb-6'>
              <h3 className="text-xl font-medium text-#252A39">Performance Metrics Comparison</h3>
              <p className="text-sm text-[#6F7C8E] mt-1">Track your progress across key speaking metrics </p>
            </div>
            <PresentationMetricsTable
              columns={columns}
              data={data}
              pageSize={7}
            />
          </section>
        </div>}

        {activeIndex === 1 &&
          <div>
            <section>
              <div className='md:mt-0 mt-5 mb-6'>
                <h3 className="text-xl font-medium text-#252A39">Performance Overview</h3>
                <p className="text-sm text-[#6F7C8E] mt-1">Here’s a quick overview of your performance</p>
              </div>
            </section>
            <section className='mt-10'>
              <StatsCardSection cards={performanceCardsData} />
            </section>
            <section className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-10'>
              <div className="analytics sm:px-5 px-4 sm:py-7 py-5 h-fit rounded-[8px] border border-[#E4E7EC]">
                <div className="flex justify-between items-center mb-6">
                  <p className="big chinese__black">Performance Analytics</p>
                  <div className="flex items-center">
                    <ShadSelect
                      options={timeOptions}
                      onChange={handleTimeFrameChange}
                      placeholder="Weekly"
                      className='w-fit sm:rounded-[7px] rounded-[5px] shadow-none sm:py-3 py-1 sm:px-4 px-2 sm:h-9 h-7 text-[#333333] focus-visible:ring-0 active:shadow-none'
                      showIcon={false}
                    />
                    <small className="underline cursor-pointer gunmetal ml-4">View Report</small>
                  </div>
                </div>

                <div className="chart__div">
                  <ShadLineChart data={chartData} colors={chartColors} />
                </div>
              </div>
              <div className="px-6 py-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="md:text-xl text-lg font-medium">Recent Sessions</h2>

                  <div className="flex gap-2 items-center">
                    <div className="relative">
                      <ShadSelect
                        options={filterOptions}
                        onChange={handleFilterChange}
                        placeholder="Filter"
                        className="rounded-lg border px-4 py-2 text-sm font-medium"
                        showIcon={true}
                        placeholderClassname='sm:flex hidden'
                        icon={filter}
                      // isArrow={false}
                      />
                    </div>

                    <div className="relative">
                      <ShadSelect
                        options={sortOptions}
                        onChange={handleSortChange}
                        placeholder="Sort"
                        className="rounded-lg border px-4 py-2 text-sm font-medium"
                        showIcon={true}
                        placeholderClassname='sm:flex hidden'
                        icon={select}
                      />
                    </div>

                    <p className="text-sm underline">
                      View All
                    </p>
                  </div>
                </div>
                <RecentSessionsTable data={filteredSessions} hidePagination={true} />
              </div>
            </section>
            <section>
              <SequenceSelector
                sequences={sequences}
                onNewSession={handleNewSession}
                onSelectSequence={handleSelectSequence}
                trendUpIcon={trendUpIcon}
              />
            </section>
            <section className='mt-10 mb-6 border border-[#E0E0E0] sm:p-6 p-4 bg-white rounded-[16px]'>
              <div className='mb-6'>
                <h3 className="text-xl font-medium text-#252A39">Performance Metrics Comparison</h3>
                <p className="text-sm text-[#6F7C8E] mt-1">Track your progress across key speaking metrics </p>
              </div>
              <PresentationMetricsTable
                columns={columns}
                data={data}
                pageSize={7}
              />
            </section>
          </div>
        }

      </div>
    </>

  )
}

export default ProgressTracking
