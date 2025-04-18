/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import download from '../../../assets/images/svgs/download-dark.svg';
import calendar from '../../../assets/images/svgs/calendar.svg';
import ShadSelect from '@/components/dashboard/Select';
// import { useSearchParams } from 'react-router-dom';
import SessionComparisonResults from '@/components/dashboard/SessionComparison';

// @ts-ignore
import html2pdf from 'html2pdf.js';

// interface SequenceItem {
//   id: string;
//   title: string;
//   startDate: string;
//   lastUpdated: string;
//   totalCompleted: number;
//   inProgress?: number;
//   sessions?: SessionItem[];
// }

// interface SessionItem {
//   id: string;
//   name: string;
//   date: string;
//   duration: string;
// }

const SessionComparison: React.FC = () => {
  const sectionItems = ["view", "comparison"];
  // const [searchParams, setSearchParams] = useSearchParams();
  // const sectionFromUrl = searchParams.get("section");
  const [activeSection, setActiveSection] = useState(sectionItems[0]);
  const [selectedSequence1, setSelectedSequence1] = useState<string>("");
  const [selectedSequence2, setSelectedSequence2] = useState<string>("");

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
    if (sequence === selectedSequence2) {
      setSelectedSequence2("");
    }
  };

  const handleSelectSequence2 = (sequence: string) => {
    console.log('Selected sequence:', sequence);
    setSelectedSequence2(sequence);
  };

  const handleCompareSequences = (section: string) => {
    console.log('Comparing sequences:', selectedSequence1, selectedSequence2);
    handleSectionChange(section);
  };

  // useEffect(() => {
  //   if (sectionFromUrl) {
  //     const index = sectionItems.findIndex((item) => item.toLowerCase() === sectionFromUrl.toLowerCase());
  //     if (index !== -1) {
  //       setActiveSection(sectionItems[index]);
  //     }
  //   }
  // }, [sectionFromUrl]);

  // useEffect(() => {
  //   setSearchParams({ section: activeSection });
  // }, [activeSection, setSearchParams]);

  const handleSectionChange = (section: string) => {
    if (sectionItems.includes(section)) {
      setActiveSection(section);
    }
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');

    const element = document.querySelector('.comparison-results-container'); // Add this class to your comparison results section
    const opt = {
      margin: 10,
      filename: 'session-comparison-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (element) {
      html2pdf().set(opt).from(element).save();
    }
  };
console.log(selectedSequence1)
console.log(activeSection);
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
          disabled={activeSection !== 'comparison'}
        >
          <img src={download} alt="download icon" />
          Download Report
        </Button>
      </div>

      <section>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-[10%]">
          <div>
            <h3 className="mb-2 text-[#252A39] text-lg font-medium">Select a Session</h3>
            <ShadSelect
              options={sequenceOptions1}
              onChange={handleSelectSequence1}
              placeholder="Select Sequence"
              className='rounded-[8px] shadow-none py-5 md:ml-0 ml-auto focus:shadow-none active:shadow-none w-full'
              icon={calendar}
              // disabled={!selectedSequence}
            />
          </div>

          <div>
            <h3 className="mb-2 text-[#252A39] text-lg font-medium">Select a Session</h3>
            <ShadSelect
              options={sequenceOptions2.filter(option => option.value !== selectedSequence1)}
              onChange={handleSelectSequence2}
              placeholder="Select Sequence"
              className='rounded-[8px] shadow-none py-5 md:ml-0 ml-auto focus:shadow-none active:shadow-none w-full'
              icon={calendar}
              // disabled={!selectedSequence}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            className="bg-[#252A39] hover:bg-[#1e2330] text-white shadow-none"
            onClick={() => handleCompareSequences('comparison')}
            disabled={!selectedSequence1 || !selectedSequence2}
          >
            Compare Sessions
          </Button>
        </div>
      </section>

      {activeSection === 'comparison' && selectedSequence1 && selectedSequence2 &&
        <section>
          <SessionComparisonResults />
        </section>
      }


    </div>
  );
};

export default SessionComparison;