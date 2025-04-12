import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPitchPracticeState {
    activeSlideIndex: number;
    numSlides: number;
    slidePreviews: string[];
}

const initialState: IPitchPracticeState = {
    activeSlideIndex: 0,
    numSlides: 0,
    slidePreviews: [],
};

const pitchPracticeSlice = createSlice({
    name: "pitchPractice",
    initialState,
    reducers: {
        setActiveSlideIndex: (state, action: PayloadAction<number>) => {
            state.activeSlideIndex = action.payload;
        },
        setNumSlides: (state, action: PayloadAction<number>) => {
            state.numSlides = action.payload;
        },
        setslidePreviews: (state, action: PayloadAction<string[]>) => {
            state.slidePreviews = action.payload;
        },
    },
});

export const { setActiveSlideIndex, setslidePreviews, setNumSlides } = pitchPracticeSlice.actions;
export default pitchPracticeSlice.reducer;
