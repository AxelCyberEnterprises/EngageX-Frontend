import { API_BASE_URL } from "@/lib/constants";
import { tokenManager } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Deletes a session's media (compiled video, clips and slides) from the server.
 * `keepalive` lets the request finish even while the page is closing.
 */
export const deleteSessionMedia = (sessionId: string) =>
    fetch(`${API_BASE_URL}/sessions/sessions/${sessionId}/delete-session-media/`, {
        method: "DELETE",
        keepalive: true,
        headers: { Authorization: `Token ${tokenManager.getToken()}` },
    }).catch((error) => console.error("Error deleting session media: ", error));

/**
 * Deletes the session video when the user leaves the report page (navigating away,
 * closing the tab or reloading), as long as `videoAvailable` is true at that moment.
 */
export const useDeleteVideoOnLeave = (sessionId: string | undefined, videoAvailable: boolean) => {
    const mounted = useRef(false);
    const available = useRef(videoAvailable);
    available.current = videoAvailable;

    useEffect(() => {
        if (!sessionId) return;
        mounted.current = true;

        const remove = () => {
            if (available.current) {
                available.current = false;
                deleteSessionMedia(sessionId);
            }
        };

        window.addEventListener("pagehide", remove);
        return () => {
            window.removeEventListener("pagehide", remove);
            mounted.current = false;
            // React StrictMode re-runs effects straight away in development: only delete
            // if the page was really left and not just re-mounted.
            setTimeout(() => {
                if (!mounted.current) remove();
            }, 0);
        };
    }, [sessionId]);
};
