import { z } from "zod";

export const BaseSessionSetupSchema = z.object({
    session_name: z.string({ required_error: "Session name is required" }),
    session_type: z.enum(["pitch", "public", "presentation"]),
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

export const PublicSpeakingSchema = BaseSessionSetupSchema;

export const PitchPracticeSchema = BaseSessionSetupSchema.extend({
    slides: z
        .array(
            z.object({
                preview: z.string(),
            }),
        )
        .optional(),
});

export const PresentationPracticeSchema = BaseSessionSetupSchema.extend({
    slides: z
        .array(
            z.object({
                preview: z.string(),
            }),
        )
        .optional(),
});
