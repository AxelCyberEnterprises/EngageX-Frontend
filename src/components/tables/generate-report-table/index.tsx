import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { GenerateReportMember } from "./data";

interface GenerateReportTableProps {
    data: GenerateReportMember[];
    pageSize?: number;
    hidePagination?: boolean;
    isLoading?: boolean;
    setSelectedRows?: (rows: GenerateReportMember[]) => void;
}

export const GenerateReportTable = ({
    data,
    pageSize = 10,
    hidePagination = false,
    isLoading = false,
    setSelectedRows
}: GenerateReportTableProps) => {
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