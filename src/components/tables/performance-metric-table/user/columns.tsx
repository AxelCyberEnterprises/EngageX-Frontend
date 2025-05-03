import { ColumnDef } from "@tanstack/react-table";
import trendUpIcon from '../../../../assets/images/svgs/trend-up.svg';
import trendDownIcon from '../../../../assets/images/svgs/trend-down.svg';

export type Metric = {
  metric: string;
  category: string;
  // sessionType: number;
  sequence1: number;
  sequence2: number;
  sequence3: number;
  trend12: any
  trend23: any
};

export const columns: ColumnDef<Metric, any>[] = [
  {
    accessorKey: "metric",
    header: "Metric",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: any = row.getValue("category");
      let bgColor = "";

      switch (category) {
        case "Delivery":
          bgColor = "bg-gray-100";
          break;
        case "Content":
          bgColor = "bg-green-50";
          break;
        case "Impact":
          bgColor = "bg-blue-50";
          break;
        case "Clarity":
          bgColor = "bg-red-50";
          break;
        default:
          bgColor = "bg-gray-100";
      }

      return (
        <span className={`px-3 py-1 rounded-full text-sm border border-gray-200 ${bgColor}`}>
          {category}
        </span>
      );
    }
  },
  {
    accessorKey: "sequence1",
    header: () => <div className="text-center w-full">Sequence 1</div>,
    cell: ({ row }) => renderScoreCell(row.getValue("sequence1")),
  },
  {
    accessorKey: "sequence2",
    header: () => <div className="text-center w-full">Sequence 2</div>,
    cell: ({ row }) => renderScoreCell(row.getValue("sequence2")),
  },
  {
    accessorKey: "sequence3",
    header: () => <div className="text-center w-full">Sequence 3</div>,
    cell: ({ row }) => renderScoreCell(row.getValue("sequence3")),
  },
  {
    accessorKey: "trend12",
    header: "Trend 1-2",
    cell: ({ row }) => {
      const trend: 'Progressing' | 'Declining' = row.getValue("trend12");
      return <TrendCell trend={trend} />;
    }
  },
  {
    accessorKey: "trend23",
    header: "Trend 2-3",
    cell: ({ row }) => {
      const trend: 'Progressing' | 'Declining' = row.getValue("trend23");
      return <TrendCell trend={trend} />;
    }
  },
];

const renderScoreCell = (score: number) => {
  let bgColor = "bg-gray-200";
  let textColor = "text-gray-800";

  if (score >= 85) {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (score >= 65) {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  } else if (score <= 50) {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  }

  return (
    <div className="flex justify-center ml-auto">
      <span className={`${bgColor} ${textColor} w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs`}>
        {score}
      </span>
    </div>
  );
};
  
// Trend cell component
// eslint-disable-next-line react-refresh/only-export-components
const TrendCell = ({ trend }: { trend: 'Progressing' | 'Declining' }) => {
  if (trend === 'Progressing') {
    return (
      <div className="flex gap-2 items-center text-green-700">
        <img src={trendUpIcon} alt="trend Icon" className="w-3 h-3"/>
        {trend}
      </div>
    );
  } else if (trend === 'Declining') {
    return (
      <div className="flex gap-2 items-center text-red-700">
        <img src={trendDownIcon} alt="trend Icon" className="w-3 h-3"/>
        {trend}
      </div>
    );
  }
  return null;
};
