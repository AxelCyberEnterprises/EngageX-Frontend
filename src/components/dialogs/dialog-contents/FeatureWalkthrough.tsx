import { Play } from "lucide-react";
import VideoPlayer from "@/components/authPageComponents/VideoPlayer";
import { useState } from "react";

const FeatureWalkthrough = () => {
    const [activeVideo, setActiveVideo] = useState(1);
    const [autoplay, setAutoplay] = useState(false);
    const videos = [
        {
            id: 1,
            title: "Homepage Navigation",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/Script+1.mp4",
        },
        {
            id: 2,
            title: "Features page navigation",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/Script+2.mp4",
        },
        {
            id: 3,
            title: "Pricing page navigation",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/Script+3.mp4",
        },
        {
            id: 4,
            title: "Getting started",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/Script+4.mp4",
        },
        {
            id: 5,
            title: "Understanding your dashboard",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/Script+5.mp4",
        },
        {
            id: 6,
            title: "Session Improvement",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/(Script+6)Session+Improvement.mp4",
        },
        {
            id: 7,
            title: "Session Report",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/(Script+7)Session+Report.mp4",
        },
        {
            id: 8,
            title: "Accessing a live coach",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/(Script+8)Accessing+a+Live+Coach.mp4",
        },
        {
            id: 9,
            title: "Sessions Setup",
            videoUrl: "https://d37wg920pbp90y.cloudfront.net/static-videos/How-to/(Script+9)Sessions+Setup.mp4",
        },
    ];

    const handleVideoClick = (id: number) => {
        setActiveVideo(id);
        setAutoplay(true);
    };

    const getVideoUrl = (id: number) => {
        const video = videos.find((video) => video.id === id);
        return video ? video.videoUrl : "";
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-green-sheen text-center">Feature Walkthrough Video</p>
            <VideoPlayer src={getVideoUrl(activeVideo)} showPauseOverlay={true} hideControls={false} autoPlay={autoplay} />
            <div className="flex flex-col gap-3 text-auro-metal-saurus mt-3 max-h-56 overflow-y-auto">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className={`flex justify-between items-center cursor-pointer p-3 rounded-md ${
                            activeVideo === video.id ? "text-green-sheen bg-bright-gray" : ""
                        }`}
                        onClick={() => handleVideoClick(video.id)}
                    >
                        <p>{video.title}</p>

                        <div className="flex items-center">
                            <div className="rounded-full bg-gray w-5 h-5 flex items-center justify-center ms-1">
                                <Play
                                    fill="#FFF"
                                    className={`h-3 w-3 ${activeVideo === video.id ? "text-green-sheen" : "text-gray"}`}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureWalkthrough;
