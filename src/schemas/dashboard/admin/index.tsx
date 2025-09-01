import { MediaSchema } from "@/schemas/media-schema";
import { z } from "zod";

export const ManualEntrySchema = z.object({
    members: z
        .array(
            z.object({
                first_name: z.string().min(1, "First name is required"),
                last_name: z.string().min(1, "Last name is required"),
                email: z.string().email("Invalid email address"),
                role: z.string().optional(),
                team: z.string().optional(),
            }),
        )
        .min(1, "At least one member is required"),
});

export const UploadCSVSchema = z.object({
    csv: MediaSchema.optional(),
});

export const UploadExcelSchema = z.object({
    excel: MediaSchema.optional(),
});

export const SetTrainingGoalSchema = z.object({
    select_rooms: z.enum(["presentation", "pitch", "public_speaking", "media_training", "coach", "general_manager"]),
    number_of_sessions: z.coerce.number().min(1, "Number of sessions is required"),
    deadline: z.date({
        required_error: "Please select a date",
        invalid_type_error: "That's not a valid date!",
    }),
});
