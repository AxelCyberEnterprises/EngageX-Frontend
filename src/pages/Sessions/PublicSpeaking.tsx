/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleMore, SquareArrowUpRight } from "lucide-react";
import audience from "../../assets/images/pngs/audience.png";
import questionImage from "../../assets/images/pngs/question-image.png";
import xpImg from "../../assets/images/pngs/speaking-xp-image.png";
import VoiceAnalytics from "@/components/session/VoiceAnalytics";
import PublicSpeakingTimer from "@/components/session/SessionPageTimer";
import VideoStreamer from "@/components/session/RecordView";
import EngagementMetrics from "@/components/session/EngagementMetrics";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import alert from "../../assets/images/svgs/alert.svg";
import TimerComponent from "@/components/session/TimerComponent";
import { useMediaQuery } from "react-responsive";
import MobileEngagementMetrics from "@/components/session/MobileEngagementMetrics";
import MobileVoiceAnalytics from "@/components/session/MobileVoiceAnalytics";
import { useEffect } from "react";

const PublicSpeaking: React.FC = () => {
    const [stop, setStop] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const [isDialogTwoOpen, setDialogTwoOpen] = useState(false);
    const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(false);
    const navigate = useNavigate();
    const time = 10; // in minutes
    const isLargeScreen = useMediaQuery({ minWidth: 1024 }); // Tailwind's lg breakpoint

    const StopStreaming = () => {
        setStop(true);
        navigate("/dashboard/user/session-history/1");
    };
    const { id } = useParams();
    const [feedback, setFeedback] = useState<any | undefined>(undefined);
    const [sessionId, setSessionId] = useState<string | undefined>();
    const socket = useRef<WebSocket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    useEffect(() => {
        if (id) {
            setSessionId(id);
        }
    }, [id]);

    useEffect(() => {
        if (!sessionId) return;

        const ws = new WebSocket(`wss://api.engagexai.io/ws/socket_server/?session_id=${sessionId}`);
        socket.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connection established");
            setIsSocketConnected(true);
        };

        ws.onmessage = (event) => {
            console.log("Message received from server:", event.data);
            try {
                const parsed = JSON.parse(event.data);
                console.log("Parsed message:", parsed);

                if (parsed.type === "question") {
                    setQuestionDialogOpen(true);
                } else if (parsed.type === "realtime_feedback") {
                    setFeedback(parsed);
                }
            } catch (e) {
                console.error("Invalid JSON from server:", e);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setIsSocketConnected(false);
        };

        return () => {
            ws.close();
        };
    }, [sessionId]);

    return (
        <div className="text-primary-blue">
            <section className="flex flex-wrap border-b-1 border-bright-gray px-8 py-4 justify-between items-center">
                <div className="w-full">
                    <Button
                        className="bg-jelly-bean hover:bg-jelly-bean/90 flex mt-2 md:hidden"
                        onClick={() => setDialogOneOpen(true)}
                    >
                        <SquareArrowUpRight className="me-1" /> End Session
                    </Button>
                    {/* <div className="flex justify-between items-center mb-4">
                        <h4 className="mb-0 md:mb-4">Public Speaking Session</h4>
                    </div> */}
                    <div className="inline-block py-2 px-4 md:hidden bg-ghost-white border border-bright-gray rounded-3xl w-auto relative top-7">
                        <p>CC Key Point 2</p>
                    </div>
                    <div className="mb-3">
                        <PublicSpeakingTimer minutes={time} start={startTimer} />
                    </div>
                </div>
            </section>

            {/* question dialog  */}
            <Dialog open={isQuestionDialogOpen} onOpenChange={setQuestionDialogOpen}>
                <DialogContent className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="rounded-full w-16 h-16 bg-bright-gray flex items-center justify-center">
                            <MessageCircleMore className="text-primary-blue" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <DialogTitle className="text-primary-blue/70 font-normal text-2xl">
                                Question from Elizabeth Wang
                            </DialogTitle>
                            <DialogDescription className="text-primary-blue big">
                                How does your proposal address potential scalability challenges?
                            </DialogDescription>

                            <div className="flex justify-end gap-3">
                                <Button
                                    className="bg-transparent hover:bg-bright-gray text-independence py-6"
                                    onClick={() => setQuestionDialogOpen(false)}
                                >
                                    Skip
                                </Button>
                                <Button
                                    className="bg-primary-blue hover:bg-primary-blue/80 py-6"
                                    onClick={() => setQuestionDialogOpen(false)}
                                >
                                    Answer Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    <TimerComponent minutes={time} start={startTimer} />

                    <img
                        src={questionImage}
                        alt="woman in blue giving a presentation"
                        className="rounded-lg w-full object-cover h-60"
                    />
                </DialogContent>
            </Dialog>

            <section className="flex flex-wrap md:flex-row-reverse lg:flex-row">
                {/* left side  */}
                <div className="w-full hidden md:block gap-4 md:w-3/12 md:px-8 lg:pe-4 py-4">
                    <VoiceAnalytics
                        percent1={feedback ? feedback.volume : 0}
                        percent2={feedback ? feedback.clarity : 0}
                        percent3={feedback ? feedback.pace : 0}
                    />

                    <EngagementMetrics
                        percent1={feedback ? feedback.impact : 0}
                        percent2={feedback ? feedback.engagement : 0}
                        percent3={feedback ? feedback.transformative_potential : 0}
                    />
                </div>

                {/* middle side  */}
                <div className="w-full md:w-9/12 lg:w-6/12 md:px-8 lg:pe-4 py-4">
                    <div className="">
                        <div className="rounded-xl w-full h-120 relative">
                            <h6 className="ps-4 md:ps-0 mb-3">Live Audience</h6>
                            <img src={audience} alt="audience" className="w-full h-full object-cover rounded-xl" />
                            {!isLargeScreen && (
                                <div
                                    className="py-5 lg:hidden block rounded-xl w-50 h-30 md:w-80 md:h-50 absolute bottom-0 right-3 md:right-10"
                                    style={{
                                        backgroundImage: `url(${xpImg})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="w-20 h-12 md:w-32 md:h-18 absolute top-1 left-17.5 md:top-3 md:left-27.5">
                                        <VideoStreamer
                                            duration={time}
                                            stop={stop}
                                            onStop={() => setDialogTwoOpen(true)}
                                            onStart={() => setStartTimer(true)}
                                            ws={socket.current}
                                            isWsReady={isSocketConnected}
                                        />
                                    </div>
                                </div>
                            )}
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

                        {/* tablet and mobile notes  */}
                        <div className="border px-2 py-4 rounded-lg border-bright-gray mx-4 md:mx-0 md:mt-5 lg:hidden">
                            <h6 className="mb-3">Speaker Notes</h6>
                            <p>This is a note</p>
                        </div>
                    </div>
                </div>

                {/* right side large screens  */}
                {isLargeScreen && (
                    <div className="right__side w-full hidden lg:block md:w-3/12 lg:w-3/12 px-8 lg:ps-4 py-4">
                        <div
                            className="py-5 hidden lg:block rounded-xl w-full h-50 relative"
                            style={{
                                backgroundImage: `url(${xpImg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="w-32 h-18 absolute top-3 left-25.5">
                                <VideoStreamer
                                    duration={time}
                                    stop={stop}
                                    onStop={() => setDialogTwoOpen(true)}
                                    onStart={() => setStartTimer(true)}
                                    ws={socket.current}
                                    isWsReady={isSocketConnected}
                                />
                            </div>
                        </div>

                        <div className="border px-2 py-4 rounded-lg border-bright-gray mt-3">
                            <h6 className="mb-3">Speaker Notes</h6>
                            <p>This is a note</p>
                        </div>
                    </div>
                )}
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
                    <div className="border-1 border-bright-gray py-5 px-3 rounded-md">
                        <MobileVoiceAnalytics
                            impact={feedback ? feedback.curiosity : 0}
                            engagement={feedback ? feedback.engagement : 0}
                            transformativePotential={feedback ? feedback.transformative_potential : 0}
                        />

                        <MobileEngagementMetrics
                            impact={feedback ? feedback.impact : 0}
                            volume={feedback ? feedback.volume : 0}
                            pace={feedback ? feedback.pace : 0}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicSpeaking;
