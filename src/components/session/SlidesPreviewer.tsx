/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

type SlidesPreviewerProps = {
    images: string[];
    start: boolean;
    stop: boolean;
    onStop: (durations: string[]) => void;
};

export type SlidesPreviewerHandle = {
    nextSlide: () => void;
    previousSlide: () => void;
    currentSlideTime: string;
    nextSlideImage: string | null;
    slideProgress: { current: number; total: number };
};

const SlidesPreviewer = forwardRef<SlidesPreviewerHandle, SlidesPreviewerProps>(
    ({ images, start, stop, onStop }, ref) => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const [startTime, setStartTime] = useState<number | null>(null);
        const [durations, setDurations] = useState<number[]>(new Array(images.length).fill(0));
        const [currentDuration, setCurrentDuration] = useState("00:00");

        const timerRef = useRef<NodeJS.Timeout | null>(null);

        // Start timer when `start` is true
        useEffect(() => {
            if (start && !stop && startTime === null) {
                const now = Date.now();
                setStartTime(now);
                startTimer(now, durations[currentSlide]);
            }

            return () => clearInterval(timerRef.current as NodeJS.Timeout);
        }, [start, stop]);

        // On stop, finalize duration
        useEffect(() => {
            if (stop && startTime !== null) {
                finalizeSlideTime();
                const formattedDurations = durations.map((ms) => formatTime(ms));
                onStop(formattedDurations);
            }
        }, [stop]);

        const startTimer = (startAt: number, initialMs: number) => {
            timerRef.current = setInterval(() => {
                const elapsed = Date.now() - startAt;
                const total = initialMs + elapsed;
                setCurrentDuration(formatTime(total));
            }, 1000);
        };

        const finalizeSlideTime = () => {
            if (startTime === null) return;
            const now = Date.now();
            const elapsed = now - startTime;
            setDurations((prev) => {
                const updated = [...prev];
                updated[currentSlide] += elapsed;
                return updated;
            });
            clearInterval(timerRef.current as NodeJS.Timeout);
            setStartTime(null);
        };

        const handleSlideChange = (newSlideIndex: number) => {
            finalizeSlideTime();

            const now = Date.now();
            const prevDuration = durations[newSlideIndex];
            setStartTime(now);
            setCurrentDuration(formatTime(prevDuration));
            startTimer(now, prevDuration);

            setCurrentSlide(newSlideIndex);
        };

        const nextSlide = () => {
            if (currentSlide < images.length - 1) {
                handleSlideChange(currentSlide + 1);
            }
        };

        const previousSlide = () => {
            if (currentSlide > 0) {
                handleSlideChange(currentSlide - 1);
            }
        };

        useImperativeHandle(ref, () => ({
            nextSlide,
            previousSlide,
            currentSlideTime: currentDuration,
            nextSlideImage: currentSlide < images.length - 1 ? images[currentSlide + 1] : null,
            slideProgress: {
                current: currentSlide + 1,
                total: images.length,
            },
        }));

        const formatTime = (ms: number) => {
            const totalSeconds = Math.floor(ms / 1000);
            const minutes = Math.floor(totalSeconds / 60)
                .toString()
                .padStart(2, "0");
            const seconds = (totalSeconds % 60).toString().padStart(2, "0");
            return `${minutes}:${seconds}`;
        };

        return (
            <div className="w-full h-full relative overflow-hidden rounded-lg">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className={`absolute w-full h-full object-cover transition-opacity border border-primary-blue duration-1000 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}
            </div>
        );
    },
);


export default SlidesPreviewer;
