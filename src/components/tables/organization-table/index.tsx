import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { OrganizationTableData } from "./data";

interface OrganizationsTableProps {
  data: OrganizationTableData[];
  pageSize?: number;
  hidePagination?: boolean;
  loadingOrganizations?: boolean;
}

export const OrganizationsTable = ({ 
  data, 
  pageSize = 10,
  hidePagination = false,
  loadingOrganizations = false
}: OrganizationsTableProps) => {
  return (
    <BaseTable
      columns={columns}
      data={data}
      pageSize={pageSize}
      tableHeaderClassName="bg-[#F7F9FC]"
      tableHeaderItemClassName="text-gray-600 font-medium text-sm"
      tableContainerClassName="border-[#D0D5DD]"
      tableCellClassName="align-middle"
      tableRowClassName="[&>*]:!border-[#D0D5DD] hover:bg-gray-50 cursor-pointer"
      hidePagination={hidePagination}
      isLoading={loadingOrganizations}
      session={false}
    />
  );
};