import StartPublicSpeakingSession from "@/components/dialogs/dialog-contents/start-session/StartPublicSpeakingSession";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { publicSpeakingVEOptions } from "@/config/form-field-options";
import { PublicSpeakingSchema } from "@/schemas/dashboard/user";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import GoalsSection from "../form-sections/GoalsSection";
import SessionNameSection from "../form-sections/SessionNameSection";
import VirtualEnvironmentSection from "../form-sections/VirtualEnvironmentSection";
import InputSpeakerNotesSection from "./InputSpeakerNotesSection";
import TimeAllocationSection from "./TimeAllocationSection";

export type FormType = z.infer<typeof PublicSpeakingSchema>;

const PublicSpeakingForm = () => {
    const dispatch = useDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(PublicSpeakingSchema),
        defaultValues: useMemo(() => ({ session_type: "public", virtual_environment: "conference_room" }), []),
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
                <section className="lg:space-y-6 space-y-12">
                    <VirtualEnvironmentSection
                        {...{ form }}
                        className="[&_[data-slot='form-label']>div]:h-38 lg:[&_[data-slot='form-label']>div]:w-full [&_[data-slot='form-label']>div]:w-85"
                        options={publicSpeakingVEOptions}
                    />
                    <div className="flex items-start justify-between gap-x-8">
                        <p>Enable AI Audience Generated Session Questions</p>
                        <Switch
                            onCheckedChange={(checked) => form.setValue("allow_ai_questions", checked)}
                            className="p-0 justify-start h-6 w-10 [&_[data-slot='switch-thumb']]:size-5"
                        />
                    </div>
                </section>
                <div className="md:absolute bottom-0 inset-x-0 md:p-4 md:mt-0 mt-6 flex md:flex-row flex-col md:gap-y-0 gap-y-3 items-center justify-between md:border-t border-bright-gray bg-white">
                    <Button
                        type="button"
                        variant="outline"
                        className="hidden text-gunmetal hover:text-gunmetal border-gunmetal font-normal md:w-fit w-full md:h-9 h-11"
                    >
                        Save as Draft
                    </Button>
                    <div className="md:ml-auto md:w-fit w-full flex md:flex-row flex-col md:gap-y-0 gap-y-3 items-center md:gap-x-4">
                        <Button
                            type="button"
                            className="bg-green-sheen hover:bg-green-sheen/80 font-normal md:w-fit w-full md:h-9 h-11 transition"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "start-session",
                                        children: (
                                            <StartPublicSpeakingSession
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
                                            <StartPublicSpeakingSession
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

export default PublicSpeakingForm;
