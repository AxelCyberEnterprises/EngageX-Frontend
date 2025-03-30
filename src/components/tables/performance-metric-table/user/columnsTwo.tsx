import { ColumnDef } from "@tanstack/react-table";
import trendUpIcon from '../../../../assets/images/svgs/trend-up.svg';
import trendDownIcon from '../../../../assets/images/svgs/trend-down.svg';

export type Metric = {
  metric: string;
  category: string;
  sequence1: number;
  sequence2: number;
  trend: 'Progressing' | 'Declining';
};

export const columnsTwo: ColumnDef<Metric, any>[] = [
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
        <span className={`px-3 py-1 rounded-full text-sm border border-[#E0E0E0] ${bgColor}`}>
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
    accessorKey: "trend",
    header: "Trends",
    cell: ({ row }) => {
      const trend: any = row.getValue("trend")
      const getTrendIcon = (trend: any) => {
        if (trend === 'Progressing') {
          return (
            <div className="flex gap-2 items-center text-[#0E7B33]">
              <img src={trendUpIcon} alt="trend Icon" className="w-3 h-3"/>
              {trend}
            </div>
          );
        } else if (trend === 'Declining') {
          return (
            <div className="flex gap-2 items-center text-[#940803]">
              <img src={trendDownIcon} alt="trend Icon" className="w-3 h-3"/>
              {trend}
            </div>
          );
        }
        return trend;
      };
      return <div className={`flex gap-2 text-sm`}>
        {getTrendIcon(trend)}
      </div>
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
      <span className={`${bgColor} ${textColor} w-8 h-8 rounded-full flex items-center justify-center font-medium !text-xs`}>
        {score}
      </span>
    </div>
  );
};