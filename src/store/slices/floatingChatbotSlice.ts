import { createSlice } from "@reduxjs/toolkit";

interface FloatingChatbotState {
  showVideo: boolean;
}

const initialState: FloatingChatbotState = {
  showVideo: false,
};

const floatingChatbotSlice = createSlice({
  name: "floating_chatbot",
  initialState,
  reducers: {
    toggle: (state) => {
      state.showVideo = !state.showVideo;
    },
    hide: (state) => {
      state.showVideo = false;
    },
  },
});

export const { toggle, hide } = floatingChatbotSlice.actions;

export default floatingChatbotSlice.reducer;
