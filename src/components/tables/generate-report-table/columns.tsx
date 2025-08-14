import { ColumnDef } from "@tanstack/react-table";
import { GenerateReportMember } from "./data";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<GenerateReportMember, any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="bg-[#fff] translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="bg-[#fff] translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "firstName",
        header: () => (
            <div className="flex items-center text-[#667085] text-sm font-medium py-3">
                First Name
            </div>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="text-[#101828] font-medium text-sm py-4">
                    {member.firstName}
                </div>
            );
        },
    },
    {
        accessorKey: "lastName",
        header: () => (
            <div className="flex items-center text-[#667085] text-sm font-medium py-3">
                Last Name
            </div>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="text-[#101828] font-medium text-sm py-4">
                    {member.lastName}
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        header: () => (
            <div className="flex items-center text-[#667085] text-sm font-medium py-3">
                Role
            </div>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="text-[#101828] font-medium text-sm py-4">
                    {member.role}
                </div>
            );
        },
    },
    {
        accessorKey: "assignedGoals",
        header: () => (
            <div className="flex items-center text-[#667085] text-sm font-medium py-3">
                Assigned Goals
            </div>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="flex gap-2 py-4">
                    {member.assignedGoals.map((goal, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-[#F3F4F6] text-[#374151] text-xs font-medium rounded-full"
                        >
                            {goal}
                        </span>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: () => (
            <div className="flex items-center text-[#667085] text-sm font-medium py-3">
                Email
            </div>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="text-[#101828] font-medium text-sm py-4">
                    {member.email}
                </div>
            );
        },
    },
];