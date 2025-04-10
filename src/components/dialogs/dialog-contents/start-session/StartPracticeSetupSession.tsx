import { FormType as PitchPracticeFormType } from "@/components/forms/PitchPracticeForm";
import { FormType as PresentationPracticeFormType } from "@/components/forms/PresentationPracticeForm";
import { Button } from "@/components/ui/button";
import { capitalize } from "@mui/material";
import { HTMLAttributes, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import StartSession from ".";

type FormType = PitchPracticeFormType | PresentationPracticeFormType;
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
    const handleSessionSetupSubmit = useCallback((values: FormType) => {
        console.log("Session Setup Submit Values: ", values);
    }, []);

    const handleProceed = useCallback(() => {
        if (setValue && initiationType === "skip") setValue("session_name", `${capitalize(sessionType)} Speaking`); //todo: fetch sessions and use append length++ to the name

        handleSubmit(handleSessionSetupSubmit)();
    }, [handleSessionSetupSubmit, handleSubmit, initiationType, sessionType, setValue]);

    return (
        <StartSession>
            <Button
                // isLoading={isPending}
                className="bg-gunmetal hover:bg-gunmetal/90 font-normal w-full h-11"
                onClick={handleProceed}
            >
                Proceed
            </Button>
        </StartSession>
    );
};

export default StartPracticeSetupSession;
