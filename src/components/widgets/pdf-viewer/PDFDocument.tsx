import { LoaderCircle } from "lucide-react";
import { Document, DocumentProps } from "react-pdf";

const PDFDocument = ({ children, file, loading, renderMode, onLoadSuccess }: DocumentProps) => {
    return (
        <Document
            file={file}
            loading={loading ?? <LoaderCircle className="size-4 animate-spin text-gunmetal" />}
            renderMode={renderMode ?? "custom"}
            onLoadSuccess={onLoadSuccess}
        >
            {children}
        </Document>
    );
};

export default PDFDocument;
