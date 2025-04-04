import LicenseDraft from "@/assets/images/svgs/license-draft.svg";
import PublicSpeakingForm from "@/components/forms/PublicSpeakingForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PublicSpeaking = () => {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col gap-y-8 px-4 pt-4 pb-[15vh]">
            <div className="flex md:flex-col flex-row md:gap-y-3 md:justify-normal justify-between md:items-stretch items-start">
                <div className="flex items-center justify-between">
                    <Button
                        className="bg-transparent hover:bg-transparent text-gunmetal shadow-none px-0 has-[>svg]:px-0 py-0 size-fit"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="md:size-4 size-5" />
                        <span className="font-normal md:inline hidden">Back</span>
                    </Button>
                    <div className="md:flex hidden items-center gap-x-1 text-sm font-medium">
                        <span>Need help setting up?</span>
                        <Link to="">
                            <span className="text-[#64BA9F]">Click here</span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h5>Set up Public Speaking Session</h5>
                        <div className="md:hidden flex items-center gap-x-1 text-sm font-medium">
                            <span>Need help setting up?</span>
                            <Link to="">
                                <span className="text-[#64BA9F]">Click here</span>
                            </Link>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="md:inline-flex hidden text-gunmetal rounded-lg border-gunmetal"
                    >
                        Setup Drafts
                    </Button>
                </div>
                <Button className="md:hidden inline-flex bg-transparent hover:bg-transparent size-fit px-0 py-0">
                    <img src={LicenseDraft} alt="" width={24} height={24} className="size-6" />
                </Button>
            </div>
            <PublicSpeakingForm />
        </section>
    );
};

export default PublicSpeaking;
