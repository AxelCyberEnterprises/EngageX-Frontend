import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { useFetchTrainingGoals } from "@/hooks/organization/useFetchTrainingGoals";
import { Goal } from "./data";
import { TableCell, TableRow } from "@/components/ui/table";
import emptyStateImage from "@/assets/images/svgs/empty-state.svg";

interface GoalsTableProps {
  pageSize?: number;
  hidePagination?: boolean;
  orgId: number;
}

export const GoalsTable = ({
  pageSize = 5,
  hidePagination,
  orgId
}: GoalsTableProps) => {

  const { data, isLoading } = useFetchTrainingGoals(orgId);
  const goals: Goal[] = data?.results.map(goal => ({
    id: goal.id.toString(),
    roomType: goal.room_display || goal.room,
    goal: goal.target_sessions,
    completionRate: goal.completed_sessions,
    dueDate: goal.due_date ? new Date(goal.due_date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) : "No due date",
  })) ?? [];

  return (
    <BaseTable
      columns={columns}
      data={goals}
      pageSize={pageSize}
      tableHeaderClassName="bg-[#F7F9FC]"
      tableHeaderItemClassName="text-gray-600 font-medium text-sm "
      tableContainerClassName="border-[#D0D5DD]"
      tableCellClassName="align-middle"
      tableRowClassName="[&>*]:!border-[#D0D5DD]"
      hidePagination={hidePagination}
      isLoading={isLoading}
      session={false}
      emptyState={
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="justify-center items-center w-full mx-auto py-[10%] flex-col gap-4 text-center"
          >
            <img src={emptyStateImage} className="w-28 mx-auto" alt="empty state logo" />
            <p className="text-lg font-medium">No Active Goal Found</p>
            <p className="text-muted-foreground font-normal text-sm">Create a new goal to get started</p>
          </TableCell>
        </TableRow>
      }
    />
  );
};