import VirtualEnvironmentSection from "@/components/forms/form-sections/VirtualEnvironmentSection";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { practicesVEOptions } from "@/config/form-field-options";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ISlidePreviewAndSettingsSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
}

const SlidePreviewAndSettingsSection = ({ className, form }: ISlidePreviewAndSettingsSectionProps) => {
    return (
        <section className={cn("flex flex-col gap-y-4", className)}>
            <>
                <VirtualEnvironmentSection
                    {...{ form }}
                    instruction="Select a suitable environment for your speaking needs"
                    options={practicesVEOptions}
                    className="md:block hidden p-0 border-0 [&_[data-slot='form-label']>div]:h-38 [&_h6]:text-lg"
                />
                <Separator className="md:block hidden bg-bright-gray" />
                <div className="flex items-start justify-between">
                    <p className="md:text-sm leading-tight">Enable AI Audience Generated Session Questions</p>
                    <Switch
                        onCheckedChange={(checked) => form.setValue("allow_ai_questions", checked)}
                        className="p-0 justify-start h-6 w-10 [&_[data-slot='switch-thumb']]:size-5"
                    />
                </div>
            </>
        </section>
    );
};

export default SlidePreviewAndSettingsSection;
