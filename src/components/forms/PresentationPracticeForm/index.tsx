import PracticeSetupLayout from "@/components/form-layout/PracticeSetupLayout";
import { Form } from "@/components/ui/form";
import { PresentationPracticeSchema } from "@/schemas/dashboard/user";
import { RootState, useAppDispatch } from "@/store";
import {
    setActiveSlideIndex,
    setNumSlides,
    setslidePreviews,
} from "@/store/slices/dashboard/user/presentationPracticeSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

export type FormType = z.infer<typeof PresentationPracticeSchema>;

const PresentationPracticeForm = () => {
    const { activeSlideIndex, slidePreviews, numSlides } = useSelector(
        (state: RootState) => state.presentationPractice,
    );
    const dispatch = useAppDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(PresentationPracticeSchema),
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
            <form className="flex flex-col">
                <PracticeSetupLayout
                    {...{ form, activeSlideIndex, slidePreviews, numSlides, setActiveSlideIndex, setNumSlides }}
                />
            </form>
        </Form>
    );
};

export default PresentationPracticeForm;
