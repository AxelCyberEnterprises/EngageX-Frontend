import { BaseTable } from "../../base-table";
import { columns } from "./columns";
import { Session } from "./data";


interface SessionComparisonTableProps {
  data: Session[];
  pageSize?: number;
}

export const SessionComparisonTable = ({ 
  data, 
  pageSize = 5 
}: SessionComparisonTableProps) => {
  return (
    <BaseTable
      columns={columns}
      data={data}
      pageSize={pageSize}
      tableHeaderClassName="bg-gray-50"
      tableHeaderItemClassName="text-gray-600 font-medium text-sm"
      hidePagination={true}
    />
  );
};