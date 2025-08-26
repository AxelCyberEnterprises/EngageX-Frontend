import { useMutation } from "@tanstack/react-query";
import { apiPatch } from "@/lib/api"; // assuming you already have apiPatch like apiGet
import { Organization } from "./useOrganizationList";

type UpdateEnterprisePayload = {
    name?: string;
    domain?: string;
    enterprise_type?: string;
    primary_color?: string; // e.g. "#FF5733"
    secondary_color?: string; // e.g. "#33C1FF"
    is_active?: boolean;
    require_domain_match?: boolean;
    one_on_one_coaching_link?: string | null;
    accessible_verticals?: string[];
};

export function useUpdateEnterprise(id: string) {
    return useMutation<Organization, Error, UpdateEnterprisePayload>({
        mutationFn: async (payload: UpdateEnterprisePayload) => {
            const response = await apiPatch<Organization>(`/enterprise/enterprises/${id}`, payload, "default");
            return response;
        },
    });
}
