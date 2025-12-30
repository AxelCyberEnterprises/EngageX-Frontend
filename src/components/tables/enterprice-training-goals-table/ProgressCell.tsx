import { Progress } from "@/components/ui/progress";
import { Row } from "@tanstack/react-table";
import { IEnterpriseTrainingGoals } from "./types";

interface ProgressCellProps {
    row: Row<IEnterpriseTrainingGoals>;
}

const ProgressCell = ({ row }: ProgressCellProps) => {
    const { target_sessions, completed_sessions } = row.original;
    const progress = row.getValue("progress") as number;

    // Defaulting target to 10 if missing to handle potential legacy/edge cases gracefully.
    const safeTarget = target_sessions ?? 10;
    const safeCompleted = completed_sessions ?? 0;

    return (
        <div className="flex items-center gap-3">
            <div className="flex-1">
                <Progress
                    value={progress}
                    className="h-2 w-full [&_[data-slot='progress-indicator']]:bg-medium-sea-green"
                />
            </div>
            <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
                {safeCompleted}/{safeTarget}
            </span>
        </div>
    );
};

export default ProgressCell;
