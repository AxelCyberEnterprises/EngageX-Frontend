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
    setSlidePreviews,
} from "@/store/slices/dashboard/user/pitchPracticeSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
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
        defaultValues: useMemo(
            () => ({
                session_type: "pitch",
                virtual_environment: "pitch_studio",
                allow_ai_questions: true,
                goals: [{ id: 1, goal: "" }],
            }),
            [],
        ),
    });

    const slides = useWatch({ control: form.control, name: "slides" });

    const handleDeleteSlide = useCallback(() => {
        form.resetField("slides");
        form.resetField("slide_preview_id");
        dispatch(setSlidePreviews([]));
        dispatch(setActiveSlideIndex(0));
    }, [dispatch, form]);

    useEffect(() => {
        if (!slides || slides.length === 0) return;

        const [slide] = slides;

        const slidesFormData = new FormData();
        slidesFormData.append("slides_file", slide);

        dispatch(setIsGeneratingPreview(true));

        uploadSlides(slidesFormData, {
            onSuccess: ({ data: { id, slides_file } }) => {
                form.setValue("slide_preview_id", id);

                pdfToImages(slides_file)
                    .then((images) => {
                        dispatch(setSlidePreviews(images));
                        dispatch(setIsGeneratingPreview(false));
                    })
                    .catch((error) => {
                        console.error("Error generating preview: ", error);
                        dispatch(setIsGeneratingPreview(false));
                        toast(
                            <ErrorToast
                                heading="Error generating preview"
                                description="An error occurred while generating preview, please try again."
                            />,
                        );
                    });
            },
            onError: (error) => {
                console.error("Error uploading slides: ", error);
                dispatch(setIsGeneratingPreview(false));
                toast(
                    <ErrorToast
                        heading="Error uploading slides"
                        description="An error occurred while uploading slides, please try again."
                    />,
                );
            },
        });
    }, [dispatch, form, slides, uploadSlides]);

    return (
        <Form {...form}>
            <form>
                <PracticeSetUpControlsLayout {...{ form }}>
                    <PracticeSetupLayout
                        {...{
                            form,
                            activeSlideIndex,
                            isGeneratingPreview,
                            slidePreviews,
                            handleDeleteSlide,
                            setActiveSlideIndex,
                        }}
                    />
                </PracticeSetUpControlsLayout>
            </form>
        </Form>
    );
};

export default PitchPracticeForm;
