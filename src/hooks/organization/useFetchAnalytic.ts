import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function getDateRange(filter: string) {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    let startDate = formattedToday;
    const endDate = formattedToday;

    if (filter === "last_week") {
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        startDate = lastWeek.toISOString().split("T")[0];
    } else if (filter === "last_month") {
        const lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1);
        startDate = lastMonth.toISOString().split("T")[0];
    } else if (filter === "last_year") {
        const lastYear = new Date();
        lastYear.setFullYear(today.getFullYear() - 1);
        startDate = lastYear.toISOString().split("T")[0];
    }
    // else if filter is "today", default today is already correct

    return { startDate, endDate };
}

export function useFetchAnalytics(filter = "today") {
    const { startDate, endDate } = getDateRange(filter);
    console.log("startdate, enddate: ", startDate, endDate);
    return useQuery<any>({
        queryKey: ["organization-analytics"],
        queryFn: async () => {
            const response = await apiGet<any>(
                `/enterprise/dashboard-analytics/?start_date=${startDate}&end_date=${endDate}`,
                "default",
            );
            return response;
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}
