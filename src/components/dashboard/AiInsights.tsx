import React from 'react';
import { cn } from "@/lib/utils";
import trendUpIcon from '../../assets/images/svgs/trend-up.svg';
import medalIcon from '../../assets/images/svgs/award-yellow.svg';
import targetIcon from '../../assets/images/svgs/target.svg';
import lightbulbIcon from '../../assets/images/svgs/lightbulb.svg';


interface InsightItemProps {
  icon: string;
  iconAlt: string;
  iconBgColor: string;
  title: string;
  description: string;
}

const InsightItem: React.FC<InsightItemProps> = ({
  icon,
  iconAlt,
  iconBgColor,
  title,
  description
}) => {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className={cn(
        "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
        iconBgColor
      )}>
        <img src={icon} alt={iconAlt} className={cn("w-5 h-5")} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="sm:text-lg text-base text-[#333333]">{title}</h3>
        <p className="text-[#252A39D9] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

interface AIInsightsProps {
  insights: {
    improvement: {
      percentage: string;
      sessions: number;
    };
    strength: {
      area: string;
      score: string;
    };
    focusRecommendation: string;
    pattern: {
      observation: string;
      recommendation: string;
    };
  };
  className?: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({
  insights,
  className,
}) => {
  return (
    <div className={cn("bg-white rounded-xl md:px-6 px-4 md:py-4 py-3 shadow-sm border border-gray-100", className)}>
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-medium text-[#252A39] mb-1">AI Insights</h2>
        <p className="text-[#6F7C8E] text-sm">Analysis based on your recent sessions</p>
      </div>
      
      <div className="flex flex-col">
        <InsightItem
          icon={trendUpIcon}
          iconAlt="Growth trend"
          iconBgColor="bg-[#F5F5F5]"
          title="Consistent Improvement"
          description={`Your audience engagement has improved by ${insights.improvement.percentage} over the last ${insights.improvement.sessions} sessions, showing excellent progress`}
        />
        
        <InsightItem
          icon={medalIcon}
          iconAlt="Medal"
          iconBgColor="bg-[#F5F5F5]"
          title="Strength Identified"
          description={`Your ${insights.strength.area} consistently scores above ${insights.strength.score}, making it your strongest area`}
        />
        
        <InsightItem
          icon={targetIcon}
          iconAlt="Target"
          iconBgColor="bg-[#F5F5F5]"
          title="Focus Recommendation"
          description={insights.focusRecommendation}
        />
        
        <InsightItem
          icon={lightbulbIcon}
          iconAlt="Lightbulb"
          iconBgColor="bg-[#F5F5F5]"
          title="Pattern Detected"
          description={`${insights.pattern.observation} Consider ${insights.pattern.recommendation}`}
        />
      </div>
    </div>
  );
};

export default AIInsights;