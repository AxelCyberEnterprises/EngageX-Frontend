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
    currentSlideTime: string;
    nextSlideImage: string | null;
    slideProgress: { current: number; total: number };
};

const SlidesPreviewer = forwardRef<SlidesPreviewerHandle, SlidesPreviewerProps>(
    ({ images, start, stop, onStop }, ref) => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const [startTime, setStartTime] = useState<number | null>(null);
        const [durations, setDurations] = useState<string[]>([]);
        const [currentDuration, setCurrentDuration] = useState("00:00");

        const timerRef = useRef<NodeJS.Timeout | null>(null);

        // Start timer when 'start' is true and 'stop' is false
        useEffect(() => {
            if (start && !stop && !startTime) {
                const slideStart = Date.now();
                setStartTime(slideStart);

                timerRef.current = setInterval(() => {
                    const elapsed = Date.now() - slideStart;
                    const minutes = Math.floor(elapsed / 60000)
                        .toString()
                        .padStart(2, "0");
                    const seconds = Math.floor((elapsed % 60000) / 1000)
                        .toString()
                        .padStart(2, "0");
                    setCurrentDuration(`${minutes}:${seconds}`);
                }, 1000);
            }

            return () => clearInterval(timerRef.current as NodeJS.Timeout);
        }, [start, stop]);

        // Stop timer and report durations
        useEffect(() => {
            if (stop && startTime) {
                const timeSpent = Date.now() - startTime;
                const minutes = Math.floor(timeSpent / 60000)
                    .toString()
                    .padStart(2, "0");
                const seconds = Math.floor((timeSpent % 60000) / 1000)
                    .toString()
                    .padStart(2, "0");
                const formatted = `${minutes}:${seconds}`;
                const updatedDurations = [...durations, formatted];
                setDurations(updatedDurations);
                clearInterval(timerRef.current as NodeJS.Timeout);
                setStartTime(null);
                setCurrentDuration("00:00");
                onStop(updatedDurations);
            }
        }, [stop]);

        // Move to next slide and reset timer
        const nextSlide = () => {
            if (images.length === 0) return;

            // Don't go to next slide if already on the last slide
            if (currentSlide === images.length - 1) return;

            if (startTime) {
                const timeSpent = Date.now() - startTime;
                const minutes = Math.floor(timeSpent / 60000)
                    .toString()
                    .padStart(2, "0");
                const seconds = Math.floor((timeSpent % 60000) / 1000)
                    .toString()
                    .padStart(2, "0");
                const formatted = `${minutes}:${seconds}`;
                const updated = [...durations, formatted];
                setDurations(updated);

                // Reset timer
                clearInterval(timerRef.current as NodeJS.Timeout);
                const newStart = Date.now();
                setStartTime(newStart);
                setCurrentDuration("00:00");

                timerRef.current = setInterval(() => {
                    const elapsed = Date.now() - newStart;
                    const minutes = Math.floor(elapsed / 60000)
                        .toString()
                        .padStart(2, "0");
                    const seconds = Math.floor((elapsed % 60000) / 1000)
                        .toString()
                        .padStart(2, "0");
                    setCurrentDuration(`${minutes}:${seconds}`);
                }, 1000);
            }

            setCurrentSlide((prev) => (prev + 1) % images.length);
        };

        // Expose values to parent
        useImperativeHandle(ref, () => ({
            nextSlide,
            currentSlideTime: currentDuration,
            nextSlideImage: currentSlide < images.length - 1 ? images[currentSlide + 1] : null,
            slideProgress: {
                current: currentSlide + 1,
                total: images.length,
            },
        }));

        return (
            <div className="w-full h-full relative overflow-hidden rounded-lg">
                {/* Current Slide */}
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}
            </div>
        );
    },
);

export default SlidesPreviewer;
