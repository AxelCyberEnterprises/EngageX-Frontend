import { cn } from "@/lib/utils";
import { HTMLAttributes, useCallback, useEffect } from "react";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import ErrorToast from "../ui/custom-toasts/error-toast";

type IUploadMediaTriggerProps<T extends FieldValues, K extends Path<T>> = HTMLAttributes<HTMLElement> & {
    accept?: DropzoneProps["accept"];
    maxSize?: DropzoneProps["maxSize"];
    disabled?: DropzoneProps["disabled"];
    multiple?: boolean;
    name: K;
};
export type IFilesWithPreview = {
    file: File;
    preview: string;
}[];

const UploadMediaTrigger = <T extends FieldValues, K extends Path<T>>({
    accept = {
        "application/vnd.ms-powerpoint": [".ppt"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
    },
    maxSize = 20 * 1024 * 1024, // 20MB
    className,
    children,
    name,
    disabled,
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
                    console.log("Error: ", error.message);
                    toast(
                        <ErrorToast
                            {...{
                                heading: "Invalid file type",
                                description: error.message.replace(/application\/[a-zA-Z0-9.\-+]+,?\s*/g, ""),
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

            const uploadedSlides = acceptedFiles.map((file) => {
                return {
                    file,
                };
            });

            // Store the file in the form state
            setValue(name, uploadedSlides as unknown as T[K], { shouldValidate: true });
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
        <Dropzone accept={accept} maxFiles={1} maxSize={maxSize} onDrop={handleDrop} disabled={disabled}>
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
