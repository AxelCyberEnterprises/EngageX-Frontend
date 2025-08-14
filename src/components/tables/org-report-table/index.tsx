import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { OrganizationReportMember } from "./data";

interface OrganizationReportTableProps {
    data: OrganizationReportMember[];
    pageSize?: number;
    hidePagination?: boolean;
    isLoading?: boolean;
}

export const OrganizationReportTable = ({ 
    data, 
    pageSize = 10,
    hidePagination = false,
    isLoading = false
}: OrganizationReportTableProps) => {
    return (
        <BaseTable
            columns={columns}
            data={data}
            pageSize={pageSize}
            tableHeaderClassName="bg-[#F9FAFB] border-b border-[#EAECF0]"
            tableHeaderItemClassName="text-[#667085] font-medium text-xs uppercase tracking-wide"
            tableContainerClassName="border border-[#EAECF0] rounded-xl shadow-sm"
            tableCellClassName="py-4 border-b border-[#EAECF0] last:border-b-0"
            tableRowClassName="hover:bg-[#F9FAFB]/50"
            hidePagination={hidePagination}
            isLoading={isLoading}
            session={false}
        />
    );
};