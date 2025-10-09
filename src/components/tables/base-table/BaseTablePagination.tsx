import { Button } from "@/components/ui/button";
import Pagination from "@mui/material/Pagination";
import { Table } from "@tanstack/react-table";

interface IBaseTablePaginationProps<TData> {
    table: Table<TData>;
    totalCount?: number;
}

const BaseTablePagination = <TData,>({ table, totalCount }: IBaseTablePaginationProps<TData>) => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const currentPage = pageIndex + 1;
    const pageCount = table.getPageCount();

    // Calculate the range of items being shown
    const startItem = pageIndex * pageSize + 1;
    const endItem = Math.min((pageIndex + 1) * pageSize, totalCount ?? table.getFilteredRowModel().rows.length);

    return (
        <div className="flex md:flex-row flex-col-reverse md:gap-y-0 gap-y-4 items-center justify-between w-full">
            <p className="whitespace-nowrap text-gunmetal text-sm">
                {totalCount !== undefined
                    ? `Showing ${startItem}-${endItem} of ${totalCount}`
                    : `Showing page ${currentPage} of ${pageCount}`}
            </p>
            <div className="flex items-center justify-end gap-x-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="md:inline-flex hidden border-none bg-transparent hover:bg-bright-gray shadow-none font-normal text-gunmetal disabled:text-gray-blue h-8"
                >
                    Previous
                </Button>
                <Pagination
                    variant="outlined"
                    count={pageCount}
                    page={currentPage}
                    onChange={(_, page) => {
                        table.setPageIndex(page - 1);
                    }}
                    hideNextButton
                    hidePrevButton
                    sx={{
                        "& .MuiPaginationItem-root": { color: "var(--color-gunmetal)" },
                        "& .Mui-selected": {
                            backgroundColor: "var(--color-bright-gray)",
                            "&:hover": {
                                backgroundColor: "var(--color-bright-gray)",
                            },
                        },
                    }}
                />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="md:inline-flex hidden border-none bg-transparent hover:bg-bright-gray shadow-none font-normal text-gunmetal disabled:text-gray-blue h-8"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default BaseTablePagination;
