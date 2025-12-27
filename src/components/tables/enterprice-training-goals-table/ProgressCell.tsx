import { Progress } from "@/components/ui/progress";
import { useEnterpriseUsers } from "@/hooks/settings";
import { Row } from "@tanstack/react-table";
import { useLocation } from "react-router-dom";
import { IEnterpriseTrainingGoals } from "./types";

interface ProgressCellProps {
    row: Row<IEnterpriseTrainingGoals>;
}

const ProgressCell = ({ row }: ProgressCellProps) => {
    const pathname = useLocation().pathname; // Get current route
    const { data: userEnterprise } = useEnterpriseUsers();

    interface Goal {
        id: string | number;
        target_sessions: number;
    }

    // Explicitly type goals as Goal[] to avoid `never`
    const goals = userEnterprise?.results?.[0]?.enterprise?.goals as Goal[] | undefined;
    const goal = goals?.find((g) => g.id === row.original.id);
    const targetSessions = goal?.target_sessions ?? 10;

    const progress = row.getValue("progress") as number;
    const isProgressTracking = pathname === "/dashboard/user/progress-tracking";

    const value = isProgressTracking ? (progress / targetSessions) * 100 : progress * 10;

    return (
        <div className="flex items-center gap-3">
            <div className="flex-1">
                <Progress
                    value={value}
                    className="h-2 w-full [&_[data-slot='progress-indicator']]:bg-medium-sea-green"
                />
            </div>
            <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
                {isProgressTracking ? `${progress}/${targetSessions}` : `${progress}/10`}
            </span>
        </div>
    );
};

export default ProgressCell;
