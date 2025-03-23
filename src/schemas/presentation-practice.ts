import { z } from "zod";
import { MediaSchema } from "./media-schema";

export const PresentationPracticeSchema = z.object({
    sessionName: z.string(),
    slides: MediaSchema,
    slidesNotes: z.array(z.string().optional()),
    goals: z.array(
        z.object({
            id: z.number(),
            goal: z.string(),
        }),
    ),
    transitionType: z.enum(["fade", "slide", "none"]),
    allocatedTime: z.number().int().positive(),
    totalAllocatedTime: z.number().int().positive(),
});
