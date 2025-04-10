import { LoaderCircle } from "lucide-react";
import { HTMLAttributes } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import CustomRenderer from "./CustomRenderer";

interface IPDFViewerProps extends HTMLAttributes<HTMLElement> {
    height?: number;
    file: File;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const PDFViewer = ({ file }: IPDFViewerProps) => {
    return (
        <Document
            file={file}
            loading={<LoaderCircle className="size-4 animate-spin text-gunmetal" />}
            renderMode="custom"
        >
            <Page
                pageNumber={1}
                customRenderer={() => <CustomRenderer />}
                renderTextLayer={false}
                renderAnnotationLayer={false}
            />
        </Document>
    );
};

export default PDFViewer;
