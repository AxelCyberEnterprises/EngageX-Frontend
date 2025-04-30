import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPresentationPracticeState {
    activeSlideIndex: number;
    isGeneratingPreview: boolean;
    slidePreviews: string[];
}

const initialState: IPresentationPracticeState = {
    activeSlideIndex: 0,
    isGeneratingPreview: false,
    slidePreviews: [],
};

const presentationPracticeSlice = createSlice({
    name: "presentation-practice",
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

export const { setActiveSlideIndex, setslidePreviews, setIsGeneratingPreview } = presentationPracticeSlice.actions;
export default presentationPracticeSlice.reducer;
