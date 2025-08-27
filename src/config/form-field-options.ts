import GMNBARoom from "@/assets/images/jpegs/gm-nba-room.jpg";
import GMNFLRoom from "@/assets/images/jpegs/gm-nfl-room.jpg";
import GMWNBARoom from "@/assets/images/jpegs/gm-wnba-room.jpg";
import NBARoom from "@/assets/images/jpegs/nba-room.jpg";
import NFLRoom from "@/assets/images/jpegs/nfl-room.jpg";
import WNBARoom from "@/assets/images/jpegs/wnba-room.jpg";
import BoardRoom1 from "@/assets/images/webps/boardroom-1.webp";
import BoardRoom2 from "@/assets/images/webps/boardroom-2.webp";
import ConferenceRoom from "@/assets/images/webps/conference-room.webp";
import coachingImage from "@/assets/images/jpegs/coaching-image.jpg"
import PitchStudio from "@/assets/images/webps/pitch-studio.webp";
import RookieRoom from "@/assets/images/webps/rookie-room.webp";

export const publicSpeakingVEOptions = [{ name: "Conference Room", value: "conference_room", src: ConferenceRoom }];

export const coachingVEOptions = [{ name: "Conference Room", value: "conference_room", src: coachingImage }];

export const pitchPracticeVEOptions = [{ name: "Pitch Studio", value: "pitch_studio", src: PitchStudio }];

export const presentationPracticeVEOptions = [
    { name: "Boardroom 1", value: "board_room_1", src: BoardRoom1 },
    { name: "Boardroom 2", value: "board_room_2", src: BoardRoom2 },
];

export const rookieRoomVEOptions = [{ name: "Conference Room", value: "conference_room", src: RookieRoom }];

export const rookieRoomCoachVEOptions = {
    nba: [{ name: "NBA Room", value: "nba_room", src: NBARoom }],
    wnba: [{ name: "WNBA Room", value: "wnba_room", src: WNBARoom }],
    nfl: [{ name: "NFL Room", value: "nfl_room", src: NFLRoom }],
    mlb: [{ name: "MLB Room", value: "mlb_room", src: NFLRoom }],
};

export const rookieRoomGMVEOptions = {
    nba: [{ name: "GM NBA Room", value: "nba_room", src: GMNBARoom }],
    wnba: [{ name: "GM WNBA Room", value: "wnba_room", src: GMWNBARoom }],
    nfl: [{ name: "GM NFL Room", value: "nfl_room", src: GMNFLRoom }],
    mlb: [{ name: "GM MLB Room", value: "mlb_room", src: GMNFLRoom }],
};

export const trainingTypeOptions = [
    {
        name: "Media Training",
        value: "media_training",
      
    },
    {
        name: "Coach",
        value: "coach",
      
    },
    {
        name: "General Manager",
        value: "gm",
       
    },
];

export const sportsOptions = [
    { name: "NBA", value: "nba" },
    { name: "WNBA", value: "wnba" },
    { name: "NFL", value: "nfl" },
    { name: "MLB", value: "mlb" },
];
