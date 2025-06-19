import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBrandingState {
    previews: {
        companyLogoPreview: string;
        faviconPreview: string;
    };
    colors: { primaryColor: string; secondaryColor: string };
}
const initialState: IBrandingState = {
    previews: {
        companyLogoPreview: "",
        faviconPreview: "",
    },
    colors: { primaryColor: "#10161E", secondaryColor: "#0C76D5" },
};

const brandingSlice = createSlice({
    name: "branding",
    initialState,
    reducers: {
        setPreviews: (state, action: PayloadAction<IBrandingState["previews"]>) => {
            state.previews = action.payload;
        },
        setColors: (state, action: PayloadAction<IBrandingState["colors"]>) => {
            state.colors = action.payload;
        },
    },
});

export const { setColors, setPreviews } = brandingSlice.actions;
export default brandingSlice.reducer;
