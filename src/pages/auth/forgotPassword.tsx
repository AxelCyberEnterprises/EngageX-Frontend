import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useLocation} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/auth";
import authPageImage2 from "@/assets/images/jpegs/authPage-image-2.jpeg"
import { setAuthPageImage } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
const ForgotPassword: React.FC = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setAuthPageImage(authPageImage2))
    },[location.pathname])
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate: forgotPassword, isPending, error } = useForgotPassword();

    const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
        forgotPassword(data);
    };
    useEffect(() => {
        if (error) {
            form.setError("email", {
                type: "manual",
                message: "Failed to send reset link. Please try again.",
            });
        }
    }, [error]);

    return (
        <div className="forgot-password-container px-1 md:w-10/12 sm:w-3/5 h-[100dvh] sm:mx-auto   flex flex-col justify-center overflow-y-hidden gap-3 max-md:pl-0 max-lg:pl-5">
            <h2 className="text-3xl text-center">Forgot Password?</h2>
            <p className="text-center font-[Inter] text-[#667085]">
                We got you. Enter your email to get a link to <br /> reset your password.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-[75%] sm:mx-auto">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        className=" rounded-lg  w-full font-[Inter]  py-6 text-black border-[#d0d5dd]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4 font-[Inter] pt-4">
                        <Link
                            to="../login"
                            className="bg-white flex-1 text-black rounded-lg py-4 px-5 h-auto border border-[#d0d5dd] flex items-center justify-center font-semibold"
                        >
                            Back
                        </Link>
                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="text-white flex items-center justify-center flex-[4.5] bg-[#262b3a] hover:bg-[#262b3ada] h-auto py-4 rounded-lg"
                        >
                            Get OTP
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ForgotPassword;
