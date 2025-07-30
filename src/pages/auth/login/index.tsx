import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import EmailAndPasswordForm from "./EmailAndPasswordForm";
import OrganizationForm from "./OrganizationForm";
import OTPForm from "./OTPForm";

const Login: React.FC = () => {
    const { signinFlow } = useSelector((state: RootState) => state.auth);

    return (
        <>
            {signinFlow === "emailAndPassword" && <EmailAndPasswordForm />}
            {signinFlow === "organization" && <OrganizationForm />}
            {signinFlow === "otp" && <OTPForm />}
        </>
    );
};

export default Login;
