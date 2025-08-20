import { useQuery } from "@tanstack/react-query";
import { apiPatch, apiGet } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Organization } from "./useOrganizationList";

export function useFetchSingleOrganization(id: number) {
  return useQuery<Organization>({
    queryKey: ["organization", id],
    queryFn: async () => {
      const response = await apiGet<Organization>(
        `/enterprise/enterprises/${id}/`,
        "default"
      );
      return response;
    },
    enabled: !!id, 
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

type PatchOrganizationPayload = Partial<Organization>;

export function usePatchSingleOrganization(id: number) {
  const queryClient = useQueryClient();

  return useMutation<Organization, Error, PatchOrganizationPayload>({
    mutationFn: async (payload: PatchOrganizationPayload) => {
      const response = await apiPatch<Organization>(
        `/enterprise/enterprises/${id}/`,
        payload
      );
      return response;
    },
    onSuccess: (updatedOrg) => {
      // ✅ keep cache in sync
      queryClient.setQueryData(["organization", id], updatedOrg);

      // Optionally refetch organization list if it’s used in other places
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}