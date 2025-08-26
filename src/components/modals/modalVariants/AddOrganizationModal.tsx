import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ChevronDown, Copy } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "..";
import { useClickOutside } from "@/hooks/useClickoutside";
import { useCreateOrganization } from "@/hooks";

const addOrganizationSchema = z
    .object({
        organizationName: z.string().min(1, "Organization name is required"),
        industryType: z.enum(["Sport Organization", "Non-Sport Organization"], {
            required_error: "Please select an industry type",
        }),
        sportType: z.enum(["NFL", "NBA", "WNBA", "MLB"]).optional(),
        oneOnOneCoachingLink: z.string().min(1, "One-on-one coaching link is required"),
    })
    .superRefine((data, ctx) => {
        if (data.industryType === "Sport Organization" && !data.sportType) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a sports type",
                path: ["sportType"],
            });
        }
    });

type AddOrganizationFormValues = z.infer<typeof addOrganizationSchema>;

interface AddOrganizationModalProps {
    show: boolean;
    onClose: () => void;
    onAddOrganizationSuccess: () => void;
}

const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({ show, onClose, onAddOrganizationSuccess }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

    useClickOutside(dropdownRef, dropdownButtonRef, () => setIsDropdownOpen(false));

    const [isSportDropdownOpen, setIsSportDropdownOpen] = useState(false);
    const sportDropdownRef = useRef<HTMLDivElement | null>(null);
    const sportDropdownButtonRef = useRef<HTMLButtonElement | null>(null);

    useClickOutside(sportDropdownRef, sportDropdownButtonRef, () => setIsSportDropdownOpen(false));

    const form = useForm<AddOrganizationFormValues>({
        resolver: zodResolver(addOrganizationSchema),
        defaultValues: {
            organizationName: "",
            industryType: undefined,
            sportType: undefined,
            oneOnOneCoachingLink: "",
        },
    });

    const selectedIndustry = form.watch("industryType");
    const selectedSport = form.watch("sportType");

    const createOrg = useCreateOrganization();

    const onSubmit: SubmitHandler<AddOrganizationFormValues> = (data) => {
        createOrg.mutate(
            {
                name: data.organizationName,
                enterprise_type: data.industryType === "Sport Organization" ? "sport" : "general",
                sport_type:
                    data.industryType === "Non-Sport Organization"
                        ? null
                        : data.sportType === "NFL"
                          ? "nfl"
                          : data.sportType === "NBA"
                            ? "nba"
                            : data.sportType === "WNBA"
                              ? "wnba"
                              : "mlb",
                one_on_one_coaching_link: data.oneOnOneCoachingLink,
                is_active: true,
            },
            {
                onSuccess: () => {
                    form.reset();
                    onClose();
                    onAddOrganizationSuccess();
                },
            },
        );
    };
    const industryOptions = ["Sport Organization", "Non-Sport Organization"];

    const sportOptions = ["NFL", "NBA", "WNBA", "MLB"];

    const handleIndustrySelect = (value: "Sport Organization" | "Non-Sport Organization") => {
        form.setValue("industryType", value);
        if (value === "Non-Sport Organization") {
            form.setValue("sportType", undefined); // clear sport type
        }
        setIsDropdownOpen(false);
    };

    const handleSportSelect = (value: "NFL" | "NBA" | "WNBA" | "MLB") => {
        form.setValue("sportType", value);
        setIsSportDropdownOpen(false);
    };

    const handleCopyLink = () => {
        const link = form.getValues("oneOnOneCoachingLink");
        if (link) {
            navigator.clipboard.writeText(link);
        }
    };

    const handleModalClose = () => {
        form.reset();
        setIsDropdownOpen(false);
        onClose();
    };

    return (
        <Modal show={show} onClose={handleModalClose} className="sm:w-full w-[90%] max-w-md mx-4 p-6">
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px] font-medium text-gray-900">Add Organization</h2>
                    <button onClick={handleModalClose} className="p-1 bg-white">
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="organizationName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#252A39] font-inter">
                                        Organization Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus:ring-0 focus-visible:ring-0 rounded-lg py-3 px-4 border-gray-300 text-[#252A39] text-sm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Industry Type */}
                        <FormField
                            control={form.control}
                            name="industryType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700 font-inter">
                                        Industry Type
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <button
                                                ref={dropdownButtonRef}
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg flex items-center justify-between"
                                            >
                                                <span
                                                    className={
                                                        field.value ? "text-gray-900 text-sm" : "text-gray-500 text-sm"
                                                    }
                                                >
                                                    {field.value || "Add Organization Type"}
                                                </span>
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            </button>

                                            {isDropdownOpen && (
                                                <div
                                                    ref={dropdownRef}
                                                    className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                                                >
                                                    {industryOptions.map((option, idx) => {
                                                        const isSelected = selectedIndustry === option;
                                                        return (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() =>
                                                                    handleIndustrySelect(
                                                                        option as
                                                                            | "Sport Organization"
                                                                            | "Non-Sport Organization",
                                                                    )
                                                                }
                                                                className={`block w-full px-4 py-3 text-left font-inter text-sm bg-[#fff] ${
                                                                    isSelected
                                                                        ? "bg-[#E9E9EC] text-[#6B7186]"
                                                                        : "text-gray-500 hover:bg-[#E4E4E7"
                                                                } ${idx === 0 ? "rounded-t-lg" : ""} ${
                                                                    idx === industryOptions.length - 1
                                                                        ? "rounded-b-lg"
                                                                        : ""
                                                                } transition-colors`}
                                                            >
                                                                {option}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Sports Type */}
                        {selectedIndustry === "Sport Organization" && (
                            <FormField
                                control={form.control}
                                name="sportType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 font-inter">
                                            Sport Type
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <button
                                                    ref={sportDropdownButtonRef}
                                                    type="button"
                                                    onClick={() => setIsSportDropdownOpen(!isSportDropdownOpen)}
                                                    className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg flex items-center justify-between"
                                                >
                                                    <span
                                                        className={
                                                            field.value
                                                                ? "text-gray-900 text-sm"
                                                                : "text-gray-500 text-sm"
                                                        }
                                                    >
                                                        {field.value || "Add Sports Type"}
                                                    </span>
                                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                                </button>

                                                {isSportDropdownOpen && (
                                                    <div
                                                        ref={sportDropdownRef}
                                                        className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                                                    >
                                                        {sportOptions.map((option, idx) => {
                                                            const isSelected = selectedSport === option;
                                                            return (
                                                                <button
                                                                    key={option}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleSportSelect(
                                                                            option as "NFL" | "NBA" | "WNBA" | "MLB",
                                                                        )
                                                                    }
                                                                    className={`block w-full px-4 py-3 text-left font-inter text-sm bg-[#fff] ${
                                                                        isSelected
                                                                            ? "bg-[#E9E9EC] text-[#6B7186]"
                                                                            : "text-gray-500 hover:bg-[#E4E4E7"
                                                                    } ${idx === 0 ? "rounded-t-lg" : ""} ${
                                                                        idx === sportOptions.length - 1
                                                                            ? "rounded-b-lg"
                                                                            : ""
                                                                    } transition-colors`}
                                                                >
                                                                    {option}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* One-on-one Coaching Link */}
                        <FormField
                            control={form.control}
                            name="oneOnOneCoachingLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700 font-inter">
                                        One-on-one Coaching Link
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="focus:ring-0 focus-visible:ring-0 rounded-lg py-3 px-4 pr-12 text-gray-900 border-gray-300"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCopyLink}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors bg-[#fff]"
                                            >
                                                <Copy className="w-4 h-4 text-gray-400" />
                                            </button>
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
                                Add Organization
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

export default AddOrganizationModal;
