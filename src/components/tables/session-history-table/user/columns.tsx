import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ChartLine, Download, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import BaseTableColumnHeader from "../../base-table/BaseTableColumnHeader";

export type IUserSessionHistory = {
    id: string;
    sessionName: string;
    sessionType: "Pitch Practice" | "Client Meeting" | "Team Sync" | "Workshop" | "Demo Day";
    date: string;
    duration: string;
};

export const columns: ColumnDef<IUserSessionHistory>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="p-0 bg-white border-[1.5px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="p-0 bg-white border-[1.5px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "sessionName",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Session Name" />,
    },
    {
        accessorKey: "sessionType",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Session Type" />,
    },
    {
        accessorKey: "date",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Date" />,
    },
    {
        accessorKey: "duration",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Duration" />,
    },
    {
        id: "actions",
        header: () => <span className="text-primary-base">Action</span>,
        enableHiding: false,
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="bg-transparent hover:bg-transparent text-primary-base size-fit p-0 has-[>svg]:px-0 focus-visible:border-none focus-visible:ring-0"
                        >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="size-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" alignOffset={-10} className="p-0">
                        <Link to="/dashboard/user/session-history/1">
                            <DropdownMenuItem className="px-4 py-2 cursor-pointer">
                                <ChartLine className="text-primary-base" />
                                <span className="text-primary-base text-sm">View Report</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link to="">
                            <DropdownMenuItem className="px-4 py-2 cursor-pointer">
                                <Download className="text-primary-base" />
                                <span className="text-primary-base text-sm">Download</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
