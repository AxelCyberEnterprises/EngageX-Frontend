import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

export enum PIScreens {
  DEFAULT,
  NEW_PIS,
  EXISTING_PIS,
  NEW_SESSION,
}

export interface Sequence {
  title: string;
  date: string;
  duration: number;
}

export interface Session {
  title: string;
  start_date: string; // ISO string format
  last_updated_date: string; // ISO string format
  is_active: boolean;
  sequences: Sequence[]; // Array of sequences
}

export const formatTimestamp = (timestamp: string): string => {
  return format(new Date(timestamp), "MMM dd, yyyy");
};

export interface DialogState {
  new_pis_isopen: boolean;
  session_confirmation: boolean;
}

export const sessions: Session[] = [
  {
    title: "Keynote Delivery Refinement",
    start_date: "2025-03-14T08:00:00Z",
    last_updated_date: "2025-03-14T10:00:00Z",
    is_active: false,
    sequences: [
      { title: "Warm-up", date: "2025-03-14T08:05:00Z", duration: 10 },
      { title: "Sun Salutations", date: "2025-03-14T08:15:00Z", duration: 15 },
      { title: "Standing Poses", date: "2025-03-14T08:30:00Z", duration: 20 },
      { title: "Seated Poses", date: "2025-03-14T08:50:00Z", duration: 15 },
      { title: "Cool-down", date: "2025-03-14T09:05:00Z", duration: 10 },
    ],
  },
  {
    title: "Pitch Mastery Programe",
    start_date: "2025-03-14T18:00:00Z",
    last_updated_date: "2025-03-14T19:30:00Z",
    is_active: false,
    sequences: [
      { title: "Session 1", date: "2025-03-14T18:05:00Z", duration: 10 },
      {
        title: "Session 2",
        date: "2025-03-14T18:20:00Z",
        duration: 15,
      },
      { title: "Body Scan", date: "2025-03-14T18:40:00Z", duration: 20 },
      {
        title: "Session 3",
        date: "2025-03-14T19:00:00Z",
        duration: 20,
      },
      { title: "Session 4", date: "2025-03-14T19:25:00Z", duration: 5 },
    ],
  },
  {
    title: "Presentation Programe",
    start_date: "2025-03-15T07:30:00Z",
    last_updated_date: "2025-03-15T09:00:00Z",
    is_active: false,
    sequences: [
      { title: "Session 1", date: "2025-03-15T07:35:00Z", duration: 10 },
      { title: "Session 2", date: "2025-03-15T07:45:00Z", duration: 20 },
      { title: "Session 3", date: "2025-03-15T08:05:00Z", duration: 20 },
      { title: "Session 4", date: "2025-03-15T08:30:00Z", duration: 20 },
      {
        title: "Session 5",
        date: "2025-03-15T08:50:00Z",
        duration: 10,
      },
    ],
  },
  {
    title: "Public Speaking Practice",
    start_date: "2025-03-16T10:00:00Z",
    last_updated_date: "2025-03-16T12:30:00Z",
    is_active: false,
    sequences: [
      {
        title: "Session 1",
        date: "2025-03-16T10:05:00Z",
        duration: 30,
      },
      {
        title: "Session 2",
        date: "2025-03-16T10:40:00Z",
        duration: 40,
      },
      {
        title: "Session 3",
        date: "2025-03-16T11:30:00Z",
        duration: 30,
      },
      {
        title: "Session 4",
        date: "2025-03-16T12:00:00Z",
        duration: 20,
      },
      { title: "Session 5", date: "2025-03-16T12:25:00Z", duration: 5 },
    ],
  },
];

interface PIData {
  active_screen: PIScreens;
  new_pis: {
    title: string;
    completion_percentage: number;
    date: string;
    time: string;
    new_sequence_name: string;
  };
  dialog: DialogState;
  selected_screen: PIScreens;
  existing_sessions: Session[];
}

const initialState: PIData = {
  active_screen: PIScreens.DEFAULT,
  new_pis: {
    title: "",
    completion_percentage: 0,
    date: "",
    time: "",
    new_sequence_name: "",
  },
  dialog: {
    new_pis_isopen: false,
    session_confirmation: false,
  },
  selected_screen: PIScreens.DEFAULT,
  existing_sessions: sessions,
};

const PerformanceImprovementSlice = createSlice({
  name: "performance_improvement",
  initialState,
  reducers: {
    handleActiveScreen: (state) => {
      state.active_screen = state.selected_screen;
      console.log("active_screen: ", state.active_screen);
      if (state.active_screen == PIScreens.NEW_PIS) {
        state.dialog = { new_pis_isopen: true, session_confirmation: false };
      }
    },
    handleSelectedScreen: (state, action: PayloadAction<PIScreens>) => {
      state.selected_screen = action.payload;
    },
    handleDialog: (state, action: PayloadAction<{ dialog: DialogState }>) => {
      state.dialog = action.payload.dialog; // ✅ Ensure state is updated correctly
    },
    updateActiveExistingSession: (state, action: PayloadAction<number>) => {
      state.existing_sessions = state.existing_sessions.map((item, idx) => ({
        ...item,
        is_active: idx === action.payload,
      }));
    },
  },
});

export const {
  handleDialog,
  handleActiveScreen,
  handleSelectedScreen,
  updateActiveExistingSession,
} = PerformanceImprovementSlice.actions; // Export actions
export default PerformanceImprovementSlice.reducer; // Export reducer
