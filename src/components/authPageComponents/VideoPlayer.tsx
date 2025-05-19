/* eslint-disable react-hooks/exhaustive-deps */
// src/components/VideoPlayer.tsx
import { useDeleteSessionVideo } from "@/hooks/sessions";
import { Download, EllipsisVertical, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FaCompress, FaExpand } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface VideoPlayerProps {
    src: string;
    poster?: string;
    width?: string;
    height?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    showPauseOverlay?: boolean;
    hideControls?: boolean;
    border?: string;
    pauseOnClick?: boolean;
    preload?: boolean;
    muted?: boolean;
    requireFullPlay?: boolean;
    allowSwitch?: boolean;
    showMenu?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    poster,
    width = "w-full",
    height = "h-auto",
    className = "",
    autoPlay = false,
    loop = false,
    showPauseOverlay = true,
    hideControls = false,
    border = "",
    pauseOnClick = true,
    preload = false,
    muted = false,
    requireFullPlay = false,
    allowSwitch = true,
    showMenu = false,
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
    const [hasPlayedOnce, setHasPlayedOnce] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [showControls, setShowControls] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(muted);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [currentSrc, setCurrentSrc] = useState<string>(src);
    const [nextSrc, setNextSrc] = useState<string | null>(null);

    const params = useParams();
    const { mutate: deleteVideo } = useDeleteSessionVideo();

    const togglePlay = (): void => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    const handleTimeUpdate = (): void => {
        if (videoRef.current && !isDragging) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleVideoClick = (): void => {
        if (!pauseOnClick) return;
        togglePlay();
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === " ") {
            e.preventDefault();
            togglePlay();
        }
    };

    const toggleMute = (): void => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (videoRef.current && e.currentTarget) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
            setProgress(pos * 100);
        }
    };

    const handleSeekMouseDown = (): void => {
        setIsDragging(true);
    };

    const handleSeekMouseUp = (): void => {
        setIsDragging(false);
    };

    const handleSeekMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (isDragging && videoRef.current && e.currentTarget) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
            videoRef.current.currentTime = pos * videoRef.current.duration;
            setProgress(pos * 100);
        }
    };

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    useEffect(() => {
        setIsMuted(muted);
        if (videoRef.current) {
            videoRef.current.muted = muted;
        }
    }, [muted]);

    useEffect(() => {
        if (!preload) {
            // immediate switch if preload is false
            setCurrentSrc(src);
            setHasPlayedOnce(false);
            return;
        }

        if (src === currentSrc || src === nextSrc) return; // no need to preload again

        if (requireFullPlay && !hasPlayedOnce) {
            // preload into buffer but don’t switch yet
            const tempVideo = document.createElement("video");
            tempVideo.src = src;
            tempVideo.preload = "auto";

            const handleLoaded = () => {
                setNextSrc(src); // preload and queue it
            };

            tempVideo.addEventListener("loadeddata", handleLoaded);

            return () => {
                tempVideo.removeEventListener("loadeddata", handleLoaded);
                tempVideo.src = "";
                tempVideo.load();
            };
        } else {
            // either not required to play full OR already has played
            setCurrentSrc(src);
            setHasPlayedOnce(false);
        }
    }, [src, preload, requireFullPlay, hasPlayedOnce, currentSrc, nextSrc]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleLoadedMetadata = () => {
            setDuration(videoElement.duration);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(100);
            setHasPlayedOnce(true);

            if (requireFullPlay && nextSrc && allowSwitch) {
                // Swap in nextSrc after full play
                setCurrentSrc(nextSrc);
                setNextSrc(null);
                setHasPlayedOnce(false);
            } else if (!nextSrc && loop) {
                // Only loop if no nextSrc is ready
                videoElement.currentTime = 0;
                videoElement.play();
            }
        };

        videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
        videoElement.addEventListener("timeupdate", handleTimeUpdate);
        videoElement.addEventListener("play", handlePlay);
        videoElement.addEventListener("pause", handlePause);
        videoElement.addEventListener("ended", handleEnded);

        if (autoPlay) {
            videoElement.play().catch((error) => {
                console.error("Autoplay prevented:", error);
            });
        }

        return () => {
            videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
            videoElement.removeEventListener("play", handlePlay);
            videoElement.removeEventListener("pause", handlePause);
            videoElement.removeEventListener("ended", handleEnded);
        };
    }, [currentSrc, autoPlay, allowSwitch]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && containerRef.current) {
                const progressBar = containerRef.current.querySelector(".progress-container");
                if (progressBar) {
                    const rect = progressBar.getBoundingClientRect();
                    const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
                    if (videoRef.current) {
                        videoRef.current.currentTime = pos * videoRef.current.duration;
                        setProgress(pos * 100);
                    }
                }
            }
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const formatTime = (time: number): string => {
        if (isNaN(time) || time < 0) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div
            ref={containerRef}
            className={`relative ${width} ${height} ${className} overflow-hidden group`}
            onMouseEnter={() => !hideControls && setShowControls(true)}
            onMouseLeave={() => !hideControls && setShowControls(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <video
                ref={videoRef}
                src={currentSrc}
                poster={poster}
                className={`block w-full h-full object-cover cursor-pointer ${border}`}
                onClick={handleVideoClick}
                controls={false}
                playsInline
                preload="auto"
                loop={loop && (!requireFullPlay || !nextSrc)}
                muted={isMuted}
            />

            {!isPlaying && showPauseOverlay && (
                <div className="absolute inset-0 bg-[#0000006c] bg-opacity-30 flex items-center justify-center cursor-pointer">
                    <button
                        aria-label="Play video"
                        onClick={togglePlay}
                        className="z-10 w-16 h-16  bg-[#eeebeb] bg-opacity-20 rounded-full
                       flex items-center justify-center backdrop-blur-sm
                       text-white transition-transform duration-200 hover:scale-110
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3b3b3b"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-play-icon lucide-play"
                        >
                            <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                    </button>
                </div>
            )}

            {!hideControls && (showControls || !isPlaying) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300">
                    <div
                        className="progress-container h-2 w-full bg-gray-600 rounded-full mb-3 cursor-pointer"
                        onClick={handleSeek}
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        onMouseMove={handleSeekMouseMove}
                    >
                        <div className="h-full bg-[#64BA9E] rounded-full relative" style={{ width: `${progress}%` }}>
                            <div
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full"
                                onMouseDown={handleSeekMouseDown}
                            ></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                aria-label={isPlaying ? "Pause" : "Play"}
                                onClick={togglePlay}
                                className="text-white bg-transparent hover:bg-transparent hover:text-gray-300 transition-colors"
                            >
                                {isPlaying ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            <button
                                aria-label={isMuted ? "Unmute" : "Mute"}
                                onClick={toggleMute}
                                className="text-white bg-transparent hover:bg-transparent hover:text-gray-300 transition-colors"
                            >
                                {isMuted ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                    </svg>
                                )}
                            </button>

                            <span className="text-white text-sm">
                                {formatTime((progress / 100) * duration)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleFullscreen}
                                aria-label="Toggle fullscreen"
                                className="text-white bg-transparent hover:bg-transparent hover:text-gray-300 transition-colors"
                            >
                                {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
                            </button>

                            {showMenu && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="size-10 rounded-full bg-transparent hover:bg-primary transition-colors focus-visible:ring-0">
                                            <EllipsisVertical className="size-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="top"
                                        align="end"
                                        alignOffset={-10}
                                        className="border-none"
                                    >
                                        <DropdownMenuItem>
                                            <a
                                                title="Download"
                                                href={currentSrc}
                                                download="video.mp4"
                                                className="flex items-center gap-3 w-full text-black transition-colors"
                                            >
                                                <Download className="size-4 stroke-[2.5] stroke-black" />
                                                <span className="text-sm">Download</span>
                                            </a>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="gap-3 cursor-pointer"
                                            onClick={() => deleteVideo(params.id!)}
                                        >
                                            <Trash className="size-4 stroke-[2.5] stroke-black" />
                                            <span className="font-normal">Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
