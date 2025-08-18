import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Vertical {
  value: string;
  label: string;
}

export interface Organization {
  id: number;
  name: string;
  domain: string;
  enterprise_type: string;
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

export function useOrganizationList() {
  return useQuery<OrganizationListResponse>({
    queryKey: ["organization-list"],
    queryFn: async () => {
      const response = await apiGet<OrganizationListResponse>(
        "/enterprise/enterprises/",
        "default"
      );
      return response;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
