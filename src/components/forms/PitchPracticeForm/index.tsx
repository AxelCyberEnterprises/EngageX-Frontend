import StartSession from "@/components/dialogs/dialog-contents/StartSession";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { PitchPracticeSchema } from "@/schemas/pitch-practice";
import { RootState } from "@/store";
import { setActiveSlideIndex, setslidePreviews } from "@/store/slices/dashboard/user/pitchPracticeSlice";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Settings } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import UploadSlideSection from "../../form-sections/UploadSlideSection";
import SlideDetailsSection from "./SlideDetailsSection";
import SlidePreviewAndSettingsSection from "./SlidePreviewAndSettingsSection";

export type FormType = z.infer<typeof PitchPracticeSchema>;

const PitchPracticeForm = () => {
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.pitchPractice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm<FormType>({
        resolver: zodResolver(PitchPracticeSchema),
    });

    useEffect(() => {
        const subscription = form.watch((values, { name }) => {
            // console.log("Values: ", values);

            if (name !== "slides" || !("slides" in values && values.slides)) return;

            const slides = values.slides.filter(
                (slide): slide is { file: File; preview: string } =>
                    slide !== undefined && slide.file !== undefined && slide.preview !== undefined,
            );
            const slidePreviews = slides.map((slide) => slide.preview);

            dispatch(setslidePreviews(slidePreviews));
        });

        return () => subscription.unsubscribe();
    }, [dispatch, form]);

    return (
        <Form {...form}>
            <form className="flex flex-col">
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
                                <Link to="">
                                    <span className="text-[#64BA9F]">Click here</span>
                                </Link>
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
                                <SlidePreviewAndSettingsSection {...{ form }} className="px-4" />
                            </DrawerContent>
                        </Drawer>
                        <Button
                            type="button"
                            variant="outline"
                            className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
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
                                        children: <StartSession sessionType="pitch-practice" />,
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
                        {...{ form }}
                        className="flex-3 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar lg:pb-[15vh] md:pb-[20vh] pb-[25vh]"
                    />
                    <SlidePreviewAndSettingsSection
                        {...{ form }}
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
                            className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                        >
                            Save as Draft
                        </Button>
                        <Button type="button" className="bg-green-sheen hover:bg-green-sheen/80 font-normal transition">
                            Skip Setup
                        </Button>
                        <Button
                            type="button"
                            className="bg-[#D4D6DF] hover:bg-[#D4D6DF]/80 text-gunmetal font-normal transition"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "start-session",
                                        children: <StartSession sessionType="pitch-practice" />,
                                    }),
                                )
                            }
                        >
                            Start Session
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default PitchPracticeForm;
