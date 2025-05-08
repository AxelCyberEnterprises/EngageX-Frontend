import { useState, useEffect, useRef } from "react";
import SegmentedProgressBar from "../dashboard/SegmentedProgressBar";

interface TimerComponentProps {
    minutes: number;
    start: boolean;
    onStop?: () => void; // Optional callback when timer ends
}

const TimerComponent: React.FC<TimerComponentProps> = ({ minutes, start, onStop }) => {
    const totalTime = minutes * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const hasStoppedRef = useRef(false); // Ensure `onStop` runs only once per countdown

    useEffect(() => {
        if (!start || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [start, timeLeft]);

    // Reset timer and flag when `start` goes true
    useEffect(() => {
        if (start) {
            setTimeLeft(totalTime);
            hasStoppedRef.current = false;
        }
    }, [start, totalTime, minutes]);

    // Handle timer completion
    useEffect(() => {
        if (timeLeft <= 0 && start && !hasStoppedRef.current) {
            hasStoppedRef.current = true;
            if (onStop) onStop();
        }
    }, [timeLeft, start, onStop]);

    const percentage = ((totalTime - timeLeft) / totalTime) * 100;

    let progressBarColor = "#40B869";
    if (percentage >= 80) progressBarColor = "#DD524D";
    else if (percentage >= 50) progressBarColor = "#F5B546";

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
            <SegmentedProgressBar percent={percentage} color={progressBarColor} divisions={1} />
        </div>
    );
};

export default TimerComponent;
