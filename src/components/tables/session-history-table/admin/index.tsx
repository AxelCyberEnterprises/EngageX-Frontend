import { useMemo } from "react";
import { BaseTable } from "../../base-table";
import { columns, IAdminSessionHistory } from "./columns";
import data from "./data.json";

const SessionHistoryTable = () => {
    const adminSessionHistoryData = useMemo<IAdminSessionHistory[]>(() => JSON.parse(JSON.stringify(data)), []);

    return <BaseTable columns={columns as any} data={adminSessionHistoryData} error={error} isLoading={isLoading} />;
};

export default SessionHistoryTable;
