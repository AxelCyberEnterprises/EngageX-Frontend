import { FormType } from "@/components/forms/PublicSpeakingForm";
import { apiPost } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCreatePublicSpeakingSession() {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["create-public-speaking-session"],
        mutationFn: async (data: Partial<FormType>) => {
            return await apiPost<{ id: number }>("/sessions/sessions/", data);
        },
        onSuccess: async (data) => {
            console.log("Public speaking session created: ", data);

            navigate(`/sessions/public-speaking-session/${data.id}`);
        },
        onError: (error) => {
            console.error("Error creating public speaking session: ", error);
        },
    });
}
