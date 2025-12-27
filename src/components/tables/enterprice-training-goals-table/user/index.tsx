import { useEnterpriseUsers } from "@/hooks/settings";
import { useMemo } from "react";
import { BaseTable } from "../../base-table";
import { columns } from "../column";
import { IEnterpriseTrainingGoals } from "../types";

const EnterpriseTrainingGoalsTable = () => {
    const { data: enterpriseUsers } = useEnterpriseUsers();

    const enterpriseTrainingGoalsData = useMemo(() => {
        const goals = enterpriseUsers?.results?.[0]?.enterprise?.goals ?? [];
        const organization = enterpriseUsers?.results?.[0]?.enterprise?.name || "N/A";

        return goals.map((goal: any) => ({
            id: goal.id,
            goal: goal.room_display,
            organization: organization,
            progress: goal.completed_sessions / goal.target_sessions,
        })) as IEnterpriseTrainingGoals[];
    }, [enterpriseUsers]);

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
