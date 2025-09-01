import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch, apiDelete, apiPost } from "@/lib/api";

export interface EnterpriseQuestion {
    id: number;
    enterprise: number;
    enterprise_name: string;
    vertical: string;
    vertical_display: string;
    sport_type: string | null;
    sport_type_display: string;
    question_text: string;
    audio_url: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    order?: number;
}

export interface EnterpriseQuestionsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: EnterpriseQuestion[];
}

export interface CreateEnterpriseQuestionData {
    enterprise: number;
    vertical: string;
    sport_type?: string | null;
    question_text: string;
    audio_url?: string | null;
    is_active?: boolean;
}

export function useFetchEnterpriseQuestions(
    enterpriseId: number,
    page: number = 1,
    vertical: string = "coach",
    sportType: string | null = null,
) {
    return useQuery<EnterpriseQuestionsResponse>({
        queryKey: ["enterprise-questions", enterpriseId, page, vertical, sportType],
        queryFn: async () => {
            let url = `/enterprise/enterprise-questions/?page=${page}&vertical=${vertical}`;
            if (sportType) {
                url += `&sport_type=${encodeURIComponent(sportType)}`;
            }

            const response = await apiGet<EnterpriseQuestionsResponse>(url, "default");
            return response;
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}

export function usePatchEnterpriseQuestion(enterpriseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<EnterpriseQuestion> }) =>
            apiPatch<EnterpriseQuestion>(`/enterprise/enterprise-questions/${id}/`, data, "default"),
        onSuccess: (updatedQuestion) => {
            queryClient.setQueryData<EnterpriseQuestionsResponse>(["enterprise-questions", enterpriseId], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    results: old.results.map((question) =>
                        question.id === updatedQuestion.id ? updatedQuestion : question,
                    ),
                };
            });
        },
    });
}

export function useDeleteEnterpriseQuestion(enterpriseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => apiDelete(`/enterprise/enterprise-questions/${id}/`, "default"),
        onSuccess: (_, id) => {
            queryClient.setQueryData<EnterpriseQuestionsResponse>(["enterprise-questions", enterpriseId], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    results: old.results.filter((question) => question.id !== id),
                };
            });
        },
    });
}

export function useCreateEnterpriseQuestion(enterpriseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateEnterpriseQuestionData) =>
            apiPost<EnterpriseQuestion>(`/enterprise/enterprise-questions/`, data, "default"),
        onSuccess: () => {
            // Invalidate all related queries to refetch data
            queryClient.invalidateQueries({
                queryKey: ["enterprise-questions", enterpriseId],
            });
        },
    });
}
