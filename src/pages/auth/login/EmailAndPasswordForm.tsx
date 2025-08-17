import authPageImage1 from "@/assets/images/jpegs/authPage-image-1.jpeg";
import Office from "@/assets/images/svgs/hugeicons-office.svg";
import { useLogin } from "@/hooks/auth";
import { setAuthPageImage, setSigninFlow, setUserEmail } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import { welcomeMessage } from "../../../components/layouts/userAuth";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

const emailAndPasswordSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required").trim().toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type emailAndPasswordValues = z.infer<typeof emailAndPasswordSchema>;

const EmailAndPasswordForm: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const form = useForm<emailAndPasswordValues>({
        resolver: zodResolver(emailAndPasswordSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate: login, isPending, error } = useLogin();

    const onSubmit: SubmitHandler<emailAndPasswordValues> = async (data) => {
        dispatch(setUserEmail(data.email));
        login(data);
    };
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setAuthPageImage(authPageImage1));
    }, [location.pathname]);

    // const handleGoogleLogin = () => {};

    return (
        <div className="login-container font-[Inter] sm:w-10/12 px-1 sm:mx-auto flex flex-col justify-center h-[100dvh] md:overflow-y-hidden max-md:pl-0 max-lg:pl-5">
            {welcomeMessage()}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="pt-10 md:w-[75%] md:mx-auto flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        className="rounded-lg py-6 font-[Inter] max-md:w-full text-lg focus:border-0 text-black border-[#d0d5dd]"
                                        {...field}
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
                            <FormItem className="relative border-0">
                                <FormControl className="relative border-0">
                                    <div className="relative border-0">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="rounded-lg font-[Inter] py-6 pr-12 border text-black outline-0 border-[#d0d5dd] shadow-0 focus:outline-0 focus:border-0 w-full"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            className="absolute right-1 top-1/2 bg-transparent hover:bg-transparent rounded-none shadow-none text-[#b7b7b7] transform -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        isLoading={isPending}
                        className="py-6 font-[Inter] bg-[#262b3a] hover:bg-[#262b3ada] rounded-lg"
                    >
                        Login
                    </Button>

                    {error && <p className="text-sm text-red-500 -mt-2 text-center">Invalid email or password.</p>}
                </form>
            </Form>

            <section className="flex md:w-[75%] sm:mx-auto justify-between items-center pt-1.5">
                <div>
                    <label className="flex gap-2 justify-start items-center text-sm text-nowrap" htmlFor="remember">
                        <Checkbox
                            className="border-2 p-2 border-gray-300 rounded-md checked:bg-transparent bg-transparent data-[state=checked]:bg-transparent data-[state=checked]:text-black"
                            name="remember"
                            id="remember"
                        />
                        Remember for 30 days
                    </label>
                </div>

                <Link
                    to="../forgot-password"
                    className="font-semibold hover:bg-transparent p-2 bg-transparent shadow-none rounded-lg text-sm text-[#262b3a]"
                >
                    Forgot Password
                </Link>
            </section>
            <div className="relative w-full sm:w-3/4 mx-auto font-[Inter] text-center my-5 ">
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full border-b border-gray-300 z-10"></div>
                <span className="relative z-20 bg-white px-3 text-[#667085] text-sm">OR</span>
            </div>
            <button
                type="button"
                className="flex w-full bg-transparent border border-[#d0d5dda2] py-2.5 text-black p-4 rounded-lg sm:w-3/4 mx-auto justify-center gap-4"
                onClick={() => dispatch(setSigninFlow("organization"))}
            >
                <img src={Office} alt="" className="size-5" />
                <p>Login with your organization</p>
            </button>

            <div className="w-full mt-4">
                <p className="flex items-center text-sm text-muted-foreground gap-1 justify-center">
                    Don't have an account?{" "}
                    <Link
                        to="../signup"
                        className="text-[#262b3a] hover:bg-transparent hover:underline shadow-none font-semibold bg-transparent p-0"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default EmailAndPasswordForm;
