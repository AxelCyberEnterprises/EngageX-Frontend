import { FormType as PitchPracticeFormType } from "@/components/forms/PitchPracticeForm";
import { FormType as PresentationPracticeFormType } from "@/components/forms/PresentationPracticeForm";
import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { useSessionHistory } from "@/hooks/auth";
import { apiPost, apiPut } from "@/lib/api";
import { useAppDispatch } from "@/store";
import { setSlidePreviews as setPitchSlidePreviews } from "@/store/slices/dashboard/user/pitchPracticeSlice";
import { setSlidePreviews as setPresentationSlidePreviews } from "@/store/slices/dashboard/user/presentationPracticeSlice";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { IPOSTSessionPayload, ISession } from "@/types/sessions";
import { capitalize } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { HTMLAttributes, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import StartSession from ".";

export type FormType = PitchPracticeFormType | PresentationPracticeFormType;
interface IStartPracticeSetupSessionProps extends HTMLAttributes<HTMLDivElement> {
    initiationType: "skip" | "start";
    getValues: UseFormReturn<FormType>["getValues"];
    setValue?: UseFormReturn<FormType>["setValue"];
    handleSubmit: UseFormReturn<FormType>["handleSubmit"];
}

const StartPracticeSetupSession = ({
    initiationType,
    getValues,
    setValue,
    handleSubmit,
}: IStartPracticeSetupSessionProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { session_type: sessionType, slides } = getValues();

    const { data, isPending: isGetSessionsPending } = useSessionHistory();

    const { mutate: generateSummary, isPending: isSummaryGenerationPending } = useMutation({
        mutationKey: ["generateSummary"],
        mutationFn: async (sessionId: number) => {
            await apiPut(`/sessions/practice-sessions/${sessionId}/upload-slides/`, "default");

            return sessionId;
        },
        onSuccess(sessionId) {
            dispatch(closeDialog());

            if (sessionType === "presentation") dispatch(setPresentationSlidePreviews([]));
            else dispatch(setPitchSlidePreviews([]));

            navigate(`/sessions/${sessionType}-practice-session/${sessionId}`);
        },
        onError: (error) => {
            console.error("Error uploading slides: ", error);
            toast(
                <ErrorToast
                    {...{
                        heading: "Error generating summary",
                        description: "An error occurred while generating slide summary, please try again.",
                    }}
                />,
            );
        },
    });

    const { mutate: createPracticeSession, isPending } = useMutation({
        mutationKey: ["createPitchPracticeSession"],
        mutationFn: async (data: IPOSTSessionPayload) => {
            localStorage.removeItem("sessionData");
            localStorage.setItem("sessionData", JSON.stringify(data));

            return await apiPost<ISession>(`/sessions/sessions/`, data, "default");
        },
        onSuccess: async (data) => {
            if (slides && slides?.length > 0) generateSummary(data.id);
            else {
                dispatch(closeDialog());

                if (sessionType === "presentation") dispatch(setPresentationSlidePreviews([]));
                else dispatch(setPitchSlidePreviews([]));

                navigate(`/sessions/${sessionType}-practice-session/${data.id}`);
            }
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

    const handleSessionSetupSubmit = useCallback(
        (values: FormType) => {
            const payload = {
                ...values,
                goals: values.goals.map(({ goal }) => goal).filter(Boolean),
            };
            delete payload.slides;

            createPracticeSession(payload);
        },
        [createPracticeSession],
    );

    const handleProceed = useCallback(() => {
        if (setValue && initiationType === "skip") {
            const { count } = data!;

            setValue("session_name", `${capitalize(sessionType)} Practice Session ${count + 1}`);
            if (sessionType === "presentation") setValue("virtual_environment", "board_room_1");
        }

        handleSubmit(handleSessionSetupSubmit, () => dispatch(closeDialog()))();
    }, [data, dispatch, handleSessionSetupSubmit, handleSubmit, initiationType, sessionType, setValue]);

    return (
        <StartSession>
            <Button
                disabled={isPending || isSummaryGenerationPending}
                variant="outline"
                className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal w-full h-11"
                onClick={() => dispatch(closeDialog())}
            >
                Cancel
            </Button>
            <Button
                disabled={isPending || isGetSessionsPending || isSummaryGenerationPending}
                isLoading={isPending || isSummaryGenerationPending}
                className="bg-primary hover:bg-primary/90 font-normal w-full h-11"
                onClick={handleProceed}
            >
                Proceed
            </Button>
        </StartSession>
    );
};

export default StartPracticeSetupSession;
