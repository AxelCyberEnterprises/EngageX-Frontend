import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import QuickTips from "@/components/dashboard/QuickTips";
import VirtualEnvironmentSection from "@/components/forms/form-sections/VirtualEnvironmentSection";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { pitchPracticeVEOptions, presentationPracticeVEOptions } from "@/config/form-field-options";
import { pitchPracticeQuickTips, presentationPracticeQuickTips } from "@/config/quick-tips";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ISlidePreviewAndSettingsSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
}

const SlidePreviewAndSettingsSection = ({ className, form }: ISlidePreviewAndSettingsSectionProps) => {
    const sessionType = form.watch("session_type") as "pitch" | "presentation";

    return (
        <section className={cn("flex flex-col gap-y-4", className)}>
            <>
                <VirtualEnvironmentSection
                    {...{ form }}
                    instruction={
                        sessionType === "presentation" ? "Select a suitable environment for your speaking needs" : ""
                    }
                    options={sessionType === "pitch" ? pitchPracticeVEOptions : presentationPracticeVEOptions}
                    className="p-0 border-0 [&_[data-slot='form-label']>div]:h-38 [&_h6]:text-lg"
                />
                <Separator className="md:block hidden bg-bright-gray" />
                <ControlledFieldWrapper
                    control={form.control}
                    name="allow_ai_questions"
                    label="Enable AI Audience Generated Session Questions"
                    className="flex items-start justify-between gap-x-8 [&_[data-slot='form-label']]:md:text-sm [&_[data-slot='form-label']]:font-normal [&_[data-slot='form-label']]:leading-tight"
                    render={({ field }) => (
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="p-0 justify-start h-6 w-10 [&_[data-slot='switch-thumb']]:size-5"
                        />
                    )}
                />
                <QuickTips
                    tips={sessionType === "presentation" ? presentationPracticeQuickTips : pitchPracticeQuickTips}
                    className="p-3 [&_ul]:pl-4"
                />
            </>
        </section>
    );
};

export default SlidePreviewAndSettingsSection;
