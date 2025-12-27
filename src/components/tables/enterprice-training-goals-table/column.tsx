import { ColumnDef } from "@tanstack/react-table";
import BaseTableColumnHeader from "../base-table/BaseTableColumnHeader";
import ProgressCell from "./ProgressCell";
import { IEnterpriseTrainingGoals } from "./types";

export const columns: ColumnDef<IEnterpriseTrainingGoals, unknown>[] = [
    {
        accessorKey: "goal",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Goal" className="text-primary-base" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "organization",
        header: ({ column }) => (
            <BaseTableColumnHeader column={column} title="Organization" className="text-primary-base" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "progress",
        header: ({ column }) => (
            <BaseTableColumnHeader column={column} title="Progress" className="text-primary-base" />
        ),
        cell: ({ row }) => <ProgressCell row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
];
