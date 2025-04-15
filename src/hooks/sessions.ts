/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiPost } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useEndSession(sessionId: string | undefined, duration: any) {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["endSession"],
        mutationFn: async () => {
            await apiPost(`/sessions/sessions-report/${sessionId}/`, { duration: duration });
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
