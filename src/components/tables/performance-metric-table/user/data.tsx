import { Metric } from "./columns";

interface SimplifiedSessionData {
  id: number;
  session_type: string;
  vocal_variety: number;
  body_language: number;
  audience_engagement: number;
  filler_words: number;
  emotional_impact: number;
  transformative_communication: number;
  structure_and_clarity: number;
  language_and_word_choice: number;
  [key: string]: any;
}

export const formatThreeSessionMetrics = (sessions: SimplifiedSessionData[]): Metric[] => {
  if (!sessions || sessions.length < 3) return [];

  // Use the correct sessions - first work with what we have
  const validSessions = sessions.filter(session => 
    Object.values(session).some(val => typeof val === 'number' && val > 0)
  );
  
  // Make sure we have at least one valid session
  if (validSessions.length === 0) return [];
  
  // Use last 3 valid sessions, or pad with dummy data if needed
  const session1 = validSessions[0] || { id: 0 };
  const session2 = validSessions[1] || validSessions[0] || { id: 0 };
  const session3 = validSessions[2] || validSessions[1] || validSessions[0] || { id: 0 };

  const metricsMapping = [
    { field: "vocal_variety", metric: "Vocal Variety", category: "Delivery" },
    { field: "body_language", metric: "Body Language", category: "Delivery" },
    { field: "audience_engagement", metric: "Audience Engagement", category: "Impact" },
    { field: "filler_words", metric: "Filler Words", category: "Clarity" },
    { field: "emotional_impact", metric: "Emotional Impact", category: "Impact" },
    { field: "transformative_communication", metric: "Transformative Communication", category: "Impact" },
    { field: "structure_and_clarity", metric: "Structure & Clarity", category: "Content" },
    { field: "language_and_word_choice", metric: "Language & Word Choice", category: "Content" }
  ];

  return metricsMapping.map(mapping => {
    const val1 = Math.round(session1[mapping.field] || 0);
    const val2 = Math.round(session2[mapping.field] || 0);
    const val3 = Math.round(session3[mapping.field] || 0);

    const trend12: 'Progressing' | 'Declining' = val2 >= val1 ? 'Progressing' : 'Declining';
    const trend23: 'Progressing' | 'Declining' = val3 >= val2 ? 'Progressing' : 'Declining';

    return {
      metric: mapping.metric,
      category: mapping.category,
      sequence1: val1,
      sequence2: val2,
      sequence3: val3,
      trend12,
      trend23
    };
  }).filter(metric =>
    !(metric.sequence1 === 0 && metric.sequence2 === 0 && metric.sequence3 === 0)
  );
};
