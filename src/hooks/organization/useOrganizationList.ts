import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Vertical {
  value: string;
  label: string;
}

export interface Organization {
  id: number;
  name: string;
  domain: string;
  enterprise_type: string;
  sport_type: string;
  logo: string | null;
  is_active: boolean;
  require_domain_match: boolean;
  one_on_one_coaching_link: string | null;
  accessible_verticals: Vertical[];
  available_verticals: Vertical[];
  created_at: string;
  updated_at: string;
}

export interface OrganizationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Organization[];
}

export function useOrganizationList(search?: string, shouldFetch: boolean = true) {
  return useQuery({
    queryKey: ["organization-list", {search}],
    queryFn: async () => {
      const url = search
        ? `/enterprise/enterprises/?search=${encodeURIComponent(search)}`
        : "/enterprise/enterprises/";
      const response = await apiGet<OrganizationListResponse>(url, "default");
      return response;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: shouldFetch, 
  });
}

// PATCH function
export async function patchOrganization(
  id: number,
  data: Partial<Organization>
) {
  const response = await apiPatch<Organization>(
    `/enterprise/enterprises/${id}/`,
    data,
    "default"
  );
  return response;
}

// PATCH hook
export function usePatchOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Organization> }) =>
      patchOrganization(id, data),
    onSuccess: (updatedOrg) => {
      queryClient.setQueryData<OrganizationListResponse>(
        ["organization-list"],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            results: oldData.results.map((org) =>
              org.id === updatedOrg.id ? updatedOrg : org
            ),
          };
        }
      );
    },
  });
}

export async function createOrganization(data: Partial<Organization>) {
  const response = await apiPost<Organization>(
    `/enterprise/enterprises/`,
    data,
    "default"
  );
  return response;
}

// POST hook
export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Organization>) => createOrganization(data),
    onSuccess: (newOrg) => {
      queryClient.setQueryData<OrganizationListResponse>(
        ["organization-list"],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            results: [newOrg, ...oldData.results],
            count: oldData.count + 1,
          };
        }
      );
    },
  });
}