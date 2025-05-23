/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import VideoPlayer from "@/components/session/VideoPlayer";
import AudienceEngaged from "@/components/session/AudienceEngaged";
import MobileVoiceAnalytics from "@/components/session/MobileVoiceAnalytics";
import VideoStreamer from "@/components/session/RecordView";
import ImageSlider, { SlidesPreviewerHandle } from "@/components/session/SlidesPreviewer";
import TimerComponent from "@/components/session/TimerComponent";
import TimerProgressBar from "@/components/session/TimerProgressBar";
import EngagementMetrics from "@/components/session/VoiceAnalytics";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useEndSession, useGetSessionData } from "@/hooks/sessions";
import { pdfToImages } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MessageCircleMore, SquareArrowUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import boardRoom2 from "../../assets/images/pngs/boardroom-2.png";
import boardRoom1 from "../../assets/images/pngs/presentation-practice-room.png";
import alert from "../../assets/images/svgs/alert.svg";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

const PresentationPractice: React.FC = () => {
    const [startTimer, setStartTimer] = useState(false);
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const [isDialogTwoOpen, setDialogTwoOpen] = useState(false);
    const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(false);
    const time = 15; // in minutes
    const isMediumScreen = useMediaQuery({ minWidth: 768 }); // Tailwind's md breakpoint
    const [slides, setSlides] = useState<any[]>([]);
    const { id } = useParams();
    const [feedback, setFeedback] = useState<any | undefined>(undefined);
    const [sessionId, setSessionId] = useState<string | undefined>();
    const selectedRoom = useRef<string | undefined>(undefined);
    const [sessionData, setSessionData] = useState<any | undefined>(undefined);
    const [isMuted, setIsMuted] = useState(true);
    const [duration, setDuration] = useState<string | undefined>();
    const [slideDurations, setSlideDurations] = useState<string[] | undefined>();
    const durationRef = useRef<string | null>(null);
    const slideDurationsRef = useRef<string[] | null>(null);
    const sliderRef = useRef<SlidesPreviewerHandle>(null);
    const socket = useRef<WebSocket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const { mutate: endSession, isPending } = useEndSession(sessionId, duration, slideDurations);
    const [videoUrl, setVideoUrl] = useState(
        sessionData?.virtual_environment === "board_room_1"
            ? "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/board_room_1/thinking/1.mp4"
            : "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/board_room_2/thinking/1.mp4",
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [seshData, setSeshData] = useState<any>();
    const [allowSwitch, setAllowSwitch] = useState<boolean>(true);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const [questionImg, setQuestionImg] = useState<string>(
        `/assets/sessions/${selectedRoom.current}/bm_handraise.jpeg`,
    );
    const location = useLocation();

    const end = () => {
        setStopTime(true);

        if (activeQuestion < questionsRef.current.length - 1) {
            setDialogOneOpen(false);
            setQuestionDialogOpen(true);
        } else {
            setStopStreamer(true);
        }
    };

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
        }
    };

    const closeAndShowClapVideo = () => {
        if (activeQuestion < questionsRef.current.length - 1) {
            setDialogOneOpen(false);
            setQuestionDialogOpen(true);
        } else {
            setSlides([]);
            setSeshData(undefined);
            setStopStreamer(true);
            setAllowSwitch(false);
            setDialogOneOpen(false);
            setIsMuted(false);
            setVideoUrl(
                selectedRoom.current === "board_room_1"
                    ? "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Boardroom1Clap.mp4"
                    : "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Boardroom2Clap.mp4",
            );
            setTimeout(() => {
                setDialogTwoOpen(true);
            }, 7000);
        }
    };

    const triggerNextSlide = () => {
        sliderRef.current?.nextSlide();
    };

    const triggerPrevSlide = () => {
        sliderRef.current?.previousSlide();
    };

    const questionsRef = useRef<any>([]);
    const [stopTime, setStopTime] = useState(false);
    const [stopStreamer, setStopStreamer] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState<any | undefined>(0);
    const questionTimerRef = useRef<number>(0.5);
    const [startQuestionTimer, setStartQuestionTimer] = useState(false);
    const question = questionsRef.current[activeQuestion]?.question;

    const answerQuestion = () => {
        setStartQuestionTimer(true);
        if (socket.current) {
            socket.current.send(JSON.stringify(question));
        }
    };

    const nextQuestion = () => {
        // Use a functional update to get the new value
        setActiveQuestion((prev: number) => {
            const nQuestions = questionsRef.current.length;
            const localSeshData = localStorage.getItem("sessionData");
            const parsedData = localSeshData ? JSON.parse(localSeshData) : null;
            setStartQuestionTimer(false);

            if (prev < nQuestions - 1) {
                const randomImg =
                    Math.random() < 0.5
                        ? `/assets/sessions/${parsedData.virtual_environment}_bm_handraise.jpeg`
                        : `/assets/sessions/${parsedData.virtual_environment}_bw_handraise.jpeg`;
                setQuestionImg(randomImg);
                setQuestionDialogOpen(true);
                return prev + 1;
            } else {
                // Last question, finish up
                setQuestionDialogOpen(false);
                setStopStreamer(true);
                setAllowSwitch(false);
                setDialogOneOpen(false);
                setIsMuted(false);
                setVideoUrl(
                    selectedRoom.current === "board_room_1"
                        ? "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Boardroom1Clap.mp4"
                        : "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Boardroom2Clap.mp4",
                );
                setTimeout(() => {
                    setDialogTwoOpen(true);
                }, 7000);
                return prev; // no increment, or return to 0 if you want
            }
        });
    };

    const { data }: { data?: any } = useGetSessionData(sessionId);

    useEffect(() => {
        if (data) {
            setSeshData(data);
        }
    }, [data]);

    useEffect(() => {
        const url = seshData?.slides_file;
        const localSeshData = localStorage.getItem("sessionData");
        const parsedData = localSeshData ? JSON.parse(localSeshData) : null;
        console.log(parsedData.virtual_environment);
        setQuestionImg(`/assets/sessions/${parsedData.virtual_environment}_bm_handraise.jpeg`);

        setSessionData(parsedData);
        selectedRoom.current = parsedData?.virtual_environment;
        if (!url) return;

        pdfToImages(url)
            .then((images) => {
                setSlides(images);
            })
            .catch((err) => {
                console.error("Error converting PDF to images:", err);
            });
    }, [seshData]);

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
        const firstSegment = location.pathname.split("/").filter(Boolean)[0];
        if (firstSegment !== "sessions") {
            return;
        }

        const ws = new WebSocket(
            `wss://api-stream.engagexai.io/ws/socket_server/?session_id=${sessionId}&room_name=${selectedRoom.current}`,
        );
        socket.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connection established");
            setIsSocketConnected(true);
        };

        ws.onmessage = (event) => {
            console.log("Message received from server:", event.data);
            try {
                const parsed = JSON.parse(event.data);

                if (parsed.type === "audience_question") {
                    if (questionsRef.current.length < 4) {
                        questionsRef.current.push(parsed);
                    }
                    console.log("number of questions", questionsRef.current.length);
                    console.log("questions", questionsRef.current);
                } else if (parsed.type === "full_analysis_update") {
                    console.log(parsed);
                    if (!parsed.analysis?.error) {
                        setFeedback(parsed); // ✅ only update when there's no error
                    } else {
                        console.warn("WS: Skipping feedback update due to analysis error:", parsed.analysis.error);
                    }
                } else if (parsed.type === "window_emotion_update") {
                    console.log(parsed);
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

        if (stopStreamer) {
            console.log("Closing WebSocket because stop is true");
            ws.close();
        }

        return () => {
            ws.close();
        };
    }, [sessionId, stopStreamer, location.pathname]);

    useEffect(() => {
        let isMounted = true;
        const firstSegment = location.pathname.split("/").filter(Boolean)[0];
        if (firstSegment !== "sessions") {
            return;
        }

        const connectToRealtime = async () => {
            try {
                // Get ephemeral token
                const tokenRes = await axios.get("https://api.engagexai.io/sessions/api/openai/realtime-token/");
                const EPHEMERAL_KEY = tokenRes.data.client_secret.value;

                if (!isMounted) return;

                // Create peer connection
                const pc = new RTCPeerConnection();
                pcRef.current = pc;

                // Get mic input
                const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStreamRef.current = mediaStream;

                const [audioTrack] = mediaStream.getAudioTracks();
                if ((pc.signalingState as string) === "closed") return;
                pc.addTrack(audioTrack);

                // Listen for text events
                const dc = pc.createDataChannel("oai-events");
                dc.addEventListener("message", (event) => {
                    try {
                        const parsed = JSON.parse(event.data);
                        if (parsed.text) {
                            console.log(parsed.text);
                            const validEmotions = [
                                "thinking",
                                "empathy",
                                "excitement",
                                "laughter",
                                "surprise",
                                "interested",
                            ];
                            if (validEmotions.includes(parsed.text) && allowSwitch) {
                                const random = Math.floor(Math.random() * 5) + 1;
                                const newUrl = `https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/${selectedRoom.current}/${parsed.text}/${random}.mp4`;
                                console.log("videoUrl", newUrl);
                                setVideoUrl(newUrl);
                            }
                        }
                    } catch (err) {
                        console.warn("Invalid message:", event.data, err);
                    }
                });

                // Offer/Answer SDP exchange
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);

                const sdpRes = await axios.post(
                    "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview",
                    offer.sdp,
                    {
                        headers: {
                            Authorization: `Bearer ${EPHEMERAL_KEY}`,
                            "Content-Type": "application/sdp",
                        },
                    },
                );

                const answer: RTCSessionDescriptionInit = {
                    type: "answer",
                    sdp: sdpRes.data as string,
                };

                if (isMounted && (pc.signalingState as string) !== "closed") {
                    await pc.setRemoteDescription(answer);
                }
            } catch (error) {
                console.error("Error setting up real-time transcription:", error);
            }
        };

        if (!stopStreamer && !stopTime) {
            connectToRealtime();
        }

        return () => {
            isMounted = false;

            console.log("Cleaning up WebRTC and media stream...");

            if (pcRef.current) {
                try {
                    pcRef.current.close();
                } catch (err) {
                    console.log("Error closing peer connection:", err);
                }
                pcRef.current = null;
            }

            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((track) => track.stop());
                mediaStreamRef.current = null;
            }
        };
    }, [setVideoUrl, allowSwitch, stopStreamer, stopTime, location.pathname]);

    return (
        <div className="text-primary-blue">
            {/* question dialog  */}
            <Dialog
                open={isQuestionDialogOpen}
                onOpenChange={activeQuestion > questionsRef.current.length - 1 ? setQuestionDialogOpen : () => {}}
            >
                <DialogContent className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="rounded-full w-16 h-16 bg-bright-gray flex items-center justify-center">
                            <MessageCircleMore className="text-primary-blue" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <DialogTitle className="text-primary-blue/70 font-normal text-2xl">Question</DialogTitle>
                            <DialogDescription className="text-primary-blue big">{question}</DialogDescription>

                            <div className="flex justify-end gap-3">
                                <Button
                                    className="bg-transparent hover:bg-bright-gray text-independence py-6"
                                    onClick={() => nextQuestion()}
                                >
                                    {activeQuestion >= questionsRef.current.length - 1
                                        ? "Finish"
                                        : startQuestionTimer
                                          ? "Next Question"
                                          : "Skip"}
                                </Button>
                                <Button
                                    className="bg-primary-blue hover:bg-primary-blue/80 py-6"
                                    onClick={() => answerQuestion()}
                                    disabled={startQuestionTimer}
                                >
                                    Answer Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    <TimerComponent
                        minutes={questionTimerRef.current}
                        start={startQuestionTimer}
                        onStop={() => nextQuestion()}
                    />

                    <img
                        src={questionImg}
                        alt="woman in blue giving a presentation"
                        className="rounded-lg w-full object-cover h-60"
                    />
                </DialogContent>
            </Dialog>

            {/* time over dialog  */}
            <Dialog open={isDialogTwoOpen}>
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
                        <Button className="bg-jelly-bean hover:bg-jelly-bean/90 w-full" onClick={() => end()}>
                            End
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <section className="flex flex-wrap border-b-1 border-bright-gray px-8 py-4 justify-between items-center">
                <div className="w-full">
                    {startTimer && !stopTime && (
                        <Button
                            className="bg-jelly-bean hover:bg-jelly-bean/90 flex lg:hidden mb-4"
                            onClick={() => setDialogOneOpen(true)}
                        >
                            <SquareArrowUpRight className="me-1" /> End Session
                        </Button>
                    )}
                    <div className="flex justify-between items-center">
                        <h4 className="mb-4">{sessionData?.session_name}</h4>
                        <p className="hidden md:block">
                            Record a minimum of 10 minutes for the best feedback and audience reaction.
                        </p>
                    </div>
                    <div className="mb-3">
                        <TimerProgressBar
                            minutes={time}
                            start={startTimer}
                            stop={stopTime}
                            onStop={(dur) => {
                                stopTimer(dur, undefined);
                            }}
                        />
                    </div>
                    {slides.length > 0 ? (
                        <p>
                            Slide {sliderRef.current?.slideProgress.current} of {sliderRef.current?.slideProgress.total}
                        </p>
                    ) : (
                        <p>No Slides uploaded</p>
                    )}
                </div>
            </section>

            <section className="flex flex-wrap">
                {/* left side  */}
                <div className="left__side w-full md:w-9/12 lg:w-9/12 md:px-8 lg:pe-4 py-4">
                    <div className="md:p-5 lg:p-10 border-primary-blue bg-primary-blue rounded-3xl w-full h-80 md:h-140 relative">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden">
                            <VideoPlayer
                                src={videoUrl}
                                autoplay={true}
                                loop={true}
                                isMuted={isMuted}
                                className="h-full w-full rounded-2xl"
                            />
                        </div>

                        <div className="absolute left-0 bottom-0 z-5">
                            <div className="w-52 h-30 md:w-60 md:h-35">
                                {!slides.length && seshData?.slides_file ? (
                                    <Skeleton className="w-full h-full bg-gray" />
                                ) : (
                                    <ImageSlider
                                        ref={sliderRef}
                                        images={slides}
                                        start={startTimer}
                                        stop={stopTime}
                                        onStop={(durationArr) => {
                                            stopTimer(undefined, durationArr);
                                        }}
                                    />
                                )}
                            </div>
                            {slides.length > 1 && (
                                <div className="mt-3 px-4 md:px-0">
                                    <div className="flex gap-4 items-center justify-between md:justify-start">
                                        <Button
                                            className="flex text-grey items-center text-xs border border-primary-blue cursor-pointer bg-white hover:bg-bright-gray"
                                            onClick={triggerPrevSlide}
                                        >
                                            <ChevronLeft className="h-4 w-4" />{" "}
                                            <span className="hidden md:inline-block">Previous Slide</span>
                                        </Button>
                                        <Button
                                            className="flex text-grey items-center text-xs border border-primary-blue cursor-pointer bg-white hover:bg-bright-gray"
                                            onClick={triggerNextSlide}
                                        >
                                            <span className="hidden md:inline-block">Next Slide</span>{" "}
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isMediumScreen && (
                            <div
                                className="rounded-xl w-45 h-25 absolute bottom-0 right-0 z-10"
                                style={{
                                    backgroundImage: `url(${sessionData?.virtual_environment === "board_room_1" ? boardRoom1 : boardRoom2})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div
                                    className={`absolute transition-all duration-500 ${
                                        isExpanded
                                            ? "top-0 left-0 w-full h-full"
                                            : sessionData?.virtual_environment === "board_room_1"
                                              ? "w-15 h-8 absolute top-5 right-12.5"
                                              : "w-15 h-8 absolute top-7 right-15"
                                    }`}
                                >
                                    <VideoStreamer
                                        duration={time}
                                        stop={stopStreamer}
                                        onStop={() => closeAndShowClapVideo()}
                                        onStart={() => setStartTimer(true)}
                                        ws={socket.current}
                                        isWsReady={isSocketConnected}
                                        border={isExpanded ? "rounded-2xl" : ""}
                                        sessionId={sessionId}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-4 md:px-0 flex gap-3">
                        <div className="w-full rounded-xl border-1 border-bright-gray px-3.5 py-3 mt-5">
                            <h6 className="py-2">Speaker Notes</h6>
                            <p className="text-grey">{sessionData?.notes ? sessionData?.notes : "No note added"}</p>
                        </div>

                        {/* {slides.length > 1 && (
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
                                            onClick={triggerPrevSlide}
                                        >
                                            <ChevronLeft className="h-4 w-4" /> Previous Slide
                                        </small>
                                        <small
                                            className="flex text-grey items-center text-xs ms-2 cursor-pointer"
                                            onClick={triggerNextSlide}
                                        >
                                            Next Slide <ChevronRight className="h-4 w-4" />
                                        </small>
                                    </div>
                                </div>
                            </div>
                        )} */}
                    </div>

                    <div className="w-full flex justify-end mt-16 px-4 md:px-0">
                        {startTimer && !stopTime && (
                            <Button
                                className="bg-jelly-bean hover:bg-jelly-bean/90 hidden lg:flex"
                                onClick={() => setDialogOneOpen(true)}
                            >
                                <SquareArrowUpRight className="me-1" /> End Session
                            </Button>
                        )}
                    </div>
                </div>

                {/* right side large screens  */}
                <div className="right__side hidden md:block w-full md:w-3/12 lg:w-3/12 px-8 lg:ps-4 py-4">
                    <div className="py-5 px-3 border-1 border-bright-gray rounded-xl">
                        <h6 className="mb-3">Live Audience</h6>
                        {isMediumScreen && (
                            <div
                                className="rounded-xl w-full h-40 relative"
                                style={{
                                    backgroundImage: `url(${sessionData?.virtual_environment === "board_room_1" ? boardRoom1 : boardRoom2})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div
                                    className={`absolute transition-all duration-500 ${
                                        isExpanded
                                            ? "top-0 left-0 w-full h-full"
                                            : sessionData?.virtual_environment === "board_room_1"
                                              ? "w-40 h-23.5 md:w-20 md:h-12 lg:w-20 lg:h-12 absolute top-14.5 right-53 md:top-8 md:right-19.5 lg:top-8 lg:right-21.5"
                                              : "w-40 h-23.5 md:w-20 md:h-12 lg:w-22 lg:h-12 absolute top-14.5 right-53 md:top-11 md:right-23 lg:top-11 lg:right-24"
                                    }`}
                                >
                                    <VideoStreamer
                                        duration={time}
                                        stop={stopStreamer}
                                        onStop={() => closeAndShowClapVideo()}
                                        onStart={() => setStartTimer(true)}
                                        ws={socket.current}
                                        isWsReady={isSocketConnected}
                                        border={isExpanded ? "rounded-2xl" : ""}
                                        sessionId={sessionId}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <AudienceEngaged percent={feedback ? feedback.analysis.Feedback.Clarity : 0} />

                    <EngagementMetrics
                        percent1={feedback ? feedback.analysis.Scores["Volume Score"] : 0}
                        percent2={feedback ? feedback.analysis.Feedback.Clarity : 0}
                        percent3={feedback ? feedback.analysis.Scores["Pace Score"] : 0}
                    />
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
