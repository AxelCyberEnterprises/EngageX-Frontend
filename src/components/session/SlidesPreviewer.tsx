import { useEffect, useState } from "react";

// === Props ===
type SliderProps = {
    images: string[];
    minutes: number;
};

// Shared internally between components
type SharedProps = SliderProps & {
    currentSlide: number;
};

// === Custom Hook: Shared Logic ===
// eslint-disable-next-line react-refresh/only-export-components
export function useImageSlider({ images, minutes }: SliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = images.length;
    const durationPerSlide = (minutes * 60 * 1000) / totalSlides;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, durationPerSlide);

        return () => clearInterval(interval);
    }, [durationPerSlide, totalSlides]);

    return {
        currentSlide,
        totalSlides,
        durationPerSlide,
    };
}

// === Main Slider Component ===
export default function ImageSlider({ images, currentSlide }: SharedProps) {
    return (
        <div className="w-full h-full relative overflow-hidden">
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
}

// === Slide Countdown Component ===
export function SlideCountdown({ durationPerSlide }: { durationPerSlide: number }) {
    const [countdown, setCountdown] = useState(durationPerSlide / 1000);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev <= 1 ? durationPerSlide / 1000 : prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [durationPerSlide]);

    const minutes = Math.floor(countdown / 60);
    const seconds = Math.floor(countdown % 60)
        .toString()
        .padStart(2, "0");

    const percentage = (1 - countdown / (durationPerSlide / 1000)) * 100;

    let timerColor = "#252A39"; // Default color
    if (percentage >= 80) timerColor = "#DD524D";
    else if (percentage >= 50) timerColor = "#F5B546";

    return (
        <p className="text-grey">
            Time:
            <span className="ms-2" style={{ color: timerColor }}>
                {minutes}:{seconds}
            </span>
        </p>
    );
}

// === Slide Progress Component ===
export function SlideProgress({ currentSlide, totalSlides }: { currentSlide: number; totalSlides: number }) {
    return (
        <small className="text-grey">
            Slide {currentSlide + 1} of {totalSlides}
        </small>
    );
}

// === Next Slide Image Component ===
export function NextSlideImage({ images, currentSlide }: { images: string[]; currentSlide: number }) {
    if (images.length === 0) return null;
    const nextIndex = (currentSlide + 1) % images.length;
    return <img src={images[nextIndex]} alt={`Next Slide ${nextIndex + 1}`} className="w-full h-full object-cover rounded-lg" />;
}
