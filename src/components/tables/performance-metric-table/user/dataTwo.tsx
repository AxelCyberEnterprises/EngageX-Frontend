
import { Metric } from "./columnsTwo";

// Define a type for the backend session data structure
export interface SessionComparisonData {
  session1: {
    id: number;
    user_email: string;
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
    audience_engagement: number;
    overall_captured_impact: number;
    vocal_variety: number;
    emotional_impact: number;
    body_language: number;
    transformative_communication: number;
    structure_and_clarity: number;
    language_and_word_choice: number;
    [key: string]: any;
  };
  session2: {
    id: number;
    user_email: string;
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
    audience_engagement: number;
    overall_captured_impact: number;
    vocal_variety: number;
    emotional_impact: number;
    body_language: number;
    transformative_communication: number;
    structure_and_clarity: number;
    language_and_word_choice: number;
    [key: string]: any;
  };
}

// Function to transform backend session comparison data into metrics table format
export const formatSessionMetricsData = (sessionData: SessionComparisonData | undefined | null): Metric[] => {
  if (!sessionData?.session1 || !sessionData?.session2) {
    return [];
  }

  const session1 = sessionData.session1;
  const session2 = sessionData.session2;

  // Define the metrics mapping with appropriate categories
  const metricsMapping = [
    { field: "volume", metric: "Volume", category: "Delivery" },
    { field: "pitch_variability", metric: "Pitch Variability", category: "Delivery" },
    { field: "pace", metric: "Pace", category: "Delivery" },
    { field: "pauses", metric: "Strategic Pauses", category: "Delivery" },
    { field: "conviction", metric: "Conviction", category: "Impact" },
    { field: "clarity", metric: "Clarity", category: "Clarity" },
    { field: "impact", metric: "Impact", category: "Impact" },
    { field: "brevity", metric: "Brevity", category: "Content" },
    { field: "trigger_response", metric: "Trigger Response", category: "Impact" },
    { field: "filler_words", metric: "Filler Words", category: "Clarity" },
    { field: "grammar", metric: "Grammar", category: "Content" },
    { field: "posture", metric: "Posture", category: "Delivery" },
    { field: "motion", metric: "Movement", category: "Delivery" },
    { field: "gestures_score_for_body_language", metric: "Gestures", category: "Delivery" },
    { field: "transformative_potential", metric: "Transformative Potential", category: "Impact" },
    { field: "audience_engagement", metric: "Audience Engagement", category: "Impact" },
    { field: "overall_captured_impact", metric: "Overall Impact", category: "Impact" },
    { field: "vocal_variety", metric: "Vocal Variety", category: "Delivery" },
    { field: "emotional_impact", metric: "Emotional Impact", category: "Impact" },
    { field: "body_language", metric: "Body Language", category: "Delivery" },
    { field: "transformative_communication", metric: "Transformative Communication", category: "Impact" },
    { field: "structure_and_clarity", metric: "Structure and Clarity", category: "Content" },
    { field: "language_and_word_choice", metric: "Language and Word Choice", category: "Content" }
  ];

  // Create metrics array
  return metricsMapping.map(mapping => {
    // Multiply by 100 to convert decimal to percentage and ensure it's an integer
    const sequence1Value = Math.round((session1[mapping.field] || 0));
    const sequence2Value = Math.round((session2[mapping.field] || 0));
    
    // Determine trend - use strict type here
    const trend: 'Progressing' | 'Declining' = 
      sequence2Value >= sequence1Value ? "Progressing" : "Declining";

    return {
      metric: mapping.metric,
      category: mapping.category,
      sequence1: sequence1Value,
      sequence2: sequence2Value,
      trend
    };
  }).filter(metric => 
    // Filter out metrics where both values are 0 (likely not tracked)
    !(metric.sequence1 === 0 && metric.sequence2 === 0)
  );
};