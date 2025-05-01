import { FormType as PitchPracticeFormType } from "@/components/forms/PitchPracticeForm";
import { FormType as PresentationPracticeFormType } from "@/components/forms/PresentationPracticeForm";
import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { useSessionHistory } from "@/hooks/auth";
import { apiPost, apiPut } from "@/lib/api";
import { useAppDispatch } from "@/store";
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

    const slidesFormData = new FormData();
    const { session_type: sessionType, slides } = getValues();

    if (slides) slides.forEach((file) => slidesFormData.append("slides_file", file));

    const { data, isPending: isGetSessionsPending } = useSessionHistory();

    const { mutate: uploadSlides, isPending: isUploadSlidesPending } = useMutation({
        mutationKey: ["uploadSlides"],
        mutationFn: async (sessionId: number) => {
            await apiPut(`/sessions/practice-sessions/${sessionId}/upload-slides/`, slidesFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return sessionId;
        },
        onSettled(sessionId) {
            dispatch(closeDialog());
            navigate(`/sessions/${sessionType}-practice-session/${sessionId}`);
        },
        onError: (error) => {
            console.error("Error uploading slides: ", error);
            toast(
                <ErrorToast
                    {...{
                        heading: "Error uploading slides",
                        description: "An error occurred while uploading slides, please try again.",
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

            return await apiPost<ISession>(`/sessions/sessions/`, data);
        },
        onSuccess: async (data) => {
            if (slidesFormData.get("slides_file")) uploadSlides(data.id);
            else {
                dispatch(closeDialog());
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
                goals: values.goals.map(({ goal }) => goal),
                // slide: values.slides?.pop()?.preview,
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
            setValue("virtual_environment", "board_room_1");
        }

        handleSubmit(handleSessionSetupSubmit)();
    }, [data, handleSessionSetupSubmit, handleSubmit, initiationType, sessionType, setValue]);

    return (
        <StartSession>
            <Button
                disabled={isPending || isUploadSlidesPending}
                variant="outline"
                className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal w-full h-11"
                onClick={() => dispatch(closeDialog())}
            >
                Cancel
            </Button>
            <Button
                disabled={isPending || isGetSessionsPending || isUploadSlidesPending}
                isLoading={isPending || isUploadSlidesPending}
                className="bg-gunmetal hover:bg-gunmetal/90 font-normal w-full h-11"
                onClick={handleProceed}
            >
                Proceed
            </Button>
        </StartSession>
    );
};

export default StartPracticeSetupSession;
