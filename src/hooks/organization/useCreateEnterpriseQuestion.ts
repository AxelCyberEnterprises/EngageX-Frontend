import { apiPost } from "@/lib/api"; // Add this import
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EnterpriseQuestion } from "./useEnterpriseQuestions";

// Add interface for creating a question
export interface CreateEnterpriseQuestionData {
  enterprise: number;
  vertical: string;
  sport_type?: string | null;
  question_text: string;
  audio_url?: string | null;
  is_active?: boolean;
}

// Create question hook
export function useCreateEnterpriseQuestion(enterpriseId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEnterpriseQuestionData) =>
      apiPost<EnterpriseQuestion>(
        `/enterprise/enterprise-questions/`,
        data,
        "default"
      ),
    onSuccess: () => {
      // Invalidate all related queries to refetch data
      queryClient.invalidateQueries({
        queryKey: ["enterprise-questions", enterpriseId]
      });
      
      // Optionally, you can also optimistically update the cache
      // queryClient.setQueriesData<EnterpriseQuestionsResponse>(
      //   { queryKey: ["enterprise-questions", enterpriseId] },
      //   (old) => {
      //     if (!old) return old;
      //     return {
      //       ...old,
      //       count: old.count + 1,
      //       results: [newQuestion, ...old.results],
      //     };
      //   }
      // );
    },
  });
}