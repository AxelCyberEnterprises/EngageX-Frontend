import { MediaSchema } from "@/schemas/media-schema";
import { z } from "zod";

export const BaseSessionSetupSchema = z.object({
    session_name: z.string({ required_error: "Session name is required" }).min(1, "Session name is required"),
    session_type: z.enum(["pitch", "public", "presentation", "enterprise"]),
    goals: z.array(
        z.object({
            id: z.number(),
            goal: z.string(),
        }),
    ),
    virtual_environment: z.enum(
        [
            "conference_room",
            "pitch_studio",
            "board_room_1",
            "board_room_2",
            "nba_room",
            "wnba_room",
            "nfl_room",
            "mlb_room",
        ],
        {
            required_error: "Virtual environment is required",
        },
    ),
    notes: z.string().optional(),
    allow_ai_questions: z.boolean().optional(),
});

export const PublicSpeakingSchema = BaseSessionSetupSchema;

export const CoachingSchema = BaseSessionSetupSchema.omit({
    allow_ai_questions: true,
}).extend({
    enterprise_settings: z
        .object({
            enterprise_type: z.enum(["coaching"]),
        })
        .optional(),
});

export const PitchPracticeSchema = BaseSessionSetupSchema.extend({
    slide_preview_id: z.number().optional(),
    slides: MediaSchema.optional(),
});

export const PresentationPracticeSchema = BaseSessionSetupSchema.extend({
    slide_preview_id: z.number().optional(),
    slides: MediaSchema.optional(),
});

export const RookieRoomSchema = BaseSessionSetupSchema.extend({
    enterprise_settings: z
        .object({
            enterprise_type: z.enum(["rookie"]),
            rookie_type: z.enum(["media_training", "speaking", "coach", "gm"]),
            sport_type: z.string(),
            speaker_notes: z.string(),
        })
        .partial()
        .optional(),
});
