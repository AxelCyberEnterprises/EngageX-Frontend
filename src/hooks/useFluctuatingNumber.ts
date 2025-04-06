import { useState, useEffect } from "react";

const useFluctuatingNumber = (baseValue: number, interval = 500) => {
    const [value, setValue] = useState(baseValue);

    useEffect(() => {
        const fluctuate = () => {
            if (baseValue > 0) {
                const fluctuation = Math.floor(Math.random() * 5) - 2; // Random between -2 and +2
                const newValue = Math.max(0, baseValue + fluctuation); // Keep it within range, never < 0
                setValue(newValue);
            }
        };

        const intervalId = setInterval(fluctuate, interval);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [baseValue, interval]); // Only re-run when baseValue changes

    return value;
};

export default useFluctuatingNumber;
