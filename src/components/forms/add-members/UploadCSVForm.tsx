import { cn } from "@/lib/utils";
import { UploadCSVSchema } from "@/schemas/dashboard/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { File, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import UploadMediaTrigger from "../../widgets/UploadMediaTrigger";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useCreateEnterpriseUserBulk } from "@/hooks/organization/useCreateEnterpriseUserBulk";
import { toast } from "sonner";
import SuccessToast from "@/components/ui/custom-toasts/success-toasts";
import { useQueryClient } from "@tanstack/react-query";
import ErrorToast from "@/components/ui/custom-toasts/error-toast";

type FormType = z.infer<typeof UploadCSVSchema>;

const UploadCSVForm = () => {
    const [searchParams] = useSearchParams();
    const enterpriseId = searchParams.get("id") ?? "";
    const [fileIsSelected, setFileIsSelected] = useState(false);
    const queryClient = useQueryClient();
    const { mutate: createEnterpriseUserBulk, isPending } = useCreateEnterpriseUserBulk();
    const form = useForm<FormType>({
        resolver: zodResolver(UploadCSVSchema),
    });

    useEffect(() => {
        if (form.getValues("csv")) {
        setFileIsSelected(true);
        } else {
        setFileIsSelected(false);
        }
    }, [form.watch("csv")]);

    const handleSubmit = useCallback(
        (values: FormType) => {
        if (!values.csv) return;

        // Convert File -> Base64 before sending
            createEnterpriseUserBulk(
            {
                enterprise_id: +enterpriseId,
                file: values.csv[0],
                send_invitation: true,
            },
            {
                onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["enterprise-users", enterpriseId],
                });
                toast(
                    <SuccessToast
                    heading="Upload successful"
                    description="Users have been uploaded from the Excel file."
                    />
                );
                },
                onError: (error) => {
                console.error("Error uploading Excel: ", error);
                toast(
                    <ErrorToast
                    heading="Upload failed"
                    description="There was an issue processing the Excel file."
                    />
                );
                },
            }
            );
        },
        [createEnterpriseUserBulk, enterpriseId, queryClient]
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <UploadMediaTrigger
                    name="csv"
                    accept={{
                        "text/csv": [".csv"],
                        "application/vnd.ms-excel": [".csv"],
                    }}
                    disabled={false}
                    className="flex flex-col gap-6 items-center justify-center p-8 border border-dashed border-[#98A2B3] rounded-[12px]"
                >
                    <File className="h-12 w-10 text-[#B9BCC8]" />

                    <div className="space-y-2 text-center text-primary-blue">
                        <h6 className="text-2xl font-normal">Upload CSV File</h6>
                        <p className="text-base">
                            <span>Drag and drop your CSV file here, or</span>
                            <span className="text-green-sheen cursor-pointer"> click to browse</span>
                        </p>
                        {fileIsSelected && <p className="text-base">1 file selected</p>}
                    </div>

                    <Button
                        type="submit"
                        onClick={(e) => e.stopPropagation()}
                        disabled={!fileIsSelected || isPending}
                        isLoading={isPending}
                        className={cn("font-normal bg-green-sheen hover:bg-green-sheen/90 transition-colors")}
                    >
                        <Upload />
                        Upload CSV
                    </Button>
                </UploadMediaTrigger>
            </form>
        </Form>
    );
};

export default UploadCSVForm;
