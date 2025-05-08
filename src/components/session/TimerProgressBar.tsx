/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import SegmentedProgressBar from "../dashboard/SegmentedProgressBar";
import { Clock2, Dot } from "lucide-react";

interface TimerProgressBarProps {
    minutes: number;
    start: boolean;
    stop: boolean;
    onStop: (elapsed: string) => void;
}

const TimerProgressBar: React.FC<TimerProgressBarProps> = ({ minutes, start, stop, onStop }) => {
    const totalTime = minutes * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [hasEndedNaturally, setHasEndedNaturally] = useState(false);

    useEffect(() => {
        if (start && !intervalId && timeLeft > 0) {
            const id = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(id);
                        setIntervalId(null);
                        setHasEndedNaturally(true); // Trigger natural stop
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            setIntervalId(id);
        }

        if (!start && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [start]);

    // Handle manual stop from parent
    useEffect(() => {
        if (stop && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            const elapsedSeconds = totalTime - timeLeft;
            onStop(formatTime(elapsedSeconds));
        }
    }, [stop]);

    // Handle natural stop
    useEffect(() => {
        if (hasEndedNaturally) {
            const elapsedSeconds = totalTime;
            onStop(formatTime(elapsedSeconds));
            setHasEndedNaturally(false); // Reset flag
        }
    }, [hasEndedNaturally]);

    const percentage = ((totalTime - timeLeft) / totalTime) * 100;

    let progressBarColor = "#40B869";
    if (percentage >= 80) progressBarColor = "#DD524D";
    else if (percentage >= 50) progressBarColor = "#F5B546";

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="flex flex-col gap-2">
            <SegmentedProgressBar percent={percentage} color={progressBarColor} divisions={1} />
            <div className="flex flex-wrap justify-between items-center">
                <div>
                    {start && (
                        <p className="flex items-center gap-0.5">
                            <Dot className="text-crimson-red w-10 h-10 blink" /> Recording has begun
                        </p>
                    )}
                </div>
                <div className="flex mt-3 md:mt-0">
                    <p className="flex items-center">
                        <Clock2 className="w-5 h-5 me-1" />
                        Session Time Remaining:
                        <span className="ms-1" style={{ color: progressBarColor }}>
                            {formatTime(timeLeft)}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TimerProgressBar;
