import { apiGet } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    password?: string;
    user_intent?: string;
    role?: string;
    purpose?: string;
    is_enterprise_user?: boolean;
    user_type?: string;
}

export interface EnterpriseUser {
    id: number;
    user: User;
    user_id: number;
    enterprise: Record<string, any>;
    enterprise_name: string;
    user_type: "rookie" | "general";
    progress: Record<string, any>;
    credits_used: number;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}

export interface EnterpriseUsersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: EnterpriseUser[];
}

export function useFetchEnterpriseUsers(page?: number, id?: number) {
    return useQuery<EnterpriseUsersResponse>({
        queryKey: ["enterprise-users", page ?? null, id ?? null],
        queryFn: async () => {
            let url = `/enterprise/enterprise-users/`;

            const params: string[] = [];
            if (page !== undefined && page !== null) {
                params.push(`page=${page}`);
            }
            if (id !== undefined && id !== null) {
                params.push(`enterprise_id=${id}`);
            }

            if (params.length > 0) {
                url += `?${params.join("&")}`;
            }

            return apiGet<EnterpriseUsersResponse>(url, "default");
        },
        enabled: true, // always enabled
        staleTime: 1000 * 60 * 5,
        retry: 1,
        placeholderData: keepPreviousData,
    });
}
