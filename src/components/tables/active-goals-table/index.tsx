import { Goal } from "./data";
import { BaseTable } from "../base-table";
import { columns } from "./columns";

interface GoalsTableProps {
  data: Goal[];
  pageSize?: number;
  hidePagination?: boolean;
  loadingGoals?: boolean;
}

export const GoalsTable = ({
  data,
  pageSize = 5,
  hidePagination,
  loadingGoals
}: GoalsTableProps) =>{
  return (
    <BaseTable
      columns={columns}
      data={data}
      pageSize={pageSize}
      tableHeaderClassName="bg-[#F7F9FC]"
      tableHeaderItemClassName="text-gray-600 font-medium text-sm "
      tableContainerClassName="border-[#D0D5DD]"
      tableCellClassName="align-middle"
      tableRowClassName="[&>*]:!border-[#D0D5DD]"
      hidePagination={hidePagination}
      isLoading={loadingGoals}
      session={false}
    />
  );
};