import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { tokenManager } from "@/lib/utils";
import {
  setProfile,
  startLoading,
  clearProfile,
  resetProfile,
} from "@/store/slices/profileSlice";
import type { AppDispatch, RootState } from "@/store";

const ProfileLoader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // This component mounts once at the app root, before login, and the token
  // lives in a cookie that React can't observe. Subscribing to the auth user
  // makes it re-render on login/logout so the token below is re-read.
  useSelector((state: RootState) => state.auth.user);
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
    if (!token) {
      dispatch(resetProfile());
      return;
    }

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
