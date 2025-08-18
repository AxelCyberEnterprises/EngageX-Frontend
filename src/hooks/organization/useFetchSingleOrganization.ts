import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
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
