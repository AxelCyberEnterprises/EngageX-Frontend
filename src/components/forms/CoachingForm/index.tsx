import QuickTips from "@/components/dashboard/QuickTips";
import StartCoachingSession from "@/components/dialogs/dialog-contents/start-session/StartCoachingSession";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { coachingVEOptions } from "@/config/form-field-options";
import { coachingQuickTips } from "@/config/quick-tips";
import { useTheme } from "@/context/ThemeContext/hook";
import { SECONDARY_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CoachingSchema } from "@/schemas/dashboard/user";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import GoalsSection from "../form-sections/GoalsSection";
import InputSpeakerNotesSection from "../form-sections/InputSpeakerNotesSection";
import SessionNameSection from "../form-sections/SessionNameSection";
import TimeAllocationSection from "../form-sections/TimeAllocationSection";
import VirtualEnvironmentSection from "../form-sections/VirtualEnvironmentSection";

export type FormType = z.infer<typeof CoachingSchema>;

const CoachingForm = () => {
    const {
        theme: { secondaryColor },
    } = useTheme();
    const dispatch = useDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(CoachingSchema),
        defaultValues: useMemo(
            () => ({
                session_type: "enterprise",
                virtual_environment: "conference_room",
                goals: [{ id: 1, goal: "" }],
            }),
            [],
        ),
    });

    return (
        <Form {...form}>
            <form className="flex lg:flex-row flex-col lg:gap-10 gap-6">
                <section className="flex-1 space-y-12">
                    <SessionNameSection {...{ form }} />
                    <GoalsSection {...{ form }} />
                    <TimeAllocationSection />
                    <InputSpeakerNotesSection {...{ form }} />
                </section>
                <section className="lg:space-y-6 space-y-12 lg:max-w-100">
                    <VirtualEnvironmentSection
                        {...{ form }}
                        className="[&_[data-slot='form-label']>div]:h-38 lg:[&_[data-slot='form-label']>div]:w-full md:[&_[data-slot='form-label']>div]:w-85 [&_[data-slot='form-label']>div]:w-full"
                        options={coachingVEOptions}
                    />
                    <QuickTips tips={coachingQuickTips} />
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
                            className={cn(
                                "bg-green-sheen hover:bg-green-sheen/90 font-normal md:w-fit w-full md:h-9 h-11 transition",
                                {
                                    "bg-branding-secondary hover:bg-branding-secondary/90":
                                        secondaryColor !== SECONDARY_COLOR,
                                },
                            )}
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "start-session",
                                        children: (
                                            <StartCoachingSession
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
                            className="bg-branding-primary hover:bg-branding-primary/90 font-normal md:w-fit w-full md:h-9 h-11 transition"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "start-session",
                                        children: (
                                            <StartCoachingSession
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

export default CoachingForm;
