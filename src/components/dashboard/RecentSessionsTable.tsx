import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronsUpDown, ChevronDown, MoreHorizontal, ListFilter, ChartLine, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const data: Session[] = [
    {
        id: "m5gr84i9",
        duration: 31,
        date: "Feb 11, 2025",
        sessionName: "Pitch Practice 44",
        sessionType: "Pitch Practice",
    },
    {
        id: "3u1reuv4",
        duration: 24,
        date: "Feb 12, 2025",
        sessionName: "Boardroom Speech",
        sessionType: "Keynote Practice",
    },
    {
        id: "derv1ws0",
        duration: 37,
        date: "Feb 16, 2025",
        sessionName: "Proposal Presentation Practice",
        sessionType: "Presentation Practice",
    },
    {
        id: "5kma53ae",
        duration: 4,
        date: "Feb 12, 2025",
        sessionName: "Practice Pitch Day 10",
        sessionType: "Pitch Practice",
    },
    {
        id: "bhqecj4p",
        duration: 21,
        date: "Feb 12, 2025",
        sessionName: "Practice Pitch Day 09",
        sessionType: "Pitch Practice",
    },
];

export type Session = {
    id: string;
    duration: number;
    date: string;
    sessionName: string;
    sessionType: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Session>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "sessionName",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Session Name
                    <ChevronsUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("sessionName")}</div>,
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
    },
    {
        accessorKey: "sessionType",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Session Type
                    <ChevronsUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("sessionType")}</div>,
    },
    {
        accessorKey: "duration",
        header: () => <div className="text-right">Duration</div>,
        cell: ({ row }) => {
            const duration = parseFloat(row.getValue("duration"));

            return <div className="text-right font-medium">{duration} Mins</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            {" "}
                            <ChartLine className="text-black" /> View Report
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {" "}
                            <Download className="text-black" /> Download
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="max-w-full whitespace-nowrap overflow-x-auto">
            <div className="flex items-center justify-between flex-wrap py-4">
                <p className="big mb-3">Recent Sessions</p>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                <ListFilter /> Filter
                            </Button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <small className="underline cursor-pointer">View All</small>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="dark__charcoal">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
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
            </div>
        </div>
    );
}
