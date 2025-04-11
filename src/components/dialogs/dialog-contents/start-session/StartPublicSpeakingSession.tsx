import { FormType } from "@/components/forms/PublicSpeakingForm";
import { Button } from "@/components/ui/button";
import { useSessionHistory } from "@/hooks/auth";
import { useCreatePublicSpeakingSession } from "@/hooks/mutations/dashboard/user";
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
    const { data } = useSessionHistory();

    const handleSessionSetupSubmit = useCallback(
        (values: FormType) => {
            const payload = { ...values, goals: values.goals.map(({ goal }) => goal) };

            createPublicSpeakingSession(payload);
        },
        [createPublicSpeakingSession],
    );

    const handleProceed = useCallback(() => {
        if (setValue && initiationType === "skip") {
            const { count } = data!;

            setValue("session_name", `Public Speaking Session ${count + 1}`);
        }

        handleSubmit(handleSessionSetupSubmit)();
    }, [data, handleSessionSetupSubmit, handleSubmit, initiationType, setValue]);

    return (
        <StartSession>
            <Button
                disabled={isPending}
                isLoading={isPending}
                className="bg-gunmetal hover:bg-gunmetal/90 font-normal w-full h-11"
                onClick={handleProceed}
            >
                Proceed
            </Button>
        </StartSession>
    );
};

export default StartPublicSpeakingSession;
