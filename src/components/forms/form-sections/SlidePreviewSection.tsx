import { HTMLAttributes } from "react";
import { Button } from "../../ui/button";
import PDFDocument from "../../widgets/pdf-viewer/PDFDocument";
import PDFPage from "../../widgets/pdf-viewer/PDFPage";

interface ISlidePreviewSectionProps extends HTMLAttributes<HTMLElement> {
    activeSlideIndex: number;
    slidePreviewFile: File | null;
}

const SlidePreviewSection = ({ activeSlideIndex, slidePreviewFile }: ISlidePreviewSectionProps) => {
    return (
        <div className="space-y-4">
            <h6 className="text-lg">Slide Preview</h6>
            <div className="space-y-4">
                <div className="w-auto md:h-29 h-36 p-2 border border-bright-gray rounded-lg overflow-hidden">
                    {slidePreviewFile ? (
                        <PDFDocument file={slidePreviewFile}>
                            <PDFPage pageNumber={activeSlideIndex + 1} />
                        </PDFDocument>
                    ) : (
                        <div className="size-full grid place-content-center bg-ghost-white text-sm text-primary-base rounded-md border border-bright-gray">
                            <span>No slide uploaded yet</span>
                        </div>
                    )}
                </div>
                <Button
                    type="button"
                    disabled={!slidePreviewFile}
                    className="w-full h-10 bg-[#ECEEF4] hover:bg-[#ECEEF4]/80 text-gunmetal font-normal border-gunmetal"
                >
                    Preview Slide
                </Button>
            </div>
        </div>
    );
};

export default SlidePreviewSection;
