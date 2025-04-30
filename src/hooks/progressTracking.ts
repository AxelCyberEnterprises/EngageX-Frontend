import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useProgressTracking() {
  return useQuery<any>({
    queryKey: ["performance-analytics"],
    queryFn: async () => {
      const response = await apiGet<any>(`/sessions/performance-analytics/`);
      return response;
    },
  });
}

export function useGetSequence() {
  return useQuery<any>({
    queryKey: ["get-sequence"],
    queryFn: async () => {
      const response = await apiGet<any>(`/sessions/sequences/`);
      return response;
    },
  });
}

export function useCompareSequences(id: any) {
  return useQuery<any>({
    queryKey: ["get-sequence"],
    queryFn: async () => {
      const response = await apiGet<any>(`/sessions/compare-sequences/${id}`);
      return response;
    },
  });
}