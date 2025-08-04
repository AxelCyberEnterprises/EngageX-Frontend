import { useState, useEffect, useRef } from "react";
import SegmentedProgressBar from "../dashboard/SegmentedProgressBar";

interface TimerComponentProps {
    minutes: number;
    start: boolean;
    stop?: boolean; // <-- NEW prop to pause the timer
    onStop?: () => void;
    showTimeRemaining?: boolean;
}

const TimerComponent: React.FC<TimerComponentProps> = ({
    minutes,
    start,
    stop = false,
    onStop,
    showTimeRemaining = true,
}) => {
    const totalTime = minutes * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasStoppedRef = useRef(false);

    // Handle timer logic based on start and stop
    useEffect(() => {
        // Always clear existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // If timer is started AND not paused, begin interval
        if (start && !stop) {
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
        }

        // Reset if timer is stopped (fully)
        if (!start) {
            setTimeLeft(totalTime);
            hasStoppedRef.current = false;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [start, stop, totalTime]);

    // Trigger onStop when timer finishes
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
            {showTimeRemaining && (
                <p className="flex items-center">
                    Time Remaining:
                    <span className="ms-1" style={{ color: progressBarColor }}>
                        {formatTime(timeLeft)}
                    </span>
                </p>
            )}
            <SegmentedProgressBar percent={start ? percentage : 0} color={progressBarColor} divisions={1} />
        </div>
    );
};

export default TimerComponent;
