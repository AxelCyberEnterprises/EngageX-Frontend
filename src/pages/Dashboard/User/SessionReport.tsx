import VideoPlayer from "@/components/authPageComponents/VideoPlayer";
import FullCircleProgress from "@/components/dashboard/FullCircleProgress";
import SegmentedProgressBar from "@/components/dashboard/SegmentedProgressBar";
import SemiCircleProgress from "@/components/dashboard/SemiCircleProgress";
import ShadLineChart from "@/components/dashboard/ShadLineChart";
import SlideFeedbackChart from "@/components/dashboard/SlideFeedbackChart";
import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { DynamicTooltip } from "@/components/widgets/dynamic-tooltip";
import { useGetSessionReport } from "@/hooks/sessions";
import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import usePerformanceChart from "@/hooks/usePerformanceChart";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { ArrowLeft, Download, Info, LoaderCircle, UserRound } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import speakWithCoach from "../../../assets/images/svgs/speak-with-coach.svg";

const PitchSessionReport: React.FC = () => {
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const { data: fullProfile } = useFullUserProfile();
    const { data: profile } = useUserProfile(fullProfile?.results?.[0]?.id);
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, isPending, refetch } = useGetSessionReport(id);
    const { chartColors, chartData } = usePerformanceChart({ performanceAnalytics: data?.performance_analytics });

    const pdfRef = useRef<HTMLDivElement>(null);

    const handlePDFDownload = useCallback(async () => {
        const element = pdfRef.current;

        if (!element) {
            return;
        }

        setIsGeneratingPDF(true);

        const canvas = await html2canvas(element, {
            scale: 2,
        });
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const margin = 10;
        const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
        const pdfHeight = pdf.internal.pageSize.getHeight() - margin * 2;

        pdf.addImage(data, "PNG", margin, margin, pdfWidth, pdfHeight);
        pdf.save(`Session-Report-${id}.pdf`);

        setIsGeneratingPDF(false);
    }, [id]);

    React.useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch]);

    const parseStrengthsAndImprovements = useCallback((input: string) => {
        // Remove the outer quotes if the input is a stringified string
        if (input.startsWith('"') && input.endsWith('"')) {
            input = input.slice(1, -1);
        }

        // Remove the outer [ ]
        const trimmed = input.trim().slice(1, -1);

        // Split by comma, then trim and remove only leading and trailing single quotes
        const elements = trimmed.split(/,(?=(?:[^']*'[^']*')*[^']*$)/).map((el) => {
            const trimmedEl = el.trim();
            const unquoted = trimmedEl.replace(/^'(.*)'$/, "$1");
            return unquoted;
        });

        // Strip surrounding quotes from each string
        return elements.map((str) => str.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1"));
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
                                <Button
                                    onClick={() => setDialogOneOpen(true)}
                                    className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray"
                                >
                                    <UserRound className="stroke-2" />
                                    <span className="hidden lg:block font-normal">Speak With A Coach</span>
                                </Button>

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
                                        </DialogHeader>
                                        <Link
                                            to="https://calendly.com/jacqui-thecareerdoctor/engagex-live-speach-coaching"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-primary-blue hover:bg-primary-blue/90 h-10 px-4 py-2 rounded-md text-white flex items-center justify-center text-sm"
                                            onClick={() => setDialogOneOpen(false)}
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
                                    <p>{data.session_type_display}</p>
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
                                    <img
                                        src={profile?.profile_picture}
                                        alt="avatar"
                                        className="w-11 h-11 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col justify-between ps-2">
                                        <h6>{data.full_name}</h6>
                                        <p className="text-independence">{data.user_email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <h6>Company</h6>
                                    <p className="text-independence">{data.company}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-independence mb-3">
                            This comprehensive report summarizes the session you just completed. The report covers the
                            goals you set for yourself and the industry standards defined by EngageX™. Please click on
                            the speak with a coach button at the top to book a live review session with a certified
                            coach.
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
                                    <LoaderCircle className="size-6 animate-spin stroke-white" />
                                </div>
                            )}
                            <small className="border-l-2 border-l-maximum-yellow-red pl-3 py-1">
                                Your recording may take 1-3 minutes to be ready for download
                            </small>
                        </div>

                        <div className="flex flex-col md:flex-row w-full items-stretch gap-3">
                            <div className="w-full md:w-7/12 lg:pe-2 mb-4 md:mb-0">
                                <div className="border-1 border-bright-gray rounded-xl p-4">
                                    <h6 className="mb-3">Audience Engagement</h6>
                                    <div className="chart__div">
                                        <ShadLineChart
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
                                        <span className="text-medium-sea-green">Trigger Response</span> is the
                                        audience's engagement, where a trigger evokes the audience to respond in some
                                        shape or form as a reaction to the information they've heard.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between border-1 border-bright-gray rounded-xl p-4 w-full md:w-5/12 lg:me-0">
                                <h6 className="mb-3">Overall Captured Impact</h6>
                                <div className="relative w-full h-70 flex flex-col items-center pt-10">
                                    <SemiCircleProgress
                                        percent={data.overall_captured_impact / 100}
                                        color={"#262B3A"}
                                    />

                                    <div className="absolute bottom-16 text-center">
                                        <h4 className="mb-4">{data.overall_captured_impact}%</h4>
                                        {(() => {
                                            let color = "#252A39";
                                            let text = "SATISFACTORY";
                                            if (data.overall_captured_impact >= 80) {
                                                color = "#40B869";
                                                text = "EXCELLENT";
                                            } else if (data.overall_captured_impact >= 50) {
                                                color = "#F5B546";
                                                text = "GOOD";
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
                                <p>
                                    <span className="text-medium-sea-green">Overall Captured Impact</span> captures the
                                    overall power and memorability of the presentation. It is calculated based on the
                                    speaker's conviction, transformative communication, and ability to inspire audience
                                    response.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="px-4 lg:px-8">
                        <div className="performance border-1 border-bright-gray rounded-xl py-5 px-4">
                            <h5 className="mb-6">Performance Analytics</h5>
                            <div className="hidden border-1 border-bright-gray rounded-xl p-4 mb-5">
                                <h6 className="mb-3">Slide-Based Feedback</h6>
                                {data.slides_file ? (
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
                                                color={"#252A39"}
                                                divisions={1}
                                            />
                                        </div>
                                        <div className="w-full lg:w-1/12 hidden lg:flex justify-end">
                                            <p>{metric.rating}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h6 className="mt-8 mb-3">Body Language</h6>
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
                                                color={"#252A39"}
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

                    {data.slides_file && (
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

                    <section className="px-4 lg:px-8 py-4">
                        <div className="border-1 border-bright-gray rounded-xl py-5 px-4">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="md:w-3/5 space-y-4">
                                    <h5>Session Summary Feedback</h5>
                                    <p className="text-independence">
                                        This area represents a comprehensive session feedback on the session you just
                                        completed, in it you will find feedback on the goals you set for yourself.
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
                                                            className="flex items-center gap-2 text-independence"
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
                                                            className="flex items-center gap-2 text-independence"
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

                        <div data-html2canvas-ignore className="w-full flex flex-wrap items-center md:justify-end gap-3 mt-8 md:pr-25">
                            <Button
                                className="flex gap-1 py-5 bg-transparent hover:bg-gray/20 text-primary-blue border-1 border-bright-gray"
                                onClick={() => navigate(-1)}
                            >
                                View session history
                            </Button>
                            <Button
                                className="flex gap-1 py-5 bg-primary-blue hover:bg-primary-blue/90"
                                onClick={() =>
                                    navigate(
                                        `../${data.session_type}-${data.session_type === "public" ? "speaking" : "practice"}`,
                                    )
                                }
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
