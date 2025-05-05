import { Play } from "lucide-react";
import VideoPlayer from "@/components/authPageComponents/VideoPlayer";
import { useState } from "react";

const FeatureWalkthrough = () => {
    const [activeVideo, setActiveVideo] = useState(1);
    const videos = [
        {
            id: 1,
            title: "Homepage Navigation",
            videoUrl: "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/How-to/Script+1.mp4",
        },
        {
            id: 2,
            title: "Features page navigation",
            videoUrl: "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/How-to/Script+2.mp4",
        },
        {
            id: 3,
            title: "Pricing page navigation",
            videoUrl: "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/How-to/Script+3.mp4",
        },
        {
            id: 4,
            title: "Getting started",
            videoUrl: "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/How-to/Script+4.mp4",
        },
        {
            id: 5,
            title: "Homepage",
            videoUrl: "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/How-to/Script+5.mp4",
        },
    ];

    const handleVideoClick = (id: number) => {
        setActiveVideo(id);
    };

    const getVideoUrl = (id: number) => {
        const video = videos.find((video) => video.id === id);
        return video ? video.videoUrl : "";
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-green-sheen text-center">Feature Walkthrough Video</p>
            <VideoPlayer src={getVideoUrl(activeVideo)} showPauseOverlay={true} hideControls={false} />
            <div className="flex flex-col gap-3 text-auro-metal-saurus mt-3">
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
                                    className={`h-3 w-3 ${
                                        activeVideo === video.id ? "text-green-sheen" : "text-gray"
                                    }`}
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
