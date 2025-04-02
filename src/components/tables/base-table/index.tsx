import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {  useState } from "react";
import BaseTablePagination from "./BaseTablePagination";
import BaseTableToolbar from "./BaseTableToolbar";
import { cn } from "@/lib/utils";


interface BaseTableProps<TData, TValue> {
    id?: string;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    error?: any;
    showToolBar?: boolean;
    tableHeaderClassName?: string;
    tableHeaderItemClassName?: string;
    tableContainerClassName?: string;
    pageSize?: number;
    hidePagination?: boolean;
    isLoading?: boolean; // Add loading state prop
    emptyState?: React.ReactNode; // Custom empty state component
}
import emptyStateImage from "@/assets/images/svgs/empty-state.svg";
import { setSessionId } from "@/store/slices/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

export function BaseTable<TData, TValue>({
    columns,
    error,
    isLoading,
    data,
    showToolBar,
    tableHeaderClassName,
    tableHeaderItemClassName,
    tableContainerClassName,
    hidePagination,
    pageSize,
    emptyState, // Optional custom empty state
}: BaseTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize ? pageSize : 20,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,

        state: {
            columnFilters,
            columnVisibility,
            pagination,
            rowSelection,
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
    });

    // Default empty state component
    const defaultEmptyState = (
        <TableRow>
            <TableCell
                colSpan={columns.length}
                className=" justify-center items-center w-full mx-auto py-[10%] flex-col gap-4 text-center"
            >
                <img src={emptyStateImage} className="w-28 mx-auto" alt="empty state logo" />
                <p className="text-lg font-medium">No session recorded!</p>
                <p className="text-muted-foreground font-normal text-sm">You haven't started practicing yet</p>
            </TableCell>
        </TableRow>
    );

    const loadingState = (
        <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                    <span>Loading data...</span>
                </div>
            </TableCell>
        </TableRow>
    );
    const dispatch = useDispatch();
    const sessionId = useSelector((state: RootState) => state.session.sessionId);
    console.log(sessionId)

    return (
        <div className="flex flex-col gap-y-6">
            {showToolBar && <BaseTableToolbar table={table} />}

            <ScrollArea
                className={cn("rounded-t-md border border-bright-gray whitespace-nowrap", tableContainerClassName)}
            >
                <Table className="**:border-bright-gray">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className={cn("bg-bright-gray hover:bg-bright-gray", tableHeaderClassName)}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                "font-semibold px-4 py-2 align-baseline",
                                                tableHeaderItemClassName,
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {error ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                                    <p className="font-semibold">Error fetching data</p>
                                    <p className="text-sm">{error.message || "An unexpected error occurred."}</p>
                                </TableCell>
                            </TableRow>
                        ) : isLoading ? (
                            loadingState
                        ) : table.getRowModel().rows?.length   ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                key={row.id}
                                onClick={() => {
                                    const rowData = row.original as {id?: string};
                                    if (rowData.id) {
                                      dispatch(setSessionId(rowData.id));
                                    }
                                  }}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-bright-gray/50 data-[state=selected]:bg-bright-gray"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-dark-charcoal p-4 align-baseline">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            emptyState || defaultEmptyState
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>

            {hidePagination ? <></> : <BaseTablePagination table={table} />}
        </div>
    );
}
