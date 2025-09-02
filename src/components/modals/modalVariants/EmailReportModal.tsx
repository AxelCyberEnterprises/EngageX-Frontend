import React, { useState, useRef, KeyboardEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderCircle, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
//import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import Modal from "..";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEmailReport } from "@/hooks/organization/useEmailReport";
import jsPDF from "jspdf";
import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import SuccessToast from "@/components/ui/custom-toasts/success-toasts";

const emailReportSchema = z.object({
    emails: z.array(z.string().email("Invalid email address")).min(1, "At least one email is required"),
    currentEmail: z.string().optional(),
});

type EmailReportFormValues = z.infer<typeof emailReportSchema>;

interface EmailReportModalProps {
    show: boolean;
    onClose: () => void;
    orgID: number;
    organizationName: string;
    pdfReport: (ref: React.RefObject<HTMLDivElement | null>) => Promise<jsPDF>;
    pdfRef: React.RefObject<HTMLDivElement | null>;
}

const EmailReportModal: React.FC<EmailReportModalProps> = ({ show, onClose, orgID, pdfReport, pdfRef }) => {
    const emailReport = useEmailReport();
    const [emailTags, setEmailTags] = useState<string[]>([]);
    const [currentEmail, setCurrentEmail] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<EmailReportFormValues>({
        resolver: zodResolver(emailReportSchema),
        defaultValues: {
            emails: [],
            currentEmail: "",
        },
    });

    const onSubmit: SubmitHandler<EmailReportFormValues> = async (data) => {
        const pdf = await pdfReport(pdfRef);
        const pdfBlob = pdf.output("blob");
        const pdfFile = new File([pdfBlob], `Report-${orgID}.pdf`, { type: "application/pdf" });
        emailReport.mutate(
            {
                orgId: orgID,
                recipients: data?.emails.join(","),
                pdf_file: pdfFile,
            },
            {
                onSuccess: () => {
                    toast(
                        <SuccessToast
                            heading={"Email sent successfully"}
                            description={`Email has been sent to the specified recipients: ${data?.emails.join(", ")} successfully`}
                        />,
                    );
                    form.reset();
                    setEmailTags([]);
                    setCurrentEmail("");
                    onClose();
                },
                onError: (error) => {
                    toast(
                        <ErrorToast heading={"Failed to send email"} description={`Failed to send email: ${error}`} />,
                    );
                },
            },
        );
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const addEmail = (email: string) => {
        const trimmedEmail = email.trim();
        if (trimmedEmail && isValidEmail(trimmedEmail) && !emailTags.includes(trimmedEmail)) {
            const newEmails = [...emailTags, trimmedEmail];
            setEmailTags(newEmails);
            form.setValue("emails", newEmails);
            setCurrentEmail("");
        }
    };

    const removeEmail = (indexToRemove: number) => {
        const newEmails = emailTags.filter((_, index) => index !== indexToRemove);
        setEmailTags(newEmails);
        form.setValue("emails", newEmails);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (currentEmail.trim()) {
                addEmail(currentEmail);
            }
        } else if (e.key === "Backspace" && !currentEmail && emailTags.length > 0) {
            removeEmail(emailTags.length - 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentEmail(e.target.value);
    };

    const handleInputBlur = () => {
        if (currentEmail.trim()) {
            addEmail(currentEmail);
        }
    };

    const handleModalClose = () => {
        form.reset();
        setEmailTags([]);
        setCurrentEmail("");
        onClose();
    };

    const hasEmails = emailTags.length > 0;

    return (
        <Modal show={show} onClose={handleModalClose} className="sm:w-full w-[90%] max-w-md mx-4 p-6">
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px] font-medium text-gray-900">Email Report</h2>
                    <button onClick={handleModalClose} className="p-1 bg-white">
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="emails"
                            render={() => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#252A39] font-inter">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <div className="min-h-[40px] w-full px-3 py-2 border rounded-md flex flex-wrap items-center gap-2 focus-[#E4E7EC] focus-[#E4E7EC]">
                                            {emailTags.map((email, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                                >
                                                    <span>{email}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeEmail(index)}
                                                        className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            <Input
                                                ref={inputRef}
                                                type="text"
                                                value={currentEmail}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                onBlur={handleInputBlur}
                                                placeholder={emailTags.length === 0 ? "Enter email" : ""}
                                                className="flex-1 min-w-[120px] bg-transparent text-gray-700 placeholder-gray-400 border-none shadow-none focus-visible:ring-0 focus:shadow-none active:shadow-none !focus-visible:shadow-none !focus-visible:border-none"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleModalClose}
                                className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!hasEmails || emailReport.isPending}
                                className={`py-3 text-white transition-colors ${
                                    hasEmails ? "bg-[#64BA9F] hover:bg-[#5aa88f]" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {!emailReport.isPending && "Send Email"}
                                {emailReport.isPending && <LoaderCircle className="animate-spin" />}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

export { EmailReportModal };
