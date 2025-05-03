import React from "react";
import SegmentedProgressBar from "../dashboard/SegmentedProgressBar";
import useFluctuatingNumber from "@/hooks/useFluctuatingNumber";

interface AudienceEngagedProps {
    percent: number;
}

const AudienceEngaged: React.FC<AudienceEngagedProps> = ({ percent }) => {
    return (
        <div className="py-5 px-3 border-1 border-bright-gray rounded-xl mt-3">
            <h6 className="mb-4">Impact</h6>
            <div className="mb-2">
                <SegmentedProgressBar percent={useFluctuatingNumber(percent)} color={"#40B869"} divisions={1} />
            </div>
            <small className="text-grey">{useFluctuatingNumber(percent)}% engaged</small>
        </div>
    );
};

export default AudienceEngaged;
