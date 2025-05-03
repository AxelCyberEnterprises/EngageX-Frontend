import PracticeSetUpControlsLayout from "@/components/forms/form-layouts/PracticeSetUpControlsLayout";
import PracticeSetupLayout from "@/components/forms/form-layouts/PracticeSetupLayout";
import { Form } from "@/components/ui/form";
import { isFilePDFOrPPTX, pdfToImages, pptxToImages } from "@/lib/utils";
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
import { z } from "zod";
export type FormType = z.infer<typeof PitchPracticeSchema>;

const PitchPracticeForm = () => {
    const { activeSlideIndex, isGeneratingPreview, slidePreviews } = useSelector(
        (state: RootState) => state.pitchPractice,
    );
    const dispatch = useAppDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(PitchPracticeSchema),
        defaultValues: useMemo(() => ({ session_type: "pitch", virtual_environment: "pitch_studio" }), []),
    });

    useEffect(() => {
        const subscription = form.watch((values, { name }) => {
            // console.log("Values: ", values);

            if (name !== "slides" || !("slides" in values && values.slides)) return;

            const slides = values.slides.filter((slide): slide is File => slide !== undefined);
            const slideType = isFilePDFOrPPTX(slides[0]);

            setIsGeneratingPreview(true);

            if (slideType === "pdf") pdfToImages(slides[0]).then((images) => dispatch(setslidePreviews(images)));
            else if (slideType === "pptx") pptxToImages(slides[0]).then((images) => dispatch(setslidePreviews(images)));

            setIsGeneratingPreview(false);
        });

        return () => subscription.unsubscribe();
    }, [dispatch, form]);

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
