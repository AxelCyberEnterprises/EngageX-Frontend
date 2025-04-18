/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SquareArrowUpRight, MessageCircleMore, ChevronRight } from "lucide-react";
import VideoPlayer from "@/components/authPageComponents/VideoPlayer";
import AudienceEngaged from "@/components/session/AudienceEngaged";
import EngagementMetrics from "@/components/session/VoiceAnalytics";
import CountdownTimer from "@/components/session/CountdownTimer";
import TimerProgressBar from "@/components/session/TimerProgressBar";
import presentationRoom from "../../assets/images/pngs/presentation-practice-room.png";
import VideoStreamer from "@/components/session/RecordView";
import { useParams } from "react-router-dom";
import MobileVoiceAnalytics from "@/components/session/MobileVoiceAnalytics";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import alert from "../../assets/images/svgs/alert.svg";
import questionImage from "../../assets/images/pngs/question-image.png";
import TimerComponent from "@/components/session/TimerComponent";
import ImageSlider, { SlidesPreviewerHandle } from "@/components/session/SlidesPreviewer";
import { useEndSession } from "@/hooks/sessions";
import { pdfToImages } from "@/lib/utils";

const PresentationPractice: React.FC = () => {
    const [stop, setStop] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const [isDialogTwoOpen, setDialogTwoOpen] = useState(false);
    const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(false);
    const time = 15; // in minutes
    const [slides, setSlides] = useState<any[]>([])
    const { id } = useParams();
    const [feedback, setFeedback] = useState<any | undefined>(undefined);
    const [sessionId, setSessionId] = useState<string | undefined>();
    const [duration, setDuration] = useState<string | undefined>();
    const [slideDurations, setSlideDurations] = useState<string[] | undefined>();
    const durationRef = useRef<string | null>(null);
    const slideDurationsRef = useRef<string[] | null>(null);
    const sliderRef = useRef<SlidesPreviewerHandle>(null);
    const socket = useRef<WebSocket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const { mutate: endSession, isPending } = useEndSession(sessionId, duration, slideDurations);
    const [videoUrl, setVideoUrl] = useState(
        "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Curiosity.mp4",
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const [elapsed, setElapsed] = useState(0);

    const stopTimer = (dur?: string, durationArr?: string[]) => {
        if (dur !== undefined) {
            setDuration(dur);
            durationRef.current = dur;
        }

        if (durationArr !== undefined) {
            setSlideDurations(durationArr);
            slideDurationsRef.current = durationArr;
        }

        if (durationRef.current && slideDurationsRef.current) {
            console.log("Duration of session:", durationRef.current);
            console.log("Duration array of session:", slideDurationsRef.current);
            // endSession()
        }
    };

    const triggerNextSlide = () => {
        sliderRef.current?.nextSlide();
    };

    useEffect(() => {
        const base64 = localStorage.getItem("slides");
        if (!base64) return;

        // Fetch the base64 PDF string and turn it into a Blob
        fetch(base64)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], "upload.pdf", { type: "application/pdf" });
                return pdfToImages(file); // Convert PDF to images
            })
            .then((images) => {
                setSlides(images);
                console.log(images);
                
            })
            .catch((err) => {
                console.error("Error converting PDF to images:", err);
            });
    }, []);

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
            console.log("Message received from server:", event.data);
            try {
                const parsed = JSON.parse(event.data);

                if (parsed.type === "question") {
                    setQuestionDialogOpen(true);
                } else if (parsed.type === "full_analysis_update") {
                    console.log(parsed);
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
                        <Button className="bg-jelly-bean hover:bg-jelly-bean/90 w-full" onClick={() => setStop(true)}>
                            End
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
                    <h4 className="mb-4">Q1 Sales Presentation Practice</h4>
                    <div className="mb-3">
                        <TimerProgressBar
                            minutes={time}
                            start={startTimer}
                            stop={stop}
                            onStop={(dur) => {
                                stopTimer(dur, undefined);
                            }}
                        />
                    </div>
                    <p>
                        Slide {sliderRef.current?.slideProgress.current} of {sliderRef.current?.slideProgress.total}
                    </p>
                </div>
            </section>

            <section className="flex flex-wrap">
                {/* left side  */}
                <div className="left__side w-full md:w-9/12 lg:w-9/12 md:px-8 lg:pe-4 py-4">
                    <div className="md:p-5 lg:p-10 border-primary-blue bg-primary-blue rounded-3xl w-full h-80 md:h-140">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden">
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

                            <div className="w-45 h-25 md:w-60 md:h-35 absolute left-5 bottom-5">
                                <ImageSlider
                                    ref={sliderRef}
                                    images={slides}
                                    start={startTimer}
                                    stop={stop}
                                    onStop={(durationArr) => {
                                        stopTimer(undefined, durationArr);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 px-4 md:px-0">
                        <div className="flex items-center justify-between md:justify-start">
                            <p className="ms-3 text-grey">
                                <CountdownTimer minutes={time} />
                            </p>
                        </div>
                    </div>

                    <div className="px-4 md:px-0 flex gap-3">
                        <div className="w-full rounded-xl border-1 border-bright-gray px-3.5 py-3 mt-5">
                            <h6 className="py-2">Speaker Notes</h6>
                            <p className="text-grey">
                                “Our solution leverages cutting-edge AI to transform how businesses handle customer
                                service...”
                            </p>
                        </div>

                        <div className="w-2/3 rounded-xl border-1 border-bright-gray px-3.5 py-3 mt-5 hidden md:inline-block">
                            <div className="flex items-center justify-between">
                                <div className="w-2/3 h-40">
                                    {sliderRef.current?.nextSlideImage ? (
                                        <img
                                            src={sliderRef.current.nextSlideImage}
                                            alt="Next"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                            <div className="w-full h-full bg-bright-gray rounded-lg flex justify-center items-center">
                                                <p>No next slide</p>
                                            </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3 h-full justify-center">
                                    <div className="rounded-md border-1 border-bright-gray py-2 px-4">
                                        {sliderRef.current?.currentSlideTime || "00:00"}
                                    </div>
                                    <small
                                        className="flex text-grey items-center text-xs ms-2 cursor-pointer"
                                        onClick={triggerNextSlide}
                                    >
                                        Next Slide <ChevronRight className="h-4 w-4" />
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-end mt-16 px-4 md:px-0">
                        <Button
                            className="bg-jelly-bean hover:bg-jelly-bean/90 hidden lg:flex"
                            onClick={() => setDialogOneOpen(true)}
                        >
                            <SquareArrowUpRight className="me-1" /> End Session
                        </Button>
                    </div>
                </div>

                {/* right side large screens  */}
                <div className="right__side hidden md:block w-full md:w-3/12 lg:w-3/12 px-8 lg:ps-4 py-4">
                    <div className="py-5 px-3 border-1 border-bright-gray rounded-xl">
                        <h6 className="mb-3">Live Audience</h6>
                        <div
                            className="rounded-xl w-full h-40 relative"
                            style={{
                                backgroundImage: `url(${presentationRoom})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div
                                className={`absolute transition-all duration-500 ${
                                    isExpanded
                                        ? "top-0 left-0 w-full h-full"
                                        : "w-40 h-23.5 md:w-20 md:h-12 lg:w-20 lg:h-12 absolute top-14.5 right-53 md:top-8 md:right-19.5 lg:top-8 lg:right-21.5"
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
                    </div>

                    <AudienceEngaged percent={86} />

                    <EngagementMetrics
                        percent1={feedback ? feedback.analysis.Scores["Volume Score"] : 0}
                        percent2={feedback ? feedback.analysis.Feedback.Clarity : 0}
                        percent3={feedback ? feedback.analysis.Scores["Pace Score"] : 0}
                    />

                    <div className="py-5 px-3 border-1 border-bright-gray rounded-xl mt-3">
                        <h6 className="mb-4">Quick Tips</h6>
                        <ul className="text-grey list-disc">
                            <li className="mb-2">Great eye contact with audience</li>
                            <li>Consider slowing down your speech rate</li>
                        </ul>
                    </div>
                </div>

                {/* right side mobile */}
                <div className="p-4 md:hidden w-full">
                    <div className="border-1 border-bright-gray py-5 px-3 rounded-md">
                        <MobileVoiceAnalytics
                            impact={feedback ? feedback.analysis.Scores["Volume Score"] : 0}
                            engagement={feedback ? feedback.analysis.Feedback.Clarity : 0}
                            transformativePotential={feedback ? feedback.analysis.Scores["Pace Score"] : 0}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PresentationPractice;
