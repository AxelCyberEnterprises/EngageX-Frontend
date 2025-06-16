import LicenseDraft from "@/assets/images/svgs/license-draft.svg";
import FeatureWalkthrough from "@/components/dialogs/dialog-contents/FeatureWalkthrough";
import RookieRoomForm from "@/components/forms/RookieRoomForm";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RookieRoom = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <section className="flex flex-col gap-y-8 px-4 pt-4 pb-[15vh]">
            <div className="flex md:flex-col flex-row md:gap-y-3 gap-x-3 md:items-stretch items-start">
                <div className="flex items-center justify-between">
                    <Button
                        className="bg-transparent hover:bg-transparent text-gunmetal shadow-none px-0 has-[>svg]:px-0 py-0 size-fit"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="md:size-4 size-5" />
                        <span className="font-normal md:inline hidden">Back</span>
                    </Button>
                    <div className="hidden items-center gap-x-1 text-sm font-medium">
                        <span>Need help setting up?</span>
                        <Button
                            className="size-fit bg-transparent hover:bg-transparent p-0 shadow-none"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "feature-walkthrough",
                                        children: <FeatureWalkthrough />,
                                    }),
                                )
                            }
                        >
                            <span className="text-[#64BA9F]">Click here</span>
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h5>Setup the Rookie Room</h5>
                        <div className="hidden items-center gap-x-1 text-sm font-medium">
                            <span>Need help setting up?</span>
                            <Button
                                className="size-fit bg-transparent hover:bg-transparent p-0 shadow-none"
                                onClick={() =>
                                    dispatch(
                                        openDialog({
                                            key: "feature-walkthrough",
                                            children: <FeatureWalkthrough />,
                                        }),
                                    )
                                }
                            >
                                <span className="text-[#64BA9F]">Click here</span>
                            </Button>
                        </div>
                    </div>
                    <Button variant="outline" className="md:inlineflex hidden text-gunmetal rounded-lg border-gunmetal">
                        Continue with Draft
                    </Button>
                </div>
                <Button className="hidden inlineflex bg-transparent hover:bg-transparent size-fit px-0 py-0">
                    <img src={LicenseDraft} alt="" width={24} height={24} className="size-6" />
                </Button>
            </div>
            <RookieRoomForm />
        </section>
    );
};

export default RookieRoom;
