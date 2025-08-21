import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setAuthPageImage, setSignupData } from "../../store/slices/authSlice";
import { Link, useLocation } from "react-router-dom";
import { BackToWebsite, welcomeMessage } from "../layouts/userAuth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
// import googleIcon from "@/assets/images/svgs/google-icon.svg";
import { useSignup } from "@/hooks/auth";
import { RootState } from "@/store";
import authPageImage1 from "@/assets/images/jpegs/authPage-image-1.jpeg";
// Enhanced password validation schema
const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const signupSchema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address").min(1, "Email is required").trim().toLowerCase(),
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [passwordStrength, setPasswordStrength] = React.useState("");
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    const dispatch = useDispatch();

    const signupData = useSelector((state: RootState) => state.auth.signupData);

    const { mutate: signup, isPending, error } = useSignup();

    const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        const newData = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password,
        };
        dispatch(
            setSignupData({
                ...signupData,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            }),
        );
        signup(newData);
    };

    useEffect(() => {
        if (error) {
            form.setError("confirmPassword", {
                type: "manual",
                message: error.message || "Verification failed. Please try again.",
            });
        }
    }, [error]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        form.setValue("password", password);
        checkPasswordStrength(password);
    };

    const checkPasswordStrength = (password: string) => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.\-_]).{6,}$/;

        const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

        if (strongRegex.test(password)) {
            setPasswordStrength("Strong");
        } else if (mediumRegex.test(password)) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Weak");
        }
    };

    // const handleGoogleLogin = async () => {
    // googleLogin()
    // try {
    //     const response = await axios.post(
    //         "http://exchange-v2-env.eba-ccvmvqqg.us-west-1.elasticbeanstalk.com/users/auth/google-login/", // Your Django endpoint
    //         {}, // Send an empty object as the POST body (if no data is needed)
    //         { withCredentials: true }
    //     );
    //     console.log("Google login initiated:", response);
    //     window.location.href = response.request.responseURL; // Redirect to the Google login page.
    // } catch (error) {
    //     console.error("Google login failed:", error);
    // }
    // };

    const location = useLocation();
    useEffect(() => {
        dispatch(setAuthPageImage(authPageImage1));
    }, [location.pathname]);

    return (
        <div className="signup-container pt-16 sm:w-10/12 overflow-y-auto px-1 scrollbar-hide lg:mt-5 sm:mx-auto md:flex flex flex-col lg:block  max-md:justify-start justify-center h-[100dvh] mb-10 pb-7  max-md:pl-0 max-lg:pl-5">
            
            <div className="stick lg:mt-0 mt-3 top-5">{BackToWebsite()}</div>
            {welcomeMessage()}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex pt-1 sm:w-[75%] sm:mx-auto font-[Montserrat] flex-col gap-5 md:gap-4"
                >
                    <div className="grid grid-cols-2 gap-2 mx-auto w-full">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your first name"
                                            className="rounded-lg flex-1 w-full font-[Montserrat] text-black py-6 border-[#d0d5dd]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your last name"
                                            className="rounded-lg flex-1 w-full font-[Montserrat] text-black py-6 border-[#d0d5dd]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        className="rounded-lg font-[Montserrat]  py-6 text-black border-[#d0d5dd]"
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
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="rounded-lg py-6 pr-12 border font-[Montserrat] text-black border-[#d0d5dd] w-full"
                                            {...field}
                                            onChange={handlePasswordChange}
                                        />
                                        <Button
                                            type="button"
                                            className="absolute right-1 shadow-none top-1/2 bg-transparent hover:bg-transparent text-[#b7b7b7] transform -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                                {passwordStrength && (
                                    <div className="text-sm mt-1">
                                        Password Strength:{" "}
                                        <span
                                            className={`font-semibold ${passwordStrength === "Strong" ? "text-green-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-red-500"}`}
                                        >
                                            {passwordStrength}
                                        </span>
                                    </div>
                                )}
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
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            className="rounded-lg py-6 pr-12 font-[Montserrat] text-black border-[#d0d5dd] w-full"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            className="absolute right-1 top-1/2 shadow-none bg-transparent hover:bg-transparent text-[#b7b7b7] transform -translate-y-1/2"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        name="submit"
                        isLoading={isPending}
                        className="rounded-lg font-[Montserrat] bg-[#262b3a] hover:bg-[#262b3ada] py-6"
                    >
                        Get Started
                    </Button>
                </form>
            </Form>
            <div>
                <label
                    className="flex sm:w-[75%] mx-auto font-[500] mt-2 gap-2 justify-start items-center text-sm text-nowrap"
                    htmlFor="remember"
                >
                    <Checkbox
                        className=" border-2  p-2 border-gray-300 rounded-md checked:bg-transparent   bg-transparent  data-[state=checked]:bg-transparent data-[state=checked]:text-black  "
                        name="remember"
                        id="remember"
                    />
                    Remember for 30 days
                </label>
            </div>
            {/* <div className="relative w-full sm:w-3/4 mx-auto font-[Inter] text-center my-5 ">
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full border-b border-gray-300 z-10"></div>
                <span className="relative z-20 bg-white px-3">OR</span>
            </div>
            <button
                onClick={handleGoogleLogin}
                className="flex w-full bg-transparent hover:scale-[1.03] duration-300 border border-[#d0d5dda2] font-[Montserrat] py-2.5 text-black p-4 rounded-lg sm:w-3/4 mx-auto  justify-center gap-4"
            >
                <img src={googleIcon} className="w-[20px]" alt="" />
                <p>Sign up with Google</p>
            </button> */}
            <div className="flex gap-2 w-full text-muted-foreground text-sm justify-center font-[Montserrat] items-center my-2">
                <p>Already have an account?</p>
                <Link
                    to="../login"
                    className="font-semibold bg-transparent hover:underline shadow-none hover:bg-none text-black w-fit p-0"
                >
                    Log in
                </Link>
            </div>
        </div>
    );
};

export default Signup;
