import React from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from '../ui/skeleton';

interface StatCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  value: string;
  subtext: string;
  className?: string;
  isPositive?: boolean;
  [key: string]: any; // Allows passing additional props
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconAlt,
  title,
  value,
  subtext,
  className,
  ...moreProps
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg p-4 flex flex-col gap-4 shadow-sm border border-gray-100",
      className
    )} {...moreProps}>
      <div className="flex items-center gap-2">
        <img src={icon} alt={iconAlt} className="w-5 h-5" />
        <span className="text-gray-700 text-sm font-medium">{title}</span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="sm:text-3xl text-2xl font-medium text-[#070D17]">
          {value}
        </p>
        <p className="text-[#333333] text-sm mt-2">{subtext}</p>
      </div>
    </div>
  );
};

interface StatsCardSectionProps {
  cards: StatCardProps[];
  className?: string;
  loadingCards?: boolean
}
const StatsCardSection: React.FC<StatsCardSectionProps> = ({
  cards,
  className,
  loadingCards = false
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {loadingCards
        ? Array(4).fill(0).map((_, index) => (
          <div key={index} className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))
        : cards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))
      }
    </div>
  );
};

export default StatsCardSection;
