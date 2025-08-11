import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { Member } from "./data";

interface MembersTableProps {
  data: Member[];
  pageSize?: number;
  hidePagination?: boolean;
  loadingMembers?: boolean;
}

export const MembersTable = ({ 
  data, 
  pageSize = 5,
  hidePagination,
  loadingMembers
}: MembersTableProps) => {
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
      isLoading={loadingMembers}
    />
  );
};