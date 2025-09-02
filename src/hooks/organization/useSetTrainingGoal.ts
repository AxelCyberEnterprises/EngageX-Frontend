import { apiPost } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type TrainingGoalPayload = {
    room: string;
    target_sessions: number;
    completed_sessions?: string | null;
    due_date?: string | null;
    is_active?: boolean | null;
    enterprise: number;
};

export function useSetTrainingGoal({ id }: { id: string }) {
    return useMutation<any, Error, TrainingGoalPayload>({
        mutationFn: async (payload: TrainingGoalPayload) => {
            const response = await apiPost<any>(`/enterprise/enterprises/${id}/training-goals/`, payload, "default");
            console.log("response: ", response);
            console.log("payload: ", payload);
            return response;
        },
    });
}
