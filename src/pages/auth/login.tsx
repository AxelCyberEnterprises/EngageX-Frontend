import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { welcomeMessage } from "../../components/layouts/userAuth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { useLogin } from "@/hooks/auth";

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [apiError, setApiError] = React.useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate: login, isPending } = useLogin();

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        setApiError(null);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/auth/login/`,
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );


            // Extract the token from the response
            const token = response.data.data.token;
            if (!token) {
                throw new Error("No token received from the server");
            }

            localStorage.setItem("authToken", token);

            login(data);

           
        } catch (error: any) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setApiError(error.response?.data?.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className="login-container font-[Inter] sm:w-10/12 px-1 sm:mx-auto flex flex-col justify-center h-screen md:overflow-y-hidden max-md:pl-0 max-lg:pl-5">
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
                        {isPending ? "Logging in..." : "Login"}
                    </Button>

                    {apiError && <p className="text-sm text-red-500 text-center">{apiError}</p>}
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

            <div className="w-full mt-1">
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

export default Login;
