import { cn, convertFileToDataUrl, isFileWithPreview } from "@/lib/utils";
import { HTMLAttributes, useCallback, useEffect } from "react";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import ErrorToast from "../ui/custom-toasts/error-toast";

type IUploadMediaTriggerProps<T extends FieldValues, K extends Path<T>> = HTMLAttributes<HTMLElement> & {
    accept?: DropzoneProps["accept"];
    multiple?: boolean;
    name: K;
};
export type IFilesWithPreview = {
    file: File;
    preview: string;
}[];

const UploadMediaTrigger = <T extends FieldValues, K extends Path<T>>({
    accept = { "application/*": [".pdf", ".ppt", ".pptx"] },
    className,
    children,
    name,
}: IUploadMediaTriggerProps<T, K>) => {
    const { register, unregister, setValue, watch } = useFormContext();
    const files = watch(name) as IFilesWithPreview | undefined;

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
                }
            }

            const newFiles = await Promise.all(
                acceptedFiles.map(async (file) => ({
                    file,
                    preview: await convertFileToDataUrl(file),
                })),
            );

            setValue(name, newFiles as unknown as T[K], { shouldValidate: true });
        },
        [name, setValue],
    );

    useEffect(() => {
        register(name);
        return () => {
            unregister(name);
        };
    }, [register, unregister, name]);

    useEffect(() => {
        return () => {
            if (!files) return;
            files.forEach((file) => {
                if (isFileWithPreview(file)) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [files]);

    return (
        <Dropzone accept={accept} maxFiles={1} onDrop={handleDrop}>
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
