import SlidePreviewSection from "@/components/form-sections/SlidePreviewSection";
import VirtualEnvironmentSection from "@/components/form-sections/VirtualEnvironmentSection";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { practicesVEOptions } from "@/config/form-field-options";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface ISlidePreviewAndSettingsSectionProps extends HTMLAttributes<HTMLElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    activeSlideIndex: number;
    slidePreviews: string[];
}

const SlidePreviewAndSettingsSection = ({
    className,
    form,
    activeSlideIndex,
    slidePreviews,
}: ISlidePreviewAndSettingsSectionProps) => {
    const activeSlide = slidePreviews[activeSlideIndex];

    return (
        <section className={cn("flex flex-col gap-y-4", className)}>
            <>
                <VirtualEnvironmentSection
                    {...{ form }}
                    instruction="Select a suitable environment for your speaking needs"
                    options={practicesVEOptions}
                    className="md:block hidden p-0 border-0 [&_[data-slot='form-label']>div]:h-37.5 [&_h6]:text-lg"
                />
                <SlidePreviewSection {...{ activeSlide, activeSlideIndex }} />
                <Separator className="bg-bright-gray" />
                <div className="flex items-center justify-between">
                    <small>Enable AI Generated Questions</small>
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
