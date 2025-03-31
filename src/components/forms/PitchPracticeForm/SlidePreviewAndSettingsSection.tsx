import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import SlidePreviewSection from "@/components/form-sections/SlidePreviewSection";
import VirtualEnvironmentSection from "@/components/form-sections/VirtualEnvironmentSection";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { practicesVEOptions } from "@/config/form-field-options";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormType } from ".";

interface ISlidePreviewAndSettingsSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const SlidePreviewAndSettingsSection = ({ className, form }: ISlidePreviewAndSettingsSectionProps) => {
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.pitchPractice);
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
                <div className="space-y-4">
                    <h6 className="text-lg">Slide Settings</h6>
                    <div className="space-y-5">
                        <ControlledFieldWrapper
                            control={form.control}
                            name="qaQuestionsPerSession"
                            label="Q&A Questions per session"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue="1">
                                        <FormControl>
                                            <SelectTrigger className="text-gunmetal [&_svg:not([class*='text-'])]:text-gunmetal [&_svg:not([class*='text-'])]:opacity-100 h-10">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="border-none">
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="5">5</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </>
        </section>
    );
};

export default SlidePreviewAndSettingsSection;
