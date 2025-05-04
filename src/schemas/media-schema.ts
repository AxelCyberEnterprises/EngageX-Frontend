import { z } from "zod";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const FileWithIDSchema = z.object({
    id: z.number(),
    file: z.instanceof(File),
});

export const MediaSchema = z
    .array(FileWithIDSchema)
    .refine((files) => files.length > 0, "File is required.")
    .refine(
        (files) => files.every(({ file }) => file.size <= MAX_FILE_SIZE),
        `File size should not be more than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    );
