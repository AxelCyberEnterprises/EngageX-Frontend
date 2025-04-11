import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ISessionNameSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
}

const SessionNameSection = ({ className, form }: ISessionNameSectionProps) => {
    return (
        <section className={cn("space-y-4", className)}>
            <div className="space-y-1">
                <h6>Session Name</h6>
                <p className="text-auro-metal-saurus">What would you call this session?</p>
            </div>
            <ControlledFieldWrapper
                control={form.control}
                name="session_name"
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder="Enter name"
                        className="h-11 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-auro-metal-saurus"
                    />
                )}
            />
        </section>
    );
};

export default SessionNameSection;
