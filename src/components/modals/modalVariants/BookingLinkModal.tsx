import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "..";
import { usePatchSingleOrganization } from "@/hooks/organization/useFetchSingleOrganization";

const addBookingLinkSchema = z.object({
    bookingLink: z.string().min(1, "Booking link is required").url("Please enter a valid URL"),
});

type AddBookingLinkFormValues = z.infer<typeof addBookingLinkSchema>;

interface AddBookingLinkModalProps {
    show: boolean;
    onClose: () => void;
    link: string;
}

const AddBookingLinkModal: React.FC<AddBookingLinkModalProps> = ({ show, onClose, link }) => {
    const searchParams = new URLSearchParams(location.search);
    const enterpriseId = Number(searchParams.get("id"));

    const form = useForm<AddBookingLinkFormValues>({
        resolver: zodResolver(addBookingLinkSchema),
        defaultValues: {
            bookingLink: link,
        },
    });

    const { mutate: patchOrganization, isPending } = usePatchSingleOrganization(enterpriseId);

    const onSubmit: SubmitHandler<AddBookingLinkFormValues> = (data) => {
        patchOrganization(
            { one_on_one_coaching_link: data.bookingLink },
            {
                onSuccess: () => {
                    form.reset();
                    onClose();
                },
                onError: (err) => {
                    console.error("Failed to update organization:", err.message);
                },
            },
        );
    };

    useEffect(() => {
        form.setValue("bookingLink", link);
    }, [link, form]);

    const handleModalClose = () => {
        form.reset({ bookingLink: link });
        onClose();
    };

    return (
        <Modal show={show} onClose={handleModalClose} className="sm:w-full w-[90%] max-w-md mx-4 p-6">
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px] font-medium text-gray-900">Add Booking Link</h2>
                    <button onClick={handleModalClose} className="p-1 bg-white">
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Booking Link */}
                        <FormField
                            control={form.control}
                            name="bookingLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Booking Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Add link"
                                            className="rounded-lg py-3 px-4 border-gray-300 text-[#6B7186]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleModalClose}
                                className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="py-3 bg-[#64BA9F] hover:bg-[#5aa88f] text-white">
                                {isPending ? "Saving..." : "Save Link"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

export default AddBookingLinkModal;
