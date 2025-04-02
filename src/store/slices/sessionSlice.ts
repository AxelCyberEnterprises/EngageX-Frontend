import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
    value: string;
    sessionId: string | null;
}

const initialState: SessionState = {
    value: "",
    sessionId: "",
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setSessionId: (state, action: PayloadAction<string>) => {
            state.sessionId = action.payload;
        },
        clearSessionValue: (state) => {
            state.value = "";
        },
    },
});

export const { setSessionValue, clearSessionValue, setSessionId } = sessionSlice.actions;

export default sessionSlice.reducer;
