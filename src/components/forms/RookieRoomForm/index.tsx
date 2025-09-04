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
import { useEffect, useMemo, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import GoalsSection from "../form-sections/GoalsSection";
import InputSpeakerNotesSection from "../form-sections/InputSpeakerNotesSection";
import SessionNameSection from "../form-sections/SessionNameSection";
import TimeAllocationSection from "../form-sections/TimeAllocationSection";
import VirtualEnvironmentSection from "../form-sections/VirtualEnvironmentSection";
import { useEnterpriseUsers } from "@/hooks/settings";

export type FormType = z.infer<typeof RookieRoomSchema>;

const RookieRoomForm = () => {
    const dispatch = useAppDispatch();
    const { data: enterpriseUsers } = useEnterpriseUsers();
    
    const companyName = enterpriseUsers?.results?.[0]?.enterprise?.sport_type?.toUpperCase() || "";
    
    const sportTypeValue = useMemo(() => {
        switch (companyName) {
            case "NBA": return "nba";
            case "WNBA": return "wnba";
            case "NFL": return "nfl";
            case "MLB": return "mlb";
            default: return "";
        }
    }, [companyName]);

    const form = useForm<FormType>({
        resolver: zodResolver(RookieRoomSchema),
        defaultValues: {
            session_type: "enterprise",
            virtual_environment: "conference_room",
            allow_ai_questions: true,
            goals: [{ id: 1, goal: "" }],
            enterprise_settings: {
                enterprice_type: "rookie",
                rookie_type: "media_training",
                sport_type: sportTypeValue,
                speaker_notes: "",
            },
        },
    });

    // Initialize form with sport type when company data is available
    useEffect(() => {
        if (companyName && sportTypeValue) {
            form.setValue("enterprise_settings.sport_type", sportTypeValue);
        }
    }, [companyName, sportTypeValue, form]);

    const rookieType = useWatch({ control: form.control, name: "enterprise_settings.rookie_type" });
    const sportType = useWatch({ control: form.control, name: "enterprise_settings.sport_type" });

    console.log(rookieType);
    console.log("Rookie Room Form - Sport Type:", sportType);

    // Memoize virtual environment options to prevent unnecessary recalculations
    const virtualEnvironmentOptions = useMemo(() => {
        switch (rookieType) {
            case "coach":
                return rookieRoomCoachVEOptions[sportType as keyof typeof rookieRoomCoachVEOptions] || [];
            case "gm":
                return rookieRoomGMVEOptions[sportType as keyof typeof rookieRoomGMVEOptions] || [];
            default:
                return rookieRoomVEOptions;
        }
    }, [rookieType, sportType]);

    console.log(virtualEnvironmentOptions);

    // Update virtual environment with debouncing to prevent rapid changes
    const updateVirtualEnvironment = useCallback(() => {
        let newVE: FormType["virtual_environment"] = "conference_room";

        if ((rookieType === "coach" || rookieType === "gm") && sportType) {
            const sportToRoom: Record<string, FormType["virtual_environment"]> = {
                nba: "nba_room",
                wnba: "wnba_room",
                nfl: "nfl_room",
                mlb: "mlb_room",
            };
            newVE = sportToRoom[sportType] || "conference_room";
        }

        // Only update if the value actually changed
        const currentVE = form.getValues("virtual_environment");
        if (currentVE !== newVE) {
            form.setValue("virtual_environment", newVE);
        }
    }, [form, rookieType, sportType]);

    useEffect(() => {
        // Add a small delay to prevent rapid updates during form initialization
        const timeoutId = setTimeout(updateVirtualEnvironment, 50);
        return () => clearTimeout(timeoutId);
    }, [updateVirtualEnvironment]);

    // Memoize video source to prevent recalculation on every render
    const videoSrc = useMemo((): string | undefined => {
        const baseUrl = "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos";
        
        if (rookieType === "coach") {
            const coachVideos: Record<string, string> = {
                nba: `${baseUrl}/Rookie+Room/NBA/NBA+Intro.mp4`,
                wnba: `${baseUrl}/Rookie+Room/WNBA/WNBA+Intro+Video+.mp4`,
                nfl: `${baseUrl}/Rookie+Room/NFL/NFL+Football+Intro+.mp4`,
                mlb: `${baseUrl}/Rookie+Room/MLB/MLB+Intro+video.mp4`,
            };
            return coachVideos[sportType as keyof typeof coachVideos];
        }
        
        if (rookieType === "gm") {
            const gmVideos: Record<string, string> = {
                nba: `${baseUrl}/Rookie+Room/NBA/NBA+GM+Intro+.MP4`,
                wnba: `${baseUrl}/Rookie+Room/WNBA/WNBA+GM+Intro+.MP4`,
                nfl: `${baseUrl}/Rookie+Room/NFL/NFL+GM+intro.MP4`,
                // Fixed: MLB should use MLB GM intro, not NFL
                mlb: `${baseUrl}/Rookie+Room/MLB/MLB+GM+intro.mp4`,

            };
            return gmVideos[sportType as keyof typeof gmVideos];
        }
        
        if (rookieType === "media_training") {
            return `${baseUrl}/intro-videos/Media+Intro.MP4`;
        }
        
        return undefined;
    }, [rookieType, sportType]);

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
                                    <SelectValue placeholder={companyName} />
                                </SelectTrigger>
                                <SelectContent className="border-none z-[9999]" position="popper" sideOffset={4}>
                                    {sportsOptions.map(({ value }, index) => (
                                        <SelectItem
                                            key={value + index}
                                            value={value}
                                            className="h-11 [&_svg:not([class*='text-'])]:text-[#64BA9F]"
                                        >
                                            {companyName}
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

                {companyName && (
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
                                From Media to Rookie, Rookie to Coach, and Rookie to GM, the training is designed to
                                address all three aspects of improved communication skills, whether you are preparing
                                for a new season, an upcoming game, a post-game interview, the draft, or an important
                                event.
                            </p>
                        </div>

                        {/* Key change: Use a stable key to prevent unnecessary remounting */}
                        <div key="virtual-environment-section">
                            <VirtualEnvironmentSection
                                {...{ form }}
                                className="..."
                                options={virtualEnvironmentOptions}
                                overlay={!(["coach", "gm"] as Array<typeof rookieType>).includes(rookieType!)}
                            />
                        </div>

                        <QuickTips tips={rookieRoomQuickTips} />
                    </section>
                )}

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