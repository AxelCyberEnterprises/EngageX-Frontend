import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";

export interface OrganizationStats {
    total_members: number;
    credits_left: string;
    coaching_sessions_booked: number;
    goals_completion_percent: number;
}

export function useFetchOrganizationStats(orgId: number) {
    return useQuery<OrganizationStats>({
        queryKey: ["organization-stats", orgId],
        queryFn: async () => {
            const response = await apiGet<OrganizationStats>(
                `/enterprise/enterprises/${orgId}/overview-stats/`,
                "default",
            );
            return response;
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
        enabled: !!orgId,
    });
}
