import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import { EnterpriseUser } from "./useFetchEnterpriseUsers";

// export interface User {
//   id: number;
//   email: string;
//   first_name: string;
//   last_name: string;
//   password?: string;
//   user_intent?: string;
//   role?: string;
//   purpose?: string;
//   is_enterprise_user?: boolean;
//   user_type?: string;
// }

// export interface EnterpriseUser {
//   id: number;
//   user: User;
//   user_id: number;
//   enterprise: number;
//   enterprise_name: string;
//   user_type: "rookie" | "general";
//   is_admin: boolean;
//   created_at: string;
//   updated_at: string;
// }

export interface EnterpriseUserProgress extends EnterpriseUser {
  progress: string;
}

export interface EnterpriseUsersProgressResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: EnterpriseUserProgress[];
}

export function useFetchEnterpriseUsersProgress(page: number = 1, enterprise_id: number, enterprise_user_ids?: number[]) {
  const userIdsParam = enterprise_user_ids && enterprise_user_ids.length > 0 ? `&enterprise_user_ids=${enterprise_user_ids.join(',')}` : '';
  return useQuery<EnterpriseUsersProgressResponse>({
    queryKey: ["enterprise-users-progress", page, enterprise_id, enterprise_user_ids?.sort().join(',') || 'all'],
    queryFn: async () => {
      const response = await apiGet<EnterpriseUsersProgressResponse>(
        `/enterprise/enterprise-users/progress-data/?page=${page}&enterprise_id=${enterprise_id}${userIdsParam}`,
        "default"
      );
      return response;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}