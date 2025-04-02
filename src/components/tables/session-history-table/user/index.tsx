import { useMemo } from "react";
import { BaseTable } from "../../base-table";
import { columns as userSessionColumns, IUserSessionHistory } from "./columns";

import { useSessionHistory } from "@/hooks/auth";

export type DataInterface = {
    id: string;
    sessionName: string;
    sessionType: string;
    date: string;
    duration: string;
};

export function capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}


export function formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    
    // Get time components for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date >= today) {
        return "Today";
    } else if (date >= yesterday) {
        return "Yesterday";
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
}

export function formatTime(time: string): string {
    const [hours, minutes, seconds] = time.split(":").map(Number);

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else {
        return `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
}


const SessionHistoryTable = () => {



const { data, error, isLoading } = useSessionHistory() as { data: { results: IUserSessionHistory[] } | null; error: any; isLoading: boolean };
    const userSessionHistoryData = useMemo<DataInterface[]>(() =>
        data?.results?.map((item: any) => ({
            id: item.id,
            sessionName: capitalizeWords(item.session_name),
            sessionType: capitalizeWords(item.session_type),
            date: formatDate(item.date),
            duration: formatTime(item.duration),
        })) || [],
        [data]
    );
    console.log(userSessionHistoryData);
    return <BaseTable columns={userSessionColumns as any} data={userSessionHistoryData} error={error} isLoading={isLoading} />;
};

export default SessionHistoryTable;
