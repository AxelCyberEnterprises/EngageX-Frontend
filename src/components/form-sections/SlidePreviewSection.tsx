import { convertDataUrlToFile, isDataUrlPdf } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import PDFViewer from "../widgets/pdf-viewer";

interface ISlidePreviewSectionProps extends HTMLAttributes<HTMLElement> {
    activeSlide: string;
    activeSlideIndex: number;
}

const SlidePreviewSection = ({ activeSlide, activeSlideIndex }: ISlidePreviewSectionProps) => {
    return (
        <div className="space-y-4">
            <h6 className="text-lg">Slide Preview</h6>
            <div className="space-y-4">
                <div className="w-auto md:h-29 h-36 p-2 border border-bright-gray rounded-lg overflow-hidden">
                    {isDataUrlPdf(activeSlide) ? (
                        <PDFViewer file={convertDataUrlToFile(activeSlide, `Slide-${activeSlideIndex + 1}`)} />
                    ) : (
                        <img src={activeSlide} alt="" className="object-cover size-full rounded-md" />
                    )}
                </div>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 text-gunmetal font-normal border-gunmetal"
                >
                    Preview Slide
                </Button>
            </div>
        </div>
    );
};

export default SlidePreviewSection;
