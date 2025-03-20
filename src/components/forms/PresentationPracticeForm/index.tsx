import StartSession from "@/components/dialogs/dialog-contents/StartSession";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { PresentationPracticeSchema } from "@/schemas/presentation-practice";
import { setslidePreviews } from "@/store/slices/dashboard/user/presentationPracticeSlice";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import SlideDetailsSection from "./SlideDetailsSection";
import SlidePreviewSection from "./SlidePreviewSection";
import UploadSlideSection from "./UploadSlideSection";

export type FormType = z.infer<typeof PresentationPracticeSchema>;

const PresentationPracticeForm = () => {
    const dispatch = useDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(PresentationPracticeSchema),
    });

    useEffect(() => {
        const subscription = form.watch((values, { name }) => {
            console.log("Values: ", values);

            if (name !== "slides" || !("slides" in values && values.slides)) return;

            const slides = values.slides.filter(
                (slide): slide is { file: File; preview: string } =>
                    slide !== undefined && slide.file !== undefined && slide.preview !== undefined,
            );

            dispatch(setslidePreviews(slides));
        });

        return () => subscription.unsubscribe();
    }, [dispatch, form]);

    return (
        <Form {...form}>
            <form className="flex flex-col">
                <div className="lg:hidden flex items-center justify-between py-4">
                    <h6 className="md:block hidden text-lg">Presentation Setup</h6>
                    <div className="flex items-center gap-x-3">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="md:hidden inline-flex text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                                >
                                    <Settings className="size-4" />
                                    <span>Slide Settings</span>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader className="sr-only">
                                    <DrawerTitle>Slide Preview</DrawerTitle>
                                    <DrawerDescription>Slide Preview</DrawerDescription>
                                </DrawerHeader>
                                <SlidePreviewSection {...{ form }} className="px-4" />
                            </DrawerContent>
                        </Drawer>
                        <Button
                            type="button"
                            variant="outline"
                            className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                        >
                            Save as Draft
                        </Button>
                        <Button
                            type="button"
                            className="md:inline-flex hidden bg-green-sheen hover:bg-green-sheen/80 font-normal transition"
                        >
                            Skip Setup
                        </Button>
                        <Button
                            type="button"
                            className="bg-[#D4D6DF] hover:bg-[#D4D6DF]/80 text-gunmetal font-normal transition"
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
                        <Button
                            type="button"
                            variant="outline"
                            className="md:inline-flex hidden text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                <div className="flex items-start">
                    <UploadSlideSection
                        {...{ form }}
                        className="flex-1 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar px-4 pt-4 pb-[15vh] border-x border-bright-gray"
                    />
                    <SlideDetailsSection
                        {...{ form }}
                        className="flex-3 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar lg:pl-4 md:pr-4 lg:pt-4 pb-[15vh]"
                    />
                    <SlidePreviewSection
                        {...{ form }}
                        className="md:flex hidden flex-1 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar px-4 pt-4 pb-[15vh] border-x lg:border-y-0 border-y border-bright-gray"
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
                                        children: <StartSession />,
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

export default PresentationPracticeForm;
