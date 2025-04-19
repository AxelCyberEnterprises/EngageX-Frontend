import React from 'react';
// import PresentationMetricsTable from '../tables/performance-metric-table/user';
// import { columnsTwo } from "@/components/tables/performance-metric-table/user/columnsTwo";
// import { dataTwo } from "@/components/tables/performance-metric-table/user/dataTwo";

interface SessionComparisonResultsProps {
  session1: any;
  session2: any;
}

const SessionComparisonResults: React.FC<SessionComparisonResultsProps> = ({session1, session2}) => {

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
                  {session1.insights.filter((insight: any) => insight.type === 'strength').map(({insight, index}: any) => (
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
                  {session1.insights.filter((insight: any) => insight.type === 'improvement').map(({insight, index}: any) => (
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
                  {session2.insights.filter((insight: any) => insight.type === 'strength').map(({insight, index}: any) => (
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
                  {session2.insights.filter((insight: any) => insight.type === 'improvement').map(({insight, index}: any) => (
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

      {/* <div className='border border-[#E0E0E0] rounded-[12px] p-8 sm:pr-8 pr-0'>
        <PresentationMetricsTable
          columns={columnsTwo}
          data={dataTwo}
          hidePagination={true}
          pageSize={4}
          tableContainerClassName='sm:rounded-tr-md rounded-tr-[0] sm:border-r border-r-0'
        />
      </div> */}

    </div>
  );
};

export default SessionComparisonResults;