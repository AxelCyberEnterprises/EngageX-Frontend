import { useRef, useState } from "react";

interface CountdownTimerProps {
    minutes: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ minutes }) => {
    const totalTime = minutes * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const initializedRef = useRef(false); // Prevents multiple starts

    const startTimer = () => {
        if (initializedRef.current) return; // Prevent multiple timers
        initializedRef.current = true;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    timerRef.current = null;
                    return 0;
                }

                const newTimeLeft = prev - 1;
                return newTimeLeft;
            });
        }, 1000);
    };

    startTimer(); // This ensures the timer starts

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <p className="ms-3 text-gray">
            Time: <span className="text-maximum-yellow-red">{formatTime(timeLeft)}</span>
        </p>
    );
};

export default CountdownTimer;
