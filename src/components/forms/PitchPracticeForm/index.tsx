import PracticeSetupLayout from "@/components/form-layout/practice-setup-layout";
import { Form } from "@/components/ui/form";
import { PitchPracticeSchema } from "@/schemas/pitch-practice";
import { RootState, useAppDispatch } from "@/store";
import { setActiveSlideIndex, setslidePreviews } from "@/store/slices/dashboard/user/pitchPracticeSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

export type FormType = z.infer<typeof PitchPracticeSchema>;

const PitchPracticeForm = () => {
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.pitchPractice);
    const dispatch = useAppDispatch();

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
            <form>
                <PracticeSetupLayout {...{ form, activeSlideIndex, slidePreviews, setActiveSlideIndex }} />
            </form>
        </Form>
    );
};

export default PitchPracticeForm;
