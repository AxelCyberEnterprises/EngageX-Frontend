import React from "react";
import { ShieldCheck, ChartSpline, Lightbulb } from "lucide-react";
import useFluctuatingNumber from "@/hooks/useFluctuatingNumber";

interface MobileEngagementMetricsProps {
    impact: number;
    volume: number;
    pace: number;
}

const MobileEngagementMetrics: React.FC<MobileEngagementMetricsProps> = ({
    impact,
    volume,
    pace,
}) => {
    return (
        <div className="row flex mt-3">
            <div className="w-6/12">
                <h6>Engagement Metrics</h6>
            </div>

            <div className="flex flex-col justify-between items-center w-2/12">
                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                    <ShieldCheck className="w-1/2 aspect-square text-primary-blue" />
                </div>
                <p>{useFluctuatingNumber(impact)}</p>
            </div>

            <div className="flex flex-col justify-between items-center w-2/12">
                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                    <ChartSpline className="w-1/2 aspect-square text-primary-blue" />
                </div>
                <p>{useFluctuatingNumber(volume)}</p>
            </div>

            <div className="flex flex-col justify-between items-center w-2/12">
                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                    <Lightbulb className="w-1/2 aspect-square text-primary-blue" />
                </div>
                <p>{useFluctuatingNumber(pace)}</p>
            </div>
        </div>
    );
};

export default MobileEngagementMetrics;
