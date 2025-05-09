import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UploadMediaTrigger from "@/components/widgets/UploadMediaTrigger";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { LoaderCircle, Plus, UploadCloud } from "lucide-react";
import { HTMLAttributes, useCallback } from "react";
import { pdfjs } from "react-pdf";

interface IUploadSlideSectionProps extends HTMLAttributes<HTMLElement> {
    activeSlideIndex: number;
    isGeneratingPreview: boolean;
    sessionType: "presentation" | "pitch";
    slidePreviews: string[];
    setActiveSlideIndex: (index: number) => UnknownAction;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const UploadSlideSection = ({
    className,
    activeSlideIndex,
    isGeneratingPreview,
    sessionType,
    slidePreviews,
    setActiveSlideIndex,
}: IUploadSlideSectionProps) => {
    const dispatch = useAppDispatch();

    const handleSlideClick = useCallback(
        (index: number) => {
            dispatch(setActiveSlideIndex(index));
        },
        [dispatch, setActiveSlideIndex],
    );

    return (
        <>
            <section className={cn("lg:flex flex-col hidden gap-y-4", className)}>
                <h6 className="text-lg">Upload slides</h6>

                <div className="space-y-2">
                    <p className="text-sm">
                        You have the option to upload your slides or proceed to {sessionType} practice without uploading
                        your slides to the platform
                    </p>
                    <UploadMediaTrigger
                        name="slides"
                        disabled={isGeneratingPreview}
                        className="flex flex-col gap-y-3 p-4 items-center bg-ghost-white text-sm text-independence rounded-lg"
                    >
                        <UploadCloud className="size-5 text-gunmetal" />
                        <span className="text-center">
                            Drag and drop slides here
                            <br />
                            PPT, PPTX
                            <br /> (20MB max)
                        </span>
                        <span>Or</span>
                        <Button
                            type="button"
                            disabled={isGeneratingPreview}
                            isLoading={isGeneratingPreview}
                            className="bg-green-sheen hover:bg-green-sheen/80 transition-colors"
                        >
                            Upload Slide
                        </Button>
                    </UploadMediaTrigger>
                </div>

                <Separator className="bg-bright-gray" />

                <div className="space-y-5">
                    <h6 className="text-lg">
                        Uploaded Slides {slidePreviews.length > 0 && `(${slidePreviews.length})`}
                    </h6>

                    {slidePreviews.length > 0 ? (
                        <div className="flex flex-col gap-y-3">
                            {slidePreviews.map((preview, index) => (
                                <div
                                    key={`page-${index + 1}`}
                                    className="flex items-start gap-x-3 cursor-pointer"
                                    onClick={() => handleSlideClick(index)}
                                >
                                    <span className="text-sm">{index + 1}</span>
                                    <div
                                        className={cn("w-full h-24 overflow-hidden rounded-md", {
                                            "border-2 border-gunmetal": index === activeSlideIndex,
                                        })}
                                    >
                                        <img src={preview} alt="" className="size-full object-cover" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState text="No slide uploaded yet" />
                    )}
                </div>
            </section>

            <section className="lg:hidden md:absolute fixed bottom-0 inset-x-0 p-4 flex items-start gap-x-3 border-t border-bright-gray bg-white overflow-auto hide-scrollbar z-10 [&>.react-pdf\_\_Document]:flex [&>.react-pdf\_\_Document]:gap-3">
                <div className="flex flex-col items-center gap-y-2 whitespace-nowrap">
                    <span className="text-sm">Upload New slide</span>

                    <UploadMediaTrigger
                        name="slides"
                        disabled={isGeneratingPreview}
                        className="w-42.5 h-24 grid place-content-center bg-ghost-white rounded-lg cursor-pointer border border-bright-gray"
                    >
                        {isGeneratingPreview ? (
                            <LoaderCircle className="size-5 animate-spin" />
                        ) : (
                            <Plus className="size-5" />
                        )}
                    </UploadMediaTrigger>
                </div>
                {slidePreviews.map((preview, index) => (
                    <div
                        key={`page-${index + 1}`}
                        className="flex flex-col items-start gap-y-2 cursor-pointer"
                        onClick={() => handleSlideClick(index)}
                    >
                        <span className="text-sm">{index + 1}</span>
                        <div
                            className={cn("w-42.5 h-24 overflow-hidden rounded-md", {
                                "border-2 border-gunmetal": index === activeSlideIndex,
                            })}
                        >
                            <img src={preview} alt="" className="size-full object-cover" />
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default UploadSlideSection;
