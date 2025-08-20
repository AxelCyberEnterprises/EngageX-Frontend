import { TableCell, TableRow } from "@/components/ui/table";
import emptyStateImage from "@/assets/images/svgs/empty-state.svg";
import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { GenerateReportMember } from "./data";
import { useFetchEnterpriseReport } from "@/hooks";

interface GenerateReportTableProps {
  orgId: number;
  setSelectedRows?: (rows: GenerateReportMember[]) => void;
  searchTerm?: string;
}

export const GenerateReportTable = ({
  orgId,
  setSelectedRows,
  searchTerm
}: GenerateReportTableProps) => {
  const { data: response, isLoading } = useFetchEnterpriseReport(orgId, undefined, searchTerm);

  const data: GenerateReportMember[] =
    response?.users?.map((user) => ({
      id: String(user?.user_id ?? ""),
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      role: user?.role ?? "user",
      assignedGoals: Array.isArray(user?.assigned_goals)
        ? user.assigned_goals.map((g) => g?.name ?? "")
        : [],
      email: user?.email ?? "",
    })) ?? [];

  return (
    <BaseTable
      columns={columns}
      data={data}
      pageSize={10}
      tableHeaderClassName="bg-[#F9FAFB] border-b border-[#EAECF0]"
      tableHeaderItemClassName="text-[#667085] font-medium !text-xs uppercase tracking-wide"
      tableContainerClassName="border border-[#EAECF0] rounded-xl shadow-sm"
      tableCellClassName="py-3 align-middle border-b border-[#EAECF0] last:border-b-0"
      tableRowClassName="hover:bg-[#F9FAFB]/50 data-[state=selected]:bg gray-700"
      hidePagination={false}
      isLoading={isLoading}
      session={false}
      onRowSelectionChange={setSelectedRows}
      emptyState={
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="justify-center items-center w-full mx-auto py-[10%] flex-col gap-4 text-center"
          >
            <img src={emptyStateImage} className="w-28 mx-auto" alt="empty state logo" />
            <p className="text-lg font-medium">No Progress Report Found</p>
            {/* <p className="text-muted-foreground font-normal text-sm">Create a new goal to get started</p> */}
          </TableCell>
        </TableRow>
      }
    />
  );
};
