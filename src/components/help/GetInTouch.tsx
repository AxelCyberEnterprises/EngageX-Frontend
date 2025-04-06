import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(1, { message: "Message is required" }),
});

interface modalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const GetInTouch: React.FC<modalProps> = ({ isOpen, setIsOpen }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Form values:", values); // Log form values
        setIsOpen(false); // Close the dialog
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="font-[montserrat] [&>button]:hidden">
                    <DialogTitle className="font-[montserrat] font-semibold">Get in touch</DialogTitle>
                    <DialogDescription className="-mt-2 mb-1">
                        Our friendly team would love to hear from you.
                    </DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
                            <div className="flex sm:flex-row flex-col gap-4 sm:gap-2">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="First name"
                                                    className="placeholder:text-[#667085] text-black font-medium"
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
                                        <FormItem className="flex-1">
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Last name"
                                                    className="placeholder:text-[#667085] text-black font-medium"
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="you@company.com"
                                                className="placeholder:text-[#667085] text-black font-medium"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Your message"
                                                className=" min-h-48 placeholder:text-[#667085] text-black font-medium"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <p>
                                    Or email us at{" "}
                                    <span>
                                        <a className="hover:underline" href="mailto:info@engagexai.io">
                                            info@engagexai.io
                                        </a>
                                    </span>
                                </p>
                            </div>
                            <div className="w-full flex sm:flex-row flex-col gap-2">
                                <DialogClose className="flex-1" asChild>
                                    <button
                                        className="bg-transparent rounded-lg text-[#414651] font-semibold py-3.5 hover:bg-transparent border"
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                </DialogClose>
                                <button className="flex-1 rounded-lg py-3.5 font-semibold" type="submit">
                                    Send mail
                                </button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GetInTouch;
