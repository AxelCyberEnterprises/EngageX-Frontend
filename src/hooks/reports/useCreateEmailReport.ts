import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatchFileFetch } from "@/lib/api";

type CreateEmailReportPayload = {
    recipients: string; // e.g. "example@example.com"
    pdf: File;
};

export function useCreateEmailReport(enterpriseId: string) {
    const queryClient = useQueryClient();

    return useMutation<void, Error, CreateEmailReportPayload>({
        mutationFn: async (payload: CreateEmailReportPayload) => {
            const formData = new FormData();

            // Add recipients
            formData.append("recipients", payload.recipients);

            // Add PDF file
            if (payload.pdf) {
                formData.append("pdf", payload.pdf);
            }

            await apiPatchFileFetch<void>(
                `/enterprise/enterprises/${enterpriseId}/progress-report/email/`,
                formData,
                "default",
            );
        },
        onSuccess: () => {
            // Invalidate any related queries if needed
            queryClient.invalidateQueries({ queryKey: ["enterprise", enterpriseId, "progress-report"] });
        },
    });
}
