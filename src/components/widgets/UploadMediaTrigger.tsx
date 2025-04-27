import { cn, convertFileToDataUrl } from "@/lib/utils";
import { HTMLAttributes, useCallback, useEffect } from "react";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import ErrorToast from "../ui/custom-toasts/error-toast";

type IUploadMediaTriggerProps<T extends FieldValues, K extends Path<T>> = HTMLAttributes<HTMLElement> & {
    accept?: DropzoneProps["accept"];
    maxSize?: DropzoneProps["maxSize"];
    multiple?: boolean;
    name: K;
};
export type IFilesWithPreview = {
    file: File;
    preview: string;
}[];

const UploadMediaTrigger = <T extends FieldValues, K extends Path<T>>({
    accept = { "application/*": [".pdf", ".ppt", ".pptx"] },
    maxSize = 10 * 1024 * 1024, // 10MB
    className,
    children,
    name,
}: IUploadMediaTriggerProps<T, K>) => {
    const { register, unregister, setValue } = useFormContext();

    const handleDrop = useCallback(
        async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (rejectedFiles.length > 0) {
                const [
                    {
                        errors: [error],
                    },
                ] = rejectedFiles;

                if (error.code === "file-invalid-type") {
                    toast(
                        <ErrorToast
                            {...{
                                heading: "Invalid file type",
                                description: error.message.replace(" application/*,", ""),
                            }}
                        />,
                    );
                } else if (error.code === "too-many-files") {
                    toast(
                        <ErrorToast
                            {...{
                                heading: "Too many files",
                                description: "Please upload only one file",
                            }}
                        />,
                    );
                } else if (error.code === "file-too-large") {
                    toast(
                        <ErrorToast
                            {...{
                                heading: "File too large",
                                description: `File size should not be more than ${maxSize / 1024 / 1024}MB`,
                            }}
                        />,
                    );
                }

                return;
            }

            const newFiles = await Promise.all(
                acceptedFiles.map(async (file) => ({
                    file,
                    preview: await convertFileToDataUrl(file),
                })),
            );

            // Store uploaded slides in local storage
            localStorage.setItem(name, newFiles[0].preview);
            // Store the file in the form state
            setValue(name, newFiles as unknown as T[K], { shouldValidate: true });
        },
        [maxSize, name, setValue],
    );

    useEffect(() => {
        register(name);
        return () => {
            unregister(name);
        };
    }, [register, unregister, name]);

    return (
        <Dropzone accept={accept} maxFiles={1} maxSize={maxSize} onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={cn(className)}>
                    <input {...getInputProps()} />
                    {children}
                </div>
            )}
        </Dropzone>
    );
};

export default UploadMediaTrigger;
