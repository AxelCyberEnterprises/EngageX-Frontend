import { PlayCircle } from "lucide-react";
import { ReactNode } from "react";

const StartSession = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col justify-between gap-8">
            <div className="space-y-6">
                <div className="p-2 border border-bright-gray rounded-md size-fit">
                    <PlayCircle className="size-5" />
                </div>
                <div className="space-y-2">
                    <h6>Start your Session</h6>
                    <p className="text-independence">Confirm you're ready to use your session credit.</p>
                    <p className="text-[#BC0010]">
                        Reminder: remember to record for at least 2 minutes and take pauses to allow the audience react.
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-x-4">{children}</div>
        </div>
    );
};

export default StartSession;
