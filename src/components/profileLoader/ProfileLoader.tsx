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

  const profileId = fullProfile?.results?.[0]?.id;

  const {
    data: profile,
    isLoading: isProfileLoading,
  } = useUserProfile(profileId);

  // isProfileLoading only means something once this query is actually
  // enabled (i.e. we have a profileId) — otherwise it's a disabled query
  // that was never going to fetch anything.
  const isFetching = isFullProfileLoading || (!!profileId && isProfileLoading);

  // 🔥 Sync loading state with query states
  useEffect(() => {
    if (!token) return;

    if (isFetching) {
      dispatch(startLoading());
    } else if (profile) {
      dispatch(setProfile(profile));
    } else {
      // Settled with nothing to show — either a fetch failed, or the user
      // genuinely has no profile row (fullProfile resolved with an empty
      // results array, so profileId never existed and the detail query
      // never ran). Either way, stop waiting instead of hanging forever.
      dispatch(clearProfile());
    }
  }, [token, isFetching, profile, dispatch]);

  return null;
};

export default ProfileLoader;
