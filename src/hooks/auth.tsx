import ErrorToast from "@/components/ui/custom-toasts/error-toast";
import SuccessToast from "@/components/ui/custom-toasts/success-toasts";
import { apiGet, apiPatch, apiPost } from "@/lib/api";
import {
    // AuthUser,
    login,
    setEmailForPasswordReset,
    setOtpSent,
    setSigninFlow,
    setSignupFlow,
    setSuccessMessage,
    setUserIdAfterSignup,
} from "@/store/slices/authSlice";
import { IGETSessionsResponse } from "@/types/sessions";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

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
    userId: string;
    user_intent: string;
    purpose: string;
    password: string | null | undefined;
    email?: string | null | undefined;
}

interface NewImprovmentSequenceData {
    sequence_name: string;
    description: string;
    session_id: string;
}

export function useAddAuthQuestion() {
    // const dispatch = useDispatch();
    // const authToken = useSelector((state: RootState) => state.auth.token);

    return useMutation({
        mutationKey: ["addAuthQuestion"],
        mutationFn: async ({ userId, user_intent, purpose }: AuthQuestionData) => {
            return await apiPatch(`/users/users/${userId}/`, {
                user_intent,
                purpose,
            });
        },
        onSuccess: (data: any) => {
            toast.info("Auth questions added successfully:", data);
        },
        onError: (error: any) => {
            toast.info("Failed to add auth questions:", error);
        },
    });
}

export function useNewImprovmentSequence() {
    return useMutation({
        mutationKey: ["addNewImprovmentSequence"],
        mutationFn: async ({ sequence_name, description, session_id }: NewImprovmentSequenceData) => {
            return await apiPost(
                `/sessions/improve-new-sequence/${session_id}/`,
                {
                    sequence_name,
                    description,
                },
                "default",
            );
        },
        onSuccess: (data: any) => {
            toast.info("New improvement sequence created successfully:", data);
        },
        onError: (error: any) => {
            toast.info("Failed to create improvement sequence:", error);
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
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: { password: string; email: string }) => {
            return await apiPost<LoginResponse>("/users/auth/login/", data);
        },
        onSuccess: async (data) => {
            const admin = data.data.is_admin;

            dispatch(login(data));
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            queryClient.invalidateQueries({ queryKey: ["full-profile"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardData"] });

            navigate(admin ? "/dashboard/admin" : "/dashboard/user");
        },
        onError: (error) => {
            console.error(error);
        },
    });
}

export function useRequestLogin() {
    const dispatch = useDispatch();

    return useMutation({
        mutationKey: ["requestLogin"],
        mutationFn: async (data: { email: string }) => {
            return await apiPost<{ message: string }>("/enterprise/sso/request-login/", data);
        },
        onSuccess: () => {
            dispatch(setSigninFlow("otp"));

            toast(<SuccessToast description="If your email is registered, you will receive a one time pin." />);
        },
        onError: (error) => {
            console.error("SSO code request failed:", error);

            toast(<ErrorToast description="An error occurred while creating sso code, please try again." />);
        },
    });
}

export function useVerifyLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["verifyLogin"],
        mutationFn: async (data: { email: string; code: string }) => {
            return await apiPost<LoginResponse>("/enterprise/sso/verify-login/", data);
        },
        onSuccess: (data) => {
            dispatch(login(data));
            navigate("/dashboard/user");
        },
        onError: (error) => {
            console.error("SSO code request failed:", error);

            toast(<ErrorToast description={error.message} />);
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
        mutationFn: async (data: {
            otp: string;
            new_password: string;
            email: string;
            confirm_new_password: string;
        }) => {
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
            return await apiPost<any>("/users/auth/verify-email/", data);
        },
        onSuccess: (response: any) => {
            const userData = response.data;
            if (userData && userData.token) {
                const formattedData = {
                    data: userData,
                };
                dispatch(login(formattedData));
                if (userData.user_id) {
                    localStorage.setItem("userId", userData.user_id.toString());
                }
                dispatch(setSuccessMessage("Email verified successfully! Redirecting..."));
                setTimeout(() => {
                    dispatch(setSignupFlow("authQuestions"));
                }, 2000);
            } else {
                console.error("Invalid response format:", response);
            }
        },
        onError: (error) => {
            console.error("Email confirmation failed:", error);
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
            }>("/sessions/sessions/", data, "default");
        },
        onSuccess: () => {
            console.log("Public speaking session created successfully.");
        },
        onError: (error) => {
            console.error(error.message);
        },
    });
}

function getDateRange(filter: string) {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    let startDate = formattedToday;
    let endDate = formattedToday;

    if (filter === "last_week") {
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        startDate = lastWeek.toISOString().split("T")[0];
    } else if (filter === "last_month") {
        const lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1);
        startDate = lastMonth.toISOString().split("T")[0];
    } else if (filter === "last_year") {
        const lastYear = new Date();
        lastYear.setFullYear(today.getFullYear() - 1);
        startDate = lastYear.toISOString().split("T")[0];
    }
    // else if filter is "today", default today is already correct

    return { startDate, endDate };
}

export function useDashboardData(filter = "today") {
    const { startDate, endDate } = getDateRange(filter);

    return useQuery({
        queryKey: ["dashboardData", filter], // 👈 Add filter to key to refetch properly
        queryFn: () => apiGet(`/sessions/dashboard/?start_date=${startDate}&end_date=${endDate}`, "default"),
    });
}

export function useSessionHistory(page = 1) {
    return useQuery({
        queryKey: ["sessionHistory", page],
        queryFn: () => apiGet<IGETSessionsResponse>(`/sessions/sessions/?page=${page}`, "default"),
        placeholderData: keepPreviousData,
    });
}

export function useSessionHistoryById(id: string) {
    return useQuery({
        queryKey: ["sessionHistoryById", id],
        queryFn: () => apiGet(`/sessions/sessions/${id}/`, "default"),
    });
}

export function useSessionComparison(id1: string | undefined, id2: string | undefined) {
    return useQuery({
        queryKey: ["sessionComparison", id1, id2],
        queryFn: () => apiGet<any>(`/sessions/compare-sessions/${id1}/${id2}`, "default"),
        enabled: Boolean(id1 && id2),
    });
}

export function useContactUs({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) {
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
