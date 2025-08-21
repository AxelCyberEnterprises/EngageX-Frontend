import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { OrganizationReportMember } from "./data";
import { useFetchEnterpriseReport } from "@/hooks";
import { TableCell, TableRow } from "@/components/ui/table";
import emptyStateImage from "@/assets/images/svgs/empty-state.svg";

interface OrganizationReportTableProps {
  orgId: number;
  userIds?: number[];
  searchTerm?: string;
}

export const OrganizationReportTable = ({
  orgId,
  userIds,
  searchTerm
}: OrganizationReportTableProps) => {
  const { data: response, isLoading } = useFetchEnterpriseReport(orgId, userIds, searchTerm);
  const data: OrganizationReportMember[] =
    response?.users.map((user) => {
      const fullName = [user.first_name, user.last_name]
        .filter(Boolean)
        .join(" ")
        || user.email;

      return {
        id: String(user.user_id),
        name: fullName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`,
        totalSessionsCompleted: 0,
        totalSessionsGoal: 0,
        overallGoalCompletion: 0,
      };
    }) ?? [];

  return (
    <BaseTable
      columns={columns}
      data={data}
      pageSize={10}
      tableHeaderClassName="bg-[#F9FAFB] border-b border-[#EAECF0]"
      tableHeaderItemClassName="text-[#667085] font-medium text-xs uppercase tracking-wide"
      tableContainerClassName="border border-[#EAECF0] rounded-xl shadow-sm"
      tableCellClassName="py-3 border-b border-[#EAECF0] last:border-b-0 align-middle"
      tableRowClassName="hover:bg-[#F9FAFB]/50"
      hidePagination={false}
      isLoading={isLoading}
      session={false}
      emptyState={
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="justify-center items-center w-full mx-auto py-[10%] flex-col gap-4 text-center"
          >
            <img src={emptyStateImage} className="w-28 mx-auto" alt="empty state logo" />
            <p className="text-lg font-medium">No Report Generated</p>
            {/* <p className="text-muted-foreground font-normal text-sm">Create a new goal to get started</p> */}
          </TableCell>
        </TableRow>
      }
    />
  );
};