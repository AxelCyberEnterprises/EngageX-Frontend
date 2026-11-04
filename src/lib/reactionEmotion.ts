// Folder names under static-videos/<room>/ on S3; every room has 1.mp4-10.mp4 for each.
export const REACTION_EMOTIONS = ["thinking", "interested", "excitement", "laughter", "sorrow", "surprised"] as const;

export type ReactionEmotion = (typeof REACTION_EMOTIONS)[number];

const SYNONYMS: Record<string, ReactionEmotion> = {
    think: "thinking",
    thoughtful: "thinking",
    interest: "interested",
    engaged: "interested",
    curious: "interested",
    excited: "excitement",
    enthusiasm: "excitement",
    laugh: "laughter",
    laughing: "laughter",
    amused: "laughter",
    empathy: "sorrow",
    sad: "sorrow",
    sadness: "sorrow",
    surprise: "surprised",
    shock: "surprised",
    shocked: "surprised",
};

export function toReactionEmotion(text: unknown): ReactionEmotion | null {
    if (typeof text !== "string") return null;
    const word = text.toLowerCase().replace(/[^a-z]/g, "");
    if ((REACTION_EMOTIONS as readonly string[]).includes(word)) return word as ReactionEmotion;
    return SYNONYMS[word] ?? null;
}

export function reactionVideoUrl(room: string, emotion: ReactionEmotion): string {
    const variation = Math.floor(Math.random() * 10) + 1;
    return `https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/${room}/${emotion}/${variation}.mp4`;
}
