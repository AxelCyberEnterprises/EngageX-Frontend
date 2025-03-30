/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import download from '../../../assets/images/svgs/download-dark.svg';
import trendUpIcon from '../../../assets/images/svgs/trend-up.svg';
import calendar from '../../../assets/images/svgs/calendar.svg';
import { cn } from '@/lib/utils';
// import { SessionComparisonTable } from '@/components/tables/session-comparison-table/user';
// import { sessions } from '@/components/tables/session-comparison-table/user/data';
import ShadSelect from '@/components/dashboard/Select';
import { useSearchParams } from 'react-router-dom';
import SessionComparisonResults from '@/components/dashboard/SessionComparison';
import { ChevronUp } from 'lucide-react';

interface Sequence {
  id: string;
  title: string;
  startDate: string;
  lastUpdated: string;
  totalCompleted: number;
  inProgress?: number;
}

interface SequenceItem {
  id: string;
  title: string;
  startDate: string;
  lastUpdated: string;
  totalCompleted: number;
  inProgress?: number;
  sessions?: SessionItem[];
}

interface SessionItem {
  id: string;
  name: string;
  date: string;
  duration: string;
}

const SessionComparison: React.FC = () => {
  const sectionItems = ["view", "comparison"];
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionFromUrl = searchParams.get("section");
  const [activeSection, setActiveSection] = useState(sectionItems[0]);
  const [expandedSequence, setExpandedSequence] = useState<string | null>("1");
  const [selectedSequence1, setSelectedSequence1] = useState<string>("");
  const [selectedSequence2, setSelectedSequence2] = useState<string>("");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<string>('0');

  const sequences: SequenceItem[] = [
    {
      id: "1",
      title: "Keynote Delivery Refinement",
      startDate: "February 15, 2025",
      lastUpdated: "February 22, 2025",
      totalCompleted: 3,
      sessions: [
        { id: "1", name: "Sequence 1", date: "Feb 12, 2025", duration: "12 Mins" },
        { id: "2", name: "Sequence 2", date: "Feb 12, 2025", duration: "5 mins" },
        { id: "3", name: "Sequence 3", date: "Feb 12, 2025", duration: "5 mins" },
        { id: "4", name: "Sequence 4", date: "Feb 20, 2025", duration: "12 Mins" },
        { id: "5", name: "Sequence 5", date: "Feb 20, 2025", duration: "12 Mins" }
      ]
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

  const sequenceOptions1 = [
    {
      value: "initial",
      label: "Feb 10 - Initial Practice",
    },
    {
      value: "midpoint",
      label: "Feb 24 - Midpoint Practice",
    },
    {
      value: "final",
      label: "Mar 10 - Final Practice",
    }
  ];

  const sequenceOptions2 = [
    {
      value: "initial",
      label: "Feb 10 - Initial Practice",
    },
    {
      value: "midpoint",
      label: "Feb 24 - Midpoint Practice",
    },
    {
      value: "final",
      label: "Mar 10 - Final Practice",
    }
  ];

  const handleSelectSequence1 = (sequence: string) => {
    console.log('Selected sequence:', sequence);
    setSelectedSequence1(sequence);
  };

  const handleSelectSequence2 = (sequence: string) => {
    console.log('Selected sequence:', sequence);
    setSelectedSequence2(sequence);
  };

  const handleNewSession = (sequenceId: string) => {
    console.log('New session for sequence:', sequenceId);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');
  };

  const handleCompareSequences = (section: string) => {
    console.log('Comparing sequences:', selectedSequence1, selectedSequence2);
    handleSectionChange(section);
  };

  const toggleSequence = (sequenceId: string) => {
    if (expandedSequence === sequenceId) {
      setExpandedSequence(null);
    } else {
      setExpandedSequence(sequenceId);
    }
  };

  useEffect(() => {
    if (sectionFromUrl) {
      const index = sectionItems.findIndex((item) => item.toLowerCase() === sectionFromUrl.toLowerCase());
      if (index !== -1) {
        setActiveSection(sectionItems[index]);
      }
    }
  }, [sectionFromUrl]);

  useEffect(() => {
    setSearchParams({ section: activeSection });
  }, [activeSection, setSearchParams]);

  const handleSectionChange = (section: string) => {
    if (sectionItems.includes(section)) {
      setActiveSection(section);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState<Sequence | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const selectSequence = (sequence: Sequence) => {
    setSelectedSequence(sequence);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0');
    }
  }, [isOpen]);


  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="xl:text-2xl text-xl text-[#252A39]">Session-by-Session Comparison</h1>
          <p className="text-[#6F7C8E]">Compare any two sessions to see detailed performance differences</p>
        </div>
        <Button
          variant="outline"
          className="bg-white text-[#252A39] border-[#6F7C8E] hover:bg-gray-50 shadow-none sm:flex hidden items-center gap-2"
          onClick={handleDownloadReport}
        >
          <img src={download} alt="download icon" />
          Download Report
        </Button>
      </div>

      {activeSection === 'view' && <section>
        <div className="mt-6 border border-[#E0E0E0] rounded-lg overflow-hidden">
          <div className="p-4 mb-4">
            <h2 className="text-lg font-medium text-[#252A39]">Select Improvement Sequence</h2>
            <p className="text-sm text-[#6F7C8E]">Select the sequence you would like to compare</p>
          </div>
          <div
            className="border border-[#E4E7EC] rounded-[12px] p-4 cursor-pointer flex justify-between items-center mx-4 mb-6"
            onClick={toggleDropdown}
          >
            <span className="text-[#252A39]">{selectedSequence ? selectedSequence.title : "Select a sequence"}</span>
            <span className={cn("text-[#6F7C8E] transition-transform duration-300", isOpen ? "rotate-180" : "rotate-0")}><ChevronUp className='text-[#6F7C8E]' /></span>
          </div>
          {isOpen && (
            <div
              ref={contentRef}
              style={{
                height,
                overflow: 'hidden',
                transition: 'height 0.7s ease-in-out',
              }} className='border border-[#E4E7EC] rounded-[12px] mx-4 mb-6'>
              {sequences.map((sequence, index) => (
                <div key={sequence.id}>
                  <div
                    className={cn("p-4 hover:bg-gray-50 cursor-pointer transition-colors", index === 0 && "rounded-t-[12px]", index === sequences.length - 1 && "rounded-b-[12px]")}
                    onClick={() => {
                      toggleSequence(sequence.id)
                      selectSequence(sequence)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg text-[#252A39]">{sequence.title}</h3>
                        <img src={trendUpIcon} alt={'trend up Icon'} className={cn("w-4 h-4")} />
                      </div>
                      <Button
                        className="bg-white text-[#252A39] border border-[#252A39] px-3 h-8 lg:rounded-[8px] rounded-[5px] hover:bg-gray-50 shadow-none !text-sm sm:flex hidden"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNewSession(sequence.id);
                        }}
                      >
                        New Session
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div>
                        <p className={`text-sm ${expandedSequence === sequence.id ? 'text-[#0E7B33]' : 'text-[#6F7C8E]'}`}>Start Date</p>
                        <p className="text-sm text-[#252A39]">{sequence.startDate}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${expandedSequence === sequence.id ? 'text-[#0E7B33]' : 'text-[#6F7C8E]'}`}>Last Updated</p>
                        <p className="text-sm text-[#252A39]">{sequence.lastUpdated}</p>
                      </div>
                      <div className="md:flex hidden items-center justify-between">
                        <div>
                          <p className={`text-sm ${expandedSequence === sequence.id ? 'text-[#0E7B33]' : 'text-[#6F7C8E]'}`}>Total Sessions</p>
                          <p className="text-sm text-[#252A39]">{sequence.totalCompleted} sessions completed</p>
                        </div>
                        {sequence.inProgress && (
                          <div className="text-right">
                            <p className="text-sm text-[#252A39]">{sequence.inProgress} in progress</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>)}


        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-[10%]">
          <div>
            <h3 className="mb-2 text-[#252A39] text-lg font-medium">Select an Improvement Sequence</h3>
            <ShadSelect
              options={sequenceOptions1}
              onChange={handleSelectSequence1}
              placeholder="Select Sequence"
              className='rounded-[8px] shadow-none py-5 md:ml-0 ml-auto focus:shadow-none active:shadow-none w-full'
              icon={calendar}
            />
          </div>

          <div>
            <h3 className="mb-2 text-[#252A39] text-lg font-medium">Select an Improvement Sequence</h3>
            <ShadSelect
              options={sequenceOptions2}
              onChange={handleSelectSequence2}
              placeholder="Select Sequence"
              className='rounded-[8px] shadow-none py-5 md:ml-0 ml-auto  focus:shadow-none active:shadow-none w-full'
              icon={calendar}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            className="bg-[#252A39] hover:bg-[#1e2330] text-white shadow-none"
            onClick={() => handleCompareSequences('comparison')}
          >
            Compare Sessions
          </Button>
        </div>
      </section>}

      {activeSection === 'comparison' &&
        <section>
          <SessionComparisonResults />
        </section>
      }


    </div>
  );
};

export default SessionComparison;