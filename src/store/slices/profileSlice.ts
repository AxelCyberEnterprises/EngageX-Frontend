import { UserProfile } from "@/hooks/settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  data: UserProfile | null;
  isLoading: boolean; // ✅ track loading state here
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    clearProfile: (state) => {
      state.data = null;
      state.isLoading = false;
    },
  },
});

export const { startLoading, setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
