export type Session = {
  id: string;
  name: string;
  date: string;
  duration: string;
};

export const sessions: Session[] = [
  { id: "1", name: "Sequence 1", date: "Feb 12, 2025", duration: "12 Mins" },
  { id: "2", name: "Sequence 2", date: "Feb 12, 2025", duration: "5 mins" },
  { id: "3", name: "Sequence 3", date: "Feb 12, 2025", duration: "5 mins" },
  { id: "4", name: "Sequence 4", date: "Feb 20, 2025", duration: "12 Mins" },
  { id: "5", name: "Sequence 5", date: "Feb 20, 2025", duration: "12 Mins" }
];
