import { RootState } from "@/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailAndPasswordForm from "./EmailAndPasswordForm";
import OrganizationForm from "./OrganizationForm";
import OTPForm from "./OTPForm";
import OTP2FAForm from "./OTP2FAForm";
import { login as loginAction, setSigninFlow } from "@/store/slices/authSlice";
import { tokenManager } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const { signinFlow } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    // Ensure the login page always starts from the default email/password flow
    useEffect(() => {
        dispatch(setSigninFlow("emailAndPassword"));
    }, [dispatch]);

    // If already authenticated (token exists), hydrate user (if present) and redirect to dashboard
    useEffect(() => {
        const token = tokenManager.getToken();
        if (token) {
            try {
                const stored = localStorage.getItem("user");
                if (stored) {
                    const user = JSON.parse(stored);
                    dispatch(loginAction(user));
                    navigate(user?.is_admin ? "/dashboard/admin" : "/dashboard/user", { replace: true });
                } else {
                    navigate("/dashboard/user", { replace: true });
                }
            } catch {
                navigate("/dashboard/user", { replace: true });
            }
        }
    }, [dispatch, navigate]);

    return (
        <>
            {signinFlow === "emailAndPassword" && <EmailAndPasswordForm />}
            {signinFlow === "organization" && <OrganizationForm />}
            {signinFlow === "otp-2fa" && <OTP2FAForm />}
            {signinFlow === "otp" && <OTPForm />}
        </>
    );
};

export default Login;
