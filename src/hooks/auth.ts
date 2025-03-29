import { apiGet, apiPost } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  login,
  setEmailForPasswordReset,
  setSignupFlow,
  setSuccessMessage,
} from "@/store/slices/authSlice";

export function useSignup() {
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    }) => {
      return await apiPost("/users/users/", data);
    },
    onSuccess: async (data) => {
      console.log(data);
      // dispatch(login(data));
      dispatch(setSignupFlow("confirmation"));
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

interface LoginResponse {
  data: {
    is_admin: boolean;
    token: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
  };
}

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { password: string; email: string }) => {
      return await apiPost<LoginResponse>("/users/auth/login/", data);
    },
    onSuccess: async (data) => {
      const admin = data.data.is_admin;
      console.log(admin);
      dispatch(login(data));
      navigate(admin ? "/dashboard/admin" : "/dashboard/user");
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async (data: { email: string }) => {
      dispatch(setEmailForPasswordReset(data.email));
      return await apiPost<{ email: string }>(
        "/users/auth/password-reset/",
        data
      );
    },
    onSuccess: () => {
      console.log("Password reset link sent.");
      navigate("../reset-password");
    },
    onError: (error) => {
      console.error(error || "Failed to send OTP. Please try again.");
    },
  });
}

type ResetPasswordResponse = {
  otp: string;
  email: string;
  new_password: string;
};

export function useResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (data: {
      otp: string;
      new_password: string;
      email: string;
    }) => {
      return await apiPost<ResetPasswordResponse>(
        "/users/auth/password-reset-confirm/",
        data
      );
    },
    onSuccess: () => {
      console.log("Password reset successfully.");
      dispatch(
        setSuccessMessage(
          "Password reset successfully! Redirecting to login..."
        )
      );
      setTimeout(() => navigate("../login"), 2000);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}

export function useEmailConfirmation() {
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ["emailConfirmation"],
    mutationFn: async (data: { verification_code: string; email: string }) => {
      return await apiPost<{ email: string }>(
        "/users/auth/verify-email/",
        data
      );
    },
    onSuccess: () => {
      console.log("Email confirmed successfully.");
      dispatch(
        setSuccessMessage("Email verified successfully! Redirecting...")
      );
      setTimeout(() => {
        dispatch(setSignupFlow("authQuestions"));
      }, 2000);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}

export function usePublicSpeaking() {
  return useMutation({
    mutationKey: ["publicSpeaking"],
    mutationFn: async (data: {
      session_name: string;
      session_type: string;
      note: string;
      sequence: string;
      allow_ai_questions: boolean;
    }) => {
      return await apiPost<{
        session_name: string;
        session_type: string;
        note: string;
        sequence: string;
        allow_ai_questions: boolean;
      }>("/sessions/sessions/", data);
    },
    onSuccess: () => {
      console.log("Public speaking session created successfully.");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}

export function useSessionReport() {
  return useMutation({
    mutationKey: ["fetchSessionReport"],
    mutationFn: async (id: string) => {
      return await apiGet(`/sessions/sessions/${id}/report/`);
    },
    onSuccess: (data) => {
      console.log("Session report fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to fetch session report:", error.message);
    },
  });
}
