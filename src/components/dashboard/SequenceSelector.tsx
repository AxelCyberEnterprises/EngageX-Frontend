import React from 'react';
import { Button } from '@/components/ui/button';
import trendUpIcon from '../../assets/images/svgs/trend-up.svg';
import { cn } from '@/lib/utils';

export interface SequenceItem {
  title: string;
  startDate: string;
  lastUpdated: string;
  totalCompleted: number;
  inProgress: number;
}

interface ImprovementSequenceSelectorProps {
  sequences: SequenceItem[];
  onSelectSequence?: (sequence: SequenceItem) => void;
  onNewSession?: (sequence: SequenceItem) => void;
}

const ImprovementSequenceSelector: React.FC<ImprovementSequenceSelectorProps> = ({
  sequences,
  onSelectSequence,
  onNewSession
}) => {

  const handleSelectSequence = (sequence: SequenceItem) => {
    if (onSelectSequence) {
      onSelectSequence(sequence);
    }
  };

  const handleNewSession = (sequence: SequenceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNewSession) {
      onNewSession(sequence);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-[#252A39]">Select Improvement Sequence</h2>
        <p className="text-[#6F7C8E] text-sm">Select the sequence you would like to compare</p>
      </div>

      <div className="space-y-4">
        {sequences.map((sequence, index) => (
          <div 
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer"
            onClick={() => handleSelectSequence(sequence)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium text-[#252A39]">{sequence.title}</h3>
                <img src={trendUpIcon} alt={'trend up Icon'} className={cn("w-4 h-4")} />
              </div>
              <Button 
                className="bg-white text-[#252A39] border border-[#252A39] px-3 h-8 lg:rounded-[10px] rounded-[5px] hover:bg-gray-50 shadow-none !text-sm sm:flex hidden"
                onClick={(e) => handleNewSession(sequence, e)}
              >
                New Session
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[#6F7C8E]">Start Date</p>
                <p className="text-[#252A39]">{sequence.startDate}</p>
              </div>
              <div>
                <p className="text-[#6F7C8E]">Last Updated</p>
                <p className="text-[#252A39]">{sequence.lastUpdated}</p>
              </div>
              <div className="md:flex hidden items-center justify-between">
                <div>
                  <p className="text-[#6F7C8E]">Total Sessions</p>
                  <p className="text-[#252A39]">{sequence.totalCompleted} sessions completed</p>
                </div>
                <div className="text-right">
                  <p className="text-[#252A39]">{sequence.inProgress} in progress</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImprovementSequenceSelector;