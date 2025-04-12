import { Page, PageProps } from "react-pdf";
import CustomRenderer from "./CustomRenderer";

const PDFPage = ({ pageNumber }: PageProps) => {
    return (
        <Page
            pageNumber={pageNumber}
            customRenderer={() => <CustomRenderer />}
            renderTextLayer={false}
            renderAnnotationLayer={false}
        />
    );
};

export default PDFPage;
