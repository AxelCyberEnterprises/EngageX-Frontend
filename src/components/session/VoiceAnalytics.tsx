import React from "react";
import useFluctuatingNumber from "@/hooks/useFluctuatingNumber";
import SegmentedProgressBar from "../dashboard/SegmentedProgressBar";

interface VoiceAnalyticsProps {
    percent1: number;
    percent2: number;
    percent3: number;
}

const VoiceAnalytics: React.FC<VoiceAnalyticsProps> = ({ percent1, percent2, percent3 }) => {
    return (
        <div className="py-5 px-3 border-1 border-bright-gray rounded-xl mt-3">
            <h6 className="mb-4.5">Voice Analytics</h6>
            <div className="metrics">
                <div className="mb-3">
                    <p className="mb-3">Volume</p>
                    <SegmentedProgressBar percent={useFluctuatingNumber(percent1)} color={"#252A39"} divisions={1} />
                </div>

                <div className="mb-3">
                    <p className="mb-3">Clarity</p>
                    <SegmentedProgressBar percent={useFluctuatingNumber(percent2)} color={"#252A39"} divisions={1} />
                </div>

                <div className="mb-3">
                    <p className="mb-3">Pace</p>
                    <SegmentedProgressBar percent={useFluctuatingNumber(percent3)} color={"#252A39"} divisions={1} />
                </div>
            </div>
        </div>
    );
};

export default VoiceAnalytics;
