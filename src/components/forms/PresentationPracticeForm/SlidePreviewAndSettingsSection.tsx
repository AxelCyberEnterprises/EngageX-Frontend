import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import SlidePreviewSection from "@/components/form-sections/SlidePreviewSection";
import VirtualEnvironmentSection from "@/components/form-sections/VirtualEnvironmentSection";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.presentationPractice);
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
                <SlidePreviewSection {...{ activeSlide, activeSlideIndex }} className="[&_h6]:text-lg" />
                <Separator className="bg-bright-gray" />
                <div className="space-y-4">
                    <h6 className="text-lg">Slide Settings</h6>
                    <div className="space-y-5">
                        <ControlledFieldWrapper
                            control={form.control}
                            name="transitionType"
                            label="Transition Type"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue="fade">
                                        <FormControl>
                                            <SelectTrigger className="text-gunmetal [&_svg:not([class*='text-'])]:text-gunmetal [&_svg:not([class*='text-'])]:opacity-100 h-10 focus-visible:ring-0">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="border-none">
                                            <SelectItem value="fade">Fade</SelectItem>
                                            <SelectItem value="slide">Slide</SelectItem>
                                            <SelectItem value="none">None</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ControlledFieldWrapper
                            control={form.control}
                            name="allocatedTime"
                            label="Allocate time for each slide"
                            render={({ field }) => (
                                <div className="relative grid items-center">
                                    <Input
                                        {...field}
                                        type="number"
                                        min={0}
                                        placeholder="0"
                                        className="focus-visible:ring-0 h-10 input-arrow-hidden text-gunmetal"
                                    />
                                    <span className="absolute right-3 text-sm text-auro-metal-saurus">minutes</span>
                                </div>
                            )}
                        />
                        <ControlledFieldWrapper
                            control={form.control}
                            name="totalAllocatedTime"
                            label="Total Allocated Time"
                            render={({ field }) => (
                                <div className="relative grid items-center">
                                    <Input
                                        {...field}
                                        placeholder="0"
                                        value={form.watch("allocatedTime")}
                                        className="focus-visible:ring-0 h-10 text-gunmetal"
                                        readOnly
                                    />
                                    <span className="absolute right-3 text-sm text-auro-metal-saurus">minutes</span>
                                </div>
                            )}
                        />
                        <div className="hidden p-2 space-y-4 rounded-lg border border-bright-gray">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Annotation Tool</span>{" "}
                                <Switch className="p-0 justify-start h-6 w-10 [&_[data-slot='switch-thumb']]:size-5" />
                            </div>
                            <div className="p-2 bg-ghost-white rounded-lg border border-bright-gray">
                                <p className="text-independence text-sm">
                                    This tool allows you to draw, highlight, and add visual cues directly on your slides
                                    to emphasize key points during practice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </section>
    );
};

export default SlidePreviewAndSettingsSection;
