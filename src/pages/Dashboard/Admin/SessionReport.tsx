import FullCircleProgress from "@/components/dashboard/FullCircleProgress";
import SegmentedProgressBar from "@/components/dashboard/SegmentedProgressBar";
import SemiCircleProgress from "@/components/dashboard/SemiCircleProgress";
import ShadLineChart from "@/components/dashboard/ShadLineChart";
import SlideFeedbackChart from "@/components/dashboard/SlideFeedbackChart";
import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DynamicTooltip } from "@/components/widgets/dynamic-tooltip";
import { useGetSessionReport } from "@/hooks/sessions";
import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import usePerformanceChart from "@/hooks/usePerformanceChart";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { ArrowLeft, ArrowRight, Download, Info } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PitchSessionReport: React.FC = () => {
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

        if (!element) return;

        setIsGeneratingPDF(true);

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
        });

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const margin = 10;
        const pdfPageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
        const pdfPageHeight = pdf.internal.pageSize.getHeight() - margin * 2;

        const scaleFactor = pdfPageWidth / imgWidth;
        const scaledCanvasHeight = imgHeight * scaleFactor;

        const totalPages = Math.ceil(scaledCanvasHeight / pdfPageHeight);

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();

            const sourceY = (pdfPageHeight / scaleFactor) * i;

            // Create a temporary canvas to hold the slice
            const pageCanvas = document.createElement("canvas");
            const pageContext = pageCanvas.getContext("2d")!;
            pageCanvas.width = imgWidth;
            pageCanvas.height = pdfPageHeight / scaleFactor;

            pageContext.drawImage(canvas, 0, sourceY, imgWidth, pageCanvas.height, 0, 0, imgWidth, pageCanvas.height);

            const imgData = pageCanvas.toDataURL("image/png");
            pdf.addImage(imgData, "PNG", margin, margin, pdfPageWidth, pdfPageHeight);
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

    return (
        <div>
            {!data || isPending ? (
                <div className="p-4">
                    <Skeleton className="h-7 w-20 mb-3" />
                    <Skeleton className="h-15 w-100 mb-3" />
                    <Skeleton className="h-7 w-full mb-3" />
                    <Skeleton className="h-7 w-full mb-3" />
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

                            <Button
                                disabled={isGeneratingPDF}
                                isLoading={isGeneratingPDF}
                                className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray"
                                onClick={handlePDFDownload}
                            >
                                <Download className="stroke-2" />
                                <span className="hidden lg:block font-normal">Download</span>
                            </Button>
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
                    </section>

                    <section className="px-4 lg:px-8 py-4">
                        <div className="flex flex-col md:flex-row w-full gap-3">
                            <div className="w-full md:w-7/12 lg:pe-2 mb-4 md:mb-0">
                                <div className="flex flex-col justify-between h-full border-1 border-bright-gray rounded-xl p-4">
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

                    <section className="px-4 lg:px-8 py-4">
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
                                className="hidden gap-1 py-5 bg-primary-blue hover:bg-primary-blue/90"
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

                    <div className="w-full flex flex-wrap gap-3 justify-between border-t-1 border-bright-gray px-8 pt-4 mt-8">
                        <Button className="flex gap-1 py-5 bg-transparent hover:bg-gray/20 text-primary-blue border-1 border-bright-gray">
                            <ArrowLeft /> Previous Report
                        </Button>
                        <Button className="flex gap-1 py-5 bg-transparent hover:bg-gray/20 text-primary-blue border-1 border-bright-gray">
                            Next Report <ArrowRight />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PitchSessionReport;
