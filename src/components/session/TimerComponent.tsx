import { useState, useEffect, useRef } from "react";
import SegmentedProgressBar from "../dashboard/SegmentedProgressBar";

interface TimerComponentProps {
    minutes: number;
    start: boolean;
    onStop?: () => void;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ minutes, start, onStop }) => {
    const totalTime = minutes * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasStoppedRef = useRef(false);

    // Reset timer when `start` becomes false
    useEffect(() => {
        if (!start) {
            // Cleanup interval and reset timer
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setTimeLeft(totalTime); // Reset timer
            hasStoppedRef.current = false; // Reset stop flag
            return;
        }

        // Start timer
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [start, totalTime]);

    // Notify parent when timer finishes
    useEffect(() => {
        if (start && timeLeft === 0 && !hasStoppedRef.current) {
            hasStoppedRef.current = true;
            onStop?.();
        }
    }, [timeLeft, start, onStop]);

    const percentage = ((totalTime - timeLeft) / totalTime) * 100;
    const progressBarColor = percentage >= 80 ? "#DD524D" : percentage >= 50 ? "#F5B546" : "#40B869";

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="flex flex-col gap-4">
            <p className="flex items-center">
                Time Remaining:
                <span className="ms-1" style={{ color: progressBarColor }}>
                    {formatTime(timeLeft)}
                </span>
            </p>
            <SegmentedProgressBar percent={start ? percentage : 0} color={progressBarColor} divisions={1} />
        </div>
    );
};

export default TimerComponent;
