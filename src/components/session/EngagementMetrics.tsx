import React from "react";
import useFluctuatingNumber from "@/hooks/useFluctuatingNumber";
import SegmentedProgressBar from "../dashboard/SegmentedProgressBar";

interface EngagementProps {
    percent1: number;
    percent2: number;
    percent3: number;
}

const EngagementMetrics: React.FC<EngagementProps> = ({ percent1, percent2, percent3 }) => {
    return (
        <div className="py-5 px-3 border-1 border-bright-gray rounded-xl mt-3 w-full">
            <h6 className="mb-4.5">Engagement Metrics</h6>
            <div className="metrics">
                <div className="mb-3">
                    <p className="mb-3">Impact</p>
                    <SegmentedProgressBar percent={useFluctuatingNumber(percent1)} color={"#40B869"} divisions={1} />
                </div>

                <div className="mb-3">
                    <p className="mb-3">Trigger Response</p>
                    <SegmentedProgressBar percent={useFluctuatingNumber(percent2)} color={"#C64683"} divisions={1} />
                </div>

                <div className="mb-3">
                    <p className="mb-3">Transformative Potential</p>
                    <SegmentedProgressBar percent={useFluctuatingNumber(percent3)} color={"#252A39"} divisions={1} />
                </div>
            </div>
        </div>
    );
};

export default EngagementMetrics;
