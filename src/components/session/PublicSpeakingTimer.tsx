import { useState, useEffect } from "react";
import SegmentedProgressBar from "../dashboard/SegmentedProgressBar"; // Import your progress bar component
import { Clock2 } from "lucide-react";

interface PublicSpeakingTimerProps {
    minutes: number;
    start: boolean; // Boolean to control when the countdown starts
}

const PublicSpeakingTimer: React.FC<PublicSpeakingTimerProps> = ({ minutes, start }) => {
    const totalTime = minutes * 60; // Convert minutes to seconds
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(() => {
        if (!start || timeLeft <= 0) return; // Don't run if start is false

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [start, timeLeft]); // React to `start` changes

    // Reset timer when `start` goes from false → true
    useEffect(() => {
        if (start) setTimeLeft(totalTime);
    }, [start, totalTime]);

    // Calculate percentage completion
    const percentage = ((totalTime - timeLeft) / totalTime) * 100;

    // Change color based on progress
    let progressBarColor = "#252A39"; // Default color
    if (percentage >= 80) progressBarColor = "red";
    else if (percentage >= 50) progressBarColor = "yellow";

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full justify-end">
                <p className="flex items-center">
                    <Clock2 className="w-5 h-5 me-1" />
                    Session Time Remaining:
                    <span>{formatTime(timeLeft)}</span>
                </p>
            </div>
            <SegmentedProgressBar percent={percentage} color={progressBarColor} divisions={1} />
        </div>
    );
};

export default PublicSpeakingTimer;
