import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { OrganizationReportTable } from "@/components/tables/org-report-table";
import { EmailReportModal } from "@/components/modals/modalVariants/EmailReportModal";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useFetchSingleOrganization } from "@/hooks/organization";
import { useEmailReport } from "@/hooks/organization/useEmailReport";
import { toast } from "sonner";
import SuccessToast from "@/components/ui/custom-toasts/success-toasts";
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import { EmailReportFormValues } from "@/components/modals/modalVariants/EmailReportModal";

const OrganizationReport = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orgId = Number(searchParams.get("id"));
    const selectedIds: number[] = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const idsParam = params.get("ids");
        return idsParam
            ? idsParam
                  .split(",")
                  .map((id) => Number(id))
                  .filter((id) => !isNaN(id))
            : [];
    }, [location.search]);

    const { data: organization } = useFetchSingleOrganization(orgId);
    const [pendingEmailData, setPendingEmailData] = useState<EmailReportFormValues | null>(null);
    const emailReport = useEmailReport();

    const createReportPdf = async (ref: React.RefObject<HTMLDivElement | null>) => {
        const element = ref.current;
        if (!element) {
            throw new Error("PDF element not found");
        }

        try {
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

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            return pdf;
        } catch (error) {
            console.error("Error generating PDF:", error);
            throw new Error("Failed to generate PDF");
        }
    };

    const handleDownloadReport = useCallback(async () => {
        const element = pdfRef.current;
        if (!element) {
            return;
        }
        try {
            setIsGeneratingPDF(true);
            const pdf = await createReportPdf(pdfRef);
            pdf.save(`Progress-Report-${selectedIds}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGeneratingPDF(false);
        }
    }, [selectedIds]);

    const handleEmailReportSubmit = (data: EmailReportFormValues) => {
        setShowEmailModal(false);
        setPendingEmailData(data);
        toast(
            <SuccessToast
                heading={"Email send pending..."}
                description={`You will be notified when email is sent to recipients: ${data?.emails.join(", ")} successfully`}
            />,
        );
    };

    useEffect(() => {
        if (!showEmailModal && pendingEmailData) {
            (async () => {
                try {
                    const pdf = await createReportPdf(pdfRef);
                    const pdfBlob = pdf.output("blob");
                    const pdfFile = new File([pdfBlob], `Report-${orgId}.pdf`, { type: "application/pdf" });
                    emailReport.mutate(
                        {
                            orgId: orgId,
                            recipients: pendingEmailData.emails.join(","),
                            pdf_file: pdfFile,
                        },
                        {
                            onSuccess: () => {
                                toast(
                                    <SuccessToast
                                        heading={"Email sent successfully"}
                                        description={`Email has been sent to the specified recipients: ${pendingEmailData.emails.join(", ")} successfully`}
                                    />,
                                );
                            },
                            onError: (error) => {
                                toast(
                                    <ErrorToast
                                        heading={"Failed to send email"}
                                        description={`Failed to send email: ${error}`}
                                    />,
                                );
                            },
                        },
                    );
                } catch (error) {
                    toast(
                        <ErrorToast
                            heading={"Failed to generate PDF"}
                            description={`Failed to generate PDF: ${error}`}
                        />,
                    );
                } finally {
                    setPendingEmailData(null);
                }
            })();
        }
    }, [showEmailModal, pendingEmailData]);

    return (
        <div ref={pdfRef} className="p-6 bg-white min-h-screen">
            <div className="flex items-center justify-between pb-6 border-b border-[#EAECF0]">
                <h1 className="font-medium text-2xl text-[#101828]">Organization Report</h1>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#667085]" />
                        <input
                            type="text"
                            placeholder="Search Member"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-[#D0D5DD] rounded-lg outline-none w-64 text-sm"
                        />
                    </div>

                    <button
                        onClick={handleDownloadReport}
                        className="bg-[#fff] flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#344054] font-medium hover:bg-[#F9FAFB] transition-colors text-sm"
                        disabled={isGeneratingPDF}
                    >
                        Download Report
                    </button>

                    <button
                        onClick={() => setShowEmailModal(true)}
                        className="bg-[#fff] flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#344054] font-medium hover:bg-[#F9FAFB] transition-colors text-sm"
                    >
                        Email Report
                    </button>
                </div>
            </div>

            {/* Report Table */}
            <div className="mt-6">
                <OrganizationReportTable orgId={orgId} userIds={selectedIds} searchTerm={searchTerm} />
            </div>
            {showEmailModal && (
                <EmailReportModal
                    show={showEmailModal}
                    onClose={() => setShowEmailModal(false)}
                    orgID={orgId}
                    organizationName={organization?.name ?? "Acme Inc"}
                    onSubmit={handleEmailReportSubmit}
                />
            )}
        </div>
    );
};

export { OrganizationReport };
