import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import QuickTips from "@/components/dashboard/QuickTips";
import StartEnterpriseSession from "@/components/dialogs/dialog-contents/start-session/StartEnterpriseSession";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    rookieRoomCoachVEOptions,
    rookieRoomGMVEOptions,
    rookieRoomVEOptions,
    sportsOptions,
    trainingTypeOptions,
} from "@/config/form-field-options";
import { rookieRoomQuickTips } from "@/config/quick-tips";
import { cn } from "@/lib/utils";
import { RookieRoomSchema } from "@/schemas/dashboard/user";
import { useAppDispatch } from "@/store";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import GoalsSection from "../form-sections/GoalsSection";
import InputSpeakerNotesSection from "../form-sections/InputSpeakerNotesSection";
import SessionNameSection from "../form-sections/SessionNameSection";
import TimeAllocationSection from "../form-sections/TimeAllocationSection";
import VirtualEnvironmentSection from "../form-sections/VirtualEnvironmentSection";
// import { useEnterpriseUsers } from "@/hooks/settings";

export type FormType = z.infer<typeof RookieRoomSchema>;

const RookieRoomForm = () => {
    const dispatch = useAppDispatch();
    // const { data } = useEnterpriseUsers();
    // console.log("Enterprise users data:", { data });

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
                    sport_type: "nba",
                    speaker_notes: "",
                },
            }),
            [],
        ),
    });
    const rookieType = useWatch({ control: form.control, name: "enterprise_settings.rookie_type" });
    const sportType = useWatch({ control: form.control, name: "enterprise_settings.sport_type" });

    useEffect(() => {
        let newVE: FormType["virtual_environment"] = "conference_room";

        if (rookieType === "coach" || rookieType === "gm") {
            switch (sportType) {
                case "nba":
                    newVE = "nba_room";
                    break;
                case "wnba":
                    newVE = "wnba_room";
                    break;
                case "nfl":
                    newVE = "nfl_room";
                    break;
                case "mlb":
                    newVE = "mlb_room";
                    break;
                default:
                    newVE = "conference_room";
                    break;
            }
        }

        form.setValue("virtual_environment", newVE);
    }, [form, rookieType, sportType]);

    const virtualEnvironmentOptions =
        rookieType === "coach"
            ? rookieRoomCoachVEOptions[sportType as keyof typeof rookieRoomCoachVEOptions]
            : rookieType === "gm"
              ? rookieRoomGMVEOptions[sportType as keyof typeof rookieRoomGMVEOptions]
              : rookieRoomVEOptions;
    let videoSrc: string | undefined;

    if (rookieType === "coach") {
        switch (sportType) {
            case "nba":
                videoSrc =
                    "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Rookie+Room/NBA/NBA+Intro.mp4";
                break;
            case "wnba":
                videoSrc =
                    "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Rookie+Room/WNBA/WNBA+Intro+Video+.mp4";
                break;
            case "nfl":
                videoSrc =
                    "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Rookie+Room/NFL/NFL+Football+Intro+.mp4";
                break;
            case "mlb":
                videoSrc =
                    "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Rookie+Room/NFL/NFL+Football+Intro+.mp4";
                break;
        }
    } else if (rookieType === "gm") {
        switch (sportType) {
            case "nba":
                videoSrc =
                    "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Rookie+Room/NBA/NBA+GM+Intro+.MP4";
                break;
            case "wnba":
                videoSrc =
                    "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Rookie+Room/WNBA/WNBA+GM+Intro+.MP4";
                break;
            case "nfl":
                videoSrc =
                    "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Rookie+Room/NFL/NFL+GM+intro.MP4";
                break;
            case "mlb":
                videoSrc =
                    "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Rookie+Room/NFL/NFL+GM+intro.MP4";
                break;
        }
    } else if (rookieType === "media_training") {
        videoSrc =
            "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/intro-videos/Media+Intro.MP4";
    }

    return (
        <Form {...form}>
            <form className="flex lg:flex-row flex-col lg:gap-10 gap-6">
                <section className="flex-1 space-y-10">
                    <SessionNameSection {...{ form }} />
                    <ControlledFieldWrapper
                        control={form.control}
                        name="enterprise_settings.sport_type"
                        label="Sports industry"
                        className="[&_[data-slot='form-label']]:font-normal [&_[data-slot='form-label']]:text-lg"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} disabled defaultValue={field.value}>
                                <SelectTrigger className="h-11 md:w-1/2 rounded-lg focus-visible:ring-0 shadow-none text-foreground data-[placeholder]:text-auro-metal-saurus [&_svg:not([class*='text-'])]:text-[#667085]">
                                    <SelectValue placeholder="Select the sport you play" />
                                </SelectTrigger>
                                <SelectContent className="border-none z-[9999]" position="popper" sideOffset={4}>
                                    {sportsOptions.map(({ name, value }, index) => (
                                        <SelectItem
                                            key={value + index}
                                            value={value}
                                            className="h-11 [&_svg:not([class*='text-'])]:text-[#64BA9F]"
                                        >
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                                                <FormItem
                                                    key={value + index}
                                                    className="nth-2:border-r first:border-b border-bright-gray first:col-span-2"
                                                >
                                                    <FormLabel className="cursor-pointer">
                                                        <FormControl className="hidden">
                                                            <RadioGroupItem value={value} />
                                                        </FormControl>
                                                        <div
                                                            className={cn(
                                                                "bg-[#F9FAFB] hover:bg-primary/90 hover:text-white grid place-content-center h-10 px-4 py-2 w-full font-normal transition-colors",
                                                                {
                                                                    "bg-primary text-white":
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
                            From Media to Rookie, Rookie to Coach, and Rookie to GM, the training is designed to address
                            all three aspects of improved communication skills, whether you are preparing for a new
                            season, an upcoming game, a post-game interview, the draft, or an important event.
                        </p>
                    </div>
                    <VirtualEnvironmentSection
                        {...{ form }}
                        className="[&_[data-slot='form-label']>div]:h-38 lg:[&_[data-slot='form-label']>div]:w-full md:[&_[data-slot='form-label']>div]:w-85 [&_[data-slot='form-label']>div]:w-full"
                        options={virtualEnvironmentOptions}
                        overlay={!(["coach", "gm"] as Array<typeof rookieType>).includes(rookieType!)}
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
                                                videoSrc={videoSrc}
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
                            disabled={sportType === "mlb"}
                            className="bg-branding-secondary hover:bg-branding-secondary/90 font-normal md:w-fit w-full md:h-9 h-11 transition"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "start-session",
                                        children: (
                                            <StartEnterpriseSession
                                                initiationType="start"
                                                videoSrc={videoSrc}
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
