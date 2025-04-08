import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormType } from ".";

interface IInputSpeakerNotesSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const InputSpeakerNotesSection = ({ form }: IInputSpeakerNotesSectionProps) => {
    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <h6>Speaker Notes</h6>
                <p className="text-auro-metal-saurus">
                    Add speaker note for this session (Feel free to copy and paste).
                </p>
            </div>
            <ControlledFieldWrapper
                control={form.control}
                name="notes"
                label="Speaker note"
                className="[&_[data-slot='form-label']]:font-normal"
                render={({ field }) => (
                    <Textarea
                        {...field}
                        placeholder="Enter text here"
                        className="resize-none focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-auro-metal-saurus h-24.5"
                    />
                )}
            />
        </section>
    );
};

export default InputSpeakerNotesSection;
