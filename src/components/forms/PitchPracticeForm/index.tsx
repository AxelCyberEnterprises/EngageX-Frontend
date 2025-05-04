import PracticeSetUpControlsLayout from "@/components/forms/form-layouts/PracticeSetUpControlsLayout";
import PracticeSetupLayout from "@/components/forms/form-layouts/PracticeSetupLayout";
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { Form } from "@/components/ui/form";
import { usePreviewUploadSlides } from "@/hooks/sessions";
import { pdfToImages } from "@/lib/utils";
import { PitchPracticeSchema } from "@/schemas/dashboard/user";
import { RootState, useAppDispatch } from "@/store";
import {
    setActiveSlideIndex,
    setIsGeneratingPreview,
    setslidePreviews,
} from "@/store/slices/dashboard/user/pitchPracticeSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
export type FormType = z.infer<typeof PitchPracticeSchema>;

const PitchPracticeForm = () => {
    const { activeSlideIndex, isGeneratingPreview, slidePreviews } = useSelector(
        (state: RootState) => state.pitchPractice,
    );
    const dispatch = useAppDispatch();
    const { mutate: uploadSlides } = usePreviewUploadSlides();

    const form = useForm<FormType>({
        resolver: zodResolver(PitchPracticeSchema),
        defaultValues: useMemo(() => ({ session_type: "pitch", virtual_environment: "pitch_studio" }), []),
    });

    useEffect(() => {
        const subscription = form.watch((values, { name }) => {
            if (name !== "slides" || !("slides" in values && values.slides)) return;

            const slidesFormData = new FormData();
            const [slides] = values.slides.filter((slide): slide is { file: File; id: number } => slide !== undefined);

            slidesFormData.append("slides_file", slides.file);

            dispatch(setIsGeneratingPreview(true));

            if (slidesFormData.get("slides_file"))
                uploadSlides(slidesFormData, {
                    onSuccess: ({ data: { id, slides_file } }) => {
                        form.setValue("slides", [{ id, file: slides.file }]);

                        pdfToImages(slides_file)
                            .then((images) => {
                                dispatch(setslidePreviews(images));
                                dispatch(setIsGeneratingPreview(false));
                            })
                            .catch((error) => {
                                console.error("Error generating preview: ", error);

                                dispatch(setIsGeneratingPreview(false));
                                toast(
                                    <ErrorToast
                                        {...{
                                            heading: "Error generating preview",
                                            description:
                                                "An error occurred while generating preview, please try again.",
                                        }}
                                    />,
                                );
                            });
                    },
                    onError: (error) => {
                        console.error("Error uploading slides: ", error);

                        dispatch(setIsGeneratingPreview(false));
                        toast(
                            <ErrorToast
                                {...{
                                    heading: "Error uploading slides",
                                    description: "An error occurred while uploading slides, please try again.",
                                }}
                            />,
                        );
                    },
                });
        });

        return () => subscription.unsubscribe();
    }, [dispatch, form, uploadSlides]);

    return (
        <Form {...form}>
            <form>
                <PracticeSetUpControlsLayout {...{ form }}>
                    <PracticeSetupLayout
                        {...{ form, activeSlideIndex, isGeneratingPreview, slidePreviews, setActiveSlideIndex }}
                    />
                </PracticeSetUpControlsLayout>
            </form>
        </Form>
    );
};

export default PitchPracticeForm;
