import { PublicSpeakingSchema } from "@/schemas/public-speaking";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

interface IPublicSpeakingFormState {
    values: z.infer<typeof PublicSpeakingSchema>;
}

const initialState: IPublicSpeakingFormState = {
    values: {
        sessionName: "",
        goals: [],
        virtualEnvironment: "",
        speakerNotes: "",
        enableAiGeneratedQuestions: false,
    },
};

const publicSpeakingFormSlice = createSlice({
    name: "public-speaking-form",
    initialState,
    reducers: {
        setValues: (state, action: PayloadAction<IPublicSpeakingFormState["values"]>) => {
            state.values = action.payload;
        },
        resetValues: (state) => {
            state.values = initialState.values;
        },
    },
});

export const { setValues, resetValues } = publicSpeakingFormSlice.actions;
export default publicSpeakingFormSlice.reducer;
