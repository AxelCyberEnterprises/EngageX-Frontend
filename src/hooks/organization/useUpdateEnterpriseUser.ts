import { useMutation } from "@tanstack/react-query";
import { apiPatch } from "@/lib/api";

type UserPayload = {
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  password: string;
  user_intent?: string | null;
  role?: string | null;
  purpose?: string | null;
};

type UpdateEnterpriseUserPayload = {
  user?: UserPayload;
  user_id?: number;
  enterprise: number; // required
  user_type?: string;
  is_admin?: boolean;
  role?: string | null;
  team?: string | null;
};

export function useUpdateEnterpriseUser(id: string) {
  return useMutation<any, Error, UpdateEnterpriseUserPayload>({
    mutationFn: async (payload: UpdateEnterpriseUserPayload) => {
      const response = await apiPatch<any>(
        `/enterprise/enterprise-users/${id}`,
        payload,
        "default"
      );
      return response;
    },
  });
}
