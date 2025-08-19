import { TableCell, TableRow } from "@/components/ui/table";
import { BaseTable } from "../base-table";
import { createColumns } from "./columns";
import { OrganizationTableData } from "./data";
import emptyStateImage from "@/assets/images/svgs/empty-state.svg";

interface OrganizationsTableProps {
  data: OrganizationTableData[];
  pageSize?: number;
  hidePagination?: boolean;
  loadingOrganizations?: boolean;
  onStatusChange?: (organizationId: string, newStatus: 'Active' | 'Blacklisted') => void;
}

export const OrganizationsTable = ({
  data,
  pageSize = 10,
  hidePagination = false,
  loadingOrganizations = false,
  onStatusChange
}: OrganizationsTableProps) => {
  const columns = createColumns({ onStatusChange });

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
      emptyState={
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="justify-center items-center w-full mx-auto py-[10%] flex-col gap-4 text-center"
          >
            <img src={emptyStateImage} className="w-28 mx-auto" alt="empty state logo" />
            <p className="text-lg font-medium">No Organization Found</p>
            <p className="text-muted-foreground font-normal text-sm">Create a new organization to get started</p>
          </TableCell>
        </TableRow>
      }
    />
  );
};