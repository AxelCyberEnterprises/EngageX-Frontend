import VideoPlayer from "@/components/authPageComponents/VideoPlayer";
import FullCircleProgress from "@/components/dashboard/FullCircleProgress";
import SegmentedProgressBar from "@/components/dashboard/SegmentedProgressBar";
import SemiCircleProgress from "@/components/dashboard/SemiCircleProgress";
import ShadLineChart2 from "@/components/dashboard/ShadLineChart2";
import SlideFeedbackChart from "@/components/dashboard/SlideFeedbackChart";
import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { DynamicTooltip } from "@/components/widgets/dynamic-tooltip";
import { useTheme } from "@/context/ThemeContext/hook";
import { useGetSessionReport, useRequestSessionVideo } from "@/hooks/sessions";
import { useBookCoachingSession, useEnterpriseUsers, useFullUserProfile, useUserProfile } from "@/hooks/settings";
import usePerformanceChart from "@/hooks/usePerformanceChart";
import { PRIMARY_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { ArrowLeft, Download, Info, LoaderCircle, UserRound } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { Link, To, useNavigate, useParams } from "react-router-dom";
import speakWithCoach from "../../../assets/images/svgs/speak-with-coach.svg";
import { capitalizeWords } from "@/components/tables/session-history-table/admin";
import NoAccessCoachingModal from "@/components/modals/modalVariants/NoAccessCoachingModal";

function getSessionTypeDisplay(item: any): string {
    if (item.session_type_display === "Enterprise") {
        if (item.enterprise_settings?.rookie_type) {
            return capitalizeWords(item.enterprise_settings.rookie_type);
        }
        return "Coaching";
    }
    return capitalizeWords(item.session_type_display || "Coaching");
}

const PitchSessionReport: React.FC = () => {
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [showNoAccessCoachingModal, setShowNoAccessCoachingModal] = useState(false);
    const { data: fullProfile } = useFullUserProfile();
    const { data: profile } = useUserProfile(fullProfile?.results?.[0]?.id);
    const navigate = useNavigate();
    const {
        theme: { primaryColor },
    } = useTheme();
    const { id } = useParams();
    const { data: enterpriseUsers } = useEnterpriseUsers();
    const { data, isPending, refetch } = useGetSessionReport(id);
    const { mutate, isPending: requestingVideo, isSuccess: requestedSuccessfully } = useRequestSessionVideo(id);
    const { chartColors, chartData } = usePerformanceChart({ performanceAnalytics: data?.performance_analytics });
    const companyName = enterpriseUsers?.results[0].enterprise_name;
    React.useEffect(() => {
        if (!id || !requestedSuccessfully) return;
        let interval: NodeJS.Timeout | undefined;

        if (!data?.compiled_video_url) {
            interval = setInterval(() => {
                refetch();
            }, 7000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, data?.compiled_video_url, requestedSuccessfully]);
    const pdfRef = useRef<HTMLDivElement>(null);

    const handlePDFDownload = useCallback(async () => {
        const element = pdfRef.current;
        const feedbackElement = document.getElementById("session-feedback");

        if (!element || !feedbackElement) return;

        setIsGeneratingPDF(true);

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const scale = 2;
        const margin = 10;

        const pageHeightPx = (pdf.internal.pageSize.getHeight() - margin * 2) / scale;

        // Step 1: Find vertical space before session-feedback
        const containerRect = element.getBoundingClientRect();
        const feedbackRect = feedbackElement.getBoundingClientRect();
        const currentOffset = feedbackRect.top - containerRect.top;

        // Step 2: Calculate required height to push feedback section to the next page
        const extraOffset = pageHeightPx - (currentOffset % pageHeightPx);
        const spacerHeight = extraOffset < pageHeightPx ? extraOffset : 0;

        // Step 3: Insert a temporary spacer div before feedback section
        const spacer = document.createElement("div");
        spacer.style.height = `${spacerHeight}px`;
        feedbackElement.parentElement?.insertBefore(spacer, feedbackElement);

        // Step 4: Render the canvas
        const canvas = await html2canvas(element, {
            scale,
            useCORS: true,
        });

        // Step 5: Clean up spacer
        spacer.remove();

        const imgProps = {
            width: canvas.width,
            height: canvas.height,
        };

        const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
        const scaleFactor = pdfWidth / imgProps.width;
        const pdfHeight = imgProps.height * scaleFactor;

        const totalPages = Math.ceil(pdfHeight / (pdf.internal.pageSize.getHeight() - margin * 2));

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();

            const srcY = ((pdf.internal.pageSize.getHeight() - margin * 2) / scaleFactor) * i;
            const sliceHeight = (pdf.internal.pageSize.getHeight() - margin * 2) / scaleFactor;

            const pageCanvas = document.createElement("canvas");
            const pageContext = pageCanvas.getContext("2d")!;
            pageCanvas.width = canvas.width;
            pageCanvas.height = sliceHeight;

            pageContext.drawImage(canvas, 0, srcY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

            const pageImgData = pageCanvas.toDataURL("image/png");
            pdf.addImage(pageImgData, "PNG", margin, margin, pdfWidth, sliceHeight * scaleFactor);
        }

        pdf.save(`Session-Report-${id}.pdf`);
        setIsGeneratingPDF(false);
    }, [id]);

    React.useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch]);

    const parseStrengthsAndImprovements = useCallback((input: string): string[] => {
        try {
            // Remove outer quotes if it's a quoted string
            if (input.startsWith('"') && input.endsWith('"')) {
                input = input.slice(1, -1);
            }

            // Replace fancy escaped quotes if necessary
            input = input.replace(/\\"/g, '"');

            // Remove outer brackets
            const trimmed = input.trim().slice(1, -1);

            // Match substrings wrapped in either single or double quotes
            const matches = [...trimmed.matchAll(/(['"])(.*?)\1/g)];

            // Return the inner contents of each matched quote group
            return matches.map(([, , content]) => content.trim());
        } catch (e) {
            console.error("Failed to parse input:", e);
            return [];
        }
    }, []);

    const variety = [
        // {
        //     bg: "bg-sunray/15",
        //     title: "Impact",
        //     percent: 80,
        //     rating: "Excellent",
        // },
        {
            bg: "bg-alice-blue",
            title: "Volume",
            key: "volume",
            percent: data?.volume,
        },
        {
            bg: "bg-green-sheen/15",
            title: "Pitch",
            key: "pitch",
            percent: data?.pitch_variability,
        },
        {
            bg: "bg-seashell",
            title: "Pace",
            key: "pace",
            percent: data?.pace,
        },
        {
            bg: "bg-grey/15",
            title: "Pauses",
            key: "pauses",
            percent: data?.pauses,
        },
    ] as const;

    const slideAnalysis = [
        {
            bg: "bg-alice-blue",
            title: "Slide Count Efficiency",
            key: "slide-count-efficiency",
            percent: data?.slide_efficiency,
        },
        {
            bg: "bg-green-sheen/15",
            title: "Slide Wordiness",
            key: "slide-wordiness",
            percent: data?.text_economy,
        },
        {
            bg: "bg-seashell",
            title: "Aesthetic Balance",
            key: "aesthetic-balance",
            percent: data?.visual_communication,
        },
    ] as const;

    const deliveryMetrics = [
        {
            title: "Structure and Clarity",
            key: "clarity",
            rating: data?.structure_and_clarity,
        },
        {
            title: "Transformative Communication",
            key: "transformative-potential",
            rating: data?.transformative_communication,
        },
        {
            title: "Emotional Impact",
            key: "emotional-impact",
            rating: data?.emotional_impact,
        },
    ] as const;

    const variety2 = [
        {
            bg: "bg-alice-blue",
            title: "Posture",
            key: "body-posture",
            percent: data?.posture,
        },
        {
            bg: "bg-green-sheen/15",
            title: "Motion",
            key: "body-motion",
            percent: data?.motion,
        },
        {
            bg: "bg-seashell",
            title: "Hand Gestures",
            key: "hand-gestures",
            percent: data?.gestures_score_for_body_language,
        },
    ] as const;

    const deliveryMetrics2 = [
        {
            title: "Brevity",
            key: "brevity",
            rating: data?.brevity,
        },
        {
            title: "Filler Words",
            key: "filler-words",
            rating: data?.filler_words,
        },
        {
            title: "Grammar",
            key: "grammar",
            rating: data?.grammar,
        },
    ] as const;

    let newSessionNavigate: To;
    switch (data?.session_type) {
        case "enterprise":
            if (data.enterprise_settings?.enterprise_type === "rookie") {
                newSessionNavigate = "../the-rookie-room";
            } else {
                newSessionNavigate = "../the-coaching-room";
            }
            break;
        case "pitch":
        case "presentation":
            newSessionNavigate = `../${data.session_type}-practice`;
            break;
        case "public":
            newSessionNavigate = `../public-speaking`;
            break;
    }
    const bookingEnterprise = enterpriseUsers?.results[0]?.enterprise;

    const bookCoaching = useBookCoachingSession();

    const link = (bookingEnterprise as any)?.one_on_one_coaching_link.trim() || "";

    const hasLink = link !== "" && link !== "https://noaccess.com";

    const SpeakWithCoach = () => {
        if (profile?.is_enterprise_user) {
            bookCoaching.mutate(
                {
                    id: bookingEnterprise?.id ? String(bookingEnterprise.id) : "",
                    data: {
                        name: bookingEnterprise?.name ?? "",
                        enterprise_type:
                            bookingEnterprise?.enterprise_type === "general" ||
                            bookingEnterprise?.enterprise_type === "sport"
                                ? bookingEnterprise.enterprise_type
                                : "general",
                        sport_type: ["nfl", "nba", "wnba", "mlb"].includes(
                            (bookingEnterprise?.sport_type as "nfl" | "nba" | "wnba" | "mlb" | undefined) ?? "",
                        )
                            ? (bookingEnterprise?.sport_type as "nfl" | "nba" | "wnba" | "mlb" | null)
                            : null,
                        primary_color: (bookingEnterprise as any)?.primary_color ?? "default-color", // Provide a default string value
                        secondary_color: (bookingEnterprise as any)?.secondary_color,
                        is_active: (bookingEnterprise as any)?.is_active,
                        one_on_one_coaching_link: (bookingEnterprise as any)?.one_on_one_coaching_link,
                        accessible_verticals: (bookingEnterprise as any)?.accessible_verticals,
                    },
                },
                {
                    onSuccess: (res) => {
                        console.log("Coaching session booked successfully", res);
                    },
                    onError: (err) => {
                        console.error("Booking failed", err);
                    },
                },
            );
        }
        setDialogOneOpen(false);
    };
    const initials = `${profile?.first_name?.[0] ?? ""}${profile?.last_name?.[0] ?? ""}`.toUpperCase();
    const sessionTypeDisplay = data ? getSessionTypeDisplay(data) : "";

    return (
        <div>
            {!data || isPending ? (
                <div className="p-4">
                    <Skeleton className="h-7 w-20 mb-3" />
                    <Skeleton className="h-15 w-100 mb-3" />
                    <Skeleton className="h-7 w-full mb-3" />
                    <Skeleton className="h-7 w-full mb-3" />
                    <Skeleton className="h-100 w-full rounded-3xl mb-5" />
                    <div className="flex flex-wrap justify-between gap-3">
                        {[...Array(4)].map((_, index) => (
                            <Skeleton key={index} className="w-[49%] h-100 mb-5" />
                        ))}
                    </div>
                </div>
            ) : (
                <div ref={pdfRef} className="py-4 text-primary-blue">
                    <section className="px-4 lg:px-8 border-b-1 border-bright-gray">
                        <div data-html2canvas-ignore className="py-3 flex flex-wrap justify-end items-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="hidden items-center text-black bg-transparent hover:bg-transparent p-0 gap-2"
                            >
                                <ArrowLeft className="w-5 aspect-square" />
                                <p>Back</p>
                            </button>

                            <div className="flex items-center gap-2">
                                <Button
                                    disabled={isGeneratingPDF}
                                    isLoading={isGeneratingPDF}
                                    className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray"
                                    onClick={handlePDFDownload}
                                >
                                    <Download className="stroke-2" />
                                    <span className="hidden lg:block font-normal">Download</span>
                                </Button>
                                {hasLink ? (
                                    <Button
                                        onClick={() => setDialogOneOpen(true)}
                                        className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray"
                                    >
                                        <UserRound className="stroke-2" />
                                        <span className="hidden lg:block font-normal">Speak With A Coach</span>
                                    </Button>
                                ) : (
                                    // No coaching link provided  so no access
                                    <Button
                                        onClick={() => setShowNoAccessCoachingModal(true)}
                                        className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray"
                                    >
                                        <UserRound className="stroke-2" />
                                        <span className="hidden lg:block font-normal">Speak With A Coach</span>
                                    </Button>
                                )}
                                <NoAccessCoachingModal
                                    show={showNoAccessCoachingModal}
                                    onClose={() => setShowNoAccessCoachingModal(false)}
                                />

                                <Dialog open={isDialogOneOpen} onOpenChange={setDialogOneOpen}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <img
                                                src={speakWithCoach}
                                                alt="green image of users"
                                                className="w-16 h-16 mb-4"
                                            />
                                            <DialogTitle className="text-primary-blue">Speak with a Coach</DialogTitle>
                                            <DialogDescription className="text-auro-metal-saurus">
                                                Click the button below to schedule a session with any of our coaches
                                            </DialogDescription>

                                            <p className="text-[16px] font-medium text-red-600 mb-2 mt-2">
                                                Before booking a session you must complete a session comparison (2
                                                sessions)
                                            </p>
                                        </DialogHeader>
                                        <Link
                                            to={
                                                profile?.is_enterprise_user
                                                    ? (bookingEnterprise as any)?.one_on_one_coaching_link
                                                    : "https://calendly.com/jacqui-thecareerdoctor/engagex-live-speach-coaching"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-branding-primary hover:bg-branding-primary/90 h-10 px-4 py-2 rounded-md text-white flex items-center justify-center text-sm"
                                            onClick={() => SpeakWithCoach()}
                                        >
                                            Speak with A Coach
                                        </Link>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        <h4 className="py-3 font-bold">SESSION REPORT</h4>

                        <div className="py-4 flex flex-wrap justify-between items-center">
                            <div>
                                <h5 className="mb-3">{data.session_name}</h5>
                                <div className="flex gap-3 text-primary-blue/70">
                                    <p>{sessionTypeDisplay}</p>
                                    <div className="border-l-1"></div>
                                    <p>
                                        {new Date(data.date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <div className="border-l-1"></div>
                                    <p>{`${parseInt(data.duration?.split(":")[1] ?? "0")} mins ${parseInt(data.duration?.split(":")[2] ?? "0")} secs`}</p>
                                </div>
                            </div>

                            <div className="flex lg:me-5 mt-6 lg:mt-0">
                                <div className="flex pe-5 me-5 border-r-2 border-bright-gray">
                                    <div className="user__image">
                                        <div
                                            className={`size-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 ${
                                                !profile?.profile_picture && "border border-[#D0D5DD] bg-[#D0D5DD]"
                                            }`}
                                        >
                                            {profile?.profile_picture ? (
                                                <img
                                                    src={profile?.profile_picture}
                                                    alt={`user image`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="font-medium text-sm leading-none text-[#10161e]">
                                                    {initials}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between ps-2">
                                        <h6>{data.full_name}</h6>
                                        <p className="text-independence">{data.user_email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <h6>Company</h6>
                                    <p className="text-independence">{companyName || data.company}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-independence mb-3">
                            This comprehensive report summarizes the session you just completed. The report covers the
                            goals you set for yourself and the industry standards defined by EngageX<sup>®</sup>.
                            Please click on the speak with a coach button at the top to book a live review session with
                            a certified coach.
                        </p>
                    </section>

                    <section className="px-4 lg:px-8 py-4">
                        <div data-html2canvas-ignore className="w-full mb-5">
                            {data.compiled_video_url ? (
                                <div className="relative rounded-3xl mb-2 overflow-hidden">
                                    <VideoPlayer
                                        height="h-100"
                                        width="w-full"
                                        src={data.compiled_video_url}
                                        border="rounded-3xl"
                                        canDownload
                                        preload={true}
                                    />
                                </div>
                            ) : (
                                <div className="h-100 w-full rounded-3xl mb-2 grid place-content-center bg-black/90">
                                    {requestedSuccessfully ? (
                                        <LoaderCircle className="size-6 animate-spin stroke-white" />
                                    ) : (
                                        <Button
                                            className={cn(
                                                "bg-medium-sea-green hover:bg-medium-sea-green/90 rounded-lg",
                                                {
                                                    "bg-branding-primary hover:bg-branding-primary/90":
                                                        primaryColor !== PRIMARY_COLOR,
                                                },
                                            )}
                                            onClick={() => mutate()}
                                            isLoading={requestingVideo}
                                        >
                                            Request session recording
                                        </Button>
                                    )}
                                </div>
                            )}
                            <small className="border-l-2 border-l-maximum-yellow-red pl-3 py-1">
                                Your recording may take 1-3 minutes to be ready for download
                            </small>
                        </div>

                        <div className="flex flex-col md:flex-row w-full gap-3">
                            <div className="w-full md:w-7/12 lg:pe-2 mb-4 md:mb-0">
                                <div className="flex flex-col justify-between h-full border-1 border-bright-gray rounded-xl p-4">
                                    <h6 className="mb-3">Audience Engagement</h6>
                                    <div className="chart__div">
                                        <ShadLineChart2
                                            data={chartData.filter(Boolean).map((item) => ({
                                                month: item.chunk_offset,
                                                Impact: item.impact,
                                                "Trigger Response": item.trigger,
                                                Conviction: item.conviction,
                                            }))}
                                            colors={chartColors}
                                        />
                                    </div>
                                    <p className="mt-2">
                                        <span className="text-medium-sea-green">Trigger Response</span> measures
                                        audience engagement by tracking how specific words or phrases evoke a response
                                        or reaction.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col border-1 border-bright-gray rounded-xl p-4 w-full md:w-5/12 lg:me-0">
                                <h6 className="mb-3">Overall Captured Impact</h6>
                                <div className="relative w-full h-70 flex flex-col items-center pt-10">
                                    <SemiCircleProgress
                                        percent={data.overall_captured_impact / 100}
                                        color={"#262B3A"}
                                    />

                                    <div className="absolute bottom-16 text-center">
                                        <h4 className="mb-4">{data.overall_captured_impact}%</h4>
                                        {(() => {
                                            let color = "#BC0010";
                                            let text = "NEEDS IMPROVEMENT";
                                            if (data.overall_captured_impact >= 80) {
                                                color = "#40B869";
                                                text = "EXCELLENT";
                                            } else if (data.overall_captured_impact >= 70) {
                                                color = "#EEBC89";
                                                text = "GOOD";
                                            } else if (data.overall_captured_impact >= 50) {
                                                color = "#F5B546";
                                                text = "SATISFACTORY";
                                            }

                                            return (
                                                <div
                                                    className="rounded-lg px-4 py-2"
                                                    style={{ backgroundColor: color, color: "white" }}
                                                >
                                                    <p>{text}</p>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="font-semibold text-sm">
                                        49% and below = <span className="text-[#BC0010]">Needs Improvement</span>
                                    </p>
                                    <p className="font-semibold text-sm">
                                        50% to 69% = <span className="text-[#F5B546]">Satisfactory</span>
                                    </p>
                                    <p className="font-semibold text-sm">
                                        70% to 79% = <span className="text-[#EEBC89]">Good</span>
                                    </p>
                                    <p className="font-semibold text-sm">
                                        80% and above = <span className="text-[#40B869]">Excellent</span>
                                    </p>
                                </div>
                                <p>
                                    <span className="text-medium-sea-green">Overall Captured Impact</span> is calculated
                                    by your ability to deliver transformative communication that inspires your audience,
                                    leaves a lasting impression, and positions you as a memorable, purpose-driven
                                    speaker.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="px-4 lg:px-8">
                        <div className="performance border-1 border-bright-gray rounded-xl py-5 px-4">
                            <h5 className="mb-6">Performance Analytics</h5>
                            <div className="hidden border-1 border-bright-gray rounded-xl p-4 mb-5">
                                <h6 className="mb-3">Slide-Based Feedback</h6>
                                {data.slide_preview ? (
                                    <SlideFeedbackChart />
                                ) : (
                                    <EmptyState text="No data available" className="h-100" />
                                )}
                            </div>

                            <h6 className="mb-3">Vocal Variety</h6>
                            <div className="flex flex-wrap gap-4">
                                {variety.map((item, index) => (
                                    <div key={index} className="w-full md:w-[calc(33.33%-10px)] lg:w-[calc(25%-12px)]">
                                        <div className={`rounded-lg py-2 px-4 ${item.bg} flex justify-between`}>
                                            <div className="flex flex-col justify-between py-3">
                                                <div className="flex items-center gap-2">
                                                    <p>{item.title}</p>
                                                    <DynamicTooltip
                                                        tooltipKey={item.key}
                                                        sideOffset={5}
                                                        className="[&_svg]:hidden [&>p]:text-black/80"
                                                    >
                                                        <Info className="size-4 shrink-0" />
                                                    </DynamicTooltip>
                                                </div>
                                                <h5>{item.percent}%</h5>
                                            </div>
                                            <div>
                                                <FullCircleProgress percent={item.percent!} color={"#64BA9F"} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <h6 className="mb-3">Delivery and Structure Metrics</h6>

                                {deliveryMetrics.map((metric, index) => (
                                    <div key={index} className="flex flex-wrap w-full mb-3 items-center">
                                        <div className="w-full lg:w-3/12 flex justify-between">
                                            <div className="flex items-center gap-2">
                                                <p>{metric.title}</p>
                                                <DynamicTooltip
                                                    tooltipKey={metric.key}
                                                    sideOffset={5}
                                                    className="[&_svg]:hidden [&>p]:text-black/80"
                                                >
                                                    <Info className="size-4 shrink-0" />
                                                </DynamicTooltip>
                                            </div>
                                            <p className="lg:hidden block">{metric.rating}%</p>
                                        </div>
                                        <div className="w-full lg:w-8/12 mt-3 lg:mt-0">
                                            <SegmentedProgressBar
                                                percent={metric.rating!}
                                                color={"var(--primary)"}
                                                divisions={1}
                                            />
                                        </div>
                                        <div className="w-full lg:w-1/12 hidden lg:flex justify-end">
                                            <p>{metric.rating}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <h6 className="mb-3">Language and word choice</h6>

                                {deliveryMetrics2.map((metric, index) => (
                                    <div key={index} className="flex flex-wrap w-full mb-3 items-center">
                                        <div className="w-full lg:w-3/12 flex justify-between">
                                            <div className="flex items-center gap-2">
                                                <p>{metric.title}</p>
                                                <DynamicTooltip
                                                    tooltipKey={metric.key}
                                                    sideOffset={5}
                                                    className="[&_svg]:hidden [&>p]:text-black/80"
                                                >
                                                    <Info className="size-4 shrink-0" />
                                                </DynamicTooltip>
                                            </div>
                                            <p className="lg:hidden block">{metric.rating}%</p>
                                        </div>
                                        <div className="w-full lg:w-8/12 mt-3 lg:mt-0">
                                            <SegmentedProgressBar
                                                percent={metric.rating!}
                                                color={"var(--primary)"}
                                                divisions={1}
                                            />
                                        </div>
                                        <div className="w-full lg:w-1/12 hidden lg:flex justify-end">
                                            <p>{metric.rating}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {data.slide_preview && (
                        <section className="px-4 lg:px-8 pt-4">
                            <div className="performance border-1 border-bright-gray rounded-xl py-5 px-4">
                                <h5 className="mb-6">Slide Analysis</h5>

                                <div className="flex flex-wrap gap-4">
                                    {slideAnalysis.map((item, index) => (
                                        <div key={index} className="w-full md:w-[calc(33.33%-10px)] lg:w-2/7">
                                            <div className={`rounded-lg py-2 px-4 ${item.bg} flex justify-between`}>
                                                <div className="flex flex-col justify-between py-3">
                                                    <div className="flex items-center gap-2">
                                                        <p>{item.title}</p>
                                                        <DynamicTooltip
                                                            tooltipKey={item.key}
                                                            sideOffset={5}
                                                            className="[&_svg]:hidden [&>p]:text-black/80"
                                                        >
                                                            <Info className="size-4 shrink-0" />
                                                        </DynamicTooltip>
                                                    </div>
                                                    <h5>{item.percent}%</h5>
                                                </div>
                                                <div>
                                                    <FullCircleProgress percent={item.percent!} color={"#64BA9F"} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="px-4 lg:px-8 pt-4 hidden">
                        <div className="performance border-1 border-bright-gray rounded-xl py-5 px-4">
                            <h6 className="mb-3">Body Language</h6>
                            <div className="flex flex-wrap gap-4">
                                {variety2.map((item, index) => (
                                    <div key={index} className="w-full md:w-[calc(33.33%-10px)] lg:w-[calc(25%-12px)]">
                                        <div className={`rounded-lg py-2 px-4 ${item.bg} flex justify-between`}>
                                            <div className="flex flex-col justify-between py-3">
                                                <div className="flex items-center gap-2">
                                                    <p>{item.title}</p>
                                                    <DynamicTooltip
                                                        tooltipKey={item.key}
                                                        sideOffset={5}
                                                        className="[&_svg]:hidden [&>p]:text-black/80"
                                                    >
                                                        <Info className="size-4 shrink-0" />
                                                    </DynamicTooltip>
                                                </div>
                                                <h5>{item.percent}%</h5>
                                            </div>
                                            <div>
                                                <FullCircleProgress percent={item.percent!} color={"#64BA9F"} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="session-feedback" className="px-4 lg:px-8 py-4">
                        <div className="border-1 border-bright-gray rounded-xl py-5 px-4">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="md:w-3/5 space-y-4">
                                    <h5>Session Summary Feedback</h5>
                                    <p className="text-independence">
                                        This area provides comprehensive feedback on the session you just completed,
                                        including insights related to the goals you set for yourself.
                                    </p>
                                    <div className="p-4 rounded-md border-bright-gray border-1 w-full">
                                        <p className="whitespace-pre-line">{data.general_feedback_summary}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:w-2/5 mt-5 lg:mt-0">
                                    <div className="flex justify-between mb-4">
                                        <h6 className="mb-4">Strengths & Areas for Improvement</h6>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="w-full md:w-4/5 md:pe-2 mb-3">
                                            <h6 className="text-medium-sea-green mb-3.5">Strengths</h6>
                                            <ul className="list-none space-y-3">
                                                {parseStrengthsAndImprovements(data.strength ?? "[]").map(
                                                    (strength, index) => (
                                                        <li
                                                            key={strength + index}
                                                            className="flex items-start gap-2 text-independence"
                                                        >
                                                            <span className="text-medium-sea-green">✔</span> {strength}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>

                                        <div className="w-full md:w-4/5 md:ps-2">
                                            <h6 className="text-jelly-bean mb-3.5">Areas for Improvement</h6>
                                            <ul className="list-none space-y-3">
                                                {parseStrengthsAndImprovements(data.area_of_improvement ?? "[]").map(
                                                    (improvement, index) => (
                                                        <li
                                                            key={improvement + index}
                                                            className="flex items-start gap-2 text-independence"
                                                        >
                                                            <span className="text-jelly-bean">✔</span> {improvement}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            data-html2canvas-ignore
                            className="w-full flex flex-wrap items-center md:justify-end gap-3 mt-8 md:pr-25"
                        >
                            <Link
                                to="../session-history"
                                className="flex gap-1 py-5 px-4 items-center justify-center whitespace-nowrap rounded-md text-sm font-normal h-9 bg-transparent hover:bg-gray/20 text-primary-blue border-1 border-bright-gray"
                            >
                                View session history
                            </Link>
                            <Button
                                className="flex gap-1 py-5 bg-branding-secondary hover:bg-branding-secondary/90"
                                onClick={() => navigate(newSessionNavigate)}
                            >
                                Start new session
                            </Button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default PitchSessionReport;
