import { UserProfile } from "@/hooks/settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  data: UserProfile | null;
  isLoading: boolean; // ✅ track loading state here
  // True once the fetch has settled at least once (success OR failure/empty).
  // Lets consumers tell "still waiting" apart from "we asked and there's
  // nothing" — both look like `data === null` otherwise.
  hasLoadedOnce: boolean;
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  hasLoadedOnce: false,
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
      state.hasLoadedOnce = true;
    },
    clearProfile: (state) => {
      state.data = null;
      state.isLoading = false;
      state.hasLoadedOnce = true;
    },
  },
});

export const { startLoading, setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
