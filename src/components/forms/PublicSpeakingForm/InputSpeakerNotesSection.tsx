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
                <p className="text-independence">Add speaker note for this session.</p>
            </div>
            <ControlledFieldWrapper
                control={form.control}
                name="speakerNotes"
                label="Speaker note"
                className="[&_[data-slot='form-label']]:font-normal"
                render={({ field }) => (
                    <Textarea
                        {...field}
                        placeholder="Enter text here"
                        className="resize-none focus-visible:ring-0 shadow-none text-gunmetal h-24.5"
                    />
                )}
            />
        </section>
    );
};

export default InputSpeakerNotesSection;
