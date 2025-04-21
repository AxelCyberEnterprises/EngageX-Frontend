import { BaseSessionSetupSchema } from "@/schemas/dashboard/user";
import { z } from "zod";

export interface ISession {
    id: number;
    user_email: string;
    full_name: string;
    session_type_display: string;
    latest_score: number;
    sequence: number | null;
    session_name: string;
    session_type: string;
    goals: string[];
    date: string;
    duration: string | null;
    note: string | null;
    slides_file: string | null;
    slide_specific_timing: Record<string, unknown>;
    allow_ai_questions: boolean;
    virtual_environment: string;
    volume: number;
    pitch_variability: number;
    pace: number;
    pauses: number;
    conviction: number;
    clarity: number;
    impact: number;
    brevity: number;
    trigger_response: number;
    filler_words: number;
    grammar: number;
    posture: number;
    motion: number;
    gestures: boolean;
    transformative_potential: number;
    general_feedback_summary: string | null;
    strength: string | null;
    area_of_improvement: string | null;
    audience_engagement: number;
    overall_captured_impact: number;
    vocal_variety: number;
    emotional_impact: number;
    body_language: number;
    transformative_communication: number;
    structure_and_clarity: number;
    language_and_word_choice: number;
    user: number;
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
