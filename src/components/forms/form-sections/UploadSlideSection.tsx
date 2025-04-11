import NoUploadedSlides from "@/assets/images/svgs/no-uploaded-slides.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UploadMediaTrigger from "@/components/widgets/UploadMediaTrigger";
import { cn, convertDataUrlToFile } from "@/lib/utils";
import { useAppDispatch } from "@/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { Plus, UploadCloud } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { HTMLAttributes, useCallback, useId, useMemo } from "react";
import { pdfjs } from "react-pdf";
import PDFDocument from "../../widgets/pdf-viewer/PDFDocument";
import PDFPage from "../../widgets/pdf-viewer/PDFPage";

interface IUploadSlideSectionProps extends HTMLAttributes<HTMLElement> {
    activeSlideIndex: number;
    slidePreviews: string[];
    numSlides: number;
    setActiveSlideIndex: (index: number) => UnknownAction;
    setNumSlides: (numSlides: number) => UnknownAction;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const UploadSlideSection = ({
    className,
    activeSlideIndex,
    slidePreviews,
    numSlides,
    setActiveSlideIndex,
    setNumSlides,
}: IUploadSlideSectionProps) => {
    const slideId = useId();
    const [slidePreview] = useMemo(() => slidePreviews, [slidePreviews]);
    const slidePreviewFile = useMemo(
        () => (slidePreview ? convertDataUrlToFile(slidePreview, `Slide-${slideId}`) : null),
        [slideId, slidePreview],
    );
    const dispatch = useAppDispatch();

    const handleSlideClick = useCallback(
        (index: number) => {
            dispatch(setActiveSlideIndex(index));
        },
        [dispatch, setActiveSlideIndex],
    );

    const handleLoadSuccess = useCallback(
        ({ numPages }: PDFDocumentProxy) => {
            dispatch(setNumSlides(numPages));
        },
        [dispatch, setNumSlides],
    );

    return (
        <>
            <section className={cn("lg:flex flex-col hidden gap-y-4", className)}>
                <h6 className="text-lg">Upload slides</h6>
                <div className="space-y-2">
                    <p className="font-medium">You can proceed to your practice session without uploading slides.</p>
                    <UploadMediaTrigger
                        name="slides"
                        className="flex flex-col gap-y-3 p-4 items-center bg-ghost-white text-sm text-independence rounded-lg"
                    >
                        <UploadCloud className="size-5 text-gunmetal" />
                        <span className="text-center">
                            Drag and drop slides here
                            <br />
                            PDF, PPTX
                            <br /> (max. 800x400px)
                        </span>
                        <span>Or</span>
                        <Button type="button" className="bg-green-sheen hover:bg-green-sheen/80 transition-colors">
                            Upload Slide
                        </Button>
                    </UploadMediaTrigger>
                </div>
                <Separator className="bg-bright-gray" />
                <div className="space-y-5 [&_.react-pdf\_\_Document]:flex [&_.react-pdf\_\_Document]:flex-col [&_.react-pdf\_\_Document]:gap-y-4">
                    <h6 className="text-lg">Uploaded Slides {numSlides > 0 && numSlides}</h6>
                    <div
                        className={cn("flex flex-col gap-y-3", {
                            hidden: numSlides === 0,
                        })}
                    >
                        <PDFDocument file={slidePreviewFile} onLoadSuccess={handleLoadSuccess}>
                            {Array.from({ length: numSlides }, (_, index) => (
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
                                        {numSlides > 0 && <PDFPage pageNumber={index + 1} />}
                                    </div>
                                </div>
                            ))}
                        </PDFDocument>
                    </div>
                    <div
                        className={cn(
                            "flex flex-col gap-y-3 p-4 items-center bg-ghost-white text-sm text-primary-base rounded-lg",
                            {
                                hidden: numSlides > 0,
                            },
                        )}
                    >
                        <img src={NoUploadedSlides} alt="" className="object-cover" />
                        <span>No slide uploaded yet</span>
                    </div>
                </div>
            </section>
            <section className="lg:hidden absolute bottom-0 inset-x-0 p-4 flex items-start gap-x-3 border-t border-bright-gray bg-white overflow-auto hide-scrollbar z-10 [&>.react-pdf\_\_Document]:flex [&>.react-pdf\_\_Document]:gap-3">
                <div className="flex flex-col gap-y-2 whitespace-nowrap">
                    <span className="text-sm text-center">Upload New slide</span>

                    <UploadMediaTrigger
                        name="slides"
                        className="w-42.5 h-24 grid place-content-center bg-ghost-white rounded-lg cursor-pointer border border-bright-gray"
                    >
                        <Plus className="size-5" />
                    </UploadMediaTrigger>
                </div>
                {numSlides > 0 && (
                    <PDFDocument file={slidePreviewFile} onLoadSuccess={handleLoadSuccess}>
                        {Array.from({ length: numSlides }, (_, index) => (
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
                                    {numSlides > 0 && <PDFPage pageNumber={index + 1} />}
                                </div>
                            </div>
                        ))}
                    </PDFDocument>
                )}
            </section>
        </>
    );
};

export default UploadSlideSection;
