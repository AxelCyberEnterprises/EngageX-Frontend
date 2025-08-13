import { type Table as TanstackTable, flexRender } from "@tanstack/react-table";
import type * as React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCommonPinningStyles } from "@/lib/data-table";
import { cn } from "@/lib/utils";
import DataTablePagination from "./data-table-pagination";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
    table: TanstackTable<TData>;
    actionBar?: React.ReactNode;
    showPagination?: boolean;
}

export function DataTable<TData>({
    table,
    actionBar,
    showPagination = true,
    children,
    className,
    ...props
}: DataTableProps<TData>) {
    return (
        <div className={cn("relative flex w-full flex-col gap-2.5 overflow-auto isolate", className)} {...props}>
            {children}

            <ScrollArea className="rounded-t-md border border-bright-gray whitespace-nowrap">
                <Table className="**:border-bright-gray">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-bright-gray hover:bg-bright-gray">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{
                                            ...getCommonPinningStyles({
                                                column: header.column,
                                            }),
                                        }}
                                        className="font-semibold px-4 py-2 align-baseline"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
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
                                        <TableCell
                                            key={cell.id}
                                            style={{
                                                ...getCommonPinningStyles({
                                                    column: cell.column,
                                                }),
                                            }}
                                            className="text-dark-charcoal p-4 align-baseline"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>

            <div className="flex flex-col gap-2.5 px-4 pb-8 mt-4">
                {showPagination && <DataTablePagination table={table} />}
                {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && actionBar}
            </div>
        </div>
    );
}
