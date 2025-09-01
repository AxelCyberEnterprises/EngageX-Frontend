import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Modal from "..";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const createQuestionSchema = z.object({
    questionText: z.string().min(1, "Question text is required"),
    sportType: z.string().optional(),
});

type CreateQuestionValues = z.infer<typeof createQuestionSchema>;

export interface CreateQuestionFormData {
    questionText: string;
    sportType?: string;
}

interface CreateQuestionModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: CreateQuestionFormData) => void;
    isLoading?: boolean;
    activeTab: string;
}

const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
    show,
    onClose,
    onSubmit,
    isLoading = false,
    activeTab,
}) => {
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    // const dropdownRef = useRef<HTMLDivElement>(null);
    const form = useForm<CreateQuestionValues>({
        resolver: zodResolver(createQuestionSchema),
        defaultValues: {
            questionText: "",
            sportType: "none",
        },
    });

    const handleSubmit: SubmitHandler<CreateQuestionValues> = (data) => {
        onSubmit({
            questionText: data.questionText,
            sportType: data.sportType === "none" ? undefined : data.sportType,
        });
    };

    // const handleMemberSelect = (id: string) => {
    //     form.setValue("sportType", id === "none" ? "" : id);
    //     setIsDropdownOpen(false);
    // };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    // const sportOptions = [
    //     { id: "none", name: "None" },
    //     { id: "nfl", name: "NFL" },
    //     { id: "nba", name: "NBA" },
    //     { id: "wnba", name: "WNBA" },
    //     { id: "mlb", name: "MLB" },
    // ];

    return (
        <Modal show={show} onClose={handleClose} className="sm:w-full w-[90%] max-w-lg p-6">
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-[24px] font-medium text-gray-900">Create New Question</h2>
                        <p className="text-sm text-gray-600 mt-1">Add a new question to {activeTab}</p>
                    </div>
                    <button onClick={handleClose} className="p-1 bg-white" disabled={isLoading}>
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="questionText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Question Text *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your question..."
                                            className="text-[#6B7186] py-3 px-4 border-gray-300 focus-ring-0 focus-visible:ring-0"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    {form.formState.errors.questionText && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {form.formState.errors.questionText.message}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                                className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white"
                            >
                                {isLoading ? "Creating..." : "Create Question"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

export { CreateQuestionModal };
