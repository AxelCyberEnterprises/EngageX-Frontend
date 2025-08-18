import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";

export interface TrainingGoal {
  id: number;
  enterprise: number;
  room: string;
  room_display: string;
  target_sessions: number;
  completed_sessions: number;
  progress_percent: string;
  is_completed: string;
  due_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrainingGoalsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TrainingGoal[];
}

export function useFetchTrainingGoals(enterpriseId: number, page: number = 1) {
  return useQuery<TrainingGoalsResponse>({
    queryKey: ["training-goals", enterpriseId, page],
    queryFn: async () => {
      const response = await apiGet<TrainingGoalsResponse>(
        `/enterprise/enterprises/${enterpriseId}/training-goals/?page=${page}`,
        "default"
      );
      return response;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
