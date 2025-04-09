import { z } from "zod";
import { MediaSchema } from "./media-schema";

export const PitchPracticeSchema = z.object({
    session_name: z.string({ required_error: "Session name is required" }),
    slides: MediaSchema,
    goals: z.array(
        z.object({
            id: z.number(),
            goal: z.string(),
        }),
    ),
    virtual_environment: z.enum(["boardroom_1", "boardroom_2"]).optional(),
    notes: z.string().optional(),
    allow_ai_questions: z.boolean().optional(),
});
