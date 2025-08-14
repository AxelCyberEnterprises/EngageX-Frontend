interface SegmentedProgressBarProps {
    percent: number;
    color: string;
    divisions: number;
    className?: string;
    height?: string; // New prop specifically for height
}

const SegmentedProgressBar = ({ 
    percent, 
    color, 
    divisions, 
    className = '', 
    height = '0.875rem' // Default height (equivalent to h-3.5)
}: SegmentedProgressBarProps) => {
    return (
        <div className={`bar flex gap-1 ${className}`} style={{ height }}>
            {[...Array(divisions)].map((_, index) => {
                const fillPercentage = Math.min(
                    100,
                    Math.max(0, ((percent - index * (100 / divisions)) / (100 / divisions)) * 100),
                );

                return (
                    <div
                        key={index}
                        className={`empty__bar rounded-4xl w-full ${className}`}
                        style={{ 
                            backgroundColor: "#D0D5DD",
                            height
                        }}
                    >
                        <div
                            className={`bar__fill rounded-4xl transition-all duration-300 ${className}`}
                            style={{ 
                                width: `${fillPercentage}%`, 
                                backgroundColor: color,
                                height
                            }}
                        ></div>
                    </div>
                );
            })}
        </div>
    );
};

export default SegmentedProgressBar;
