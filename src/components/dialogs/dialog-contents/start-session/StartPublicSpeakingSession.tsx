import { FormType } from "@/components/forms/PublicSpeakingForm";
import { Button } from "@/components/ui/button";
import { useSessionHistory } from "@/hooks/auth";
import { useCreatePublicSpeakingSession } from "@/hooks/sessions";
import { useAppDispatch } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { HTMLAttributes, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import StartSession from ".";

interface IStartPublicSpeakingSessionProps extends HTMLAttributes<HTMLDivElement> {
    initiationType: "skip" | "start";
    setValue?: UseFormReturn<FormType>["setValue"];
    handleSubmit: UseFormReturn<FormType>["handleSubmit"];
}

const StartPublicSpeakingSession = ({ initiationType, setValue, handleSubmit }: IStartPublicSpeakingSessionProps) => {
    const { mutate: createPublicSpeakingSession, isPending } = useCreatePublicSpeakingSession();
    const { data, isPending: isGetSessionsPending } = useSessionHistory();
    const dispatch = useAppDispatch();

    const videoSrc =
        "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/intro-videos/Mike+Public+Speaking+and+Stortellying+INtro.MP4";

    const handleSessionSetupSubmit = useCallback(
        (values: FormType) => {
            const payload = { ...values, goals: values.goals.map(({ goal }) => goal).filter(Boolean) };

            createPublicSpeakingSession(payload);
        },
        [createPublicSpeakingSession],
    );

    const handleProceed = useCallback(() => {
        if (setValue && initiationType === "skip") {
            const { count } = data!;

            setValue("session_name", `Public Speaking Session ${count + 1}`);
            setValue("virtual_environment", "conference_room");
        }

        handleSubmit(handleSessionSetupSubmit, () => dispatch(closeDialog()))();
    }, [data, dispatch, handleSessionSetupSubmit, handleSubmit, initiationType, setValue]);

    return (
        <StartSession videoSrc={videoSrc}>
            <Button
                disabled={isPending}
                variant="outline"
                className="text-branding-primary hover:text-branding-primary border-branding-primary font-normal w-full h-11"
                onClick={() => dispatch(closeDialog())}
            >
                Cancel
            </Button>
            <Button
                disabled={isPending || isGetSessionsPending}
                isLoading={isPending}
                className="bg-branding-primary hover:bg-branding-primary/90 font-normal w-full h-11"
                onClick={handleProceed}
            >
                Proceed
            </Button>
        </StartSession>
    );
};

export default StartPublicSpeakingSession;
