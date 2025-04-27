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

  // Define the metrics mapping with updated categories based on your requirements
  const metricsMapping = [
    // Audience Engagement category
    { field: "impact", metric: "Impact", category: "Audience Engagement" },
    { field: "trigger_response", metric: "Trigger Response", category: "Audience Engagement" },
    { field: "conviction", metric: "Conviction", category: "Audience Engagement" },
    
    // Vocal Variety category
    { field: "volume", metric: "Volume", category: "Vocal Variety" },
    { field: "pitch_variability", metric: "Pitch Variability", category: "Vocal Variety" },
    { field: "pace", metric: "Pace", category: "Vocal Variety" },
    { field: "pauses", metric: "Strategic Pauses", category: "Vocal Variety" },
    
    // Body Language category
    { field: "posture", metric: "Posture", category: "Body Language" },
    { field: "motion", metric: "Movement", category: "Body Language" },
    { field: "gestures_score_for_body_language", metric: "Gestures", category: "Body Language" },
    
    // Transformative Communication category
    { field: "transformative_potential", metric: "Transformative Potential", category: "Transformative Communication" },
    
    // Structure & Clarity category
    { field: "clarity", metric: "Clarity", category: "Structure & Clarity" },
    
    // Language & Word Choice category
    { field: "brevity", metric: "Brevity", category: "Language & Word Choice" },
    { field: "filler_words", metric: "Filler Words", category: "Language & Word Choice" },
    { field: "grammar", metric: "Grammar", category: "Language & Word Choice" }
  ];

  // Create metrics array
  return metricsMapping.map(mapping => {
    // Round to integer values
    const sequence1Value = Math.round(session1[mapping.field] || 0);
    const sequence2Value = Math.round(session2[mapping.field] || 0);
    
    // Determine trend
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