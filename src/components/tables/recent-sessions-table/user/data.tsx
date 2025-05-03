export type Session = {
  id: string;
  name: string;
  date: string;
  type: string;
  duration: string;
  improvement: number;
};

export const sessions: Session[] = [
  {
    id: "1",
    name: "Pitch Practice",
    date: "Feb 12, 2025",
    type: "Pitch Practice",
    duration: "12 Mins",
    improvement: 80
  },
  {
    id: "2",
    name: "Boardroom Presentation",
    date: "Feb 12, 2025",
    type: "Keynote Practice",
    duration: "30 Mins",
    improvement: 60
  },
  {
    id: "3",
    name: "Proposal Presentation",
    date: "Feb 12, 2025",
    type: "Presentation Practice",
    duration: "10 Mins",
    improvement: 95
  },
  {
    id: "4",
    name: "Pitch Practice",
    date: "Feb 12, 2025",
    type: "Pitch Practice",
    duration: "5 mins",
    improvement: 90
  },
  {
    id: "5",
    name: "Pitch Practice",
    date: "Feb 12, 2025",
    type: "Pitch Practice",
    duration: "12 Mins",
    improvement: 70
  }
];