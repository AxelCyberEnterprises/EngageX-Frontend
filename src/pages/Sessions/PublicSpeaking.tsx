import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquareArrowUpRight, ThumbsUp } from "lucide-react";
import audience from "../../assets/images/pngs/audience.png";
import VoiceAnalytics from "@/components/session/VoiceAnalytics";
import PublicSpeakingTimer from "@/components/session/PublicSpeakingTimer";
import VideoStreamer from "@/components/session/RecordView";
import EngagementMetrics from "@/components/session/EngagementMetrics";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import alert from "../../assets/images/svgs/alert.svg";

const PublicSpeaking: React.FC = () => {
    const [stop, setStop] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const [isDialogTwoOpen, setDialogTwoOpen] = useState(false);
    // const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(false);
    const navigate = useNavigate();

    const StopStreaming = () => {
        setStop(true);
        navigate("/dashboard/user/session-history/1");
    };

    return (
        <div className="text-primary-blue">
            <section className="flex flex-wrap border-b-1 border-bright-gray px-8 py-4 justify-between items-center">
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <h4 className="mb-0 md:mb-4">Public Speaking Session</h4>

                        <Button
                            className="bg-jelly-bean hover:bg-jelly-bean/90 flex my-4 md:hidden"
                            onClick={() => setDialogOneOpen(true)}
                        >
                            <SquareArrowUpRight className="me-1" /> End Session
                        </Button>
                    </div>
                    <div className="mb-3">
                        <PublicSpeakingTimer minutes={2} start={startTimer} />
                    </div>
                </div>
            </section>

            <section className="flex flex-wrap md:flex-row-reverse lg:flex-row">
                {/* left side  */}
                <div className="w-full hidden md:block gap-4 md:w-3/12 md:px-8 lg:pe-4 py-4">
                    <VoiceAnalytics percent1={72} percent2={62} percent3={85} />

                    <EngagementMetrics percent1={32} percent2={42} percent3={35} />
                </div>

                {/* middle side  */}
                <div className="w-full md:w-9/12 lg:w-6/12 md:px-8 lg:pe-4 py-4 px-4">
                    <div className="">
                        <div className="rounded-xl w-full h-120">
                            <h6 className="mb-3">Live Audience</h6>
                            <img src={audience} alt="audience" className="w-full h-full object-cover rounded-xl" />
                        </div>

                        <div className="w-full flex justify-end mt-16 px-4 md:px-0">
                            <Button
                                className="bg-jelly-bean hover:bg-jelly-bean/90 hidden md:flex"
                                onClick={() => setDialogOneOpen(true)}
                            >
                                <SquareArrowUpRight className="me-1" /> End Session
                            </Button>
                            <Dialog open={isDialogOneOpen} onOpenChange={setDialogOneOpen}>
                                <DialogContent>
                                    <DialogHeader>
                                        <img src={alert} alt="green image of users" className="w-16 h-16 mb-4" />
                                        <DialogTitle className="text-primary-blue text-left">End a session</DialogTitle>
                                        <DialogDescription className="text-auro-metal-saurus text-left">
                                            You are about to End a Session, you will be sent to the Session Analysis
                                            Report page and you will no longer be able to continue this session
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex gap-2 w-full">
                                        <Button
                                            className="bg-white hover:bg-white/90 border border-gray w-full text-primary-blue"
                                            onClick={() => setDialogOneOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="bg-jelly-bean hover:bg-jelly-bean/90 w-full"
                                            onClick={() => StopStreaming()}
                                        >
                                            End
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>

                {/* right side large screens  */}
                <div className="right__side w-full hidden lg:block md:w-3/12 lg:w-3/12 px-8 lg:ps-4 py-4">
                    <div className="py-5 px-3 hidden md:block border-1 border-bright-gray rounded-xl">
                        <VideoStreamer
                            duration={2}
                            stop={stop}
                            onStop={() => setDialogTwoOpen(true)}
                            onStart={() => setStartTimer(true)}
                        />
                    </div>

                    <div className="border px-2 py-4 rounded-lg border-bright-gray mt-3">
                        <h6 className="mb-3">Speaker Notes</h6>
                        <p>This is a note</p>
                    </div>
                </div>
                <Dialog open={isDialogTwoOpen} onOpenChange={setDialogTwoOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <img src={alert} alt="green image of users" className="w-16 h-16 mb-4" />
                            <DialogTitle className="text-primary-blue text-left">Session ended</DialogTitle>
                            <DialogDescription className="text-auro-metal-saurus text-left">
                                Looks like you ran out of time, kindly proceed by clicking next to view your result
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full">
                            <Button
                                className="bg-primary-blue hover:bg-primary-blue/90 w-full"
                                onClick={() => StopStreaming()}
                            >
                                Next
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* right side mobile */}
                <div className="px-4 md:hidden w-full mb-5 ">
                    <div className="border-1 border-gray py-5 px-3 rounded-md">
                        <div className="row flex">
                            <div className="w-6/12">
                                <h6>Voice Analytics</h6>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-bright-gray rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-primary-blue" />
                                    </div>
                                </div>
                                <p>{86}</p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-bright-gray rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-primary-blue" />
                                    </div>
                                </div>
                                <p>{86}</p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-bright-gray rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-primary-blue" />
                                    </div>
                                </div>
                                <p>{86}</p>
                            </div>
                        </div>
                        <div className="row flex mt-3">
                            <div className="w-6/12">
                                <h6>Engagement Metrics</h6>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-bright-gray rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-primary-blue" />
                                    </div>
                                </div>
                                <p>{86}</p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-bright-gray rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-primary-blue" />
                                    </div>
                                </div>
                                <p>{86}</p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-bright-gray rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-primary-blue" />
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
