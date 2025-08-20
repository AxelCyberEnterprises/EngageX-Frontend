import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, X } from "lucide-react";
import Modal from "..";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  activeTab
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  const handleMemberSelect = (id: string) => {
    form.setValue("sportType", id === "none" ? "" : id);
    setIsDropdownOpen(false);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const sportOptions = [
    { id: "none", name: "None" },
    { id: "nfl", name: "NFL" },
    { id: "nba", name: "NBA" },
    { id: "wnba", name: "WNBA" },
    { id: "mlb", name: "MLB" },
  ];

  return (
    <Modal show={show} onClose={handleClose} className="sm:w-full w-[90%] max-w-lg p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[24px] font-medium text-gray-900">Create New Question</h2>
            <p className="text-sm text-gray-600 mt-1">Add a new question to {activeTab}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 bg-white"
            disabled={isLoading}
          >
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Question Text *
                  </FormLabel>
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

            <FormField
              control={form.control}
              name="sportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Sport Type (Optional)
                  </FormLabel>
                  <FormControl>
                    <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
                      <button
                        ref={dropdownButtonRef}
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-[14px] text-left bg-white border border-[#D1D5DB] rounded-lg flex items-center justify-between text-sm"
                        disabled={isLoading}
                      >
                        <span className={field.value && field.value !== "none" ? "text-gray-900" : "text-[#6B7186]"}>
                          {sportOptions.find((sport) => sport.id === (field.value || "none"))?.name || "Select sport"}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>

                      {isDropdownOpen && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-[99999999] w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-48 overflow-y-auto"
                        >
                          {sportOptions.map((sport) => (
                            <button
                              key={sport.id}
                              type="button"
                              onClick={() => handleMemberSelect(sport.id)}
                              className="bg-[#fff] block w-full px-3 py-2 text-sm text-gray-700 text-left hover:bg-[#F3F4F6] first:rounded-t-lg last:rounded-b-lg transition-colors"
                            >
                              {sport.name}
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