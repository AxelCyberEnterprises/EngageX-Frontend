import DeleteModal from "@/components/modals/modalVariants/DeleteModal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDeleteTrainingGoal, usePatchTrainingGoal } from "@/hooks";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Power, PowerOff, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Goal } from "./data";

export const useGoalColumns = (enterpriseId: number, refetch?: () => void) => {
    const patchGoal = usePatchTrainingGoal(enterpriseId);
    const deleteGoal = useDeleteTrainingGoal(enterpriseId);

    const handleToggleActive = (goalId: string, isActive: boolean) => {
        patchGoal.mutate(
            { id: Number(goalId), data: { is_active: !isActive } },
            {
                onSuccess: () => {
                    refetch?.();
                },
            },
        );
    };

    const ActionCell = ({ goal }: { goal: Goal & { is_active?: boolean } }) => {
        const [showDeleteModal, setShowDeleteModal] = useState(false);

        const handleDelete = () => {
            deleteGoal.mutate(Number(goal.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    refetch?.();
                },
            });
        };

        return (
            <div className="flex gap-2 items-center">
                <Button
                    title={goal.is_active ? "Deactivate Goal" : "Activate Goal"}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleActive(goal.id, !!goal.is_active)}
                    className={cn(
                        "bg-transparent",
                        goal.is_active
                            ? "text-green-500 hover:text-green-600 hover:bg-green-50"
                            : "text-gray-500 hover:text-gray-600",
                    )}
                >
                    {goal.is_active ? (
                        <Power className="w-6 h-6" strokeWidth={1.5} />
                    ) : (
                        <PowerOff className="w-6 h-6" strokeWidth={1.5} />
                    )}
                </Button>
                <Button
                    title="Delete Goal"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDeleteModal(true)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent"
                >
                    <Trash2Icon className="w-6 h-6" strokeWidth={1.5} />
                </Button>

                <DeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    title="Delete Goal"
                    message="Are you sure you want to delete this training goal? This action cannot be undone."
                />
            </div>
        );
    };

    const columns: ColumnDef<Goal, any>[] = [
        {
            accessorKey: "roomType",
            header: "Room Type",
            cell: ({ row }) => <div className="text-gray-700">{row.getValue("roomType")}</div>,
        },
        {
            accessorKey: "goal",
            header: "Goal",
            cell: ({ row }) => <div className="text-gray-700 font-medium">{row.getValue("goal")}</div>,
        },
        {
            accessorKey: "completionRate",
            header: "Completion Rate",
            cell: ({ row }) => (
                <div className="text-gray-700 flex items-center gap-2">
                    <Progress
                        value={row.getValue("completionRate")}
                        className="h-2 flex-1 [&_[data-slot='progress-indicator']]:bg-medium-sea-green"
                    />
                    {row.getValue("completionRate")}%
                </div>
            ),
        },
        {
            accessorKey: "dueDate",
            header: "Due Date",
            cell: ({ row }) => <div className="text-gray-700">{row.getValue("dueDate")}</div>,
        },
        {
            accessorKey: "action",
            header: "Actions",
            cell: ({ row }) => {
                const goal: Goal & { is_active?: boolean } = row.original as any;
                return <ActionCell goal={goal} />;
            },
        },
    ];

    return columns;
};
