import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { apiPost } from "@/lib/api";
import { useAppDispatch } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IPOSTSessionPayload } from "./types";

export function useCreatePublicSpeakingSession() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ["createPublicSpeakingSession"],
    mutationFn: async (data: IPOSTSessionPayload) => {
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
            description:
              "An error occurred while creating session, please try again.",
          }}
        />
      );
    },
  });
}

export function useCreatePracticeSession({
  sessionType,
}: {
  sessionType: "presentation" | "pitch";
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ["createPitchPracticeSession"],
    mutationFn: async (data: IPOSTSessionPayload) => {
      return await apiPost<{ id: number }>(`/sessions/sessions/`, data);
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
            description:
              "An error occurred while creating session, please try again.",
          }}
        />
      );
    },
  });
}
