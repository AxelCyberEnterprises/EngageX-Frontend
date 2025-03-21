import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import GoalsSection from "@/components/widgets/GoalsSection";
import PDFViewer from "@/components/widgets/pdf-viewer";
import { cn, isPdf } from "@/lib/utils";
import { RootState } from "@/store";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormType } from ".";

interface ISlideDetailsSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const SlideDetailsSection = ({ className, form }: ISlideDetailsSectionProps) => {
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.pitchPractice);

    return (
        <section className={cn("flex flex-col gap-y-6", className)}>
            {slidePreviews.length > 0 && (
                <>
                    <h6 className="text-lg">Slide {activeSlideIndex + 1}</h6>
                    {slidePreviews.map(({ file, preview }, index) => (
                        <div
                            key={preview + index}
                            className={cn("hidden space-y-4", {
                                block: index === activeSlideIndex,
                            })}
                        >
                            <div className="w-auto h-90 rounded-lg overflow-hidden">
                                {isPdf(file) ? (
                                    <PDFViewer file={file} />
                                ) : (
                                    <img src={preview} alt="" className="object-cover size-full rounded-lg" />
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
                                            className="resize-none focus-visible:ring-0 shadow-none text-gunmetal h-24.5"
                                        />
                                    )}
                                />
                                <div className="flex items-center gap-x-4">
                                    <Switch className="p-0 justify-start h-6 w-10 [&_[data-slot='switch-thumb']]:size-5" />
                                    <span className="text-sm">Enable Q&A for This Slide</span>
                                </div>
                                <GoalsSection {...{ form }} className="[&_h6]:text-lg" />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </section>
    );
};

export default SlideDetailsSection;
