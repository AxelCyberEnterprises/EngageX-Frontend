import { FormType } from "@/components/forms/PublicSpeakingForm";
import { Button } from "@/components/ui/button";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { PlayCircle } from "lucide-react";
import { HTMLAttributes, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IStartSessionProps extends HTMLAttributes<HTMLDivElement> {
    sessionType: "public-speaking" | "presentation-practice" | "pitch-practice";
    form?: UseFormReturn<FormType>;
    handlePublicSpeakingFormSubmit?: (values: FormType) => void;
}

const StartSession = ({ sessionType, form, handlePublicSpeakingFormSubmit }: IStartSessionProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProceed = useCallback(() => {
        if (form && handlePublicSpeakingFormSubmit) {
            form.handleSubmit(handlePublicSpeakingFormSubmit)();
        }

        const sessionPath = (() => {
            switch (sessionType) {
                case "public-speaking":
                    return "/sessions/public-speaking-session";
                case "presentation-practice":
                    return "/sessions/presentation-practice-session";
                case "pitch-practice":
                    return "/sessions/pitch-practice-session";
                default:
                    return "/";
            }
        })();

        dispatch(closeDialog());
        navigate(sessionPath);
    }, [dispatch, form, handlePublicSpeakingFormSubmit, navigate, sessionType]);

    return (
        <div className="flex flex-col justify-between">
            <div className="space-y-6">
                <div className="p-2 border border-bright-gray rounded-md size-fit">
                    <PlayCircle className="size-5" />
                </div>
                <div className="space-y-2">
                    <h6>Start your Session</h6>
                    <p className="text-independence">
                        Confirm you are ready to use a Session Credit and all your Information and settings are
                        satisfactory
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <Button
                    variant="outline"
                    className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal w-full h-11"
                    onClick={() => dispatch(closeDialog())}
                >
                    Cancel
                </Button>
                <Button className="bg-gunmetal font-normal w-full h-11" onClick={handleProceed}>
                    Proceed
                </Button>
            </div>
        </div>
    );
};

export default StartSession;
