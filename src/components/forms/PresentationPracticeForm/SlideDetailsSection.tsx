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
import { Link } from "react-router-dom";

interface ISlideDetatilsSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const SlideDetailsSection = ({ className, form }: ISlideDetatilsSectionProps) => {
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.presentationPractice);
    const activeSlide = slidePreviews[activeSlideIndex];

    return (
        <section className={cn("flex flex-col gap-y-6", className)}>
            <div className="space-y-5">
                <div>
                    <div className="lg:flex hidden items-center justify-end gap-x-1 text-sm font-medium pt-4 pr-4">
                        <span>Need help setting up?</span>
                        <Link to="">
                            <span className="text-[#64BA9F]">Click here</span>
                        </Link>
                    </div>
                    <SessionNameSection {...{ form }} className="[&_h6]:text-lg lg:pl-4 md:pl-0 pl-3 md:pr-4 pr-3 lg:pt-0 pt-3 md:pb-0 pb-3 md:border-0 border border-bright-gray md:rounded-none rounded-lg" />
                </div>
                <Separator className="md:block hidden" />
                <div className="space-y-5 lg:pl-4 md:pr-4">
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
