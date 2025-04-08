/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

interface VideoStreamerProps {
    duration: number;
    stop: boolean;
    onStart: () => void;
    onStop: () => void;
    ws: WebSocket | null;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ duration, stop, onStart, onStop, ws }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isWsReady, setIsWsReady] = useState(false);
    const currentRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunkIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Optimized base64 conversion that won't cause stack overflow
    const arrayBufferToBase64 = (buffer: ArrayBuffer): Promise<string> => {
        return new Promise((resolve) => {
            const blob = new Blob([buffer], { type: "video/webm" });
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                resolve(dataUrl.split(",")[1]); // Extract base64 part
            };
            reader.readAsDataURL(blob);
        });
    };

    // WebSocket connection handler
    useEffect(() => {
        if (!ws) return;

        const handleOpen = () => {
            setIsWsReady(true);
            console.log("WebSocket connected - ready to stream");
        };

        const handleClose = () => {
            setIsWsReady(false);
            console.log("WebSocket disconnected");
            stopRecording();
        };

        ws.addEventListener("open", handleOpen);
        ws.addEventListener("close", handleClose);

        return () => {
            ws.removeEventListener("open", handleOpen);
            ws.removeEventListener("close", handleClose);
        };
    }, [ws]);

    // Start/stop recording based on WebSocket status
    useEffect(() => {
        if (isWsReady && !isRecording) {
            startRecording();
        } else if (!isWsReady && isRecording) {
            stopRecording();
        }

        return () => {
            stopRecording();
        };
    }, [isWsReady]);

    const startRecording = async () => {
        if (isRecording || !isWsReady) return;

        try {
            console.log("Starting media stream...");
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;

            const recorder = new MediaRecorder(stream, {
                mimeType: "video/webm; codecs=vp8,opus",
                videoBitsPerSecond: 2500000, // Limit bitrate to prevent large chunks
            });

            recorder.ondataavailable = async (event) => {
                if (event.data.size > 0 && ws?.readyState === WebSocket.OPEN) {
                    try {
                        const base64Data = await arrayBufferToBase64(await event.data.arrayBuffer());

                        ws.send(
                            JSON.stringify({
                                type: "media",
                                data: base64Data,
                                timestamp: Date.now(),
                                size: base64Data.length,
                            }),
                        );

                        console.log(`Chunk sent (${Math.round(base64Data.length / 1024)} KB)`);
                    } catch (error) {
                        console.error("Error processing chunk:", error);
                    }
                }
            };

            // Start recording with 10-second chunks
            recorder.start(10000); // This automatically creates chunks every 10s
            currentRecorderRef.current = recorder;

            setIsRecording(true);
            onStart();

            // Auto-stop after duration
            stopTimerRef.current = setTimeout(
                () => {
                    stopRecording();
                },
                duration * 60 * 1000,
            );
        } catch (error) {
            console.error("Failed to start recording:", error);
            onStop();
        }
    };

    const stopRecording = () => {
        if (!isRecording) return;

        console.log("Stopping recording...");
        if (chunkIntervalRef.current) clearInterval(chunkIntervalRef.current);
        if (currentRecorderRef.current?.state === "recording") {
            currentRecorderRef.current.stop();
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (stopTimerRef.current) clearTimeout(stopTimerRef.current);

        setIsRecording(false);
        onStop();
    };

    // Handle stop prop
    useEffect(() => {
        if (stop) stopRecording();
    }, [stop]);

    return <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />;
};

export default VideoStreamer;
