import { cn } from "@/lib/utils";
import { UploadCSVSchema } from "@/schemas/dashboard/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { File, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import UploadMediaTrigger from "../../widgets/UploadMediaTrigger";

type FormType = z.infer<typeof UploadCSVSchema>;

const UploadCSVForm = () => {
    const form = useForm<FormType>({
        resolver: zodResolver(UploadCSVSchema),
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))}>
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
                    </div>

                    <Button
                        type="button"
                        disabled={false}
                        isLoading={false}
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
