import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useGetSessionReport(id: number) {
    return useQuery({
        queryKey: ["sessionReport", id],
        queryFn: async () => {
            return await apiGet(`/sessions/sessions/${id}/report/`);
        },
    });
}
