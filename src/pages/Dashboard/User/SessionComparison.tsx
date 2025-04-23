/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import download from '../../../assets/images/svgs/download-dark.svg';
import calendar from '../../../assets/images/svgs/calendar.svg';
import SessionComparisonResults from '@/components/dashboard/SessionComparison';

// @ts-ignore
import html2pdf from 'html2pdf.js';
import { useSessionComparison, useSessionHistory } from '@/hooks/auth';
import PaginatedSelect from '@/components/dashboard/PaginatedSelect';

interface SessionData {
  id: string;
  title: string;
  dateRange: string;
  duration: string;
  overallScore: number;
  strengths: any[];
  improvements: any[];
}

const SessionComparison: React.FC = () => {
  const sectionItems = ["view", "comparison"];
  const { data: sessionData } = useSessionHistory();
  const [selectedSequence1, setSelectedSequence1] = useState<string>("");
  const [selectedSequence2, setSelectedSequence2] = useState<string>("");
  const { data: singleSessionComparisonData } = useSessionComparison<any>(selectedSequence1, selectedSequence2);

  const sessionOptions = sessionData?.results?.map(session => {
    const formattedDate = new Date(session.date).toLocaleDateString();
    return {
      value: session.id.toString(),
      label: `${formattedDate} ${session.session_name || `Session ${session.id}`}`,
    };
  }) || [];

  const handleSelectSession = (value: string) => {
    setSelectedSequence1(value);
  };

  const handleSelectSession2 = (value: string) => {
    setSelectedSequence2(value)
  };
  const [activeSection, setActiveSection] = useState(sectionItems[0]);

  const [session1, setSession1] = useState<any>();
  const [session2, setSession2] = useState<any>();

  const formatSessionData = (session: any): SessionData => {
    const formattedDate = new Date(session.date).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  
    const overallScore = Math.round(
      (
        session.overall_captured_impact +
        session.vocal_variety +
        session.emotional_impact +
        session.body_language +
        session.transformative_communication +
        session.structure_and_clarity +
        session.language_and_word_choice +
        session.audience_engagement
      ) / 8
    );
  
    return {
      id: session.id.toString(),
      title: session.session_name || `Session ${session.id}`,
      dateRange: formattedDate,
      duration: session.duration ? session.duration.replace(/^00:/, '') : '0 min',
      overallScore: overallScore,
      strengths: session.strength,
      improvements: session.area_of_improvement,
    };
  };

  const handleCompareSequences = (section: string) => {
    if (sectionItems.includes(section)) {
      setActiveSection(section);
    }
    setSession1(formatSessionData(singleSessionComparisonData?.session1));
    setSession2(formatSessionData(singleSessionComparisonData?.session2));
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');

    const element = document.querySelector('.comparison-results-container');
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
            <PaginatedSelect
              options={sessionOptions}
              onChange={handleSelectSession}
              placeholder="Select Session"
              className="rounded-[8px] shadow-none py-5 md:ml-0 ml-auto focus:shadow-none active:shadow-none w-full"
              icon={calendar}
              itemsPerPage={5}
            />
          </div>

          <div>
            <h3 className="mb-2 text-[#252A39] text-lg font-medium">Select a Session</h3>
            <PaginatedSelect
              options={sessionOptions.filter(option => option.value !== selectedSequence1)}
              onChange={handleSelectSession2}
              placeholder="Select Session"
              className="rounded-[8px] shadow-none py-5 md:ml-0 ml-auto focus:shadow-none active:shadow-none w-full"
              icon={calendar}
              itemsPerPage={5}
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
          <SessionComparisonResults session1={session1} session2={session2}/>
        </section>
      }


    </div>
  );
};

export default SessionComparison;