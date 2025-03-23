import React from 'react';
import calendar from '../../assets/images/svgs/calendar.svg';
import ShadSelect from './Select';
import PresentationMetricsTable from '../tables/performance-metric-table/user';
import { columnsTwo } from "@/components/tables/performance-metric-table/user/columnsTwo";
import { dataTwo } from "@/components/tables/performance-metric-table/user/dataTwo";

interface KeyInsight {
  type: 'strength' | 'improvement';
  text: string;
}

interface SessionData {
  id: string;
  title: string;
  dateRange: string;
  duration: string;
  overallScore: number;
  insights: KeyInsight[];
}

const SessionComparisonResults: React.FC = () => {
  // const [selectedSequence1, setSelectedSequence1] = useState<string>("");
  // const [selectedSequence2, setSelectedSequence2] = useState<string>("");
  const session1: SessionData = {
    id: "1",
    title: "Initial Keynote Practice",
    dateRange: "Feb 10 - Mar 15, 2025",
    duration: "18 mins",
    overallScore: 68,
    insights: [
      { type: 'strength', text: 'Excellent pace variation' },
      { type: 'strength', text: 'Strong opening hook' },
      { type: 'strength', text: 'Effective use of pauses' },
      { type: 'improvement', text: 'Increase vocal variety' },
      { type: 'improvement', text: 'Add more supporting data' },
      { type: 'improvement', text: 'Strengthen call to action' }
    ]
  };

  const session2: SessionData = {
    id: "2",
    title: "Final Practice Session",
    dateRange: "Mar 10, 2025",
    duration: "20 min",
    overallScore: 82,
    insights: [
      { type: 'strength', text: 'Excellent audience engagement' },
      { type: 'strength', text: 'Strong emotional connection' },
      { type: 'strength', text: 'Well-structured content flow' },
      { type: 'improvement', text: 'Increase vocal variety' },
      { type: 'improvement', text: 'Add more supporting data' },
      { type: 'improvement', text: 'Strengthen call to action' }
    ]
  };

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
    // setSelectedSequence1(sequence);
  };

  const handleSelectSequence2 = (sequence: string) => {
    console.log('Selected sequence:', sequence);
    // setSelectedSequence2(sequence);
  };

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return 'bg-[#e6f7e6]'; // Light green
    if (score >= 60) return 'bg-[#f9e8d4]'; // Light orange
    return 'bg-[#fad9d9]'; // Light red
  };

  return (
    <div className="w-full mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[10%] gap-12 mb-6">
        <div className='flex flex-col gap-6'>
          <div>
            <label className="block text-[#252A39] mb-2">Select an Improvement Sequence</label>
            <ShadSelect
              options={sequenceOptions1}
              onChange={handleSelectSequence1}
              placeholder="Select Sequence"
              className='rounded-[8px] shadow-none py-5 md:ml-0 ml-auto  focus:shadow-none active:shadow-none w-full'
              icon={calendar}
            />
          </div>
          <div>
            <div className="border border-[#E0E0E0] rounded-lg p-6">
              <h2 className="text-xl font-medium text-[#252A39] mb-2">{session1.title}</h2>
              <p className="text-[#6F7C8E] mb-6">{session1.dateRange} • {session1.duration}</p>

              <div className="flex justify-center mb-6">
                <div className={`${getScoreBackgroundColor(session1.overallScore)} rounded-full w-24 h-24 flex items-center justify-center`}>
                  <span className="text-2xl font-medium text-[#252A39]">{session1.overallScore}</span>
                </div>
              </div>
              <p className="text-center text-[#6F7C8E]">Overall Score</p>
            </div>
          </div>
          <div className="border border-[#E0E0E0] rounded-lg p-6">
            <h2 className="text-xl font-medium text-[#252A39] mb-4">Key Insights</h2>
            <div className='flex justify-between md:flex-row flex-col'>
              <div className="mb-4">
                <p className="text-green-600 mb-2">Strengths</p>
                <ul className="space-y-2 text-sm">
                  {session1.insights.filter(insight => insight.type === 'strength').map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#252A39]">{insight.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-red-500 mb-2">Areas of Improvement</p>
                <ul className="space-y-2 text-sm">
                  {session1.insights.filter(insight => insight.type === 'improvement').map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#252A39]">{insight.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div>
            <label className="block text-[#252A39] mb-2">Select an Improvement Sequence</label>
            <ShadSelect
              options={sequenceOptions2}
              onChange={handleSelectSequence2}
              placeholder="Select Sequence"
              className='rounded-[8px] shadow-none py-5 md:ml-0 ml-auto  focus:shadow-none active:shadow-none w-full'
              icon={calendar}
            />
          </div>
          <div className="border border-[#E0E0E0] rounded-lg p-6">
            <h2 className="text-xl font-medium text-[#252A39] mb-2">{session2.title}</h2>
            <p className="text-[#6F7C8E] mb-6">{session2.dateRange} • {session2.duration}</p>

            <div className="flex justify-center mb-6">
              <div className={`${getScoreBackgroundColor(session2.overallScore)} rounded-full w-24 h-24 flex items-center justify-center`}>
                <span className="text-2xl font-medium text-[#252A39]">{session2.overallScore}</span>
              </div>
            </div>
            <p className="text-center text-[#6F7C8E]">Overall Score</p>
          </div>
          <div className="border border-[#E0E0E0] rounded-lg p-6">
            <h2 className="text-xl font-medium text-[#252A39] mb-4">Key Insights</h2>
            <div className='flex justify-between md:flex-row flex-col'>
              <div className="mb-4">
                <p className="text-green-600 mb-2">Strengths</p>
                <ul className="space-y-2 text-sm">
                  {session2.insights.filter(insight => insight.type === 'strength').map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#252A39]">{insight.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-red-500 mb-2">Areas of Improvement</p>
                <ul className="space-y-2 text-sm">
                  {session2.insights.filter(insight => insight.type === 'improvement').map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#252A39]">{insight.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


          </div>
        </div>

      </div>

      <div className='border border-[#E0E0E0] rounded-[12px] p-8 sm:pr-8 pr-0'>
        <PresentationMetricsTable
          columns={columnsTwo}
          data={dataTwo}
          hidePagination={true}
          pageSize={4}
          tableContainerClassName='sm:rounded-tr-md rounded-tr-[0] sm:border-r border-r-0'
        />
      </div>


    </div>
  );
};

export default SessionComparisonResults;