import { Headset } from "lucide-react";
import { useState } from "react";

function FloatingChatbot() {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="size-16 shadow-xl rounded-full z-50 bg-purple-500 fixed bottom-10 right-10 flex items-center justify-center">
      <button
        className="bg-transparent"
        onClick={() => setShowVideo(!showVideo)}
      >
        <Headset className="h-6 text-white" />
      </button>
      {showVideo && (
        <div>
          <video
            className="h-[29rem] bg-white object-cover w-[25rem] fixed right-32 bottom-10 rounded-xl"
            controls
          >
            <source
              src="https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Chatbot+greeting.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      )}
    </div>
  );
}
6;

export default FloatingChatbot;
