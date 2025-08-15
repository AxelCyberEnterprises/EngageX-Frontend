import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { QuestionBankItem } from "./data";

interface QuestionBankTableProps {
    data: QuestionBankItem[];
    pageSize?: number;
    hidePagination?: boolean;
    isLoading?: boolean;
    onRowsSelected?: (selectedRows: any[]) => void;
}

export const QuestionBankTable = ({ 
    data, 
    pageSize = 10,
    hidePagination = false,
    isLoading = false,
}: QuestionBankTableProps) => {
    return (
        <BaseTable
            columns={columns}
            data={data}
            pageSize={pageSize}
            tableHeaderClassName="bg-transparent border-none"
            tableHeaderItemClassName="text-transparent h-0 p-0"
            tableContainerClassName="border border-[#EAECF0] rounded-xl shadow-sm"
            tableCellClassName="py-3 border-b border-[#EAECF0] last:border-b-0"
            tableRowClassName="hover:bg-[#F9FAFB]/50 data-[state=selected]:bg-[#E0F2FE]"
            hidePagination={hidePagination}
            isLoading={isLoading}
            session={false}
        />
    );
};