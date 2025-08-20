import { ColumnDef } from "@tanstack/react-table";
import { Goal } from "./data";
import { EditIcon, Trash2Icon } from "lucide-react";
import { usePatchTrainingGoal, useDeleteTrainingGoal } from "@/hooks";
import { useState } from "react";
import DeleteModal from "@/components/modals/modalVariants/DeleteModal";

export const useGoalColumns = (
  enterpriseId: number,
  refetch?: () => void
) => {
  const patchGoal = usePatchTrainingGoal(enterpriseId);
  const deleteGoal = useDeleteTrainingGoal(enterpriseId);

  const handleToggleActive = (goalId: string, isActive: boolean) => {
    patchGoal.mutate(
      { id: Number(goalId), data: { is_active: !isActive } },
      {
        onSuccess: () => {
          refetch?.();
        },
      }
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
      <div className="flex gap-2 justify-center">
        <EditIcon
          className={`cursor-pointer w-6 ${goal.is_active ? "text-green-500" : "text-gray-500"}`}
          strokeWidth={1.5}
          onClick={() => handleToggleActive(goal.id, !!goal.is_active)}
        />
        <Trash2Icon
          className="cursor-pointer text-red-500 w-6"
          strokeWidth={1.5}
          onClick={() => setShowDeleteModal(true)}
        />

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
      cell: ({ row }) => <div className="text-gray-700">{row.getValue("completionRate")}%</div>,
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
