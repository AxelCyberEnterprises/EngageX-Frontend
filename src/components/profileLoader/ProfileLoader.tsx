import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { tokenManager } from "@/lib/utils";
import { setProfile } from "@/store/slices/profileSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProfileLoader = () => {
  const dispatch = useDispatch();
  const token = tokenManager.getToken()
  const { data: fullProfile } = useFullUserProfile();
  const {
    data: profile,
  } = useUserProfile(fullProfile?.results?.[0]?.id);

  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile));
    }
  }, [profile, dispatch, token]);

  return null;
};

export default ProfileLoader;