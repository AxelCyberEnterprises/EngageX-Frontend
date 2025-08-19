// import { BaseTable } from "../base-table";
// import { columns } from "./columns";
// import { GenerateReportMember } from "./data";

// interface GenerateReportTableProps {
//     data: GenerateReportMember[];
//     pageSize?: number;
//     hidePagination?: boolean;
//     isLoading?: boolean;
//     setSelectedRows?: (rows: GenerateReportMember[]) => void;
// }

// export const GenerateReportTable = ({
//     data,
//     pageSize = 10,
//     hidePagination = false,
//     isLoading = false,
//     setSelectedRows
// }: GenerateReportTableProps) => {
//     return (
//         <BaseTable
//             columns={columns}
//             data={data}
//             pageSize={pageSize}
//             tableHeaderClassName="bg-[#F9FAFB] border-b border-[#EAECF0]"
//             tableHeaderItemClassName="text-[#667085] font-medium !text-xs uppercase tracking-wide"
//             tableContainerClassName="border border-[#EAECF0] rounded-xl shadow-sm"
//             tableCellClassName="py-3 align-middle border-b border-[#EAECF0] last:border-b-0"
//             tableRowClassName="hover:bg-[#F9FAFB]/50 data-[state=selected]:bg gray-700"
//             hidePagination={hidePagination}
//             isLoading={isLoading}
//             session={false}
//             onRowSelectionChange={setSelectedRows}
//         />
//     );
// };

import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { GenerateReportMember } from "./data";
import { useFetchEnterpriseUsers } from "@/hooks/organization/useFetchEnterpriseUsers";

interface GenerateReportTableProps {
    pageSize?: number;
    hidePagination?: boolean;
    orgId: number;
    setSelectedRows?: (rows: GenerateReportMember[]) => void;
}

export const GenerateReportTable = ({
    pageSize = 10,
    hidePagination = false,
    orgId,
    setSelectedRows
}: GenerateReportTableProps) => {
  const { data: response, isLoading } = useFetchEnterpriseUsers(1, orgId);
  const data: GenerateReportMember[] = response?.results.map((user) => ({
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
  })) ?? [];

  return (
    <BaseTable
      columns={columns}
      data={data}
      pageSize={pageSize}
      tableHeaderClassName="bg-[#F9FAFB] border-b border-[#EAECF0]"
      tableHeaderItemClassName="text-[#667085] font-medium !text-xs uppercase tracking-wide"
      tableContainerClassName="border border-[#EAECF0] rounded-xl shadow-sm"
      tableCellClassName="py-3 align-middle border-b border-[#EAECF0] last:border-b-0"
      tableRowClassName="hover:bg-[#F9FAFB]/50 data-[state=selected]:bg gray-700"
      hidePagination={hidePagination}
      isLoading={isLoading}
      session={false}
      onRowSelectionChange={setSelectedRows}
    />
  );
};