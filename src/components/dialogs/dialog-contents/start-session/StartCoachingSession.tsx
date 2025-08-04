import { FormType } from "@/components/forms/CoachingForm";
import { Button } from "@/components/ui/button";
import { useSessionHistory } from "@/hooks/auth";
import { useCreateCoachingSession } from "@/hooks/sessions";
import { useAppDispatch } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { HTMLAttributes, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import StartSession from ".";

interface IStartCoachingSessionProps extends HTMLAttributes<HTMLDivElement> {
    initiationType: "skip" | "start";
    setValue?: UseFormReturn<FormType>["setValue"];
    handleSubmit: UseFormReturn<FormType>["handleSubmit"];
}

const StartCoachingSession = ({ initiationType, setValue, handleSubmit }: IStartCoachingSessionProps) => {
    const { mutate: createCoachingSession, isPending } = useCreateCoachingSession();
    const { data, isPending: isGetSessionsPending } = useSessionHistory();
    const dispatch = useAppDispatch();

    const videoSrc =
        "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/intro-videos/Coaching+Session+Intro.MP4";

    const handleSessionSetupSubmit = useCallback(
        (values: FormType) => {
            const payload = { ...values, goals: values.goals.map(({ goal }) => goal).filter(Boolean) };

            createCoachingSession(payload);
        },
        [createCoachingSession],
    );

    const handleProceed = useCallback(() => {
        if (setValue && initiationType === "skip") {
            const { count } = data!;

            setValue("session_name", `Coaching Session ${count + 1}`);
            setValue("virtual_environment", "conference_room");
        }

        handleSubmit(handleSessionSetupSubmit, () => dispatch(closeDialog()))();
    }, [data, dispatch, handleSessionSetupSubmit, handleSubmit, initiationType, setValue]);

    return (
        <StartSession videoSrc={videoSrc}>
            <Button
                disabled={isPending}
                variant="outline"
                className="text-branding-secondary hover:text-branding-secondary border-branding-secondary font-normal w-full h-11"
                onClick={() => dispatch(closeDialog())}
            >
                Cancel
            </Button>
            <Button
                disabled={isPending || isGetSessionsPending}
                isLoading={isPending}
                className="bg-branding-secondary hover:bg-branding-secondary/90 font-normal w-full h-11"
                onClick={handleProceed}
            >
                Proceed
            </Button>
        </StartSession>
    );
};

export default StartCoachingSession;
