import { FormType } from "@/components/forms/PublicSpeakingForm";
import { Button } from "@/components/ui/button";
import { useCreatePublicSpeakingSession } from "@/hooks/mutations/dashboard/user";
import { HTMLAttributes, useCallback, useId } from "react";
import { UseFormReturn } from "react-hook-form";
import StartSession from ".";

interface IStartPublicSpeakingSessionProps extends HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<FormType>;
    initiationType: "skip" | "start";
}

const StartPublicSpeakingSession = ({ initiationType, form }: IStartPublicSpeakingSessionProps) => {
    const SessionNameId = useId();
    const { mutate: createPublicSpeakingSession, isPending } = useCreatePublicSpeakingSession();

    const handleSessionSetupSubmit = useCallback(
        (values: FormType) => {
            createPublicSpeakingSession(values);
        },
        [createPublicSpeakingSession],
    );

    const handleProceed = useCallback(() => {
        if (initiationType === "skip") form.setValue("session_name", `Public Speaking Session ${SessionNameId}`);
        
        form.handleSubmit(handleSessionSetupSubmit)();
    }, [SessionNameId, form, handleSessionSetupSubmit, initiationType]);

    return (
        <StartSession>
            <Button
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
