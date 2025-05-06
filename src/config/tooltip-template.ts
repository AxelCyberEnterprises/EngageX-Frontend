export type ITooltipKeys =
    | "conviction"
    | "clarity"
    | "impact"
    | "brevity"
    | "transformative-potential"
    | "trigger-response"
    | "filler-words"
    | "grammar"
    | "body-posture"
    | "body-motion"
    | "hand-gestures"
    | "volume"
    | "pitch-variability"
    | "pace"
    | "pitch"
    | "pauses";
type ITooltipContent = {
    title?: string;
    description: string;
};
type TooltipProps = Record<ITooltipKeys, ITooltipContent>;

export const tooltipItems: TooltipProps = {
    conviction: {
        title: "Conviction",
        description:
            "Reflects how strongly and clearly the speaker communicates their beliefs. High conviction is marked by confident tone, steady pace, intentional pauses, assertive language, and supportive body language.",
    },
    clarity: {
        title: "Clarity",
        description:
            "Measures how easy it is for the audience to understand the message. Strong clarity comes from steady pacing, appropriate volume, and well-placed pauses.",
    },
    impact: {
        title: "Impact",
        description:
            "Captures the overall power and memorability of the presentation. It is calculated based on the speaker's conviction, transformative communication, and ability to inspire audience response.",
    },
    brevity: {
        title: "Brevity",
        description:
            "Assesses how concise and purposeful the speaker is with words. High brevity avoids rambling or repetition, focusing only on what matters.",
    },
    "transformative-potential": {
        title: "Transformative Potential",
        description:
            "Evaluates how deeply the message can inspire change or shift perspective. It considers the emotional depth, language strength, and emotional structure of the presentation.",
    },
    "trigger-response": {
        title: "Trigger Response",
        description:
            "Measures how much the talk sparks emotional or instinctive reactions in the audience—such as surprise, empathy, or deep thought.",
    },
    "filler-words": {
        title: "Filler Words",
        description:
            "Indicates the use of distracting filler words like “um,” “like,” or “you know.” Fewer filler words lead to a more polished and confident delivery.",
    },
    grammar: {
        title: "Grammar",
        description:
            "Rates the grammatical accuracy of the speaker's words. Fewer grammatical errors indicate clearer and more professional communication.",
    },
    "body-posture": {
        title: "Body Posture",
        description:
            "Evaluates the speaker's physical stance. Ideal posture is upright, balanced, and open—signaling confidence and presence.",
    },
    "body-motion": {
        title: "Body Motion",
        description:
            "Tracks the overall fluidity of the speaker's movement. Controlled motion feels natural and dynamic, while stiffness or restlessness can distract.",
    },
    "hand-gestures": {
        title: "Hand Gestures",
        description:
            "Assesses how effectively hand movements reinforce spoken words. The best gestures are intentional and expressive, not erratic or overused.",
    },
    volume: {
        title: "Volume",
        description:
            "Measures the loudness and consistency of the speaker's voice. A strong delivery is clear, well-projected, and appropriately modulated.",
    },
    "pitch-variability": {
        title: "Pitch Variability",
        description:
            "Tracks changes in vocal tone. Expressive pitch keeps the audience engaged, while monotone delivery can feel flat or robotic.",
    },
    pace: {
        title: "Pace",
        description:
            "Evaluates the speed of speech. An ideal pace is smooth and deliberate—neither rushed nor too slow.",
    },
    pitch: {
        title: "Pitch",
        description:
            "Measures the overall tone of the speaker's voice. A well-modulated pitch is engaging, while a flat or overly high/low pitch can be distracting.",
    },
    pauses: {
        title: "Pause",
        description:
            "Assesses how well the speaker uses silence to emphasize key points. Well-timed pauses improve understanding and emotional impact.",
    },
};
