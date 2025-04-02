import { ArrowLeft, Download, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ShadLinearLineChart from '@/components/dashboard/ShadLinearLineChart';
import SemiCircleProgress from '@/components/dashboard/SemiCircleProgress';
import FullCircleProgress from '@/components/dashboard/FullCircleProgress';
import SegmentedProgressBar from '@/components/dashboard/SegmentedProgressBar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import speakWithCoach from "../../../assets/images/svgs/speak-with-coach.svg";
import { useNavigate } from 'react-router-dom';

const PitchSessionReport: React.FC = () => {
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);

    const chartData = [
        { minute: 0, Impact: 0, Brevity: 0, Conviction: 0 },
        { minute: 5, Impact: 305, Brevity: 200, Conviction: 100 },
        { minute: 10, Impact: 237, Brevity: 120, Conviction: 100 },
        { minute: 15, Impact: 73, Brevity: 190, Conviction: 100 },
        { minute: 20, Impact: 209, Brevity: 130, Conviction: 100 },
        { minute: 25, Impact: 214, Brevity: 140, Conviction: 100 },
    ];

    const chartColors = {
        Impact: "#252A39",
        Brevity: "#40B869",
        Conviction: "#F5B546",
    };

    const variety = [
        {
            bg: "bg-sunray/15",
            title: "Impact",
            percent: 80,
            rating: "Excellent",
        },
        {
            bg: "bg-alice-blue",
            title: "Volume",
            percent: 80,
            rating: "Excellent",
        },
        {
            bg: "bg-green-sheen/15",
            title: "Pitch",
            percent: 80,
            rating: "Excellent",
        },
        {
            bg: "bg-seashell",
            title: "Pace",
            percent: 80,
            rating: "Excellent",
        },
        {
            bg: "bg-grey/15",
            title: "Pauses",
            percent: 80,
            rating: "Excellent",
        },
    ];

    const deliveryMetrics = [
        {
            title: "Impact",
            rating: 71,
        },
        {
            title: "Brevity",
            rating: 71,
        },
        {
            title: "Content Organization",
            rating: 94,
        },
        {
            title: "Clarity",
            rating: 97,
        },
        {
            title: "Transformative Potential",
            rating: 81,
        },
        {
            title: "Visual/Non-Verbal Communication",
            rating: 70,
        },
    ];

    // const sessionType = 'pitch';
    const navigate = useNavigate();

    return (
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
                                    <img src={speakWithCoach} alt="green image of users" className="w-16 h-16 mb-4" />
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

                <div className="py-4">
                    <h5 className="mb-3">Public Speaking Session</h5>
                    <div className="flex gap-3 text-primary-blue/70">
                        <p>Public Speaking Practice</p>
                        <div className="border-l-1"></div>
                        <p>Feb 15, 2025</p>
                        <div className="border-l-1"></div>
                        <p>40 mins</p>
                    </div>
                </div>
            </section>

            <section className="px-4 lg:px-8 py-4">
                <div className="flex flex-wrap md:flex-col-reverse lg:flex-row w-full items-stretch">
                    <div className="w-full lg:w-7/12 lg:pe-2 mb-4 md:mb-0">
                        <div className="border-1 border-bright-gray rounded-xl p-4">
                            <h6 className="mb-3">Audience Reactions</h6>
                            <ShadLinearLineChart data={chartData} colors={chartColors} />
                        </div>
                    </div>

                    <div className="md:mb-4 lg:mb-0 w-full lg:w-5/12 lg:ps-2 flex flex-col md:flex-row lg:flex-col justify-between h-full lg:space-y-5 md:space-x-4 space-y-4">
                        <div className="border-1 border-bright-gray rounded-xl p-4 w-full md:w-1/2 lg:w-full lg:me-0">
                            <h6 className="mb-3">Overall Performance</h6>
                            <div className="relative w-full h-50 flex flex-col items-center">
                                <SemiCircleProgress percent={0.88} color={"#262B3A"} />

                                <div className="absolute bottom-6 text-center">
                                    <h4 className="mb-4">88%</h4>
                                    <div className="bg-medium-sea-green text-white rounded-lg px-4 py-2">
                                        <p>EXCELLENT</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-1 border-bright-gray rounded-xl px-4 py-6 w-full md:w-1/2 lg:w-full flex flex-col lg:ms-0 mb-4">
                            <h6 className="mb-4">Engagement Heatmap</h6>
                            <div className="flex">
                                <div className="w-1/6 h-10 bg-medium-sea-green/30"></div>
                                <div className="w-1/6 h-10 bg-medium-sea-green/60"></div>
                                <div className="w-1/6 h-10 bg-medium-sea-green"></div>
                                <div className="w-1/6 h-10 bg-mauvelous"></div>
                                <div className="w-1/6 h-10 bg-mauvelous/60"></div>
                                <div className="w-1/6 h-10 bg-mauvelous/30"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 lg:px-8">
                <div className="performance border-1 border-bright-gray rounded-xl py-5 px-4">
                    <h5 className="mb-4">Performance Analytics</h5>
                    <h6 className="mb-6">Vocal Variety</h6>

                    <div className="flex flex-wrap gap-4">
                        {variety.map((item, index) => (
                            <div key={index} className="w-full md:w-[calc(33.33%-10px)] lg:w-[calc(25%-12px)]">
                                <div className={`rounded-lg py-2 px-4 ${item.bg} flex justify-between`}>
                                    <div className="flex flex-col justify-between py-3">
                                        <p>{item.title}</p>
                                        <h5>{item.percent}%</h5>
                                    </div>
                                    <div>
                                        <FullCircleProgress
                                            percent={item.percent}
                                            color={"#64BA9F"}
                                            text={item.rating}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-7">
                        <h6 className="mb-5">Delivery and Structure Metrics</h6>

                        {deliveryMetrics.map((metric, index) => (
                            <div key={index} className="flex flex-wrap w-full mb-3 items-center">
                                <div className="w-full lg:w-3/12 flex justify-between">
                                    <p>{metric.title}</p>
                                    <p className="lg:hidden block">{metric.rating}%</p>
                                </div>
                                <div className="w-full lg:w-8/12 mt-3 lg:mt-0">
                                    <SegmentedProgressBar percent={metric.rating} color={"#252A39"} divisions={1} />
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
                    <h5 className="mb-1.5">Session Feedback Analysis</h5>
                    <p className="mb-5 text-independence">Session feedback summary</p>

                    <div className="flex gap-6 flex-col">
                        <div className="p-4 rounded-md border-bright-gray border-1 max-w-2xl">
                            <p>
                                The session was completed within the allocated time. Key strengths include clear
                                delivery and structured pacing. Areas for improvement include reducing time spent on
                                introductions and enhancing explanation of key benefits.
                            </p>
                        </div>

                        <div className="flex flex-col w-full sm:mt-5">
                            <div className="flex justify-between mb-4">
                                <h6 className="mb-4">Strengths & Areas for Improvement</h6>
                            </div>

                            <div className="flex flex-col gap-3 lg:flex-row">
                                <div className="w-full md:w-1/2 md:pe-2 mb-3">
                                    <h6 className="text-medium-sea-green mb-3.5">Strengths</h6>
                                    <ul className="list-none space-y-3">
                                        <li className="flex items-center gap-2 text-independence">
                                            <span className="text-medium-sea-green">✔</span> Excellent pace variation
                                        </li>
                                        <li className="flex items-center gap-2 text-independence">
                                            <span className="text-medium-sea-green">✔</span> Strong opening hook
                                        </li>
                                        <li className="flex items-center gap-2 text-independence">
                                            <span className="text-medium-sea-green">✔</span> Effective use of pauses
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
                    <Button className="flex gap-1 py-5 bg-transparent hover:bg-gray/20 text-primary-blue border-1 border-bright-gray">
                        View session history
                    </Button>
                    <Button className="flex gap-1 py-5 bg-primary-blue hover:bg-primary-blue/90">
                        Start new session
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default PitchSessionReport;