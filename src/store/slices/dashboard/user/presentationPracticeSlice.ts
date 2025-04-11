import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPresentationPracticeState {
    activeSlideIndex: number;
    numSlides: number;
    slidePreviews: string[];
}

const initialState: IPresentationPracticeState = {
    activeSlideIndex: 0,
    numSlides: 0,
    slidePreviews: [],
};

const presentationPracticeSlice = createSlice({
    name: "presentation-practice",
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

export const { setActiveSlideIndex, setslidePreviews, setNumSlides } = presentationPracticeSlice.actions;
export default presentationPracticeSlice.reducer;
