/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { apiDelete, apiGet, apiPost } from "@/lib/api";
import { useAppDispatch } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { IPOSTSessionPayload, IPreviewSlideUploadResponse, ISession } from "@/types/sessions";
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

            return await apiPost<ISession>("/sessions/sessions/", data);
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

export function usePreviewUploadSlides() {
    return useMutation({
        mutationKey: ["previewUploadSlides"],
        mutationFn: async (slidesFormData: FormData) => {
            return await apiPost<IPreviewSlideUploadResponse>("/sessions/slide_preview_upload/", slidesFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
    });
}

export function useCreatePracticeSession({ sessionType }: { sessionType: "presentation" | "pitch" }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: ["createPracticeSession"],
        mutationFn: async (data: IPOSTSessionPayload) => {
            localStorage.removeItem("sessionData");
            localStorage.setItem("sessionData", JSON.stringify(data));

            return await apiPost<ISession>(`/sessions/sessions/`, data);
        },
        onSuccess: async (data) => {
            dispatch(closeDialog());
            navigate(`/sessions/${sessionType}-practice-session/${data.id}`);
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

export function useDeleteSessionVideo() {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["deleteSessionVideo"],
        mutationFn: async (sessionId: string) => {
            return await apiDelete(`/sessions/sessions/${sessionId}/delete-session-media/`);
        },
        onSuccess: () => {
            toast("Session video deleted successfully.");
            navigate(0);
        },
        onError: (error) => {
            console.error("Error deleting session video: ", error);
            toast(
                <ErrorToast
                    {...{
                        heading: "Error deleting session video",
                        description: "An error occurred while deleting session video, please try again.",
                    }}
                />,
            );
        },
    });
}

export function useEndSession(sessionId: string | undefined, duration: any, slidesDuration?: any[]) {
    const navigate = useNavigate();
    const convertDurationToSeconds = (duration: string): number => {
        const [minutes, seconds] = duration.split(":").map(Number);
        return minutes * 60 + seconds;
    };

    const durationInSeconds = convertDurationToSeconds(duration ? duration : (slidesDuration?.[0] ?? "0:00"));

    return useMutation({
        mutationKey: ["endSession"],
        mutationFn: async () => {
            await apiPost(`/sessions/sessions-report/${sessionId}/`, {
                duration: durationInSeconds,
                // ...(slidesDuration && slidesDuration.length > 1 && { slide_specific_timing: slidesDuration }),
            });
        },
        onSuccess: () => {
            console.log("Session ended and posted successfully.");
            navigate(`/dashboard/user/session-history/${sessionId}`);
        },
        onError: (error) => {
            console.error("End session failed:", error);
            toast(
                <ErrorToast
                    {...{
                        heading: "Error ending session",
                        description: "An error occurred while ending session, please try again.",
                    }}
                />,
            );
        },
    });
}

export function useGetSessionReport(sessionId: string | undefined) {
    return useQuery({
        queryKey: ["getSessionReport"],
        queryFn: async () => {
            return await apiGet<ISession>(`/sessions/sessions-report/${sessionId}/`);
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

export function useGetSequences() {
    return useQuery({
        queryKey: ["getSequenceData"],
        queryFn: async () => {
            return await apiGet(`/sessions/improve-existing-sequence`);
        },
    });
}
