import { Button } from "@/components/ui/button";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { PlayCircle } from "lucide-react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

const StartSession = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();

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
                {children}
            </div>
        </div>
    );
};

export default StartSession;
