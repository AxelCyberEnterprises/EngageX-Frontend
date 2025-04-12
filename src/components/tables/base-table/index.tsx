import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useState } from "react";
import BaseTablePagination from "./BaseTablePagination";
import BaseTableToolbar from "./BaseTableToolbar";
import { cn } from "@/lib/utils";
import emptyStateImage from "@/assets/images/svgs/empty-state.svg";
import { setSessionId } from "@/store/slices/sessionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    isLoading?: boolean;
    emptyState?: React.ReactNode;
}

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
    pageSize = 20, // Default page size
    emptyState,
}: BaseTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem('user') === 'true';

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
        manualPagination: false, // Ensure automatic pagination
    });

    const defaultEmptyState = (
        <TableRow>
            <TableCell
                colSpan={columns.length}
                className="justify-center items-center w-full mx-auto py-[10%] flex-col gap-4 text-center"
            >
                <img src={emptyStateImage} className="w-28 mx-auto" alt="empty state logo" />
                <p className="text-lg font-medium">No session recorded!</p>
                <p className="text-muted-foreground font-normal text-sm">You haven't started practicing yet</p>
            </TableCell>
        </TableRow>
    );

    const TableSkeleton = () => {
        const rows = pagination.pageSize;
        return (
            <>
                {Array.from({ length: rows }).map((_, i) => (
                    <TableRow key={`skeleton-row-${i}`}>
                        {columns.map((_, j) => (
                            <TableCell key={`skeleton-cell-${i}-${j}`}>
                                <Skeleton className="h-6 w-full" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </>
        );
    };

    return (
        <div className="flex flex-col gap-y-6">
            {showToolBar && <BaseTableToolbar table={table} />}

            <ScrollArea className={cn("rounded-t-md border border-bright-gray whitespace-nowrap", tableContainerClassName)}>
                <Table className="**:border-bright-gray">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className={cn("bg-bright-gray hover:bg-bright-gray", tableHeaderClassName)}
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={cn("font-semibold px-4 py-2 align-baseline", tableHeaderItemClassName)}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : (isLoading ? (
                                                <Skeleton className="h-6 w-24" />
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            ))}
                                    </TableHead>
                                ))}
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
                            <TableSkeleton />
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => {
                                        const rowData = row.original as { id?: string };
                                        if (rowData.id) {
                                            dispatch(setSessionId(rowData.id));
                                            navigate(`/dashboard/${user ? "user" : "admin"}/session-history/${rowData.id}`);
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

            {!hidePagination && (
                <div className="flex items-center justify-between px-2">
                    {isLoading ? (
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                    ) : (
                        <BaseTablePagination table={table} />
                    )}
                </div>
            )}
        </div>
    );
}