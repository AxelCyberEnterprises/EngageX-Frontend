import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setAuthPageImage, setSignupFlow, useAutoClearSuccessMessage } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Form } from "@/components/ui/form";
import { useEmailConfirmation } from "@/hooks/auth";
import authPageImage1 from "@/assets/images/pngs/authPage-image-1.png"
import { useLocation } from "react-router-dom";

const verificationSchema = z.object({
    code: z.string().length(6, "Verification code must be 6 characters"),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

const Confirmation: React.FC = () => {
    const dispatch = useDispatch();
    const [apiError, setApiError] = React.useState<string | null>(null);
    const signupData = useSelector((state: RootState) => state.auth.signupData);
    const successMessage = useSelector((state: RootState) => state.auth.successMessage);



      const location = useLocation()
                    useEffect(()=>{
                        dispatch(setAuthPageImage(authPageImage1))
                    },[location.pathname])
    const form = useForm<VerificationFormValues>({
        resolver: zodResolver(verificationSchema),
        defaultValues: { code: "" },
    });

    useAutoClearSuccessMessage();
    const { mutate: emailConfirmation, isPending, error } = useEmailConfirmation();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (/^\d$/.test(value)) {  // Allow only single digit
            const newCode = form.getValues("code").split("");
            newCode[index] = value;
            form.setValue("code", newCode.join(""));
            if (index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        } else if (value === "") {  // Handle backspace
            const newCode = form.getValues("code").split("");
            newCode[index] = "";
            form.setValue("code", newCode.join(""));
            if (index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && index > 0 && !form.getValues("code")[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const onSubmit = async (data: VerificationFormValues) => {
        setApiError(null);
        if (signupData?.email) {
            emailConfirmation({ verification_code: data.code, email: signupData.email });
        } else {
            setApiError("Email is missing. Please try again.");
        }
    };

    useEffect(() => {
        if (error) {
            setApiError(error.message || "Verification failed. Please try again.");
        }
    }, [error]);

    return (
        <div className="md:w-10/12 sm:w-3/5 sm:mx-auto flex flex-col justify-center h-[100dvh] overflow-y-hidden gap-3 max-md:pl-0 max-lg:pl-5">
            <h2 className="text-3xl text-center">Enter OTP</h2>
            <p className="text-center font-[Montserrat] text-sm text-[#667085]">
                We have sent an OTP to your <br /> email address
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-[75%] sm:mx-auto flex flex-col gap-4">
                    <div className="flex gap-2 justify-center">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Controller
                                key={index}
                                name="code" // Single field for the entire code
                                control={form.control}
                                render={({ field }) => (
                                    <Input
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        maxLength={1}
                                        value={field.value[index] || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 text-[#262b3a] focus:ring-green-300"
                                    />
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex w-full sm:w-[83%] sm:mx-auto gap-4 font-[Montserrat] pt-2">
                        <Button
                            type="button"
                            onClick={() => dispatch(setSignupFlow("signup"))}
                            className="bg-white flex-2/6 md:w-[100px] hover:bg-transparent text-black rounded-lg py-6 border border-gray-300 font-semibold"
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="text-white flex-4/6 py-6 bg-[#262b3a] hover:bg-[#262b3ada] rounded-lg"
                        >
                            Verify
                        </Button>
                    </div>
                </form>
            </Form>

            <p className="text-sm mx-auto font-[Montserrat] flex items-center mt-2 gap-1 text-[#475467]">
                Didn't receive code?
                <Button
                    onClick={() => {
                        if (signupData?.email) {
                            emailConfirmation({ verification_code: "", email: signupData.email }); // Provide an empty verification_code for new OTP
                        } else {
                            setApiError("Email is missing. Please try again.");
                        }
                    }}
                    className="font-semibold text-[#262B3A] bg-white p-0 m-0 hover:bg-white"
                >
                    Resend OTP
                </Button>
            </p>

            {apiError && <p className="text-sm text-center text-red-600">{apiError}</p>}
            {successMessage && <p className="text-sm text-center text-green-600">{successMessage}</p>}
        </div>
    );
};

export default Confirmation;