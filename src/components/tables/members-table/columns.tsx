import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

export interface IMembers {
    id: string;
    name: string;
    role: string;
    last_login: string;
    credit_used: number;
    assigned_goals: string[];
}

export const membersColumns: ColumnDef<IMembers>[] = [
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
        size: 50,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "role",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "last_login",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Last Login" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "credit_used",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Credit Used" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "assigned_goals",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned Goals" />,
        cell: ({ row }) => {
            const goals = row.getValue("assigned_goals") as string[];

            return (
                <div className="flex items-center gap-2">
                    {goals.map((goal, index) => (
                        <div
                            key={goal + index}
                            className="px-2 py-[3px] rounded-full border border-light-silver bg-[#F8F9FC]"
                        >
                            <span>{goal}</span>
                        </div>
                    ))}
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
];
