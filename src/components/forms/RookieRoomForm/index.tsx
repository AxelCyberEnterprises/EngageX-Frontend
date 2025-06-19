import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import QuickTips from "@/components/dashboard/QuickTips";
import StartEnterpriseSession from "@/components/dialogs/dialog-contents/start-session/StartEnterpriseSession";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rookieRoomVEOptions, sportsOptions, trainingTypeOptions } from "@/config/form-field-options";
import { rookieRoomQuickTips } from "@/config/quick-tips";
import { cn } from "@/lib/utils";
import { RookieRoomSchema } from "@/schemas/dashboard/user";
import { useAppDispatch } from "@/store";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GoalsSection from "../form-sections/GoalsSection";
import InputSpeakerNotesSection from "../form-sections/InputSpeakerNotesSection";
import SessionNameSection from "../form-sections/SessionNameSection";
import TimeAllocationSection from "../form-sections/TimeAllocationSection";
import VirtualEnvironmentSection from "../form-sections/VirtualEnvironmentSection";

export type FormType = z.infer<typeof RookieRoomSchema>;

const RookieRoomForm = () => {
    const dispatch = useAppDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(RookieRoomSchema),
        defaultValues: useMemo(
            () => ({
                session_type: "enterprise",
                virtual_environment: "conference_room",
                allow_ai_questions: true,
                goals: [{ id: 1, goal: "" }],
                enterprise_settings: {
                    enterprice_type: "rookie",
                    rookie_type: "media_training",
                    sport_type: "basketball",
                    speaker_notes: "",
                },
            }),
            [],
        ),
    });

    return (
        <Form {...form}>
            <form className="flex lg:flex-row flex-col lg:gap-10 gap-6">
                <section className="flex-1 space-y-10">
                    <SessionNameSection {...{ form }} />
                    <ControlledFieldWrapper
                        control={form.control}
                        name="enterprise_settings.sport_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-normal text-lg">Sports industry</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-11 md:w-1/2 rounded-lg focus-visible:ring-0 shadow-none text-foreground data-[placeholder]:text-auro-metal-saurus [&_svg:not([class*='text-'])]:text-[#667085]">
                                            <SelectValue placeholder="Select the sport you play" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="border-none">
                                        {sportsOptions.map(({ name, value }) => (
                                            <SelectItem
                                                value={value}
                                                className="h-11 [&_svg:not([class*='text-'])]:text-[#64BA9F]"
                                            >
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <GoalsSection {...{ form }} />
                    <TimeAllocationSection />
                    <InputSpeakerNotesSection {...{ form }} />
                </section>
                <section className="lg:space-y-6 space-y-12 lg:max-w-100">
                    <div className="border border-bright-gray p-4 rounded-2xl space-y-4">
                        <ControlledFieldWrapper
                            control={form.control}
                            name="enterprise_settings.rookie_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid-cols-2 gap-0 rounded-md border border-bright-gray overflow-hidden"
                                        >
                                            {trainingTypeOptions.map(({ name, value }, index) => (
                                                <FormItem key={value + index}>
                                                    <FormLabel className="cursor-pointer">
                                                        <FormControl className="hidden">
                                                            <RadioGroupItem value={value} />
                                                        </FormControl>
                                                        <div
                                                            className={cn(
                                                                "bg-[#F9FAFB] hover:bg-[#0F161E]/90 hover:text-white grid place-content-center h-10 px-4 py-2 w-full font-normal transition-colors",
                                                                {
                                                                    "bg-[#0F161E] text-white":
                                                                        form.watch(
                                                                            "enterprise_settings.rookie_type",
                                                                        ) === value,
                                                                },
                                                            )}
                                                        >
                                                            {name}
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <p className="text-sm text-[#070D17]">
                            {
                                trainingTypeOptions.find(
                                    ({ value }) => value === form.watch("enterprise_settings.rookie_type"),
                                )?.description
                            }
                        </p>
                    </div>
                    <VirtualEnvironmentSection
                        {...{ form }}
                        className="[&_[data-slot='form-label']>div]:h-38 lg:[&_[data-slot='form-label']>div]:w-full md:[&_[data-slot='form-label']>div]:w-85 [&_[data-slot='form-label']>div]:w-full"
                        options={rookieRoomVEOptions}
                    />
                    <QuickTips tips={rookieRoomQuickTips} />
                </section>

                <div className="md:absolute bottom-0 inset-x-0 md:p-4 md:mt-0 mt-6 flex md:flex-row flex-col md:gap-y-0 gap-y-3 items-center justify-end md:border-t border-bright-gray bg-white">
                    <Button
                        type="button"
                        variant="outline"
                        className="hidden text-gunmetal hover:text-gunmetal border-gunmetal font-normal md:w-fit w-full md:h-9 h-11"
                    >
                        Save as Draft
                    </Button>
                    <div className="md:mr-25 md:w-fit w-full flex md:flex-row flex-col md:gap-y-0 gap-y-3 items-center md:gap-x-3">
                        <Button
                            type="button"
                            className="bg-green-sheen hover:bg-green-sheen/80 hidden font-normal md:w-fit w-full md:h-9 h-11 transition"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "start-session",
                                        children: (
                                            <StartEnterpriseSession
                                                initiationType="skip"
                                                setValue={form.setValue}
                                                handleSubmit={form.handleSubmit}
                                            />
                                        ),
                                    }),
                                )
                            }
                        >
                            Skip Setup
                        </Button>
                        <Button
                            type="button"
                            className="bg-gunmetal hover:bg-gunmetal/90 font-normal md:w-fit w-full md:h-9 h-11 transition"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "start-session",
                                        children: (
                                            <StartEnterpriseSession
                                                initiationType="start"
                                                handleSubmit={form.handleSubmit}
                                            />
                                        ),
                                    }),
                                )
                            }
                        >
                            Start Session
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default RookieRoomForm;
