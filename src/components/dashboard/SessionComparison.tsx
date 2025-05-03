import React from 'react';
import PresentationMetricsTable from '../tables/performance-metric-table/user';
import { columnsTwo } from "@/components/tables/performance-metric-table/user/columnsTwo";

interface SessionComparisonResultsProps {
  session1: any;
  session2: any;
  tableData: any;
}

const SessionComparisonResults: React.FC<SessionComparisonResultsProps> = ({ session1, session2, tableData }) => {

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const parseArrayData = (data: any) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [data];
    } catch (e) {
      if (typeof data === 'string' && data.startsWith('[') && data.endsWith(']')) {
        return data.slice(1, -1).split(',').map(item => item.trim());
      }
      return [data];
    }
  };

  const renderInsightsList = (insights: any) => {
    const insightsArray = parseArrayData(insights);
    
    if (insightsArray.length === 0) return <p>None</p>;

    return (
      <ul className="space-y-2 text-sm">
        {insightsArray.map((insight: any, index: number) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-gray-800">{insight}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-12 mb-6">
        <div className='flex flex-col gap-6'>
          <div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-2">{session1?.title}</h2>
              <p className="text-gray-500 mb-6">{session1?.dateRange} • {session1?.duration}</p>

              <div className="flex justify-center mb-6">
                <div className={`${getScoreBackgroundColor(session1?.overallScore)} rounded-full w-24 h-24 flex items-center justify-center`}>
                  <span className="text-2xl font-medium text-gray-900">{session1?.overallScore}</span>
                </div>
              </div>
              <p className="text-center text-gray-500">Overall Score</p>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Key Insights</h2>
            <div className='grid md:grid-cols-2 grid-cols-1'>
              <div className="mb-4">
                <p className="text-green-600 mb-2">Strengths</p>
                {renderInsightsList(session1?.strengths)}
              </div>

              <div>
                <p className="text-red-500 mb-2">Areas of Improvement</p>
                {renderInsightsList(session1?.improvements)}
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-2">{session2?.title}</h2>
            <p className="text-gray-500 mb-6">{session2?.dateRange} • {session2?.duration}</p>

            <div className="flex justify-center mb-6">
              <div className={`${getScoreBackgroundColor(session2?.overallScore)} rounded-full w-24 h-24 flex items-center justify-center`}>
                <span className="text-2xl font-medium text-gray-900">{session2?.overallScore}</span>
              </div>
            </div>
            <p className="text-center text-gray-500">Overall Score</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Key Insights</h2>
            <div className='grid md:grid-cols-2 grid-cols-1'>
              <div className="mb-4">
                <p className="text-green-600 mb-2">Strengths</p>
                {renderInsightsList(session2?.strengths)}
              </div>

              <div>
                <p className="text-red-500 mb-2">Areas of Improvement</p>
                {renderInsightsList(session2?.improvements)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='border border-gray-200 rounded-lg p-6'>
        <PresentationMetricsTable
          columns={columnsTwo}
          data={tableData}
          hidePagination={true}
          pageSize={4}
          tableContainerClassName='sm:rounded-tr-md rounded-tr-0 sm:border-r border-r-0'
        />
      </div>
    </div>
  );
};

export default SessionComparisonResults;