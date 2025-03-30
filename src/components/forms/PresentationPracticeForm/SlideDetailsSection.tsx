import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import GoalsSection from "@/components/form-sections/GoalsSection";
import SessionNameSection from "@/components/form-sections/SessionNameSection";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import PDFViewer from "@/components/widgets/pdf-viewer";
import { cn, convertDataUrlToFile, isDataUrlPdf } from "@/lib/utils";
import { RootState } from "@/store";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormType } from ".";

interface ISlideDetatilsSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const SlideDetailsSection = ({ className, form }: ISlideDetatilsSectionProps) => {
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.presentationPractice);
    const activeSlide = slidePreviews[activeSlideIndex];

    return (
        <section className={cn("flex flex-col gap-y-6", className)}>
            <div className="space-y-5">
                <SessionNameSection {...{ form }} className="[&_h6]:text-lg lg:pl-4 md:pr-4 lg:pt-4" />
                <Separator />
                <div className="space-y-5 lg:pl-4 md:pr-4">
                    <p className="lg:hidden block text-sm font-medium">
                        You can proceed to your practice session without uploading slides.
                    </p>
                    <h6 className="text-lg">Slide {activeSlideIndex + 1}</h6>
                    <div className="w-auto h-90 rounded-lg overflow-hidden">
                        {activeSlide ? (
                            <>
                                {isDataUrlPdf(activeSlide) ? (
                                    <PDFViewer
                                        file={convertDataUrlToFile(activeSlide, `Slide-${activeSlideIndex + 1}`)}
                                    />
                                ) : (
                                    <img src={activeSlide} alt="" className="object-cover size-full rounded-lg" />
                                )}
                            </>
                        ) : (
                            <div className="size-full grid place-content-center bg-ghost-white text-primary-base rounded-lg border border-bright-gray">
                                <span>Upload slide to get started</span>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <ControlledFieldWrapper
                            control={form.control}
                            name={`slidesNotes.${activeSlideIndex}`}
                            label="Slide Note"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    placeholder="Enter your notes for this slide"
                                    className="resize-none focus-visible:ring-0 shadow-none text-gunmetal h-18"
                                />
                            )}
                        />
                        <GoalsSection {...{ form }} className="[&_h6]:text-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SlideDetailsSection;
