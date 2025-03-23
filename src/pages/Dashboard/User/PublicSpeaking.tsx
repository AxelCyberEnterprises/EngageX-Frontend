import PublicSpeakingForm from "@/components/forms/PublicSpeakingForm";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const PublicSpeaking = () => {
    return (
        <section className="flex flex-col gap-y-6 px-4 pt-4 pb-[15vh]">
            <div className="flex items-center justify-between">
                <h5>Set up Public Speaking Session</h5>
                <Button variant="outline" className="text-gunmetal rounded-lg">
                    <span className="md:inline hidden">Cancel</span>
                    <XIcon className="size-4 md:hidden inline" />
                </Button>
            </div>
            <div className="bg-alice-blue p-3 rounded-lg flex md:flex-row flex-col md:items-center justify-between md:gap-y-0 gap-y-4">
                <p className="text-independence">
                    Use content from your previous sessions to target and improve on specific feedback areas
                </p>
                <div className="flex gap-x-2">
                    <Button variant="ghost" className="text-gunmetal bg-transparent hover:bg-transparent underline">
                        Dismiss
                    </Button>
                    <Button
                        variant="outline"
                        className="text-gunmetal border-gunmetal bg-transparent hover:bg-transparent rounded-lg"
                    >
                        Continue
                    </Button>
                </div>
            </div>
            <PublicSpeakingForm />
        </section>
    );
};

export default PublicSpeaking;
