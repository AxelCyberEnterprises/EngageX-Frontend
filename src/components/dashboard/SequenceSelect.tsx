import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Define types for the sequence data
export interface Sequence {
  id: number | string;
  title: string;
  startDate: string;
  lastUpdated: string;
  totalCompleted: number;
  inProgress?: number;
}

// Define props interface for the component
interface SequenceSelectorProps {
  sequences: Sequence[];
  onNewSession?: (sequenceId: number | string) => void;
  onSelectSequence?: (sequence: Sequence) => void;
  trendUpIcon: string; // Path to the trend up icon
}

const SequenceSelector: React.FC<SequenceSelectorProps> = ({
  sequences,
  onNewSession,
  onSelectSequence,
  trendUpIcon,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSequence, setSelectedSequence] = useState<Sequence | null>(
    null
  );
  const [expandedSequence, setExpandedSequence] = useState<
    number | string | null
  >(null);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const toggleSequence = (sequenceId: number | string): void => {
    setExpandedSequence(sequenceId === expandedSequence ? null : sequenceId);
  };

  const selectSequence = (sequence: Sequence): void => {
    setSelectedSequence(sequence);
    if (onSelectSequence) onSelectSequence(sequence);
    setIsOpen(false);
  };

  const handleNewSession = (sequenceId: number | string): void => {
    if (onNewSession) onNewSession(sequenceId);
  };

  return (
    <div className="mt-6 border border-[#E0E0E0] rounded-lg overflow-hidden">
      <div className="p-4 mb-4">
        <h2 className="text-lg font-medium text-[#252A39]">
          Select Improvement Sequence
        </h2>
        <p className="text-sm text-[#6F7C8E]">
          Select the sequence you would like to compare
        </p>
      </div>

      <div
        className="border border-[#E4E7EC] rounded-[12px] p-4 cursor-pointer flex justify-between items-center mx-4 mb-6"
        onClick={toggleDropdown}
      >
        <span className="text-[#6F7C8E]">
          {selectedSequence ? selectedSequence.title : "Select a sequence"}
        </span>
        <span
          className={cn(
            "text-[#6F7C8E] transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <ChevronUp className="text-[#6F7C8E]" />
        </span>
      </div>

      {isOpen && (
        <div
          ref={contentRef}
          style={{
            height,
            overflow: "hidden",
            transition: "height 0.7s ease-in-out",
          }}
          className="border border-[#E4E7EC] rounded-[12px] mx-4 mb-6"
        >
          {sequences.map((sequence, index) => (
            <div key={sequence.id}>
              <div
                className={cn(
                  "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                  index === 0 && "rounded-t-[12px]",
                  index === sequences.length - 1 && "rounded-b-[12px]"
                )}
                onClick={() => {
                  toggleSequence(sequence.id);
                  selectSequence(sequence);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg text-[#252A39]">{sequence.title}</h3>
                    <img
                      src={trendUpIcon}
                      alt="trend up Icon"
                      className={cn("w-4 h-4")}
                    />
                  </div>
                  <Button
                    className="bg-white text-[#252A39] border border-[#252A39] px-3 h-8 lg:rounded-[8px] rounded-[5px] hover:bg-gray-50 shadow-none !text-sm sm:flex hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNewSession(sequence.id);
                      // router.push("/dashboard/user/pitch-practice")
                    }}
                  >
                    New Session
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <p
                      className={`text-sm ${
                        expandedSequence === sequence.id
                          ? "text-[#0E7B33]"
                          : "text-[#6F7C8E]"
                      }`}
                    >
                      Start Date
                    </p>
                    <p className="text-sm text-[#252A39]">
                      {sequence.startDate}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-sm ${
                        expandedSequence === sequence.id
                          ? "text-[#0E7B33]"
                          : "text-[#6F7C8E]"
                      }`}
                    >
                      Last Updated
                    </p>
                    <p className="text-sm text-[#252A39]">
                      {sequence.lastUpdated}
                    </p>
                  </div>
                  <div className="md:flex hidden items-center justify-between">
                    <div>
                      <p
                        className={`text-sm ${
                          expandedSequence === sequence.id
                            ? "text-[#0E7B33]"
                            : "text-[#6F7C8E]"
                        }`}
                      >
                        Total Sessions
                      </p>
                      <p className="text-sm text-[#252A39]">
                        {sequence.totalCompleted} sessions completed
                      </p>
                    </div>
                    {sequence.inProgress && (
                      <div className="text-right">
                        <p className="text-sm text-[#252A39]">
                          {sequence.inProgress} in progress
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SequenceSelector;
