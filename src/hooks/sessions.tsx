/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { apiGet, apiPost } from "@/lib/api";
import { useAppDispatch } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { IPOSTSessionPayload, ISession } from "@/types/sessions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useCreatePublicSpeakingSession() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: ["createPublicSpeakingSession"],
        mutationFn: async (data: IPOSTSessionPayload) => {
            localStorage.removeItem("sessionData");
            localStorage.setItem("sessionData", JSON.stringify(data));
            return await apiPost<{ id: number }>("/sessions/sessions/", data);
        },
        onSuccess: async (data) => {
            dispatch(closeDialog());
            navigate(`/sessions/public-speaking-session/${data.id}`);
        },
        onError: (error) => {
            console.error("Error creating public speaking session: ", error);

            dispatch(closeDialog());
            toast(
                <ErrorToast
                    {...{
                        heading: "Error creating session",
                        description: "An error occurred while creating session, please try again.",
                    }}
                />,
            );
        },
    });
}

export function useCreatePracticeSession({ sessionType }: { sessionType: "presentation" | "pitch" }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: ["createPitchPracticeSession"],
        mutationFn: async (data: IPOSTSessionPayload) => {
            // Store the payload in local storage for debugging purposes
            localStorage.setItem("sessionPayload", JSON.stringify(data));

            localStorage.removeItem("sessionData");
            localStorage.setItem("sessionData", JSON.stringify(data));
            return await apiPost<ISession>(`/sessions/sessions/`, data);
        },
        onSuccess: async (data) => {
            dispatch(closeDialog());
            navigate(
                `/sessions/${sessionType}-practice-session/${data.id}?virtual_environment=${data.virtual_environment}`,
            );
        },
        onError: (error) => {
            console.error("Error creating pitch practice session: ", error);

            dispatch(closeDialog());
            toast(
                <ErrorToast
                    {...{
                        heading: "Error creating session",
                        description: "An error occurred while creating session, please try again.",
                    }}
                />,
            );
        },
    });
}

export function useEndSession(sessionId: string | undefined, duration: any, slidesDuration?: any) {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["endSession"],
        mutationFn: async () => {
            await apiPost(`/sessions/sessions-report/${sessionId}/`, {
                duration: duration,
                slide_specific_timing: slidesDuration,
            });
        },
        onSuccess: () => {
            console.log("Session ended and posted successfully.");
            navigate(`/dashboard/user/session-history/${sessionId}`);
        },
        onError: (error) => {
            console.error("End session failed:", error);
            navigate(`/dashboard/user/session-history/${sessionId}`);
        },
    });
}

export function useGetSessionReport(sessionId: string | undefined) {
    return useQuery({
        queryKey: ["getSessionReport"],
        queryFn: async () => {
            return await apiGet(`/sessions/sessions/${sessionId}/report/`);
        },
    });
}

export function useGetSessionData(sessionId: string | undefined) {
    return useQuery({
        queryKey: ["getSessionData"],
        queryFn: async () => {
            return await apiGet(`/sessions/sessions/${sessionId}/`);
        },
        enabled: !!sessionId,
    });
}
