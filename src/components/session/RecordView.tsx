/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

interface VideoStreamerProps {
    duration: number;
    stop: boolean;
    onStart: () => void;
    onStop: () => void;
    ws: WebSocket | null;
    isWsReady: boolean;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ duration, stop, onStart, onStop, ws, isWsReady }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
        if (isWsReady && !isRecording) {
            startRecordingLoop();
        }

        return () => {
            stopRecordingLoop();
        };
    }, [isWsReady]);

    useEffect(() => {
        if (stop) {
            stopRecordingLoop();
        }
    }, [stop]);

    const startRecordingLoop = async () => {
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

            startRecorder();

            // Stop after `duration` minutes
            timerRef.current = setTimeout(stopRecordingLoop, duration * 60 * 1000);

            // Loop every 10s: stop current recorder and start a new one
            intervalRef.current = setInterval(() => {
                if (recorderRef.current?.state === "recording") {
                    recorderRef.current.stop(); // triggers `ondataavailable`
                }
            }, 10000);
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
            if (event.data.size > 0 && ws?.readyState === WebSocket.OPEN) {
                try {
                    const base64Data = await arrayBufferToBase64(await event.data.arrayBuffer());
                    ws.send(
                        JSON.stringify({
                            type: "media",
                            data: base64Data,
                        }),
                    );
                    console.log(`Chunk sent (${Math.round(base64Data.length / 1024)} KB)`);
                } catch (err) {
                    console.error("Error converting chunk:", err);
                }
            }

            // Immediately start a new recorder after sending
            startRecorder();
        };

        recorder.start();
        recorderRef.current = recorder;
    };

    const stopRecordingLoop = () => {
        if (!isRecording) return;

        console.log("Stopping recording...");

        if (recorderRef.current?.state === "recording") {
            recorderRef.current.stop();
        }

        streamRef.current?.getTracks().forEach((track) => track.stop());

        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);

        setIsRecording(false);
        onStop();
    };

    return <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />;
};

export default VideoStreamer;
