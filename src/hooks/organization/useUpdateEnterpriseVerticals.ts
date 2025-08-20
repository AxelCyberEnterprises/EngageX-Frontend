import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "@/lib/api";

interface UpdateVerticalsPayload {
  accessible_verticals: string[];
}

export function useUpdateEnterpriseVerticals(enterpriseId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-enterprise-verticals", enterpriseId],
    mutationFn: async (data: UpdateVerticalsPayload) => {
      return await apiPut(`/enterprise/enterprises/${enterpriseId}/verticals/`, data);
    },
    onSuccess: (updatedEnterprise) => {
      queryClient.invalidateQueries({ queryKey: ["single-organization", enterpriseId] });
      console.log("Accessible verticals updated successfully:", updatedEnterprise);
    },
    onError: (error) => {
      console.error("Failed to update accessible verticals:", error);
      throw error;
    },
  });
}
