import { Checkbox } from "@/components/ui/checkbox";
/* eslint-disable react-hooks/rules-of-hooks */
import { useClickOutside } from "@/hooks/useClickoutside";
import type { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

export interface IMembers {
    id: string;
    userId: number;
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
    {
        accessorKey: "action",
        header: () => (
            <div className="flex items-center justify-center gap-[8px] text-[#252A39] py-4 cursor-pointer">Actions</div>
        ),
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);
            const popupRef = useRef<HTMLDivElement | null>(null);
            const buttonRef = useRef<HTMLButtonElement | null>(null);
            const navigate = useNavigate();
            useClickOutside(popupRef, buttonRef, () => {
                setIsOpen(false);
            });
            const memberId = row.original.userId;
            const handleMenuClick = (action: string) => {
                if (action === "View Progress") {
                    navigate(`/dashboard/admin/progress-tracking?memberId=${memberId}`);
                }
            };

            return (
                <div className="flex justify-center relative">
                    <button
                        type="button"
                        title="Actions"
                        ref={buttonRef}
                        className="rounded-lg transition-colors bg-transparent rotate-90"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z"
                                fill="#6B7280"
                            />
                            <path
                                d="M10 5C11.1046 5 12 4.10457 12 3C12 1.89543 11.1046 1 10 1C8.89543 1 8 1.89543 8 3C8 4.10457 8.89543 5 10 5Z"
                                fill="#6B7280"
                            />
                            <path
                                d="M10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"
                                fill="#6B7280"
                            />
                        </svg>
                    </button>
                    {isOpen && (
                        <div
                            ref={popupRef}
                            className="absolute top-full right-0 w-40 bg-white z-[999] shadow-lg rounded-lg"
                        >
                            <ul className="py-1">
                                <li
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleMenuClick("View Progress")}
                                >
                                    View Progress
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            );
        },
    },
];
