/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SquareArrowUpRight, Volume2, MessageCircleMore } from "lucide-react";
import audience from "../../assets/images/pngs/audience.png";
import AudienceEngaged from "@/components/session/AudienceEngaged";
import EngagementMetrics from "@/components/session/VoiceAnalytics";
import CountdownTimer from "@/components/session/CountdownTimer";
import TimerProgressBar from "@/components/session/TimerProgressBar";
import pitchRoom from "../../assets/images/pngs/pitch-presentation-room.png";
import VideoStreamer from "@/components/session/RecordView";
import { useNavigate, useParams } from "react-router-dom";
import MobileVoiceAnalytics from "@/components/session/MobileVoiceAnalytics";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import alert from "../../assets/images/svgs/alert.svg";
import questionImage from "../../assets/images/pngs/question-image.png";
import TimerComponent from "@/components/session/TimerComponent";

const PitchPractice: React.FC = () => {
    const [stop, setStop] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const [isDialogTwoOpen, setDialogTwoOpen] = useState(false);
    const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(true);
    const navigate = useNavigate();
    const time = 10; // in minutes

    const StopStreaming = () => {
        setStop(true);
        navigate("/dashboard/user/session-history/1");
    };
    
    const { id } = useParams();
    const [feedback, setFeedback] = useState<any | undefined>(undefined);
    const [sessionId, setSessionId] = useState<string | undefined>();
    const socket = useRef<WebSocket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    console.log(feedback);
    

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

            {/* time over dialog  */}
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

            <section className="flex flex-wrap border-b-1 border-bright-gray px-8 py-4 justify-between items-center">
                <div className="w-full">
                    <Button
                        className="bg-jelly-bean hover:bg-jelly-bean/90 flex lg:hidden mb-4"
                        onClick={() => setDialogOneOpen(true)}
                    >
                        <SquareArrowUpRight className="me-1" /> End Session
                    </Button>
                    <h4 className="mb-4">Pitch Practice Session</h4>
                    <div className="mb-3">
                        <TimerProgressBar minutes={time} />
                    </div>
                    <small className="text-grey">Slide 1 of 10</small>
                </div>
            </section>

            <section className="flex flex-wrap">
                {/* left side  */}
                <div className="left__side w-full md:w-9/12 lg:w-9/12 md:px-8 lg:pe-4 py-4">
                    <div className="md:p-5 lg:p-10 border-primary-blue bg-primary-blue rounded-3xl w-full h-80 md:h-140">
                        <div
                            className="py-5 rounded-xl w-full h-full relative"
                            style={{
                                backgroundImage: `url(${pitchRoom})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="w-17.5 h-10.5 md:w-36 md:h-20.5 lg:w-35 lg:h-20 absolute top-34.5 right-35.5 md:top-53.5 md:right-84 lg:top-49 lg:right-82.5">
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
                    </div>

                    <div className="mt-3 px-4 md:px-0">
                        <div className="flex items-center justify-between md:justify-start">
                            <div className="flex items-center">
                                <Volume2 />
                                <p className="ms-2">Audio Settings</p>
                            </div>
                            <p className="ms-3 text-grey">
                                <CountdownTimer minutes={time} />
                            </p>
                        </div>
                    </div>

                    <div className=" px-4 md:px-0">
                        <div className="w-full rounded-xl border-1 border-bright-gray px-3.5 py-3 mt-5">
                            <h6 className="py-2">Speaker Notes</h6>
                            <p className="text-grey">
                                “Our solution leverages cutting-edge AI to transform how businesses handle customer
                                service...”
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex justify-end mt-16 px-4 md:px-0">
                        <Button
                            className="bg-jelly-bean hover:bg-jelly-bean/90 hidden lg:flex"
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
                                        You are about to End a Session, you will be sent to the Session Analysis Report
                                        page and you will no longer be able to continue this session
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

                {/* right side large screens  */}
                <div className="right__side hidden md:block w-full md:w-3/12 lg:w-3/12 px-8 lg:ps-4 py-4">
                    <div className="py-5 px-3 border-1 border-bright-gray rounded-xl">
                        <h6 className="mb-3">Live Audience</h6>
                        <img src={audience} alt="audience" />
                    </div>

                    <AudienceEngaged percent={86} />

                    <EngagementMetrics percent1={72} percent2={62} percent3={85} />

                    <div className="py-5 px-3 border-1 border-bright-gray rounded-xl mt-3">
                        <h6 className="mb-4">Realtime Feedback</h6>
                        <ul className="text-grey list-disc">
                            <li className="mb-2">Great eye contact with audience</li>
                            <li>Consider slowing down your speech rate</li>
                        </ul>
                    </div>
                </div>

                {/* right side mobile */}
                <div className="p-4 md:hidden w-full">
                    <div className="border-1 border-bright-gray py-5 px-3 rounded-md">
                        <MobileVoiceAnalytics impact={70} engagement={60} transformativePotential={80} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PitchPractice;
