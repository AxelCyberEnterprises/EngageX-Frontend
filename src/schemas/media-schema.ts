import { z } from "zod";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export const MediaSchema = z
    .array(z.instanceof(File))
    .refine((files) => files.length > 0, "File is required.")
    .refine(
        (files) => files.every((fileWithPreview) => fileWithPreview.size <= MAX_FILE_SIZE),
        `File size should not be more than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    );
