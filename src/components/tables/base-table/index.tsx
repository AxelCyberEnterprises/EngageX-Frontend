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
import { useState } from "react";
import BaseTablePagination from "./BaseTablePagination";
import BaseTableToolbar from "./BaseTableToolbar";
import { cn } from "@/lib/utils";

interface BaseTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    showToolBar?: boolean;
    tableHeaderClassName?: string;
    tableHeaderItemClassName?: string;
    tableContainerClassName?: string;
    pageSize?: number;
    hidePagination?: boolean;
}

export function BaseTable<TData, TValue>({ 
    columns, 
    data, 
    showToolBar, 
    tableHeaderClassName, 
    tableHeaderItemClassName, 
    tableContainerClassName, 
    hidePagination,
    pageSize }: BaseTableProps<TData, TValue>) {
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

    console.log(table)

    return (
        <div className="flex flex-col gap-y-6">
            {showToolBar && <BaseTableToolbar table={table} />}

            <ScrollArea className={cn("rounded-t-md border border-bright-gray whitespace-nowrap", tableContainerClassName)}>
                <Table className="**:border-bright-gray">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className={cn("bg-bright-gray hover:bg-bright-gray", tableHeaderClassName)}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={cn("font-semibold px-4 py-2 align-baseline", tableHeaderItemClassName)}>
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
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
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>

            {hidePagination ? <></> : <BaseTablePagination table={table} />}
        </div>
    );
}
