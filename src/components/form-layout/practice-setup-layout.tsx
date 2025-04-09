import { useAppDispatch } from "@/store";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import { ArrowLeft, Settings } from "lucide-react";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FeatureWalkthrough from "../dialogs/dialog-contents/FeatureWalkthrough";
import StartSession from "../dialogs/dialog-contents/StartSession";
import SlideDetailsSection from "../form-sections/SlideDetailsSection";
import SlidePreviewAndSettingsSection from "../form-sections/SlidePreviewAndSettingsSection";
import UploadSlideSection from "../form-sections/UploadSlideSection";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

interface IPracticeSetupLayoutProps extends HTMLAttributes<HTMLDivElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    activeSlideIndex: number;
    slidePreviews: string[];
    setActiveSlideIndex: (index: number) => UnknownAction;
}

const PracticeSetupLayout = ({
    form,
    activeSlideIndex,
    slidePreviews,
    setActiveSlideIndex,
}: IPracticeSetupLayoutProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col">
            <div className="lg:hidden flex md:flex-row flex-col md:gap-y-0 gap-y-4 items-start justify-between py-3 border-b border-bright-gray md:mb-0 mb-4">
                <div className="flex items-start gap-x-3">
                    <Button
                        type="button"
                        className="bg-transparent hover:bg-transparent text-gunmetal shadow-none px-0 has-[>svg]:px-0 size-fit"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div className="flex flex-col">
                        <h6 className="text-lg">Pitch Setup</h6>
                        <div className="flex items-center gap-x-1 text-sm font-medium">
                            <span>Need help setting up?</span>
                            <Button
                                type="button"
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
                </div>
                <div className="flex items-center gap-x-3">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="md:hidden inline-flex text-gunmetal hover:text-gunmetal border-bright-gray font-normal"
                            >
                                <Settings className="size-4" />
                                <span className="md:inline hidden">Slide Settings</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader className="sr-only">
                                <DrawerTitle>Slide Preview</DrawerTitle>
                                <DrawerDescription>Slide Preview</DrawerDescription>
                            </DrawerHeader>
                            <SlidePreviewAndSettingsSection
                                {...{ form, activeSlideIndex, slidePreviews }}
                                className="px-4"
                            />
                        </DrawerContent>
                    </Drawer>
                    <Button
                        type="button"
                        variant="outline"
                        className="hidden text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                    >
                        Save as Draft
                    </Button>
                    <Button type="button" className="bg-green-sheen hover:bg-green-sheen/80 font-normal transition">
                        Skip Setup
                    </Button>
                    <Button
                        type="button"
                        className="bg-gunmetal hover:bg-gunmetal/80 text-white font-normal transition"
                        onClick={() =>
                            dispatch(
                                openDialog({
                                    key: "start-session",
                                    children: <StartSession />,
                                }),
                            )
                        }
                    >
                        Start Session
                    </Button>
                </div>
            </div>
            <div className="flex items-start">
                <UploadSlideSection
                    {...{ activeSlideIndex, slidePreviews, setActiveSlideIndex }}
                    className="flex-1 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar px-4 pt-4 lg:pb-[15vh] md:pb-[20vh] pb-[25vh] border-x border-bright-gray"
                />
                <SlideDetailsSection
                    {...{ form, activeSlideIndex, slidePreviews }}
                    className="flex-3 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar lg:pb-[15vh] md:pb-[20vh] pb-[25vh]"
                />
                <SlidePreviewAndSettingsSection
                    {...{ form, activeSlideIndex, slidePreviews }}
                    className="md:flex hidden flex-1 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar px-4 pt-4 lg:pb-[15vh] md:pb-[20vh] pb-[25vh] border-x border-bright-gray"
                />
            </div>
            <div className="hidden absolute bottom-0 inset-x-0 p-4 lg:flex items-center justify-between border-t border-bright-gray bg-white">
                <Button
                    type="button"
                    variant="outline"
                    className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                >
                    Cancel
                </Button>
                <div className="flex items-center gap-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="hidden text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                    >
                        Save as Draft
                    </Button>
                    <Button type="button" className="bg-green-sheen hover:bg-green-sheen/80 font-normal transition">
                        Skip Setup
                    </Button>
                    <Button
                        type="button"
                        className="bg-gunmetal hover:bg-gunmetal/90 font-normal transition"
                        onClick={() =>
                            dispatch(
                                openDialog({
                                    key: "start-session",
                                    children: <StartSession />,
                                }),
                            )
                        }
                    >
                        Start Session
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PracticeSetupLayout;
