import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useContactUs } from "@/hooks/auth";
import { Button } from "../ui/button";
import SlideToast from "../ui/SlideToast";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetInTouch: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const { mutate: contactUs, status } = useContactUs({
    onSuccess: () => {
      setIsOpen(false);
      setSuccessModal(true);
      form.reset(); 
    },
    onError: () => {
      setIsOpen(false);
      setErrorModal(true);
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    contactUs(
      {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        message: values.message,
        agreed_to_policy: true,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setSuccessModal(true);
          form.reset(); // Clear the form
        },
        onError: () => {
          setIsOpen(false);
          setErrorModal(true);
        },
      }
    );
  };

  return (
      <>
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
                          <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-2">
                              <DialogClose className="flex-1" asChild>
                                  <button
                                      className="bg-transparent rounded-lg text-[#414651] font-semibold py-3.5 hover:bg-transparent border"
                                      type="button"
                                  >
                                      Cancel
                                  </button>
                              </DialogClose>
                              <Button
                                  type="submit"
                                  disabled={status === "pending"}
                                  isLoading={status === "pending"}
                                  className="bg-branding-primary hover:bg-branding-primary/90 flex justify-center rounded-lg py-6 font-semibold text-white"
                              >
                                  Send mail
                              </Button>
                          </div>
                      </form>
                  </Form>
              </DialogContent>
          </Dialog>

          {/* Success Toast */}
          <SlideToast
              type="success"
              show={successModal}
              onClose={() => setSuccessModal(false)}
              message="Message sent!"
              description="You should hear from us soon."
          />

          {/* Error Toast */}
          <SlideToast
              type="error"
              show={errorModal}
              onClose={() => setErrorModal(false)}
              message="Message not sent!"
              description="Please try again."
          />
      </>
  );
};

export default GetInTouch;
