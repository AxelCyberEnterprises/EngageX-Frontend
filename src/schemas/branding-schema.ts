import { z } from "zod";
import { MediaSchema } from "./media-schema";

export const BrandingSchema = z.object({
    logo: MediaSchema.optional(),
    favicon: MediaSchema.optional(),
    domain: z.string().url("Invalid URL format").optional(),
    primary_color: z.string().optional(),
    secondary_color: z.string().optional(),
});
