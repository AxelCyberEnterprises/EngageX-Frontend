import { BaseSessionSetupSchema } from "@/schemas/dashboard/user";
import { z } from "zod";

export interface ISessionChunk {
    chunk_number: number;
    start_time: number;
    end_time: number;
    impact: number;
    trigger_response: number;
    conviction: number;
}

export interface ISession {
    id: number;
    user_email: string;
    full_name: string;
    company: string;
    session_type_display: string;
    latest_score: number;
    sequence: number | null;
    session_name: string;
    session_type: "public" | "pitch" | "presentation";
    goals: string[];
    date: string;
    duration: string | null;
    note: string | null;
    slides_file: string | null;
    slide_specific_timing: Record<string, unknown>;
    allow_ai_questions: boolean;
    virtual_environment: string;
    compiled_video_url: string | null;
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
    gestures_score_for_body_language: number;
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
    slide_efficiency: number;
    text_economy: number;
    visual_communication: number;
    user: number;
    performance_analytics: ISessionChunk[];
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
    slide_preview_id?: number;
};

export interface IPreviewSlideUploadResponse {
    status: string;
    message: string;
    data: {
        id: number;
        slides_file: string;
        is_linked: boolean;
        created_at: string;
        user: number;
    };
}
