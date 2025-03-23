import { z } from "zod";

export const PublicSpeakingSchema = z.object({
    sessionName: z.string(),
    goals: z.array(
        z.object({
            id: z.number(),
            goal: z.string(),
        }),
    ),
    virtualEnvironment: z.string(),
    speakerNotes: z.string(),
});
