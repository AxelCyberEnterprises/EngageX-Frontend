/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
    src: string;
    isMuted?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    isMuted = true,
    autoplay = true,
    loop = false,
    className = "",
}) => {
    const videoA = useRef<HTMLVideoElement>(null);
    const videoB = useRef<HTMLVideoElement>(null);

    const [activeIdx, setActiveIdx] = useState<0 | 1>(0);
    const [sources, setSources] = useState<[string, string | null]>([src, null]);
    const latestSrcRef = useRef<string>(src);


    // Initial autoplay on mount
    useEffect(() => {
        const vid = (activeIdx === 0 ? videoA : videoB).current;
        if (vid && autoplay) {
            vid.muted = isMuted;
            vid.loop = loop;
            vid.autoplay = autoplay;
            vid.play().catch(() => {});
        }
    }, [activeIdx, autoplay, isMuted, loop]);

    // Prevent accidental pause
    useEffect(() => {
        const vid = (activeIdx === 0 ? videoA : videoB).current;
        if (!vid) return;

        const preventPause = () => {
            if (vid.paused) {
                vid.play().catch(() => {});
            }
        };

        vid.addEventListener("pause", preventPause);
        return () => {
            vid.removeEventListener("pause", preventPause);
        };
    }, [activeIdx]);

    // Handle `src` change and switch players
    useEffect(() => {
        latestSrcRef.current = src;
        
         console.log(`🎯 src changed to: ${src}`);
            const currentSrc = sources[activeIdx];
            if (currentSrc === src) {
                console.log("⚠️ New src is already active. No switch needed.");
                return;
            }

        const inactiveIdx: 0 | 1 = activeIdx === 0 ? 1 : 0;
        const refs = [videoA, videoB];
        const inactiveVideo = refs[inactiveIdx].current;

        setSources((prev) => {
            const next = [...prev] as [string, string | null];
            next[inactiveIdx] = src;
            return next;
        });

        if (inactiveVideo) {
            console.log(`🛠 Preparing video[${inactiveIdx}] to load: ${src}`);
            inactiveVideo.src = src;
            inactiveVideo.muted = isMuted;
            inactiveVideo.loop = loop;
            inactiveVideo.autoplay = autoplay;
            inactiveVideo.load();

            const handleReady = () => {
              console.log(`✅ canplaythrough fired for video[${inactiveIdx}] with src: ${src}`);
              
              // Optional extra safety
              if (inactiveVideo.readyState < 4) {
                console.warn("🚧 Video not fully ready despite canplaythrough");
                return;
              }
            
              if (latestSrcRef.current === src) {
                console.log(`🎬 Switching to video[${inactiveIdx}] for src: ${src}`);
                setActiveIdx(inactiveIdx);
                inactiveVideo.play().catch((e) => {
                  console.warn("Autoplay failed after switching:", e);
                });
              } else {
                console.log(`🛑 Skipped stale video load: attempted=${src}, expected=${latestSrcRef.current}`);
              }
            };

            const handleError = () => {
                console.error(`❌ Video failed to load: ${src}`);
            };

            inactiveVideo.addEventListener("canplaythrough", handleReady, { once: true });
            inactiveVideo.addEventListener("error", handleError);

            return () => {
                console.log(`♻️ Cleaning up listeners for video[${inactiveIdx}] with src: ${src}`);
                inactiveVideo.removeEventListener("canplaythrough", handleReady);
                inactiveVideo.removeEventListener("error", handleError);

                // Clean up only the now inactive video
                const previouslyActive = refs[inactiveIdx === 0 ? 1 : 0].current;
                if (previouslyActive) {
                    previouslyActive.src = "";
                }
            };
        }
    }, [src, activeIdx, isMuted, loop, autoplay]);

    const wrapperStyle: React.CSSProperties = {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "black",
    };

    const videoStyle: React.CSSProperties = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
        userSelect: "none",
        background: "black",
    };

    return (
        <div className={className} style={wrapperStyle}>
            {/* Video A */}
            <video
                ref={videoA}
                style={{
                    ...videoStyle,
                    opacity: activeIdx === 0 ? 1 : 0,
                    zIndex: activeIdx === 0 ? 2 : 1,
                    transition: "opacity 100ms",
                }}
                src={sources[0] || undefined}
                muted={isMuted}
                autoPlay={autoplay}
                loop={loop}
                controls={false}
                tabIndex={-1}
                playsInline
            />
            {/* Video B */}
            {sources[1] && (
                <video
                    ref={videoB}
                    style={{
                        ...videoStyle,
                        opacity: activeIdx === 1 ? 1 : 0,
                        zIndex: activeIdx === 1 ? 2 : 1,
                        transition: "opacity 100ms",
                    }}
                    src={sources[1] || undefined}
                    muted={isMuted}
                    autoPlay={autoplay}
                    loop={loop}
                    controls={false}
                    tabIndex={-1}
                    playsInline
                />
            )}
        </div>
    );
};

export default VideoPlayer;
