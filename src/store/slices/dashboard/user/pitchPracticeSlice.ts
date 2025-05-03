import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPitchPracticeState {
    activeSlideIndex: number;
    isGeneratingPreview: boolean;
    slidePreviews: string[];
}

const initialState: IPitchPracticeState = {
    activeSlideIndex: 0,
    isGeneratingPreview: false,
    slidePreviews: [],
};

const pitchPracticeSlice = createSlice({
    name: "pitchPractice",
    initialState,
    reducers: {
        setActiveSlideIndex: (state, action: PayloadAction<number>) => {
            state.activeSlideIndex = action.payload;
        },
        setIsGeneratingPreview: (state, action: PayloadAction<boolean>) => {
            state.isGeneratingPreview = action.payload;
        },
        setslidePreviews: (state, action: PayloadAction<string[]>) => {
            state.slidePreviews = action.payload;
        },
    },
});

export const { setActiveSlideIndex, setslidePreviews, setIsGeneratingPreview } = pitchPracticeSlice.actions;
export default pitchPracticeSlice.reducer;
