/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

interface VideoStreamerProps {
    duration: number; // Duration in minutes
    stop: boolean; // Controlled by parent to stop streaming
    onStart: () => void; // Callback to notify parent when streaming starts
    onStop: () => void; // Callback to notify parent when streaming stops
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ duration, stop, onStart, onStop }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const socket = useRef(io("http://localhost:5000")); // Update with your backend URL
    const streamingRef = useRef(false); // ✅ Use ref instead of state
    const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let chunkCounter = 1;

        const startStreaming = async () => {
            try {
                console.log("Starting video stream...");
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
                mediaRecorderRef.current = mediaRecorder;

                // ✅ Notify parent that streaming has started
                onStart();
                streamingRef.current = true;

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0 && streamingRef.current) {
                        console.log(`Sending chunk_${chunkCounter}`, event.data);
                        socket.current.emit("video_chunk", {
                            chunkName: `chunk_${chunkCounter}`,
                            data: event.data,
                        });
                        chunkCounter++;
                    }
                };

                // ✅ Capture final chunk when stopped
                mediaRecorder.onstop = () => {
                    console.log("Final chunk sent before stopping.");
                    streamingRef.current = false;
                };

                mediaRecorder.start(30000); // Capture in 30s chunks

                // Auto stop after duration
                stopTimeoutRef.current = setTimeout(() => stopStreaming(), duration * 60000 + 2000);
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        };

        startStreaming();

        return () => {
            console.log("Component unmounting: Stopping stream");
            stopStreaming();
            socket.current.disconnect();
        };
    }, [duration]);

    useEffect(() => {
        if (stop && streamingRef.current) {
            console.log("Stop button pressed: Stopping stream");
            stopStreaming();
        }
    }, [stop]);

    const stopStreaming = () => {
        if (!streamingRef.current) return;

        console.log("Stopping video stream...");
        streamingRef.current = false;

        // Stop media recorder properly
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop(); // ✅ This ensures the last chunk is sent
        }

        // Stop all tracks
        streamRef.current?.getTracks().forEach((track) => track.stop());

        // Remove video feed
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        // ✅ Disconnect socket safely
        if (socket.current) {
            socket.current.disconnect();
            console.log("Socket disconnected.");
        }

        socket.current.disconnect();

        if (stopTimeoutRef.current) {
            clearTimeout(stopTimeoutRef.current);
        }

        // Notify parent that streaming has stopped
        onStop();
    };

    return <video className="w-full h-full object-cover" ref={videoRef} autoPlay playsInline muted />;
};

export default VideoStreamer;
