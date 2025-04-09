import PracticeSetUpControlsLayout from "@/components/form-layout/PracticeSetUpControlsLayout";
import PracticeSetupLayout from "@/components/form-layout/PracticeSetupLayout";
import { Form } from "@/components/ui/form";
import { PitchPracticeSchema } from "@/schemas/dashboard/user";
import { RootState, useAppDispatch } from "@/store";
import { setActiveSlideIndex, setNumSlides, setslidePreviews } from "@/store/slices/dashboard/user/pitchPracticeSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

export type FormType = z.infer<typeof PitchPracticeSchema>;

const PitchPracticeForm = () => {
    const { activeSlideIndex, slidePreviews, numSlides } = useSelector((state: RootState) => state.pitchPractice);
    const dispatch = useAppDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(PitchPracticeSchema),
        defaultValues: useMemo(() => ({ session_type: "pitch" }), []),
    });

    useEffect(() => {
        const subscription = form.watch((values, { name }) => {
            // console.log("Values: ", values);

            if (name !== "slides" || !("slides" in values && values.slides)) return;

            const slides = values.slides.filter(
                (slide): slide is { file: File; preview: string } => slide !== undefined && slide.preview !== undefined,
            );
            const slidePreviews = slides.map((slide) => slide.preview);

            dispatch(setslidePreviews(slidePreviews));
        });

        return () => subscription.unsubscribe();
    }, [dispatch, form]);

    return (
        <Form {...form}>
            <form>
                <PracticeSetUpControlsLayout {...{ form, activeSlideIndex, slidePreviews, sessionType: "pitch" }}>
                    <PracticeSetupLayout
                        {...{ form, activeSlideIndex, slidePreviews, numSlides, setActiveSlideIndex, setNumSlides }}
                    />
                </PracticeSetUpControlsLayout>
            </form>
        </Form>
    );
};

export default PitchPracticeForm;
