import React from "react";

interface FullCircleProgressProps {
    percent: number; // Value between 0 and 1 (e.g., 0.75 for 75%)
    color: string; // Stroke color of the progress bar
}

const FullCircleProgress: React.FC<FullCircleProgressProps> = ({ percent, color }) => {
    const radius = 40; // Radius of the circle
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius; // Total length of the circle
    const progress = circumference * (percent/100); // Stroke dashoffset

    // Calculate the position of the small circle (end of progress arc)
    const angle = (percent/100) * 360 - 90 + 6; // Convert percentage to angle (start from top)
    const radians = (angle * Math.PI) / 180;
    const endX = 60 + radius * Math.cos(radians);
    const endY = 60 + radius * Math.sin(radians);

    return (
        <div className="relative w-28 h-28 flex justify-center items-center">
            <svg width="100%" height="100%" viewBox="0 0 120 120">
                {/* Background Circle */}
                <circle cx="60" cy="60" r={radius} fill="none" stroke="#F2F2F2" strokeWidth={strokeWidth} />

                {/* Progress Circle */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="#FFF"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    transform="rotate(-90 60 60)" // Start from the top
                />

                {/* Small Circle at End */}
                <circle cx={endX} cy={endY} r="2.5" fill="transparent" stroke={color} strokeWidth="2" />
            </svg>

            {/* Centered Text */}
            <div className="absolute text-xs font-semibold">{percent >= 80 ? "Excellent" : percent >= 50 ? "Good" : "Satisfactory"}</div>
        </div>
    );
};

export default FullCircleProgress;
