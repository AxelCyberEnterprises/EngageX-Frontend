import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
    text: string;
    sender: "user" | "bot";
    timestamp: string;
}

export interface ChatState {
    messages: Message[];
}
const initialState: ChatState = {
    messages: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
