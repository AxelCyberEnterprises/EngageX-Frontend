import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "..";
import { useAddEnterpriseCredits } from "@/hooks/organization/useAddEnterpriseCredits";

const issueCreditsSchema = z.object({
    numberOfCredit: z
        .string()
        .min(1, "Number of credits is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Please enter a valid number greater than 0"),
});

type IssueCreditsFormValues = z.infer<typeof issueCreditsSchema>;

interface IssueCreditsModalProps {
    show: boolean;
    onClose: () => void;
    orgId: number;
}

const IssueCreditsModal: React.FC<IssueCreditsModalProps> = ({ show, onClose, orgId }) => {
    const form = useForm<IssueCreditsFormValues>({
        resolver: zodResolver(issueCreditsSchema),
        defaultValues: {
            numberOfCredit: ""
        },
    });

    const addCreditsMutation = useAddEnterpriseCredits(orgId);

    const onSubmit: SubmitHandler<IssueCreditsFormValues> = (data) => {
        addCreditsMutation.mutate(
            {
                amount: Number(data.numberOfCredit),
                reason: `Credits issued to organization`,
            },
            {
                onSuccess: () => {
                    form.reset();
                    onClose();
                },
            }
        )
    };

    const handleModalClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleModalClose} className="sm:w-full w-[90%] max-w-md mx-4 p-6">
            <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px] font-medium text-gray-900">Issue Credits</h2>
                    <button onClick={handleModalClose} className="p-1 bg-white">
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="numberOfCredit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Number of Credit</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter number of credit"
                                            className="rounded-lg py-3 px-4 border-gray-300 text-[#6B7186]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 pt-4 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleModalClose}
                                className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="py-3 bg-[#64BA9F] hover:bg-[#5aa88f] text-white" disabled={addCreditsMutation.isPending}>
                                {addCreditsMutation.isPending ? "Issuing..." : "Issue Credit"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

export default IssueCreditsModal;
