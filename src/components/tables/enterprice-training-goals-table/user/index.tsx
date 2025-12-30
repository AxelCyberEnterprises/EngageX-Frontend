import { useMemo } from "react";
import { BaseTable } from "../../base-table";
import { columns } from "../column";
import { IEnterpriseTrainingGoals } from "../types";

interface TrainingGoal {
    room: string;
    user_progress_percent: number;
    target_sessions: number;
    user_completed_sessions: number;
}

interface EnterpriseData {
    name?: string;
    training_goals?: TrainingGoal[];
}

interface EnterpriseTrainingGoalsTableProps {
    data?: EnterpriseData;
}

const EnterpriseTrainingGoalsTable = ({ data }: EnterpriseTrainingGoalsTableProps) => {
    const enterpriseTrainingGoalsData = useMemo(() => {
        if (!data) return [];

        const goals = data.training_goals || [];
        const organization = data.name || "N/A";

        return goals.map((goal) => ({
            goal: goal.room,
            organization: organization,
            progress: goal.user_progress_percent,
            target_sessions: goal.target_sessions,
            completed_sessions: goal.user_completed_sessions,
        })) as IEnterpriseTrainingGoals[];
    }, [data]);

    return (
        <BaseTable
            columns={columns}
            data={enterpriseTrainingGoalsData}
            count={enterpriseTrainingGoalsData.length}
            hidePagination={true}
        />
    );
};

export default EnterpriseTrainingGoalsTable;
