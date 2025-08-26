import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatchFileFetch } from "@/lib/api";
import { Organization } from "./useOrganizationList";

type UpdateBrandingPayload = {
    primary_color?: string; // e.g. "#FF5733"
    secondary_color?: string; // e.g. "#33C1FF"
    logo?: File;
    favicon?: File;
};

export function useUpdateBranding(id: string) {
    const queryClient = useQueryClient();

    return useMutation<Organization, Error, UpdateBrandingPayload>({
        mutationFn: async (payload: UpdateBrandingPayload) => {
            const formData = new FormData();

            // Add colors if provided
            if (payload.primary_color) {
                formData.append("primary_color", payload.primary_color);
            }
            if (payload.secondary_color) {
                formData.append("secondary_color", payload.secondary_color);
            }

            // Add files if provided
            if (payload.logo) {
                formData.append("logo", payload.logo);
            }
            if (payload.favicon) {
                formData.append("favicon", payload.favicon);
            }

            const response = await apiPatchFileFetch<Organization>(
                `enterprise/enterprises/${id}/`,
                formData,
                "default",
            );
            return response;
        },
        onSuccess: () => {
            // Invalidate organization queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["organization-list"] });
            queryClient.invalidateQueries({ queryKey: ["organization", id] });
        },
    });
}
