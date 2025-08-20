import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch, apiDelete } from "@/lib/api";

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


export function usePatchTrainingGoal(enterpriseId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TrainingGoal> }) =>
      apiPatch<TrainingGoal>(
        `/enterprise/enterprises/${enterpriseId}/training-goals/${id}/`,
        data,
        "default"
      ),
    onSuccess: (updatedGoal) => {
      // Update cache
      queryClient.setQueryData<TrainingGoalsResponse>(["training-goals", enterpriseId], (old) => {
        if (!old) return old;
        return {
          ...old,
          results: old.results.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)),
        };
      });
    },
  });
}

// DELETE hook
export function useDeleteTrainingGoal(enterpriseId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      apiDelete(`/enterprise/enterprises/${enterpriseId}/training-goals/${id}/`, "default"),
    onSuccess: (_, id) => {
      queryClient.setQueryData<TrainingGoalsResponse>(["training-goals", enterpriseId], (old) => {
        if (!old) return old;
        return {
          ...old,
          results: old.results.filter((goal) => goal.id !== id),
        };
      });
    },
  });
}