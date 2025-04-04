import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tokenManager } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import authPageImage1 from "@/assets/images/jpegs/authPage-image-1.jpeg"

interface Question {
    id: number;
    question: string;
    content: { contentId: number; plan?: string; role?: string }[];
}

interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    planQuestion: string;
    roleQuestion: string;
}

interface AuthState {
    questions: Question[];
    topicQuestion: string;
    signupFlow: string;
    routeFromLogin: boolean;
    signupData: SignupData | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any | null;
    isAuthenticated: boolean;
    hasCheckedAuth: boolean;
    emailForPasswordReset: string;
    apiError: string | null;
    successMessage: string | null;
    authPageImage: string;
}

const initialState: AuthState = {
    questions: [
        {
            id: 1,
            question: "What do you plan on doing?",
            content: [
                { contentId: 1, plan: "Pitch" },
                { contentId: 2, plan: "Present" },
                { contentId: 3, plan: "Speak" },
            ],
        },
        {
            id: 2,
            question: "What role are you?",
            content: [
                { contentId: 1, role: "Early Career Professional" },
                { contentId: 2, role: "Mid-level Professionals" },
                { contentId: 3, role: "Sales Professionals" },
                { contentId: 4, role: "C-suites" },
                { contentId: 5, role: "Entrepreneurs" },
                { contentId: 6, role: "Major League Sports Athlete" },
                { contentId: 7, role: "Major League Sports Executive" },
            ],
        },
    ],
    topicQuestion: "What do you plan on doing?",

    signupFlow: "signup",
    routeFromLogin: false,
    signupData: null, // Stores signup details
    user: localStorage.getItem("user") ? true : false,
    isAuthenticated: false,
    hasCheckedAuth: false,
    emailForPasswordReset: "jnr@gmail.com",
    apiError: null,
    successMessage: "",
    authPageImage: authPageImage1,
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
        setAuthPageImage: (state, action: PayloadAction<string>) => {
            state.authPageImage = action.payload;
        },
        setRouteFromLogin: (state, action: PayloadAction<boolean>) => {
            state.routeFromLogin = action.payload;
        },
        setSignupData: (state, action: PayloadAction<Partial<SignupData>>) => {
            state.signupData = { ...state.signupData!, ...action.payload };
        },
        setUser: (state, action: PayloadAction<boolean>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            tokenManager.clearToken();
            localStorage.clear();
            state.user = null;
            state.isAuthenticated = false;
            state.hasCheckedAuth = true;
        },
        login: (state, data) => {
            const { token, email, is_admin } = data.payload.data;
            if (!token || !email) {
                throw new Error("Invalid data");
            }

            try {
                tokenManager.setToken(token);
                state.isAuthenticated = true;
                localStorage.setItem('user', String(!is_admin))
                state.user = !is_admin;
            } catch (error) {
                console.error("Failed to set tokens:", error);
                state.user = null;
                state.isAuthenticated = false;

            }
        },
    },
});

export function useAutoClearSuccessMessage() {
    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSuccessMessage(""));
        }, 5000);

        return () => clearTimeout(timer); 
    }, [location.pathname]); 
}

export const { setTopicQuestion, setSignupFlow, setAuthPageImage, setRouteFromLogin, setSignupData, logout, login, setApiError, setEmailForPasswordReset, setSuccessMessage, setUser } = authSlice.actions;
export default authSlice.reducer;
