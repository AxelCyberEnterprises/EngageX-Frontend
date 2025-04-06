import React from "react";
import { Volume2, SlidersVertical, Lightbulb } from "lucide-react";
import useFluctuatingNumber from "@/hooks/useFluctuatingNumber";

interface MobileVoiceAnalyticsProps {
    impact: number;
    engagement: number;
    transformativePotential: number;
}

const MobileVoiceAnalytics: React.FC<MobileVoiceAnalyticsProps> = ({ impact, engagement, transformativePotential }) => {
    return (
        <div className="row flex">
            <div className="w-6/12">
                <h6>Voice Analytics</h6>
            </div>

            <div className="flex flex-col justify-between items-center w-2/12">
                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                    <Volume2 className="w-1/2 aspect-square text-primary-blue" />
                </div>
                <p>{useFluctuatingNumber(impact)}</p>
            </div>

            <div className="flex flex-col justify-between items-center w-2/12">
                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                    <SlidersVertical className="w-1/2 aspect-square text-primary-blue" />
                </div>
                <p>{useFluctuatingNumber(engagement)}</p>
            </div>

            <div className="flex flex-col justify-between items-center w-2/12">
                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                    <Lightbulb className="w-1/2 aspect-square text-primary-blue" />
                </div>
                <p>{useFluctuatingNumber(transformativePotential)}</p>
            </div>
        </div>
    );
};

export default MobileVoiceAnalytics;
