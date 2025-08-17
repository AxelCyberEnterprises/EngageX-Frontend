import authPageImage1 from "@/assets/images/jpegs/authPage-image-1.jpeg";
import { tokenManager } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

interface Question {
    id: number;
    question: string;
    content: { contentId: number; plan?: string; role?: string; apiName: string }[];
}

interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    planQuestion: string;
    roleQuestion: string;
    userId: string;
}

export interface AuthUser {
    is_admin: boolean;
    token: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    user_id: number;
    first_login?: boolean;
    first_time_verification?: boolean;
}

interface AuthState {
    questions: Question[];
    topicQuestion: string;
    signupFlow: string;
    signinFlow: "emailAndPassword" | "organization" | "otp" | "otp-2fa";
    companyEmail: string;
    userEmail: string;
    routeFromLogin: boolean;
    signupData: SignupData | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
    hasCheckedAuth: boolean;
    emailForPasswordReset: string;
    apiError: string | null;
    successMessage: string | null;
    authPageImage: string;
    userIdAfterSignup: string;
    contactStatus: string;
    otpSent: boolean;
}

const storedUser = localStorage.getItem("user");
const initialState: AuthState = {
    questions: [
        {
            id: 1,
            question: "What do you plan on doing?",
            content: [
                { contentId: 1, plan: "Pitch", apiName: "pitch" },
                { contentId: 2, plan: "Present", apiName: "present" },
                { contentId: 3, plan: "Speak/Storytelling", apiName: "speak_storytelling" },
                { contentId: 4, plan: "Interview", apiName: "interview" },
            ],
        },
        {
            id: 2,
            question: "What role are you?",
            content: [
                { contentId: 1, role: "Early Career Professional", apiName: "early" },
                { contentId: 2, role: "Mid-level Professionals", apiName: "mid" },
                { contentId: 3, role: "Sales Professionals", apiName: "sales" },
                { contentId: 4, role: "C-suites", apiName: "c_suite" },
                { contentId: 5, role: "Entrepreneurs", apiName: "entrepreneur" },
                { contentId: 6, role: "Major League Sports Athlete", apiName: "athlete" },
                { contentId: 7, role: "Major League Sports Executive", apiName: "executive" },
            ],
        },
    ],
    topicQuestion: "What do you plan on doing?",
    signupFlow: "signup",
    signinFlow: "emailAndPassword",
    companyEmail: "",
    userEmail: "",
    routeFromLogin: false,
    signupData: null, // Stores signup details
    user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
    isAuthenticated: false,
    hasCheckedAuth: false,
    emailForPasswordReset: "jnr@gmail.com",
    apiError: null,
    successMessage: "",
    authPageImage: authPageImage1,
    userIdAfterSignup: "",
    contactStatus: "",
    otpSent: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTopicQuestion: (state, action: PayloadAction<string>) => {
            state.topicQuestion = action.payload;
        },
        setEmailForPasswordReset: (state, action: PayloadAction<string>) => {
            state.emailForPasswordReset = action.payload;
        },
        setApiError: (state, action: PayloadAction<string>) => {
            state.apiError = action.payload;
        },
        setSuccessMessage: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        setSignupFlow: (state, action: PayloadAction<string>) => {
            state.signupFlow = action.payload;
        },
        setSigninFlow: (state, action: PayloadAction<AuthState["signinFlow"]>) => {
            state.signinFlow = action.payload;
        },
        setCompanyEmail: (state, action: PayloadAction<string>) => {
            state.companyEmail = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.userEmail = action.payload;
        },
        setContactStatus: (state, action: PayloadAction<string>) => {
            state.contactStatus = action.payload;
        },
        setAuthPageImage: (state, action: PayloadAction<string>) => {
            state.authPageImage = action.payload;
        },
        setRouteFromLogin: (state, action: PayloadAction<boolean>) => {
            state.routeFromLogin = action.payload;
        },
        setOtpSent: (state, action: PayloadAction<boolean>) => {
            state.otpSent = action.payload;
        },
        setUserIdAfterSignup: (state, action: PayloadAction<string>) => {
            state.userIdAfterSignup = action.payload;
        },
        setSignupData: (state, action: PayloadAction<Partial<SignupData>>) => {
            state.signupData = { ...state.signupData!, ...action.payload };
        },
        setUser: (state, action: PayloadAction<AuthUser | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            tokenManager.clearToken();
            localStorage.clear();
            state.user = null;
            state.isAuthenticated = false;
            state.hasCheckedAuth = true;
        },
        // login: (state, action: PayloadAction<LoginResponse>) => {
        //     const user = action.payload.data;
        //     console.log(user);
        //     if (!user.token || !user.email) {
        //         throw new Error("Invalid data");
        //     }

        //     try {
        //         tokenManager.setToken(user.token);
        //         console.log(user);
        //         localStorage.setItem("user", JSON.stringify(user));
        //         state.isAuthenticated = true;
        //         state.user = user;
        //     } catch (error) {
        //         console.error("Failed to set tokens:", error);
        //         state.user = null;
        //         state.isAuthenticated = false;
        //     }
        // },
        login: (state, action: PayloadAction<any>) => {
            try {
                let user;
                if (action.payload.data) {
                    if (Array.isArray(action.payload.data)) {
                        user = action.payload.data;
                    } else {
                        user = action.payload.data;
                    }
                } else {
                    user = action.payload;
                }
                if (!user || !user.token) {
                    console.error("Invalid user data format:", user);
                    return;
                }
                tokenManager.setToken(user.token);
                localStorage.setItem("user", JSON.stringify(user));
                state.isAuthenticated = true;
                state.user = user;
                if (user.user_id) {
                    localStorage.setItem("userId", user.user_id.toString());
                }
            } catch (error) {
                console.error("Failed to process login:", error);
                state.user = null;
                state.isAuthenticated = false;
            }
        },
    },
});

export function useAutoClearSuccessMessage() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSuccessMessage(""));
        }, 5000);

        return () => clearTimeout(timer);
    }, [location.pathname]);
}

export const {
    setTopicQuestion,
    setSignupFlow,
    setSigninFlow,
    setCompanyEmail,
    setUserEmail,
    setAuthPageImage,
    setOtpSent,
    setContactStatus,
    setUserIdAfterSignup,
    setRouteFromLogin,
    setSignupData,
    logout,
    login,
    setApiError,
    setEmailForPasswordReset,
    setSuccessMessage,
    setUser,
} = authSlice.actions;
export default authSlice.reducer;
