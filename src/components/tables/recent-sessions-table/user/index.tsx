import { BaseTable } from "../../base-table";
import { columns } from "./columns";
import { Session } from "./data";


interface RecentSessionsTableProps {
  data: Session[];
  pageSize?: number;
}

export const RecentSessionsTable = ({ 
  data, 
  pageSize = 5 
}: RecentSessionsTableProps) => {
  return (
    <BaseTable
      columns={columns}
      data={data}
      pageSize={pageSize}
      tableHeaderClassName="bg-gray-50"
      tableHeaderItemClassName="text-gray-600 font-medium text-sm"
      tableContainerClassName="border-none"
    />
  );
};