import { ThumbsUp } from "lucide-react";
import React from "react";
import useFluctuatingNumber from "@/hooks/useFluctuatingNumber";

interface LiveAudienceProps {
    percent1: number;
    percent2: number;
    percent3: number;
}

const LiveAudienceReaction: React.FC<LiveAudienceProps> = ({ percent1, percent2, percent3 }) => {
    return (
        <div className="py-5 px-3 border-1 border-bright-gray rounded-xl mt-3">
            <h6 className="mb-4">Live Audience Reaction</h6>
            <div className="reactions">
                <div className="flex w-full justify-between items-center mb-3">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                            <ThumbsUp className="w-1/2 aspect-square text-white" />
                        </div>
                        <p className="ms-2">Interested</p>
                    </div>
                    <p>{useFluctuatingNumber(percent1)}</p>
                </div>

                <div className="flex w-full justify-between items-center mb-3">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                            <ThumbsUp className="w-1/2 aspect-square text-white" />
                        </div>
                        <p className="ms-2">Sure</p>
                    </div>
                    <p>{useFluctuatingNumber(percent2)}</p>
                </div>

                <div className="flex w-full justify-between items-center mb-3">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                            <ThumbsUp className="w-1/2 aspect-square text-white" />
                        </div>
                        <p className="ms-2">Skeptical</p>
                    </div>
                    <p>{useFluctuatingNumber(percent3)}</p>
                </div>
            </div>
        </div>
    );
};

export default LiveAudienceReaction;
