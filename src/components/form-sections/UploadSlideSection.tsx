import NoUploadedSlides from "@/assets/images/svgs/no-uploaded-slides.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PDFViewer from "@/components/widgets/pdf-viewer";
import UploadMediaTrigger from "@/components/widgets/UploadMediaTrigger";
import { cn, convertDataUrlToFile, isDataUrlPdf } from "@/lib/utils";
import { UnknownAction } from "@reduxjs/toolkit";
import { Plus, UploadCloud } from "lucide-react";
import { HTMLAttributes, useCallback } from "react";
import { useDispatch } from "react-redux";

interface IUploadSlideSectionProps extends HTMLAttributes<HTMLElement> {
    activeSlideIndex: number;
    slidePreviews: string[];
    setActiveSlideIndex: (index: number) => UnknownAction;
}

const UploadSlideSection = ({
    className,
    activeSlideIndex,
    slidePreviews,
    setActiveSlideIndex,
}: IUploadSlideSectionProps) => {
    const dispatch = useDispatch();

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
                    <p className="text-sm font-medium">You can proceed to your practice session without uploading slides.</p>
                    <UploadMediaTrigger
                        name="slides"
                        className="flex flex-col gap-y-3 p-4 items-center bg-ghost-white text-sm text-independence rounded-lg"
                    >
                        <UploadCloud className="size-5 text-gunmetal" />
                        <span className="text-center">
                            Drag and drop slides here
                            <br /> PNG, JPG, PDF (max. 800x400px)
                        </span>
                        <span>Or</span>
                        <Button type="button" className="bg-green-sheen hover:bg-green-sheen/80 transition-colors">
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
                            {slidePreviews.map((preview, i) => (
                                <div
                                    key={preview + i}
                                    className="flex items-start gap-x-3 cursor-pointer"
                                    onClick={() => handleSlideClick(i)}
                                >
                                    <span className="text-sm">{i + 1}</span>
                                    <div
                                        className={cn("w-full h-24 overflow-hidden rounded-md", {
                                            "border-2 border-gunmetal": i === activeSlideIndex,
                                        })}
                                    >
                                        {isDataUrlPdf(preview) ? (
                                            <PDFViewer file={convertDataUrlToFile(preview, `Slide-${i + 1}`)} />
                                        ) : (
                                            <img src={preview} alt="slide" className="object-cover size-full" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-y-3 p-4 items-center bg-ghost-white text-sm text-primary-base rounded-lg">
                            <img src={NoUploadedSlides} alt="" className="object-cover" />
                            <span>No slide uploaded yet</span>
                        </div>
                    )}
                </div>
            </section>
            <section className="lg:hidden absolute bottom-0 inset-x-0 p-4 flex items-start gap-x-3 border-t border-bright-gray bg-white overflow-auto hide-scrollbar z-10">
                <div className="flex flex-col gap-y-2 whitespace-nowrap">
                    <span className="text-sm text-center">Upload New slide</span>

                    <UploadMediaTrigger
                        name="slides"
                        className="w-42.5 h-24 grid place-content-center bg-ghost-white rounded-lg cursor-pointer border border-bright-gray"
                    >
                        <Plus className="size-5" />
                    </UploadMediaTrigger>
                </div>
                {slidePreviews.map((preview, i) => (
                    <div
                        key={preview + i}
                        className="flex flex-col items-start gap-y-2 cursor-pointer"
                        onClick={() => handleSlideClick(i)}
                    >
                        <span className="text-sm">{i + 1}</span>
                        <div
                            className={cn("w-42.5 h-24 overflow-hidden rounded-md", {
                                "border-2 border-gunmetal": i === activeSlideIndex,
                            })}
                        >
                            {isDataUrlPdf(preview) ? (
                                <PDFViewer file={convertDataUrlToFile(preview, `Slide-${i + 1}`)} />
                            ) : (
                                <img src={preview} alt="slide" className="object-cover size-full" />
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default UploadSlideSection;
