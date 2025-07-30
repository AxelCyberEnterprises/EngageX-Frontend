import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { RootState } from "@/store";
import { setSigninFlow } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const OTPSchema = z.object({
    otp: z.string({ required_error: "OTP is required" }).min(6, {
        message: "One-time password must be 6 characters.",
    }),
});
type FormType = z.infer<typeof OTPSchema>;

const OTPForm = () => {
    const { companyEmail } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(OTPSchema),
        defaultValues: useMemo(() => ({ otp: "" }), []),
    });

    // const handleSubmit = () => {};

    return (
        <section className="h-dvh flex items-center justify-center py-8">
            <div className="flex flex-col gap-12.5 md:w-3/5 w-full md:h-auto h-full">
                <Button
                    className="bg-transparent hover:bg-transparent text-gunmetal shadow-none px-0 has-[>svg]:px-0 py-0 size-fit"
                    onClick={() => dispatch(setSigninFlow("organization"))}
                >
                    <ArrowLeft className="md:size-4 size-5" />
                    <span className="font-normal">Back</span>
                </Button>

                <div className="flex flex-col gap-7.5 md:my-0 my-auto">
                    <div className="space-y-2.5 text-center">
                        <h6>Enterprise SSO</h6>
                        <p className="text-lg text-[#667085]">
                            A temporary sign-in code has been sent to {companyEmail}
                        </p>
                    </div>

                    <Form {...form}>
                        <form
                            className="grid gap-7.5"
                            onSubmit={form.handleSubmit(() => dispatch(setSigninFlow("otp")))}
                        >
                            <ControlledFieldWrapper
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup className="gap-2.5 mx-auto">
                                            {Array.from({ length: 6 }, (_, index) => (
                                                <InputOTPSlot key={index} index={index} className="size-12 rounded-md border border-light-silver" />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                )}
                            />
                            <Button className="h-12">Login</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default OTPForm;
