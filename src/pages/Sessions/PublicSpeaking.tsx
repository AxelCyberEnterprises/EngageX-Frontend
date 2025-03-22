import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquareArrowUpRight, ThumbsUp } from "lucide-react";
import audience from "../../assets/images/pngs/audience.png";
import VoiceAnalytics from "@/components/session/VoiceAnalytics";
import PublicSpeakingTimer from "@/components/session/PublicSpeakingTimer";
import VideoStreamer from "@/components/session/RecordView";
import EngagementMetrics from "@/components/session/EngagementMetrics";
import { useNavigate } from "react-router-dom";

const PublicSpeaking: React.FC = () => {
    const [stop, setStop] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const navigate = useNavigate();

    const StopStreaming = () => {
        setStop(true);
        navigate("/dashboard/user/session-history/1");
    };

    return (
        <div className="text-primary-blue">
            <section className="flex flex-wrap border-b-1 border-bright-gray px-8 py-4 justify-between items-center">
                <div className="w-full">
                    <h4 className="mb-4">Public Speaking Session</h4>
                    <div className="mb-3">
                        <PublicSpeakingTimer minutes={2} start={startTimer} />
                    </div>
                </div>
            </section>

            <section className="flex flex-wrap">
                {/* left side  */}
                <div className="w-full md:w-9/12 lg:w-3/12 md:px-8 lg:pe-4 py-4">
                    <EngagementMetrics percent1={32} percent2={42} percent3={35} />

                    <VoiceAnalytics percent1={72} percent2={62} percent3={85} />
                </div>

                {/* middle side  */}
                <div className="w-full md:w-9/12 lg:w-6/12 md:px-8 lg:pe-4 py-4">
                    <div className="">
                        <div className="rounded-xl w-full h-120">
                            <h6 className="mb-3">Live Audience</h6>
                            <img src={audience} alt="audience" className="w-full h-full object-cover rounded-xl" />
                        </div>

                        <div className="w-full flex justify-end mt-16 px-4 md:px-0">
                            <Button className="bg-jelly-bean hover:bg-jelly-bean/90 flex" onClick={StopStreaming}>
                                <SquareArrowUpRight className="me-1" /> End Session
                            </Button>
                        </div>
                    </div>
                </div>

                {/* right side large screens  */}
                <div className="right__side hidden md:block w-full md:w-3/12 lg:w-3/12 px-8 lg:ps-4 py-4">
                    <div className="py-5 px-3 border-1 border-bright-gray rounded-xl">
                        <VideoStreamer
                            duration={2}
                            stop={stop}
                            onStop={StopStreaming}
                            onStart={() => setStartTimer(true)}
                        />
                    </div>

                    <div className="border px-2 py-4 rounded-lg border-bright-gray mt-3">
                        <h6 className="mb-3">Speaker Notes</h6>
                        <p>This is a note</p>
                    </div>
                </div>

                {/* right side mobile */}
                <div className="p-4 md:hidden w-full">
                    <div className="border-1 border-gray py-5 px-3">
                        <div className="row flex">
                            <div className="w-6/12">
                                <h6>Live Audience Reaction</h6>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                </div>
                                <p>{86}</p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                </div>
                                <p>{86}</p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                </div>
                                <p>{86}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicSpeaking;
