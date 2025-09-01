import { useMutation } from "@tanstack/react-query";
import { apiPostFileFetch } from "@/lib/api";

interface EmailReportParams {
    orgId: number;
    recipients: string;
    pdf_file: File;
}

export function useEmailReport() {
    return useMutation({
        mutationFn: async ({ orgId, recipients, pdf_file }: EmailReportParams) => {
            const formData = new FormData();
            formData.append("recipients", recipients);
            formData.append("pdf_file", pdf_file);

            const url = `/enterprise/enterprises/${orgId}/progress-report/email`;
            await apiPostFileFetch(url, formData, "default");
        },
        onSuccess: () => {
            alert("Email sent successfully!");
        },
        onError: (error) => {
            console.error("Error sending email report:", error);
            alert("Failed to send email report.");
        },
    });
}
