import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import FeatureWalkthrough from "@/components/dialogs/dialog-contents/FeatureWalkthrough";
import GoalsSection from "@/components/forms/form-sections/GoalsSection";
import SessionNameSection from "@/components/forms/form-sections/SessionNameSection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn, convertDataUrlToFile } from "@/lib/utils";
import { useAppDispatch } from "@/store";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { HTMLAttributes, useId, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import PDFDocument from "../../widgets/pdf-viewer/PDFDocument";
import PDFPage from "../../widgets/pdf-viewer/PDFPage";

interface ISlideDetailsSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    activeSlideIndex: number;
    slidePreviews: string[];
    numSlides: number;
}

const SlideDetailsSection = ({
    className,
    form,
    activeSlideIndex,
    slidePreviews,
    numSlides,
}: ISlideDetailsSectionProps) => {
    const slideId = useId();
    const [slidePreview] = useMemo(() => slidePreviews, [slidePreviews]);
    const slidePreviewFile = useMemo(
        () => (slidePreview ? convertDataUrlToFile(slidePreview, `Slide-${slideId}`) : null),
        [slideId, slidePreview],
    );
    const dispatch = useAppDispatch();

    return (
        <section className={cn("flex flex-col gap-y-6", className)}>
            <div className="space-y-5">
                <div>
                    <div className="lg:flex lg:hidden hidden items-center justify-end gap-x-1 text-sm font-medium pt-4 pr-4">
                        <span>Need help setting up?</span>
                        <Button
                            type="button"
                            className="size-fit bg-transparent hover:bg-transparent p-0 shadow-none"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "feature-walkthrough",
                                        children: <FeatureWalkthrough />,
                                    }),
                                )
                            }
                        >
                            <span className="text-[#64BA9F]">Click here</span>
                        </Button>
                    </div>
                    <SessionNameSection
                        {...{ form }}
                        className="[&_h6]:text-lg lg:pl-4 md:pl-0 pl-3 md:pr-4 pr-3 lg:pt-0 pt-3 md:pb-0 pb-3 md:border-0 border border-bright-gray md:rounded-none rounded-lg"
                    />
                </div>
                <Separator />
                <div className="space-y-5 lg:pl-4 md:pr-4">
                    <h6 className="text-lg">Slide {activeSlideIndex + 1}</h6>
                    <div className="w-auto h-90 rounded-lg overflow-hidden">
                        {numSlides > 0 ? (
                            <PDFDocument file={slidePreviewFile}>
                                {numSlides > 0 && <PDFPage pageNumber={activeSlideIndex + 1} />}
                            </PDFDocument>
                        ) : (
                            <div className="size-full grid place-content-center bg-ghost-white text-primary-base rounded-lg border border-bright-gray">
                                <span>Upload slide to get started</span>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <ControlledFieldWrapper
                            control={form.control}
                            name="notes"
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
