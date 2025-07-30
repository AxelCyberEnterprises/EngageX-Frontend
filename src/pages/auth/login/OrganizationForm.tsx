import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setCompanyEmail, setSigninFlow } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const OrganizationSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Please, enter a valid email address" }),
});
type FormType = z.infer<typeof OrganizationSchema>;

const OrganizationForm = () => {
    const dispatch = useDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: useMemo(() => ({ email: "" }), []),
    });

    const handleSubmit = useCallback(
        ({ email }: FormType) => {
            dispatch(setCompanyEmail(email));
            dispatch(setSigninFlow("otp"));
        },
        [dispatch],
    );

    return (
        <section className="h-dvh flex items-center justify-center py-8">
            <div className="flex flex-col gap-12.5 md:w-3/5 w-full md:h-auto h-full">
                <Button
                    className="bg-transparent hover:bg-transparent text-gunmetal shadow-none px-0 has-[>svg]:px-0 py-0 size-fit"
                    onClick={() => dispatch(setSigninFlow("emailAndPassword"))}
                >
                    <ArrowLeft className="md:size-4 size-5" />
                    <span className="font-normal">Back</span>
                </Button>

                <div className="flex flex-col gap-7.5 md:my-0 my-auto">
                    <div className="space-y-2.5 text-center">
                        <h6>Continue with your company email</h6>
                        <p className="text-lg text-[#667085]">
                            Access your enterprise account by typing your account supported email
                        </p>
                    </div>

                    <Form {...form}>
                        <form className="grid gap-7.5" onSubmit={form.handleSubmit(handleSubmit)}>
                            <ControlledFieldWrapper
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Enter work email"
                                        className="h-12 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-auro-metal-saurus"
                                    />
                                )}
                            />
                            <Button className="h-12">Send SSO code</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default OrganizationForm;
