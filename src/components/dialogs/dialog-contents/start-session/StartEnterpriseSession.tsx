import { FormType } from "@/components/forms/RookieRoomForm";
import { Button } from "@/components/ui/button";
import { useSessionHistory } from "@/hooks/auth";
import { useCreateRookieRoomSession } from "@/hooks/sessions";
import { useAppDispatch } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import React, { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import StartSession from ".";

interface IStartEnterpriseSessionProps extends React.ComponentProps<"div"> {
    initiationType: "skip" | "start";
    videoSrc?: string;
    setValue?: UseFormReturn<FormType>["setValue"];
    handleSubmit: UseFormReturn<FormType>["handleSubmit"];
}

const StartEnterpriseSession = ({ initiationType, videoSrc, setValue, handleSubmit }: IStartEnterpriseSessionProps) => {
    const { mutate: createRookieRoomSession, isPending } = useCreateRookieRoomSession();
    const { data, isPending: isGetSessionsPending } = useSessionHistory();
    const dispatch = useAppDispatch();

    const handleSessionSetupSubmit = useCallback(
        (values: FormType) => {
            const payload = {
                ...values,
                goals: values.goals.map(({ goal }) => goal).filter(Boolean),
            };

            createRookieRoomSession(payload);
        },
        [createRookieRoomSession],
    );

    const handleProceed = useCallback(() => {
        if (setValue && initiationType === "skip") {
            const { count } = data!;

            setValue("session_name", `The Rookie Session ${count + 1}`);
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

export default StartEnterpriseSession;
