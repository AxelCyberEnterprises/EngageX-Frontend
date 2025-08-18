import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";

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
  enterprise: number;
  enterprise_name: string;
  user_type: "rookie" | "general";
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

export function useFetchEnterpriseUsers(page: number = 1, id: number) {
  return useQuery<EnterpriseUsersResponse>({
    queryKey: ["enterprise-users", page, id],
    queryFn: async () => {
      const response = await apiGet<EnterpriseUsersResponse>(
        `/enterprise/enterprise-users/?page=${page}&enterprise_id=${id}`,
        "default"
      );
      return response;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
