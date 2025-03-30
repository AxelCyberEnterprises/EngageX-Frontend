import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
    value: string;
}

const initialState: SessionState = {
    value: '',
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        clearSessionValue: (state) => {
            state.value = '';
        },
    },
});

export const { setSessionValue, clearSessionValue } = sessionSlice.actions;

export default sessionSlice.reducer;