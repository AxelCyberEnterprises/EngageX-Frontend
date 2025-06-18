// src/features/access/accessSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AccessState {
    unlocked: boolean;
}

const initialState: AccessState = {
    unlocked: false,
};

const accessSlice = createSlice({
    name: "access",
    initialState,
    reducers: {
        unlock(state) {
            state.unlocked = true;
        },
    },
});

export const { unlock } = accessSlice.actions;
export default accessSlice.reducer;
