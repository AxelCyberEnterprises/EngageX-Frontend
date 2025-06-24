import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setAuthPageImage, setOtpSent, setSuccessMessage, useAutoClearSuccessMessage } from "@/store/slices/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useResetPassword } from "@/hooks/auth";
import { useLocation } from "react-router-dom";
import authPageImage2 from "@/assets/images/jpegs/authPage-image-2.jpeg";
import OtpSentToast from "@/components/ui/OtpSentToast";

const ResetPasswordSchema = z
    .object({
        otp: z.string().min(6, "OTP must be at least 6 characters"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const ResetPassword: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const emailForPasswordReset = useSelector((state: RootState) => state.auth.emailForPasswordReset);
    const otpSent = useSelector((state: RootState) => state.auth.otpSent);
    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: { otp: "", password: "", confirmPassword: "" },
    });

    const { mutate: resetPassword, isPending, error } = useResetPassword();
    const handleSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
        dispatch(setSuccessMessage(""));

        resetPassword({
            email: emailForPasswordReset,
            otp: values.otp,
            new_password: values.password,
            confirm_new_password: values.confirmPassword,
        });
    };

    // useEffect(() => {
    //     if (error) {
    //         form.setError("otp", {
    //             type: "manual",
    //             message: error.message || "Failed to reset password. Try again.",
    //         });
    //     }
    // }, [error]);

    useAutoClearSuccessMessage();
     const location = useLocation()
        useEffect(()=>{
            dispatch(setAuthPageImage(authPageImage2))
        },[location.pathname])

    return (
        <div className="md:w-10/12 sm:w-3/5 sm:mx-auto flex flex-col justify-center h-[100dvh] gap-3 max-lg:pl-5">
            <h2 className="text-3xl text-center">Reset Password</h2>
            <p className="text-center font-[Inter] text-[#667085]">
                Your new password must be different from the previous one.
            </p>
            <OtpSentToast show={otpSent} onClose={() => dispatch(setOtpSent(false))} />


            <Form {...form}>
                <form
                    className="max-md:w-full px-1 sm:w-[75%] sm:mx-auto flex flex-col gap-4"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter OTP"
                                        className="py-6 font-[Inter] border text-black border-[#d0d5dd]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            className="py-6 font-[Inter] pr-12 border text-black border-[#d0d5dd]"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform bg-transparent hover:bg-transparent text-[#262b3a] p-2.5 -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            className="py-6 pr-12 border font-[Inter] text-black border-[#d0d5dd]"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform bg-transparent hover:bg-transparent text-[#262b3a] p-2.5 -translate-y-1/2"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 font-[Inter] py-6 rounded-lg text-white"
                        isLoading={isPending}
                    >
                        {"Reset password"}
                    </Button>
                </form>
            </Form>
            {error && (error.message)}
        </div>
    );
};

export default ResetPassword;
