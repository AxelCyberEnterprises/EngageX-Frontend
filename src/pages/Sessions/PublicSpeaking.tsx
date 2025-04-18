/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleMore, SquareArrowUpRight } from "lucide-react";
import questionImage from "../../assets/images/pngs/question-image.png";
import xpImg from "../../assets/images/pngs/speaking-xp-image.png";
import VoiceAnalytics from "@/components/session/VoiceAnalytics";
import PublicSpeakingTimer from "@/components/session/SessionPageTimer";
import VideoStreamer from "@/components/session/RecordView";
import EngagementMetrics from "@/components/session/EngagementMetrics";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import alert from "../../assets/images/svgs/alert.svg";
import TimerComponent from "@/components/session/TimerComponent";
import { useMediaQuery } from "react-responsive";
import MobileEngagementMetrics from "@/components/session/MobileEngagementMetrics";
import MobileVoiceAnalytics from "@/components/session/MobileVoiceAnalytics";
import { useEffect } from "react";
import { useEndSession } from "@/hooks/sessions";
import VideoPlayer from "@/components/authPageComponents/VideoPlayer";

const PublicSpeaking: React.FC = () => {
    const [stop, setStop] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const [isDialogTwoOpen, setDialogTwoOpen] = useState(false);
    const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(false);
    const time = 5; // in minutes
    const isLargeScreen = useMediaQuery({ minWidth: 1024 }); // Tailwind's lg breakpoint
    const { id } = useParams();
    const [feedback, setFeedback] = useState<any | undefined>(undefined);
    const [sessionId, setSessionId] = useState<string | undefined>();
    const [duration, setDuration] = useState<string | undefined>();
    const socket = useRef<WebSocket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const { mutate: endSession, isPending } = useEndSession(sessionId, duration);
    const [videoUrl, setVideoUrl] = useState(
        "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Curiosity.mp4",
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const [elapsed, setElapsed] = useState(0);

    const stopTimer = (duration?: any) => {
        console.log(duration);
        setDuration(duration);
        setStop(true);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (startTimer) {
            interval = setInterval(() => {
                setElapsed((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [startTimer]);

    useEffect(() => {
        if (elapsed >= 30 && !isExpanded) {
            setIsExpanded(true);
        }
    }, [elapsed]);

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
            try {
                const parsed = JSON.parse(event.data);
                if (parsed.type === "question") {
                    setQuestionDialogOpen(true);
                } else if (parsed.type === "full_analysis_update") {
                    setFeedback(parsed);
                } else if (parsed.type === "window_emotion_update") {
                    console.log(parsed);
                    setVideoUrl(parsed.emotion_s3_url);
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
                        <PublicSpeakingTimer
                            minutes={time}
                            start={startTimer}
                            stop={stop}
                            onStop={(duration) => stopTimer(duration)}
                        />
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

            {/* end session dialog  */}
            <Dialog open={isDialogOneOpen} onOpenChange={setDialogOneOpen}>
                <DialogContent>
                    <DialogHeader>
                        <img src={alert} alt="green image of users" className="w-16 h-16 mb-4" />
                        <DialogTitle className="text-primary-blue text-left">End a session</DialogTitle>
                        <DialogDescription className="text-auro-metal-saurus text-left">
                            You are about to end a session, you will be sent to the session analysis report page and you
                            will no longer be able to continue this session
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 w-full">
                        <Button
                            className="bg-white hover:bg-white/90 border border-gray w-full text-primary-blue"
                            onClick={() => setDialogOneOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button className="bg-jelly-bean hover:bg-jelly-bean/90 w-full" onClick={() => stopTimer()}>
                            End
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* session ended dialog  */}
            <Dialog open={isDialogTwoOpen} onOpenChange={setDialogTwoOpen}>
                <DialogContent>
                    <DialogHeader>
                        <img src={alert} alt="green image of users" className="w-16 h-16 mb-4" />
                        <DialogTitle className="text-primary-blue text-left">Session ended</DialogTitle>
                        {duration && parseInt(duration.split(":")[0], 10) !== time ? (
                            <DialogDescription className="text-auro-metal-saurus text-left">
                                Great job! You completed the session within the allocated time. Kindly proceed by
                                clicking next to view your result.
                            </DialogDescription>
                        ) : (
                            <DialogDescription className="text-auro-metal-saurus text-left">
                                Looks like you ran out of time, kindly proceed by clicking next to view your result.
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <div className="w-full">
                        <Button
                            className="bg-primary-blue hover:bg-primary-blue/90 w-full"
                            isLoading={isPending}
                            onClick={() => endSession()}
                        >
                            Next
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <section className="flex flex-wrap md:flex-row-reverse lg:flex-row">
                {/* left side  */}
                <div className="w-full hidden md:block gap-4 md:w-3/12 lg:w-2/11 md:px-8 lg:pe-0 py-4">
                    <VoiceAnalytics
                        percent1={feedback ? feedback.analysis.Scores["Volume Score"] : 0}
                        percent2={feedback ? feedback.analysis.Feedback.Clarity : 0}
                        percent3={feedback ? feedback.analysis.Scores["Pace Score"] : 0}
                    />

                    <EngagementMetrics
                        percent1={feedback ? feedback.analysis.Feedback.Impact : 0}
                        percent2={feedback ? feedback.analysis.Feedback.Engagement : 0}
                        percent3={feedback ? feedback.analysis.Feedback["Transformative Potential"] : 0}
                    />
                </div>

                {/* middle side  */}
                <div className="w-full md:w-9/12 lg:w-7/11 lg:flex-1 md:px-8 lg:pe-4 py-4">
                    <div className="">
                        <div className="rounded-xl w-full md:h-120 h-80 relative">
                            <h6 className="ps-4 md:ps-0 mb-3">Live Audience</h6>
                            <VideoPlayer
                                height="h-full"
                                width="w-full"
                                src={videoUrl}
                                autoPlay={true}
                                loop={true}
                                showPauseOverlay={false}
                                hideControls={true}
                                border="rounded-2xl"
                                pauseOnClick={false}
                                preload={true}
                            />
                            {!isLargeScreen && (
                                <div
                                    className="py-5 lg:hidden block rounded-xl w-50 h-30 md:w-80 md:h-50 absolute bottom-0 right-3 md:right-10"
                                    style={{
                                        backgroundImage: `url(${xpImg})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div
                                        className={`absolute transition-all duration-500 ${
                                            isExpanded
                                                ? "top-0 left-0 w-full h-full"
                                                : "w-20 h-12 md:w-32 md:h-18 absolute top-1 left-17.5 md:top-3 md:left-27.5"
                                        }`}
                                    >
                                        <VideoStreamer
                                            duration={time}
                                            stop={stop}
                                            onStop={() => setDialogTwoOpen(true)}
                                            onStart={() => setStartTimer(true)}
                                            ws={socket.current}
                                            isWsReady={isSocketConnected}
                                            border={isExpanded ? "rounded-2xl" : ""}
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
                    <div className="right__side w-full hidden lg:block md:w-3/12 lg:w-75 px-8 lg:ps-4 py-4">
                        <div
                            className="py-5 hidden lg:block rounded-xl w-full h-40 relative"
                            style={{
                                backgroundImage: `url(${xpImg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div
                                className={`absolute transition-all duration-500 ${
                                    isExpanded
                                        ? "top-0 left-0 w-full h-full"
                                        : "w-32 h-18 top-3 left-[6.375rem] lg:w-28 lg:h-15 lg:top-2 lg:left-[5.125rem]"
                                }`}
                            >
                                <VideoStreamer
                                    duration={time}
                                    stop={stop}
                                    onStop={() => setDialogTwoOpen(true)}
                                    onStart={() => setStartTimer(true)}
                                    ws={socket.current}
                                    isWsReady={isSocketConnected}
                                    border={isExpanded ? "rounded-2xl" : ""}
                                />
                            </div>
                        </div>

                        <div className="border px-2 py-4 rounded-lg border-bright-gray mt-3">
                            <h6 className="mb-3">Speaker Notes</h6>
                            <p>This is a note</p>
                        </div>
                    </div>
                )}

                {/* right side mobile */}
                <div className="px-4 md:hidden w-full mb-5 ">
                    <div className="border-1 border-bright-gray py-5 px-3 rounded-md">
                        <MobileVoiceAnalytics
                            impact={feedback ? feedback.analysis.Feedback.Impact : 0}
                            engagement={feedback ? feedback.analysis.Feedback.Engagement : 0}
                            transformativePotential={
                                feedback ? feedback.analysis.Feedback["Transformative Potential"] : 0
                            }
                        />

                        <MobileEngagementMetrics
                            impact={feedback ? feedback.analysis.Feedback.Impact : 0}
                            volume={feedback ? feedback.analysis.Scores["Volume Score"] : 0}
                            pace={feedback ? feedback.analysis.Scores["Pace Score"] : 0}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicSpeaking;
