import { BaseSessionSetupSchema } from "@/schemas/dashboard/user";
import { z } from "zod";

interface ISession {
    id: number;
    session_name: string;
    session_type: string;
    goals: string;
    session_type_display: string;
    date: string;
    duration: number | null;
    note: string | null;
    user_email: string;
    full_name: string;
    pauses: number;
    tone: string | null;
    impact: string | null;
    audience_engagement: string | null;
    sequence: string | null;
    allow_ai_questions: boolean;
    virtual_environment: string | null;
}

export interface IGETSessionsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ISession[];
}

export type IPOSTSessionPayload = Omit<z.infer<typeof BaseSessionSetupSchema>, "goals"> & {
    goals?: string[];
    slide?: string;
};
