import { useAppDispatch } from "@/store";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { capitalize } from "@mui/material";
import { ArrowLeft, Settings } from "lucide-react";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FeatureWalkthrough from "../../dialogs/dialog-contents/FeatureWalkthrough";
import StartPracticeSetupSession from "../../dialogs/dialog-contents/start-session/StartPracticeSetupSession";
import { Button } from "../../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../ui/drawer";
import SlidePreviewAndSettingsSection from "../form-sections/SlidePreviewAndSettingsSection";

interface IPracticeSetUpControlsLayout extends HTMLAttributes<HTMLDivElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
}

const PracticeSetUpControlsLayout = ({ children, form }: IPracticeSetUpControlsLayout) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col">
            <div className="lg:hidden flex md:flex-row flex-col md:gap-y-0 gap-y-5 items-start justify-between py-3 border-b border-bright-gray md:mb-0 mb-4">
                <div className="flex items-start gap-x-3">
                    <Button
                        type="button"
                        className="bg-transparent hover:bg-transparent text-gunmetal shadow-none px-0 has-[>svg]:px-0 py-0 size-fit"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="md:size-4 size-5" />
                    </Button>
                    <div className="flex flex-col gap-y-2">
                        <h5>{capitalize(form.getValues("session_type"))} Setup</h5>
                        <div className="hidden items-center gap-x-1 text-sm font-medium">
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
                                className="hidden text-gunmetal hover:text-gunmetal border-bright-gray font-normal"
                            >
                                <Settings className="size-4" />
                                <span className="md:inline hidden">Slide Settings</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="border-bright-gray">
                            <DrawerHeader className="sr-only">
                                <DrawerTitle>Slide Preview</DrawerTitle>
                                <DrawerDescription>Slide Preview</DrawerDescription>
                            </DrawerHeader>
                            <SlidePreviewAndSettingsSection {...{ form }} className="p-4 pb-8" />
                        </DrawerContent>
                    </Drawer>
                    <Button
                        type="button"
                        variant="outline"
                        className="hidden text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                    >
                        Save as Draft
                    </Button>
                    <Button
                        type="button"
                        className="bg-green-sheen hover:bg-green-sheen/80 font-normal transition"
                        onClick={() =>
                            dispatch(
                                openDialog({
                                    key: "start-session",
                                    children: (
                                        <StartPracticeSetupSession
                                            initiationType="skip"
                                            getValues={form.getValues}
                                            setValue={form.setValue}
                                            handleSubmit={form.handleSubmit}
                                        />
                                    ),
                                }),
                            )
                        }
                    >
                        Skip Setup
                    </Button>
                    <Button
                        type="button"
                        className="bg-gunmetal hover:bg-gunmetal/80 text-white font-normal transition"
                        onClick={() =>
                            dispatch(
                                openDialog({
                                    key: "start-session",
                                    children: (
                                        <StartPracticeSetupSession
                                            initiationType="start"
                                            getValues={form.getValues}
                                            handleSubmit={form.handleSubmit}
                                        />
                                    ),
                                }),
                            )
                        }
                    >
                        Start Session
                    </Button>
                </div>
            </div>
            {children}
            <div className="hidden absolute bottom-0 inset-x-0 p-4 lg:flex items-center justify-end border-t border-bright-gray bg-white">
                <Button
                    type="button"
                    variant="outline"
                    className="hidden text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                >
                    Cancel
                </Button>
                <div className="flex items-center gap-x-4 mr-25">
                    <Button
                        type="button"
                        variant="outline"
                        className="hidden text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                    >
                        Save as Draft
                    </Button>
                    <Button
                        type="button"
                        className="bg-green-sheen hover:bg-green-sheen/80 font-normal transition"
                        onClick={() =>
                            dispatch(
                                openDialog({
                                    key: "start-session",
                                    children: (
                                        <StartPracticeSetupSession
                                            initiationType="skip"
                                            getValues={form.getValues}
                                            setValue={form.setValue}
                                            handleSubmit={form.handleSubmit}
                                        />
                                    ),
                                }),
                            )
                        }
                    >
                        Skip Setup
                    </Button>
                    <Button
                        type="button"
                        className="bg-gunmetal hover:bg-gunmetal/90 font-normal transition"
                        onClick={() =>
                            dispatch(
                                openDialog({
                                    key: "start-session",
                                    children: (
                                        <StartPracticeSetupSession
                                            initiationType="start"
                                            getValues={form.getValues}
                                            handleSubmit={form.handleSubmit}
                                        />
                                    ),
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

export default PracticeSetUpControlsLayout;
