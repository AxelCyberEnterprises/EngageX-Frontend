import SessionComparisonResults from "@/components/dashboard/SessionComparison";
import { formatSessionMetricsData } from "@/components/tables/performance-metric-table/user/dataTwo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSessionComparison } from "@/hooks/auth";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React, { useCallback, useMemo, useRef, useState } from "react";
import download from "../../assets/images/svgs/download-dark.svg";

interface CompareSessionsPanelProps {
    id1: string;
    id2: string;
    onClose: () => void;
}

// The parts of a session in the compare-sessions response that this panel reads.
interface ComparedSession {
    id: number | string;
    date: string;
    session_name?: string;
    duration?: string | null;
    overall_captured_impact?: number;
    vocal_variety?: number;
    emotional_impact?: number;
    body_language?: number;
    transformative_communication?: number;
    structure_and_clarity?: number;
    language_and_word_choice?: number;
    audience_engagement?: number;
    strength?: unknown[];
    area_of_improvement?: unknown[];
}

// Shapes a session from the compare-sessions response for the results component.
const formatSessionData = (session?: ComparedSession) => {
    if (!session) return undefined;

    const formattedDate = new Date(session.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const overallScore = Math.round(
        ((session.overall_captured_impact || 0) +
            (session.vocal_variety || 0) +
            (session.emotional_impact || 0) +
            (session.body_language || 0) +
            (session.transformative_communication || 0) +
            (session.structure_and_clarity || 0) +
            (session.language_and_word_choice || 0) +
            (session.audience_engagement || 0)) /
            8,
    );

    return {
        id: session.id.toString(),
        title: session.session_name || `Session ${session.id}`,
        dateRange: formattedDate,
        duration: session.duration ? session.duration.replace(/^00:/, "") : "0 min",
        overallScore,
        strengths: session.strength || [],
        improvements: session.area_of_improvement || [],
    };
};

/**
 * Comparison of two sessions, shown on the combined Report History page.
 * Moved here from the standalone Session Comparison page, which is no longer in the menu.
 */
const CompareSessionsPanel: React.FC<CompareSessionsPanelProps> = ({ id1, id2, onClose }) => {
    const { data, isLoading, isError } = useSessionComparison(id1, id2);
    const pdfRef = useRef<HTMLDivElement>(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const tableData = useMemo(() => (data ? formatSessionMetricsData(data) : []), [data]);
    const session1 = useMemo(() => formatSessionData(data?.session1), [data]);
    const session2 = useMemo(() => formatSessionData(data?.session2), [data]);

    const handleDownloadReport = useCallback(async () => {
        const element = pdfRef.current;
        if (!element) return;
        try {
            setIsGeneratingPDF(true);
            const canvas = await html2canvas(element, {
                scale: 1.5,
                useCORS: true,
                allowTaint: true,
                logging: false,
            });

            const imgData = canvas.toDataURL("image/png");
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const pdf = new jsPDF({
                orientation: imgWidth > imgHeight ? "landscape" : "portrait",
                unit: "px",
                format: [imgWidth, imgHeight],
            });

            pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            pdf.save(`Session-Report-${id1}-${id2}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGeneratingPDF(false);
        }
    }, [id1, id2]);

    return (
        <div ref={pdfRef} className="w-full rounded-lg border border-bright-gray p-4 md:p-6">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                <div>
                    <h1 className="xl:text-2xl text-xl text-[#252A39]">Session-by-Session Comparison</h1>
                    <p className="text-[#6F7C8E]">Compare any two sessions to see detailed performance differences</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="bg-white text-[#252A39] border-[#6F7C8E] hover:bg-gray-50 shadow-none sm:flex hidden items-center gap-2"
                        onClick={handleDownloadReport}
                        disabled={!data || isGeneratingPDF}
                    >
                        <img src={download} alt="download icon" />
                        Download Report
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-white text-[#252A39] border-[#6F7C8E] hover:bg-gray-50 shadow-none"
                        onClick={onClose}
                    >
                        Close comparison
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            ) : isError || !data ? (
                <p className="text-red-500">The comparison could not be loaded. Please try again.</p>
            ) : (
                <SessionComparisonResults session1={session1} session2={session2} tableData={tableData} />
            )}
        </div>
    );
};

export default CompareSessionsPanel;
