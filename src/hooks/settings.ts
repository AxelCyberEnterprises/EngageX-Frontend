import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { RootState } from "@/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export interface UserProfile {
  id: number | undefined;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
  gender?: string;
  profile_picture?: any;
  role?: string;
  purpose?: string;
  user_intent?: string;
  available_credits?: string;
  country?: string;
  timezone?: string;
  company?: string;
  phone_number?: string;
  industry?: string;
  email_alert?: string;
  practice_reminder?: string;
  session_analysis?: string;
}

export function useUserProfile() {
  const user = useSelector((state: RootState) => state.auth.user);
  return useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await apiGet<UserProfile>(`/users/userprofiles/${user?.user_id}/`);
      return response;
    },
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);

  return useMutation({
    mutationKey: ["update-user-profile"],
    mutationFn: async (data: FormData) => {
      return await apiPatch<UserProfile>(`/users/userprofiles/${user?.user_id}/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
      throw error;
    },
  });
}

interface SetPassword {
  current_password: string;
  password: string;
  confirm_password: string;
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (data: SetPassword) => {
      return await apiPost<void>(`/users/auth/users/set_password/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      console.log("Password updated successfully.");
    },
    onError: (error) => {
      console.error("Password update failed:", error);
      throw error;
    },
  });
}