/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

interface VideoStreamerProps {
    duration: number;
    stop: boolean;
    onStart: () => void;
    onStop: () => void;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ duration, stop, onStart, onStop }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoRecorderRef = useRef<MediaRecorder | null>(null);
    const audioRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const websocket = useRef<WebSocket | null>(null);
    const streamingRef = useRef(false);
    const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const chunkCounterRef = useRef(1);

    // Buffers for pairing audio and video
    const pendingChunks = useRef<{
        [chunk: number]: { video?: Blob; audio?: Blob };
    }>({});

    useEffect(() => {
        const startStreaming = async () => {
            try {
                console.log("🎥 Requesting media devices...");

                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                websocket.current = new WebSocket("wss://api.engagexai.io");
                websocket.current.binaryType = "arraybuffer";

                websocket.current.onopen = () => console.log("✅ WebSocket connected.");
                websocket.current.onerror = (err) => console.error("❌ WebSocket error:", err);

                const videoStream = new MediaStream(stream.getVideoTracks());
                const audioStream = new MediaStream(stream.getAudioTracks());

                const videoRecorder = new MediaRecorder(videoStream, { mimeType: "video/webm" });
                const audioRecorder = new MediaRecorder(audioStream, { mimeType: "audio/webm" });

                videoRecorderRef.current = videoRecorder;
                audioRecorderRef.current = audioRecorder;

                onStart();
                streamingRef.current = true;

                const handleChunk = (type: "video" | "audio", blob: Blob) => {
                    const chunkId = chunkCounterRef.current;

                    if (!pendingChunks.current[chunkId]) {
                        pendingChunks.current[chunkId] = {};
                    }

                    pendingChunks.current[chunkId][type] = blob;

                    if (
                        pendingChunks.current[chunkId].video &&
                        pendingChunks.current[chunkId].audio &&
                        websocket.current?.readyState === WebSocket.OPEN
                    ) {
                        // Combine and send
                        const payload = {
                            type: "video_audio",
                            chunk: chunkId,
                            video: pendingChunks.current[chunkId].video,
                            audio: pendingChunks.current[chunkId].audio,
                        };

                        console.log(`📦 Sending chunk_${chunkId}`, payload);

                        // Read blobs and send together
                        Promise.all([blobToArrayBuffer(payload.video), blobToArrayBuffer(payload.audio)]).then(
                            ([videoBuf, audioBuf]) => {
                                websocket.current?.send(
                                    JSON.stringify({
                                        type: "video_audio",
                                        chunk: payload.chunk,
                                        video: Array.from(new Uint8Array(videoBuf)),
                                        audio: Array.from(new Uint8Array(audioBuf)),
                                    }),
                                );
                            },
                        );

                        delete pendingChunks.current[chunkId];
                        chunkCounterRef.current++;
                    }
                };

                videoRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0 && streamingRef.current) {
                        handleChunk("video", event.data);
                    }
                };

                audioRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0 && streamingRef.current) {
                        handleChunk("audio", event.data);
                    }
                };

                videoRecorder.start(30000);
                audioRecorder.start(30000);

                stopTimeoutRef.current = setTimeout(() => stopStreaming(), duration * 60000 + 2000);
            } catch (error) {
                console.error("❌ Error accessing media devices:", error);
            }
        };

        startStreaming();

        return () => {
            console.log("🔁 Unmounting: stopping stream");
            stopStreaming();
        };
    }, [duration]);

    useEffect(() => {
        if (stop && streamingRef.current) {
            console.log("⏹️ Stop triggered");
            stopStreaming();
        }
    }, [stop]);

    const stopStreaming = () => {
        if (!streamingRef.current) return;

        console.log("🛑 Stopping streams...");
        streamingRef.current = false;

        videoRecorderRef.current?.stop();
        audioRecorderRef.current?.stop();

        streamRef.current?.getTracks().forEach((track) => track.stop());

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
            websocket.current.close();
            console.log("🔌 WebSocket closed.");
        }

        if (stopTimeoutRef.current) {
            clearTimeout(stopTimeoutRef.current);
        }

        onStop();
    };

    const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    };

    return <video className="w-full h-full object-cover" ref={videoRef} autoPlay playsInline muted />;
};

export default VideoStreamer;
