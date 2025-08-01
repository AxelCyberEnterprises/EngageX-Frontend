import { useMemo } from "react";
import { BaseTable } from "../../base-table";
import { columns, IEnterpriseTrainingGoals } from "../column";

// Dummy data for enterprise training goals
const dummyEnterpriseTrainingGoals: IEnterpriseTrainingGoals[] = [
    {
        id: 1,
        goal: "Media Training",
        organization: "NBA",
        progress: 7,
    },
    {
        id: 2,
        goal: "Coach/GM Training",
        organization: "NFL",
        progress: 4,
    },
    {
        id: 3,
        goal: "Public Speaking Training",
        organization: "MLB",
        progress: 9,
    },
];

const EnterpriseTrainingGoalsTable = () => {
    const enterpriseTrainingGoalsData = useMemo(() => dummyEnterpriseTrainingGoals, []);

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
