import { createSlice } from "@reduxjs/toolkit";

interface FloatingChatbotState {
    isOpen: boolean;
}

const initialState: FloatingChatbotState = {
    isOpen: false,
};

const floatingChatbotSlice = createSlice({
    name: "floating_chatbot",
    initialState,
    reducers: {
        toggle: (state) => {
            state.isOpen = !state.isOpen;
        },
        hide: (state) => {
            state.isOpen = false;
        },
    },
});

export const { toggle, hide } = floatingChatbotSlice.actions;

export default floatingChatbotSlice.reducer;
