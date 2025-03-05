import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setContent, setSignupFlow, setSignupData } from "../../store/slices/authSlice";
import { Link } from "react-router-dom";
import { welcomeMessage } from "../layouts/userAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";

const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",

    },
  });

  const signupData = useSelector((state: RootState) => state.auth.signupData);
  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    console.log("Form Data:", data);
    dispatch(setSignupData({
      ...signupData,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      
    }));
    dispatch(setSignupFlow("confirmation"));
  };
  

  return (
    <div className="signup-container sm:w-10/12 px-1 sm:mx-auto md:flex block flex-col justify-center h-full md:h-screen md:overflow-y-hidden max-md:pl-0 max-lg:pl-5">
      {welcomeMessage()}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex pt-5 sm:w-[75%] sm:mx-auto font-[Montserrat] flex-col gap-5 md:gap-4"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your full name" className="rounded-[20px] font-[Montserrat] text-black py-5 border-[#d0d5dd]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your email" className="rounded-[20px] font-[Montserrat]  py-5 text-black border-[#d0d5dd]" {...field} />
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
                      className="rounded-[20px] py-5 pr-12 border font-[Montserrat] text-black border-[#d0d5dd] w-full"
                      {...field}
                    />
                    <Button
                      type="button"
                      className="absolute right-1 top-1/2 bg-transparent text-[#b7b7b7] transform -translate-y-1/2"
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
                      className="rounded-[20px] py-5 pr-12 font-[Montserrat] text-black border-[#d0d5dd] w-full"
                      {...field}
                    />
                    <Button
                      type="button"
                      className="absolute right-1 top-1/2 bg-transparent text-[#b7b7b7] transform -translate-y-1/2"
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

          <Button type="submit" className="rounded-[20px] font-[Montserrat]  py-5">Get Started</Button>
        </form>
      </Form>
      <div className="flex gap-2 w-full text-muted-foreground text-sm justify-center font-[Montserrat] items-center my-2">
        <p>Already have an account?</p>
        <Link to="login"
          onClick={() => {
            dispatch(setContent("login"));
          }}
          className="font-semibold bg-transparent shadow-none hover:bg-none text-black w-fit p-0"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
