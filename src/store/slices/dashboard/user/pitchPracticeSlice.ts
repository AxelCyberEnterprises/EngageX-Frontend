import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPitchPracticeState {
    activeSlideIndex: number;
    slidePreviews: string[];
}

const initialState: IPitchPracticeState = {
    activeSlideIndex: 0,
    slidePreviews: [],
};

const pitchPracticeSlice = createSlice({
    name: "pitch-practice",
    initialState,
    reducers: {
        setActiveSlideIndex: (state, action: PayloadAction<number>) => {
            state.activeSlideIndex = action.payload;
        },
        setslidePreviews: (state, action: PayloadAction<string[]>) => {
            state.slidePreviews = action.payload;
        },
    },
});

export const { setActiveSlideIndex, setslidePreviews } = pitchPracticeSlice.actions;
export default pitchPracticeSlice.reducer;
