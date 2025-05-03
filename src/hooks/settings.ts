import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface UserProfile {
  id?: number | undefined;
  first_name: string | null | undefined;
  last_name: string | null | undefined; 
  email: string | null | undefined;
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

export function useUserProfile(id: any) {
  return useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await apiGet<UserProfile>(`/users/userprofiles/${id}/`);
      return response;
    },
    enabled: !!id,
  });
}

export function useFullUserProfile() {
  return useQuery<any>({
    queryKey: ["full-profile"],
    queryFn: async () => {
      const response = await apiGet<any>(`/users/userprofiles/`);
      return response;
    },
  });
}

export function useUpdateUserProfile(id: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user-profile"],
    mutationFn: async (data: FormData) => {
      return await apiPatch<UserProfile>(`/users/userprofiles/${id}/`, data);
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