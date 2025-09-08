import { useMemo, useState } from "react";
import { BaseTable } from "../../base-table";
import { columns as userSessionColumns } from "./columns";

import { useSessionHistory } from "@/hooks/auth";
import { PaginationState } from "@tanstack/react-table";

export type DataInterface = {
    id: number;
    sessionName: string;
    sessionType: string;
    date: string;
    duration: string;
};

export function capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatDate(timestamp?: string): string {
    if (!timestamp) return "Unknown Date";

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";

    const now = new Date();
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

export function formatTime(time?: string): string {
    if (!time) return "0 seconds";

    const parts = time.split(":").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return "Invalid Duration";

    const [hours, minutes, seconds] = parts;
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else {
        return `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
}

const SessionHistoryTable = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const { data, error, isLoading } = useSessionHistory(pagination.pageIndex + 1);

    const userSessionHistoryData = useMemo(
        () =>
            data?.results?.map((item) => ({
                id: item.id || "N/A",
                sessionName: capitalizeWords(item.session_name || "Coaching"),
                sessionType: capitalizeWords(item.session_type_display || "Unknown Type"),
                date: formatDate(item.date),
                duration: formatTime(item.duration?.toString()),
            })) || [],
        [data?.results],
    );

    return (
        <BaseTable
            columns={userSessionColumns}
            data={userSessionHistoryData}
            count={data?.count}
            pagination={pagination}
            setPagination={setPagination}
            error={error}
            isLoading={isLoading}
        />
    );
};

export default SessionHistoryTable;
