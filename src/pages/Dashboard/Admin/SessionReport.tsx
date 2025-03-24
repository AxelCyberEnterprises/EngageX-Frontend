import { ArrowLeft, Download, Heart } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import ShadLinearLineChart from '@/components/dashboard/ShadLinearLineChart';
import SemiCircleProgress from '@/components/dashboard/SemiCircleProgress';
import FullCircleProgress from '@/components/dashboard/FullCircleProgress';
import SegmentedProgressBar from '@/components/dashboard/SegmentedProgressBar';

const PitchSessionReport: React.FC = () => {

    const chartData = [
        { minute: 0, Curiosity: 0, Empathy: 0, Convictions: 0 },
        { minute: 5, Curiosity: 305, Empathy: 200, Convictions: 100 },
        { minute: 10, Curiosity: 237, Empathy: 120, Convictions: 100 },
        { minute: 15, Curiosity: 73, Empathy: 190, Convictions: 100 },
        { minute: 20, Curiosity: 209, Empathy: 130, Convictions: 100 },
        { minute: 25, Curiosity: 214, Empathy: 140, Convictions: 100 },
    ];

    const chartColors = {
        Curiosity: "#252A39",
        Empathy: "#40B869",
        Convictions: "#F5B546",
    };

    const variety = [
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
            bg: "bg-sunray/15",
            title: "Speech Rate",
            percent: 80,
            rating: "Excellent",
        },
        {
            bg: "bg-grey/15",
            title: "Pauses",
            percent: 80,
            rating: "Excellent",
        },
        {
            bg: "bg-sunray/15",
            title: "Tone",
            percent: 80,
            rating: "Excellent",
        },
        {
            bg: "bg-seashell",
            title: "Pronunciation",
            percent: 80,
            rating: "Excellent",
        },
        {
            bg: "bg-grey/15",
            title: "Emotional Expression",
            percent: 80,
            rating: "Excellent",
        },
    ];

    const deliveryMetrics = [
        {
            title: "Content Organization",
            rating: 94,
        },
        {
            title: "Emotional Impact",
            rating: 71,
        },
        {
            title: "Audience Engagement",
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

    return (
        <div className="py-4 text-primary-blue">
            <section className="px-4 lg:px-8 border-b-1 border-bright-gray">
                <div className="py-3 flex flex-wrap justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ArrowLeft className="w-5 aspect-square" />
                        <p>Back</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray">
                            <Download />
                            <span className="hidden lg:block">Download</span>
                        </Button>
                        <Button className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray">
                            <Heart />
                            <span className="hidden lg:block">Save to Archive</span>
                        </Button>
                        {/* <Button className="flex gap-1 p-5 text-primary-blue bg-transparent hover:bg-grey/10 border-1 border-bright-gray">
                            <UserRound />
                            <span className="hidden lg:block">Speak With a Coach</span>
                        </Button> */}
                    </div>
                </div>

                <div className="py-4">
                    <h5 className="mb-3">Pitch Mastery Session</h5>
                    <div className="flex gap-3 text-primary-blue/70">
                        <p>Pitch Practice</p>
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

                                <div className="absolute bottom-6">
                                    <h4 className="mb-4">88%</h4>
                                    <div className="bg-medium-sea-green text-white rounded-lg px-4 py-2">
                                        <p>HIGH</p>
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
                        <h6 className="mb-5">Delovery and Structure Metrics</h6>

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
                    <h5 className="mb-5">Timing & Efficiency Analysis</h5>

                    <div className="flex gap-6 flex-col lg:flex-row">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="w-full mb-3">
                                <div className="border-1 border-bright-gray rounded-xl py-5 px-3 w-full">
                                    <p className="mb-4">Total Time Saved/Overshot</p>
                                    <div className="flex gap-4 items-center">
                                        <h5>-2:15</h5>

                                        <div className="flex justify-center items-center text-crimson-red bg-crimson-red/20 p-2 rounded-4xl">
                                            <small>Overshot</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="border-1 border-bright-gray rounded-xl py-5 px-3 w-full">
                                    <p className="mb-4">Slide Specific Timing</p>
                                    <div className="flex gap-4 items-center">
                                        <h5>Slide 3</h5>

                                        <div className="flex justify-center items-center bg-alice-blue p-2 rounded-4xl">
                                            <small>Need Adjustment</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h6 className="py-4 mt-2">Suggestions for Optimized Pacing</h6>
                            <ul className="list-disc text-primary-blue/80">
                                <li className="mb-2">Reduce time on introduction by 30 seconds</li>
                                <li className="mb-2">Spend more time explaining key benefits</li>
                                <li>Spend more time explaining key benefits</li>
                            </ul>
                        </div>

                        <div className="flex flex-col w-full sm:mt-5">
                            <div className="flex justify-between mb-4">
                                <h6 className="mb-4">Strengths & Areas for Improvement</h6>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="w-full md:w-1/2 md:pe-2 mb-3">
                                    <h6 className="text-medium-sea-green mb-3.5">Strengths</h6>
                                    <ul className="list-none space-y-3">
                                        <li className="flex items-center gap-2">
                                            <span className="text-medium-sea-green">✔</span> Excellent pace variation
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-medium-sea-green">✔</span> Strong opening hook
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-medium-sea-green">✔</span> Effective use of pauses
                                        </li>
                                    </ul>
                                </div>

                                <div className="w-full md:w-1/2 md:ps-2">
                                    <h6 className="text-jelly-bean mb-3.5">Weaknesses</h6>
                                    <ul className="list-none space-y-3">
                                        <li className="flex items-center gap-2">
                                            <span className="text-jelly-bean">✔</span> Excellent pace variation
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-jelly-bean">✔</span> Strong opening hook
                                        </li>
                                        <li className="flex items-center gap-2">
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
                        View History Session
                    </Button>
                    <Button className="flex gap-1 py-5 bg-primary-blue hover:bg-primary-blue/90">
                        Start New Session
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default PitchSessionReport;