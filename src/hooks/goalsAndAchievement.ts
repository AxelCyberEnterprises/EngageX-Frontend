import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useGoalsAndAchievement() {
  return useQuery<any>({
    queryKey: ["goals-achievement"],
    queryFn: async () => {
      const response = await apiGet<any>(`/sessions/goals-and-achievement`);
      return response;
    },
  });
}