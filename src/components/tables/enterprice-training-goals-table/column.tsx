import { Progress } from "@/components/ui/progress";
import { ColumnDef } from "@tanstack/react-table";
import BaseTableColumnHeader from "../base-table/BaseTableColumnHeader";

export interface IEnterpriseTrainingGoals {
    id: string | number;
    goal: string;
    organization: string;
    progress: number;
}

export const columns: ColumnDef<IEnterpriseTrainingGoals, unknown>[] = [
    {
        accessorKey: "goal",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Goal" className="text-primary-base" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "organization",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Organization" className="text-primary-base" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "progress",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Progress" className="text-primary-base" />,
        cell: ({ row }) => {
            const progress = row.getValue("progress") as number;

            return (
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Progress
                            value={progress * 10}
                            className="h-2 w-full [&_[data-slot='progress-indicator']]:bg-medium-sea-green"
                        />
                    </div>
                    <span className="text-sm font-medium text-gray-700 min-w-[3rem]">{progress}/10</span>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
];
