import { z } from "zod";
import { MediaSchema } from "./media-schema";

export const PitchPracticeSchema = z.object({
    sessionName: z.string(),
    slides: MediaSchema,
    slidesNotes: z.array(z.string().optional()),
    qaQuestionsPerSession: z.number().int().positive(),
    goals: z.array(
        z.object({
            id: z.number(),
            goal: z.string(),
        }),
    ),
});
