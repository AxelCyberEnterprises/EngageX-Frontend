import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";

type EnterpriseUserPayload = {
    email: string;
    first_name?: string | null;
    last_name?: string | null;
    enterprise?: number | null;
    role?: string | null;
    team?: string | null;
    user_type?: string | null;
};

export function useCreateEnterpriseUser() {
    return useMutation<any, Error, EnterpriseUserPayload>({
        mutationFn: async (payload: EnterpriseUserPayload) => {
            const response = await apiPost<any>(`/enterprise/enterprise-users/`, payload, "default");
            return response;
        },
    });
}
