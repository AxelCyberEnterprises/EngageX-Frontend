import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { tokenManager } from "@/lib/utils";
import {
  setProfile,
  startLoading,
  clearProfile,
} from "@/store/slices/profileSlice";
import type { AppDispatch } from "@/store";

const ProfileLoader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = tokenManager.getToken();

  const {
    data: fullProfile,
    isLoading: isFullProfileLoading,
  } = useFullUserProfile();

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useUserProfile(fullProfile?.results?.[0]?.id);

  const isFetching = isFullProfileLoading || isProfileLoading;

  // 🔥 Sync loading state with query states
  useEffect(() => {
    if (!token) return;

    if (isFetching) {
      dispatch(startLoading());
    } else if (profile) {
      dispatch(setProfile(profile));
    } else if (profileError) {
      dispatch(clearProfile());
    }
  }, [token, isFetching, profile, profileError, dispatch]);

  return null;
};

export default ProfileLoader;
