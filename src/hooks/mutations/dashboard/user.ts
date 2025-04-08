import { FormType } from "@/components/forms/PublicSpeakingForm";
import { apiPost } from "@/lib/api";
import { useAppDispatch } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCreatePublicSpeakingSession() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    return useMutation({
        mutationKey: ["createPublicSpeakingSession"],
        mutationFn: async (data: FormType) => {
            return await apiPost<{ id: number }>("/sessions/sessions/", data);
        },
        onSuccess: async (data) => {
            dispatch(closeDialog());
            navigate(`/sessions/public-speaking-session/${data.id}`);
        },
        onError: (error) => {
            console.error("Error creating public speaking session: ", error);
        },
    });
}
