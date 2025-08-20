import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Modal from "..";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const editQuestionSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
});

type EditQuestionValues = z.infer<typeof editQuestionSchema>;

interface EditQuestionModalProps {
  show: boolean;
  onClose: () => void;
  defaultValue?: string;
  onSubmit: (questionText: string) => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({ show, onClose, defaultValue, onSubmit }) => {
  const form = useForm<EditQuestionValues>({
    resolver: zodResolver(editQuestionSchema),
    defaultValues: {
      questionText: defaultValue || "",
    },
  });

const handleSubmit: SubmitHandler<EditQuestionValues> = (data) => {
        onSubmit(data.questionText);
    };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    form.setValue("questionText", defaultValue || "");
  }, [defaultValue]);

  console.log('question text to edit', defaultValue)

  return (
    <Modal show={show} onClose={handleClose} className="w-full max-w-lg p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] font-medium text-gray-900">Edit Question</h2>
          <button
            onClick={handleClose}
            className="p-1 bg-white"
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
                    Question Text
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter question..."
                      className=" text-[#6B7186]  py-3 px-4 border-gray-300 focus-ring-0 focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 bg-[#64BA9F] hover:bg-[#5aa88f] text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export { EditQuestionModal };
