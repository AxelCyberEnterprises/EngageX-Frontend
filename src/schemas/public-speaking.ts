import { z } from "zod";

export const PublicSpeakingSchema = z.object({
    session_name: z.string({ required_error: "Session name is required" }),
    session_type: z.enum(["pitch", "public", "presentation"]),
    goals: z
        .array(
            z.object({
                id: z.number(),
                goal: z.string(),
            }),
        )
        .optional(),
    virtual_environment: z.enum(["conference_room"]).optional(),
    notes: z.string().optional(),
    allow_ai_questions: z.boolean().optional(),
});
