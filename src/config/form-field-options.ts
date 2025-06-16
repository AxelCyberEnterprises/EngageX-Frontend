import BoardRoom1 from "@/assets/images/webps/boardroom-1.webp";
import BoardRoom2 from "@/assets/images/webps/boardroom-2.webp";
import ConferenceRoom from "@/assets/images/webps/conference-room.webp";
import PitchStudio from "@/assets/images/webps/pitch-studio.webp";

export const publicSpeakingVEOptions = [{ name: "Conference Room", value: "conference_room", src: ConferenceRoom }];

export const pitchPracticeVEOptions = [{ name: "Pitch Studio", value: "pitch_studio", src: PitchStudio }];

export const presentationPracticeVEOptions = [
    { name: "Boardroom 1", value: "board_room_1", src: BoardRoom1 },
    { name: "Boardroom 2", value: "board_room_2", src: BoardRoom2 },
];

export const trainingTypeOptions = [
    {
        name: "Media Training",
        value: "media_training",
        description:
            "Media training is an excellent tool that prepares major league sports professionals & athletes for public-facing media engagement.",
    },
    {
        name: "Speaking",
        value: "speaking",
        description:
            "Speaking training is designed to help you improve your public speaking skills, whether you're preparing for a presentation, a speech, or any other speaking engagement.",
    },
];

export const sportsOptions = [
    { name: "Basketball", value: "basketball" },
    { name: "Football", value: "football" },
    { name: "Soccer", value: "soccer" },
    { name: "Baseball", value: "baseball" },
    { name: "Hockey", value: "hockey" },
    { name: "Tennis", value: "tennis" },
];
