import { isPdf } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { IFilesWithPreview } from "../widgets/UploadMediaTrigger";
import PDFViewer from "../widgets/pdf-viewer";

interface ISlidePreviewSectionProps extends HTMLAttributes<HTMLElement> {
    activeSlide: IFilesWithPreview[number];
}

const SlidePreviewSection = ({ activeSlide }: ISlidePreviewSectionProps) => {
    return (
        <div className="space-y-4">
            <h6 className="text-lg">Slide Preview</h6>
            <div className="space-y-4">
                <div className="w-auto md:h-29 h-36 p-2 border border-bright-gray rounded-lg overflow-hidden">
                    {isPdf(activeSlide.file) ? (
                        <PDFViewer file={activeSlide.file} />
                    ) : (
                        <img src={activeSlide.preview} alt="" className="object-cover size-full rounded-md" />
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
