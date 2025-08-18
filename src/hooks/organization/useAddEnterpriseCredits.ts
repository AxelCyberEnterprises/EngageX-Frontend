import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";

export interface AddCreditsPayload {
  amount: number;
  reason: string;
}

export function useAddEnterpriseCredits(orgId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-enterprise-credits", orgId],
    mutationFn: async (data: AddCreditsPayload) => {
      return await apiPost(`/enterprise/enterprises/${orgId}/credits/add/`, data, "default");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-stats", orgId] });
      queryClient.invalidateQueries({ queryKey: ["organization", orgId] });
      console.log("Credits added successfully.");
    },
    onError: (error) => {
      console.error("Adding credits failed:", error);
      throw error;
    },
  });
}
