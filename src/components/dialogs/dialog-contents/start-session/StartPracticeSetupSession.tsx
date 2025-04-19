import { FormType as PitchPracticeFormType } from "@/components/forms/PitchPracticeForm";
import { FormType as PresentationPracticeFormType } from "@/components/forms/PresentationPracticeForm";
import { Button } from "@/components/ui/button";
import { useSessionHistory } from "@/hooks/auth";
import { useCreatePracticeSession } from "@/hooks/sessions";
import { capitalize } from "@mui/material";
import { HTMLAttributes, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import StartSession from ".";

export type FormType = PitchPracticeFormType | PresentationPracticeFormType;
interface IStartPracticeSetupSessionProps extends HTMLAttributes<HTMLDivElement> {
    initiationType: "skip" | "start";
    sessionType: "presentation" | "pitch";
    setValue?: UseFormReturn<FormType>["setValue"];
    handleSubmit: UseFormReturn<FormType>["handleSubmit"];
}

const StartPracticeSetupSession = ({
    initiationType,
    sessionType,
    setValue,
    handleSubmit,
}: IStartPracticeSetupSessionProps) => {
    const { mutate: createPracticeSession, isPending } = useCreatePracticeSession({ sessionType });
    const { data } = useSessionHistory();

    const handleSessionSetupSubmit = useCallback(
        (values: FormType) => {
            const payload = {
                ...values,
                goals: values.goals.map(({ goal }) => goal),
                slide: values.slides?.pop()?.preview,
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
        }

        handleSubmit(handleSessionSetupSubmit)();
    }, [data, handleSessionSetupSubmit, handleSubmit, initiationType, sessionType, setValue]);

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

export default StartPracticeSetupSession;
