import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  data: any | null; // Or strongly type this if you have a profile interface
}

const initialState: ProfileState = {
  data: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    clearProfile: (state) => {
      state.data = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
