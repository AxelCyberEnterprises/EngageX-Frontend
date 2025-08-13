import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ChevronDown } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "..";
import { useClickOutside } from "@/hooks/useClickoutside";

const issueCreditsSchema = z.object({
    numberOfCredit: z
        .string()
        .min(1, "Number of credits is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Please enter a valid number greater than 0"),
    member: z.string().min(1, "Please select a member"),
});

type IssueCreditsFormValues = z.infer<typeof issueCreditsSchema>;

interface IssueCreditsModalProps {
    show: boolean;
    onClose: () => void;
}

const IssueCreditsModal: React.FC<IssueCreditsModalProps> = ({ show, onClose }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

    useClickOutside(dropdownRef, dropdownButtonRef, () => setIsDropdownOpen(false));

    const form = useForm<IssueCreditsFormValues>({
        resolver: zodResolver(issueCreditsSchema),
        defaultValues: {
            numberOfCredit: "",
            member: "",
        },
    });

    // Dummy members data - in real app, this would come from props or API
    const members = [
        { id: "1", name: "James Edward" },
        { id: "2", name: "Michelle Walters" },
        { id: "3", name: "Malik Bronson" },
        { id: "4", name: "DeShawn Rivers" },
        { id: "5", name: 'Andre "Buckets" Wallace' },
    ];

    const onSubmit: SubmitHandler<IssueCreditsFormValues> = (data) => {
        const selectedMember = members.find((member) => member.id === data.member);

        console.log("Issue Credits Data:", {
            numberOfCredit: Number(data.numberOfCredit),
            member: selectedMember,
            memberId: data.member,
        });

        // Reset form and close modal
        form.reset();
        onClose();
    };

    const handleMemberSelect = (memberId: string, memberName: string) => {
        form.setValue("member", memberId);
        setIsDropdownOpen(false);
    };

    const handleModalClose = () => {
        form.reset();
        setIsDropdownOpen(false);
        onClose();
    };

    const selectedMember = members.find((member) => member.id === form.watch("member"));

    return (
        <Modal show={show} onClose={handleModalClose} className="w-full max-w-md mx-4 p-6">
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px] font-medium text-gray-900">Issue Credits</h2>
                    <button onClick={handleModalClose} className="p-1 bg-white">
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Number of Credit */}
                        <FormField
                            control={form.control}
                            name="numberOfCredit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                        Number of Credit
                                    </FormLabel>
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

                        {/* Member Dropdown */}
                        <FormField
                            control={form.control}
                            name="member"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Member</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <button
                                                ref={dropdownButtonRef}
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="w-full px-4 py-[14px] text-left bg-white border border-[#D1D5DB] rounded-lg flex items-center justify-between text-sm"
                                            >
                                                <span className={selectedMember ? "text-gray-900" : "text-[#6B7186]"}>
                                                    {selectedMember ? selectedMember.name : "Select member"}
                                                </span>
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            </button>

                                            {isDropdownOpen && (
                                                <div
                                                    ref={dropdownRef}
                                                    className="absolute z-50 w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-48 overflow-y-auto"
                                                >
                                                    {members.map((member) => (
                                                        <button
                                                            key={member.id}
                                                            type="button"
                                                            onClick={() => handleMemberSelect(member.id, member.name)}
                                                            className="bg-[#fff] block w-full px-3 py-2 text-sm text-gray-700 text-left hover:bg-[#F3F4F6] first:rounded-t-lg last:rounded-b-lg transition-colors"
                                                        >
                                                            {member.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
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
                                Issue Credit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

export default IssueCreditsModal;
