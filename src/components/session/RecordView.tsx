/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface VideoStreamerProps {
    duration: number;
    stop: boolean;
    onStart: () => void;
    onStop: () => void;
    ws: WebSocket | null;
    isWsReady: boolean;
    border?: string;
    sessionId: string | undefined;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({
    duration,
    stop,
    onStart,
    onStop,
    ws,
    isWsReady,
    border,
    sessionId,
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isRecordingRef = useRef(false);
    const location = useLocation();

    const arrayBufferToBase64 = (buffer: ArrayBuffer): Promise<string> => {
        return new Promise((resolve) => {
            const blob = new Blob([buffer], { type: "video/webm" });
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                resolve(dataUrl.split(",")[1]);
            };
            reader.readAsDataURL(blob);
        });
    };

    useEffect(() => {
        const firstSegment = location.pathname.split("/").filter(Boolean)[0];

        if (firstSegment !== "sessions") {
            console.log("Navigated away from sessions page");
            stopRecordingLoop();
            return;
        }

        if (isWsReady && !isRecording) {
            startRecordingLoop();
        }

        return () => {
            console.log("Cleaning up from useEffect");
            stopRecordingLoop();
        };
    }, [location.pathname, isWsReady]);

    useEffect(() => {
        if (stop) {
            stopRecordingLoop();
        }
    }, [stop]);

    const startRecordingLoop = async () => {
        const firstSegment = location.pathname.split("/").filter(Boolean)[0];
        if (firstSegment !== "sessions") {
            console.log("not sessions page", firstSegment);
            stopRecordingLoop();
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            onStart();
            setIsRecording(true);
            isRecordingRef.current = true;

            startRecorder();

            // Stop after `duration` minutes
            timerRef.current = setTimeout(stopRecordingLoop, duration * 60 * 1000);

            // Loop every 7s: stop current recorder and start a new one
            intervalRef.current = setInterval(() => {
                if (recorderRef.current?.state === "recording") {
                    recorderRef.current.stop(); // triggers `ondataavailable`
                }
            }, 7000);
        } catch (error) {
            console.error("Failed to start recording:", error);
            onStop();
        }
    };

    const startRecorder = () => {
        if (!streamRef.current) return;

        const recorder = new MediaRecorder(streamRef.current, {
            mimeType: "video/webm; codecs=vp8,opus",
        });

        recorder.ondataavailable = async (event) => {
            if (event.data.size > 0 && ws?.readyState === WebSocket.OPEN && isRecordingRef.current) {
                try {
                    const base64Data = await arrayBufferToBase64(await event.data.arrayBuffer());
                    ws.send(
                        JSON.stringify({
                            type: "media",
                            data: base64Data,
                            session_id: sessionId,
                        }),
                    );
                    console.log(`Chunk sent (${Math.round(base64Data.length / 1024)} KB)`);
                } catch (err) {
                    console.error("Error converting chunk:", err);
                }
            }

            // Only restart recorder if still recording
            if (isRecordingRef.current) {
                startRecorder();
            }
        };

        recorder.start();
        recorderRef.current = recorder;
    };

    const stopRecordingLoop = () => {
        if (!isRecording && !streamRef.current) return;

        console.log("Stopping recording...");

        try {
            recorderRef.current?.stop();
            streamRef.current?.getTracks().forEach((track) => track.stop());

            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }

            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            recorderRef.current = null;
            streamRef.current = null;
            isRecordingRef.current = false;
            setIsRecording(false);
            onStop();
        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };

    return <video ref={videoRef} className={`w-full h-full object-cover ${border}`} autoPlay playsInline muted />;
};

export default VideoStreamer;
