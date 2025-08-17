import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import EmailAndPasswordForm from "./EmailAndPasswordForm";
import OrganizationForm from "./OrganizationForm";
import OTPForm from "./OTPForm";
import OTP2FAForm from "./OTP2FAForm";

const Login: React.FC = () => {
    const { signinFlow } = useSelector((state: RootState) => state.auth);

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
