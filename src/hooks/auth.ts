import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
    // AuthUser,
    login,
    setEmailForPasswordReset,
    setOtpSent,
    setSignupFlow,
    setSuccessMessage,
    setUserIdAfterSignup,
} from "@/store/slices/authSlice";

import { IGETSessionsResponse } from "./mutations/dashboard/types";

export function useSignup() {
    const dispatch = useDispatch();
    return useMutation({
        mutationKey: ["signup"],
        mutationFn: async (data: { first_name: string; last_name: string; email: string; password: string }) => {
            return await apiPost("/users/users/", data);
        },
        onSuccess: async (data: any) => {
            console.log(data);
            dispatch(setUserIdAfterSignup(data?.id));
            // dispatch(login(data));
            dispatch(setSignupFlow("confirmation"));
        },
        onError: (error) => {
            console.error(error);
        },
    });
}

interface AuthQuestionData {
    userId: string; // ensure you pass this when calling the mutation
    user_intent: string;
    purpose: string;
}

export function useAddAuthQuestion() {
    // const dispatch = useDispatch();

    return useMutation({
        mutationKey: ["addAuthQuestion"],
        mutationFn: async ({ userId, user_intent, purpose }: AuthQuestionData) => {
            console.log(userId, user_intent, purpose);
            return await apiPatch(`/users/users/3/`, { user_intent: "early", purpose: "public_speaking" });
        },
        onSuccess: () => {
            console.log("Auth question added successfully.");
            // dispatch(setSignupFlow("login"));
            // navigate("../Tutorial");
        },
        onError: (error: any) => {
            console.error("Failed to add auth question:", error.message);
        },
    });
}

export interface LoginResponse {
    data: {
        is_admin: boolean;
        token: string;
        email: string;
        first_name: string | null;
        last_name: string | null;
        user_id: number;
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

export function useGoogleLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["googleLogin"],
        mutationFn: async (data: { token: string }) => {
            return await apiPost<LoginResponse>("/users/auth/google-login/", data);
        },
        onSuccess: async (data) => {
            const admin = data.data.is_admin;
            console.log("Google login success:", admin);

            dispatch(login(data));
            navigate(admin ? "/dashboard/admin" : "/dashboard/user");
        },
        onError: (error) => {
            console.error("Google login failed:", error);
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
            return await apiPost<{ email: string }>("/users/auth/password-reset/", data);
        },
        onSuccess: () => {
            console.log("Password reset link sent.");
            navigate("../reset-password");
            dispatch(setOtpSent(true));
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
        mutationFn: async (data: { otp: string; new_password: string; email: string, confirm_new_password: string; }) => {
            return await apiPost<ResetPasswordResponse>("/users/auth/password-reset-confirm/", data);
        },
        onSuccess: () => {
            console.log("Password reset successfully.");
            dispatch(setSuccessMessage("Password reset successfully! Redirecting to login..."));
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
            return await apiPost<{ email: string }>("/users/auth/verify-email/", data);
        },
        onSuccess: () => {
            console.log("Email confirmed successfully.");
            dispatch(setSuccessMessage("Email verified successfully! Redirecting..."));
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

export function useDashboardData() {
    return useQuery({
        queryKey: ["dashboardData"],
        queryFn: () => apiGet("/sessions/dashboard/"),
    });
}

export function useSessionHistory() {
    return useQuery({
        queryKey: ["sessionHistory"],
        queryFn: () => apiGet<IGETSessionsResponse>("/sessions/sessions/"),
    });
}
export function useSessionHistoryById(id: string) {
    return useQuery({
        queryKey: ["sessionHistoryById", id],
        queryFn: () => apiGet(`/sessions/sessions/${id}/`),
    });
}


export function useContactUs({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  return useMutation({
    mutationKey: ["contact-us"],
    mutationFn: async (data: {
      first_name: string;
      last_name: string;
      email: string;
      message: string;
      agreed_to_policy: boolean;
    }) => {
      return await apiPost("/users/contact-us/", data);
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });
}
