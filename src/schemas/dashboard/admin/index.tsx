import { z } from "zod";

export const ManualEntrySchema = z.object({
    members: z
        .array(
            z.object({
                first_name: z.string().min(1, "First name is required"),
                last_name: z.string().min(1, "Last name is required"),
                email: z.string().email("Invalid email address"),
                role: z.enum(["admin", "member", "manager"], {
                    required_error: "Please select a role",
                }),
                team: z.enum(["team_a", "team_b"], {
                    required_error: "Please select a team",
                }),
            }),
        )
        .min(1, "At least one member is required"),
});
