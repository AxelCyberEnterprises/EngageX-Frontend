import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { OrganizationReportMember } from "./data";
import { useFetchEnterpriseReport } from "@/hooks";

interface OrganizationReportTableProps {
  orgId: number;
  userIds?: number[];
}

export const OrganizationReportTable = ({
  orgId,
  userIds
}: OrganizationReportTableProps) => {
  const { data: response, isLoading } = useFetchEnterpriseReport(orgId, userIds);
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
    />
  );
};