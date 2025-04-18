/* eslint-disable @typescript-eslint/no-explicit-any */
import FullCircleProgress from "@/components/dashboard/FullCircleProgress";
import SegmentedProgressBar from "@/components/dashboard/SegmentedProgressBar";
import SemiCircleProgress from "@/components/dashboard/SemiCircleProgress";
import ShadLinearLineChart from "@/components/dashboard/ShadLinearLineChart";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSessionReport } from "@/hooks/sessions";
import { ArrowLeft, Download, UserRound } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatar from "../../../assets/images/pngs/avater.png";
import speakWithCoach from "../../../assets/images/svgs/speak-with-coach.svg";

const PitchSessionReport: React.FC = () => {
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    // const sessionType = 'pitch';
    const navigate = useNavigate();

    const { id } = useParams();
    const { data, isPending, refetch } = useGetSessionReport(id) as {
        data: any;
        isPending: boolean;
        refetch: () => void;
    };

    React.useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch]);

    console.log(data);

    const chartData = [
        { minute: 0, Impact: 0, TriggerResponse: 0, Conviction: 0 },
        { minute: 5, Impact: 305, TriggerResponse: 200, Conviction: 100 },
        { minute: 10, Impact: 237, TriggerResponse: 120, Conviction: 100 },
        { minute: 15, Impact: 73, TriggerResponse: 190, Conviction: 100 },
        { minute: 20, Impact: 209, TriggerResponse: 130, Conviction: 100 },
        { minute: 25, Impact: 214, TriggerResponse: 140, Conviction: 100 },
    ];

    const chartColors = {
        Impact: "#252A39",
        TriggerResponse: "#40B869",
        Conviction: "#F5B546",
    };

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
            percent: data?.volume,
        },
        {
            bg: "bg-green-sheen/15",
            title: "Pitch",
            percent: data?.pitch_variability,
        },
        {
            bg: "bg-seashell",
            title: "Pace",
            percent: data?.pace,
        },
        {
            bg: "bg-grey/15",
            title: "Pauses",
            percent: data?.pauses,
        },
    ];

    const deliveryMetrics = [
        {
            title: "Structure and Clarity",
            rating: data?.structure_and_clarity,
        },
        {
            title: "Transformative Communication",
            rating: data?.transformative_communication,
        },
        {
            title: "Emotional Impact",
            rating: data?.emotional_impact,
        },
    ];

    const variety2 = [
        {
            bg: "bg-alice-blue",
            title: "Posture",
            percent: data?.posture,
        },
        {
            bg: "bg-green-sheen/15",
            title: "Motion",
            percent: data?.motion,
        },
        {
            bg: "bg-seashell",
            title: "Hand Gestures",
            percent: 80,
        },
    ];

    const deliveryMetrics2 = [
        {
            title: "Brevity",
            rating: data?.brevity,
        },
        {
            title: "Filler Words",
            rating: data?.filler_words,
        },
        {
            title: "Grammar",
            rating: data?.grammar,
        },
    ];

    return (
        <div>
            {isPending ? (
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
                <div className="py-4 text-primary-blue">
                    <section className="px-4 lg:px-8 border-b-1 border-bright-gray">
                        <div className="py-3 flex flex-wrap justify-between items-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center text-black bg-transparent hover:bg-transparent p-0 gap-2"
                            >
                                <ArrowLeft className="w-5 aspect-square" />
                                <p>Back</p>
                            </button>

                            <div className="flex items-center gap-2">
                                <Button className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray">
                                    <Download />
                                    <span className="hidden lg:block">Download</span>
                                </Button>
                                <Button
                                    onClick={() => setDialogOneOpen(true)}
                                    className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray"
                                >
                                    <UserRound />
                                    <span className="hidden lg:block">Speak With a Coach</span>
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
                                        <Button
                                            className="bg-primary-blue hover:bg-primary-blue/90"
                                            onClick={() => setDialogOneOpen(false)}
                                        >
                                            Speak with a Coach
                                        </Button>
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
                                    <p>{`${parseInt(data.duration?.split(":")[0])} mins ${parseInt(data.duration?.split(":")[1])} secs`}</p>
                                </div>
                            </div>

                            <div className="flex lg:me-5 mt-6 lg:mt-0">
                                <div className="flex pe-5 me-5 border-r-2 border-bright-gray">
                                    <img src={avatar} alt="avatar" />
                                    <div className="flex flex-col justify-between ps-2">
                                        <h6>{data.full_name}</h6>
                                        <p className="text-independence">{data.user_email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <h6>Company</h6>
                                    <p className="text-independence">Tangerine Plc</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-independence mb-3">
                            This comprehensive report summarizes the session you just completed. It covers the goals you
                            set for yourself, the industry standards defined by EngageX™ and your personal objectives.
                        </p>
                    </section>

                    <section className="px-4 lg:px-8 py-4">
                        <div className="flex md:flex-row w-full items-stretch gap-3">
                            <div className="w-full md:w-7/12 lg:pe-2 mb-4 md:mb-0">
                                <div className="border-1 border-bright-gray rounded-xl p-4">
                                    <h6 className="mb-3">Audience Engagement</h6>
                                    <ShadLinearLineChart data={chartData} colors={chartColors} />
                                    <p className="mt-2">
                                        <span className="text-medium-sea-green">Trigger Response</span> is the
                                        audience’s engagement, where a trigger evokes the audience to respond in some
                                        shape or form as a reaction to the information they’ve heard.
                                    </p>
                                </div>
                            </div>

                            <div className="border-1 border-bright-gray rounded-xl p-4 w-full md:w-5/12 lg:me-0">
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
                            </div>
                        </div>
                    </section>

                    <section className="px-4 lg:px-8">
                        <div className="performance border-1 border-bright-gray rounded-xl py-5 px-4">
                            <h5 className="mb-6">Performance Analytics</h5>
                            <h6 className="mb-3">Vocal Variety</h6>

                            <div className="flex flex-wrap gap-4">
                                {variety.map((item, index) => (
                                    <div key={index} className="w-full md:w-[calc(33.33%-10px)] lg:w-[calc(25%-12px)]">
                                        <div className={`rounded-lg py-2 px-4 ${item.bg} flex justify-between`}>
                                            <div className="flex flex-col justify-between py-3">
                                                <p>{item.title}</p>
                                                <h5>{item.percent}%</h5>
                                            </div>
                                            <div>
                                                <FullCircleProgress percent={item.percent} color={"#64BA9F"} />
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
                                            <p>{metric.title}</p>
                                            <p className="lg:hidden block">{metric.rating}%</p>
                                        </div>
                                        <div className="w-full lg:w-8/12 mt-3 lg:mt-0">
                                            <SegmentedProgressBar
                                                percent={metric.rating}
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
                                                <p>{item.title}</p>
                                                <h5>{item.percent}%</h5>
                                            </div>
                                            <div>
                                                <FullCircleProgress percent={item.percent} color={"#64BA9F"} />
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
                                            <p>{metric.title}</p>
                                            <p className="lg:hidden block">{metric.rating}%</p>
                                        </div>
                                        <div className="w-full lg:w-8/12 mt-3 lg:mt-0">
                                            <SegmentedProgressBar
                                                percent={metric.rating}
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

                    <section className="px-4 lg:px-8 py-4">
                        <div className="border-1 border-bright-gray rounded-xl py-5 px-4">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div>
                                    <h5 className="mb-5">Personal Goal Summary</h5>
                                    <p className="text-independence">Session feedback summary</p>
                                    <div className="p-4 rounded-md border-bright-gray border-1 w-full">
                                        <p>
                                            The session was completed within the allocated time. Key strengths include
                                            clear delivery and structured pacing. Areas for improvement include reducing
                                            time spent on introductions and enhancing explanation of key benefits.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full mt-5 lg:mt-0">
                                    <div className="flex justify-between mb-4">
                                        <h6 className="mb-4">Strengths & Areas for Improvement</h6>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="w-full md:w-1/2 md:pe-2 mb-3">
                                            <h6 className="text-medium-sea-green mb-3.5">Strengths</h6>
                                            <ul className="list-none space-y-3">
                                                <li className="flex items-center gap-2 text-independence">
                                                    <span className="text-medium-sea-green">✔</span> Excellent pace
                                                    variation
                                                </li>
                                                <li className="flex items-center gap-2 text-independence">
                                                    <span className="text-medium-sea-green">✔</span> Strong opening
                                                    hook
                                                </li>
                                                <li className="flex items-center gap-2 text-independence">
                                                    <span className="text-medium-sea-green">✔</span> Effective use of
                                                    pauses
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="w-full md:w-1/2 md:ps-2">
                                            <h6 className="text-jelly-bean mb-3.5">Weaknesses</h6>
                                            <ul className="list-none space-y-3">
                                                <li className="flex items-center gap-2 text-independence">
                                                    <span className="text-jelly-bean">✔</span> Excellent pace variation
                                                </li>
                                                <li className="flex items-center gap-2 text-independence">
                                                    <span className="text-jelly-bean">✔</span> Strong opening hook
                                                </li>
                                                <li className="flex items-center gap-2 text-independence">
                                                    <span className="text-jelly-bean">✔</span> Effective use of pauses
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-wrap gap-3 justify-end mt-8">
                            <Button
                                className="flex gap-1 py-5 bg-transparent hover:bg-gray/20 text-primary-blue border-1 border-bright-gray"
                                onClick={() => navigate(-1)}
                            >
                                View session history
                            </Button>
                            <Button
                                className="flex gap-1 py-5 bg-primary-blue hover:bg-primary-blue/90"
                                onClick={() => navigate("../public-speaking")}
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
