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