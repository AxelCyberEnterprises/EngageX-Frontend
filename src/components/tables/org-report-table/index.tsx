// import { BaseTable } from "../base-table";
// import { columns } from "./columns";
// import { OrganizationReportMember } from "./data";

// interface OrganizationReportTableProps {
//     data: OrganizationReportMember[];
//     pageSize?: number;
//     hidePagination?: boolean;
//     isLoading?: boolean;
// }

// export const OrganizationReportTable = ({ 
//     data, 
//     pageSize = 10,
//     hidePagination = false,
//     isLoading = false
// }: OrganizationReportTableProps) => {
//     return (
//         <BaseTable
//             columns={columns}
//             data={data}
//             pageSize={pageSize}
//             tableHeaderClassName="bg-[#F9FAFB] border-b border-[#EAECF0]"
//             tableHeaderItemClassName="text-[#667085] font-medium text-xs uppercase tracking-wide"
//             tableContainerClassName="border border-[#EAECF0] rounded-xl shadow-sm"
//             tableCellClassName="py-3 border-b border-[#EAECF0] last:border-b-0 align-middle"
//             tableRowClassName="hover:bg-[#F9FAFB]/50"
//             hidePagination={hidePagination}
//             isLoading={isLoading}
//             session={false}
//         />
//     );
// };

import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { OrganizationReportMember } from "./data";
import { useFetchEnterpriseUsersProgress } from "@/hooks";

interface OrganizationReportTableProps {
    pageSize?: number;
    hidePagination?: boolean;
    orgId: number;
    userIds?: number[];
}

export const OrganizationReportTable = ({ 
    pageSize = 10,
    hidePagination = false,
    orgId,
    userIds
}: OrganizationReportTableProps) => {
  const { data: response, isLoading } = useFetchEnterpriseUsersProgress(1, orgId, userIds);
  const data: OrganizationReportMember[] = response?.results.map((user) => ({
    id: user.id.toString(),
    name: `${user.user.first_name} ${user.user.last_name}`,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user.first_name + " " + user.user.last_name)}&background=cccccc&color=ffffff`,
    role: user.is_admin ? "Admin" : user.user_type === "general" ? "Basketballer" : "Rookie",
    lastLogin: new Date(user.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    creditsUsed: 0,
    progress: user.progress,
  })) ?? [];

  return (
    <BaseTable
      columns={columns}
      data={data}
      pageSize={pageSize}
      tableHeaderClassName="bg-[#F9FAFB] border-b border-[#EAECF0]"
      tableHeaderItemClassName="text-[#667085] font-medium text-xs uppercase tracking-wide"
      tableContainerClassName="border border-[#EAECF0] rounded-xl shadow-sm"
      tableCellClassName="py-3 border-b border-[#EAECF0] last:border-b-0 align-middle"
      tableRowClassName="hover:bg-[#F9FAFB]/50"
      hidePagination={hidePagination}
      isLoading={isLoading}
      session={false}
    />
  );
};