import PracticeSetUpControlsLayout from "@/components/forms/form-layouts/PracticeSetUpControlsLayout";
import PracticeSetupLayout from "@/components/forms/form-layouts/PracticeSetupLayout";
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { Form } from "@/components/ui/form";
import { usePreviewUploadSlides } from "@/hooks/sessions";
import { pdfToImages } from "@/lib/utils";
import { PresentationPracticeSchema } from "@/schemas/dashboard/user";
import { RootState, useAppDispatch } from "@/store";
import {
    setActiveSlideIndex,
    setIsGeneratingPreview,
    setSlidePreviews,
} from "@/store/slices/dashboard/user/presentationPracticeSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

export type FormType = z.infer<typeof PresentationPracticeSchema>;

const PresentationPracticeForm = () => {
    const { activeSlideIndex, isGeneratingPreview, slidePreviews } = useSelector(
        (state: RootState) => state.presentationPractice,
    );
    const dispatch = useAppDispatch();
    const { mutate: uploadSlides } = usePreviewUploadSlides();

    const form = useForm<FormType>({
        resolver: zodResolver(PresentationPracticeSchema),
        defaultValues: useMemo(() => ({ session_type: "presentation" }), []),
    });

    const slides = useWatch({ control: form.control, name: "slides" });

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
                        {...{ form, activeSlideIndex, isGeneratingPreview, slidePreviews, setActiveSlideIndex }}
                    />
                </PracticeSetUpControlsLayout>
            </form>
        </Form>
    );
};

export default PresentationPracticeForm;
