import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { welcomeMessage } from "@/components/layouts/userAuth";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyOTP } from "@/hooks/auth";
import { RootState } from "@/store";
import { setSigninFlow } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const OTP2FASchema = z.object({
    otp: z.string({ required_error: "OTP is required" }).min(6, {
        message: "One-time password must be 6 characters.",
    }),
});
type FormType = z.infer<typeof OTP2FASchema>;

const OTP2FAForm = () => {
    const { userEmail } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const { mutate: verifyOTP, isPending } = useVerifyOTP();

    const form = useForm<FormType>({
        resolver: zodResolver(OTP2FASchema),
        defaultValues: useMemo(() => ({ otp: "" }), []),
    });

    const handleSubmit = ({ otp }: FormType) => {
        verifyOTP({ email: userEmail, otp_code: otp });
    };

    return (
        <div className="login-container font-[Inter] sm:w-10/12 px-1 sm:mx-auto flex flex-col justify-center h-[100dvh] md:overflow-hidden max-md:pl-0 max-lg:pl-5">
            <Button
                className="bg-transparent hover:bg-transparent text-gunmetal shadow-none px-0 has-[>svg]:px-0 py-0 size-fit mb-12.5"
                onClick={() => dispatch(setSigninFlow("emailAndPassword"))}
            >
                <ArrowLeft className="md:size-4 size-5" />
                <span className="font-normal">Back</span>
            </Button>

            {welcomeMessage()}

            <p className="text-center mb-5">
                OTP has been sent to your email.
                <br /> Please verify to complete login.
            </p>

            <Form {...form}>
                <form className="grid gap-7.5" onSubmit={form.handleSubmit(handleSubmit)}>
                    <ControlledFieldWrapper
                        control={form.control}
                        name="otp"
                        className="[&_[data-slot='form-message']]:text-center"
                        render={({ field }) => (
                            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                                <InputOTPGroup className="gap-2.5 mx-auto">
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <InputOTPSlot
                                            key={index}
                                            index={index}
                                            className="size-12 rounded-md border border-light-silver"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        )}
                    />
                    <Button className="h-12" type="submit" disabled={isPending} isLoading={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default OTP2FAForm;
