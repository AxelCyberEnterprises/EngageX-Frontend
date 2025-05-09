import { RootState } from "@/store";
import { toggle } from "@/store/slices/floatingChatbotSlice";
import { Headset } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function FloatingChatbot() {
    const dispatch = useDispatch();
    const showVideo = useSelector((state: RootState) => state.floating_chatbot.showVideo);
    return (
        <div className="size-16 shadow-xl rounded-full z-50 bg-primary-blue fixed bottom-10 right-10 flex items-center justify-center">
            <button
                className="bg-transparent h-full w-full"
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggle());
                }}
            >
                <Headset className="h-6 text-white" />
            </button>
            {showVideo && (
                <div onClick={(e) => e.stopPropagation()}>
                    <video
                        className="h-[19rem] bg-white object-cover w-[15rem] fixed right-32 bottom-10 rounded-xl"
                        controls
                    >
                        <source
                            src="https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Chatbot+greeting2.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            )}
        </div>
    );
}

export default FloatingChatbot;
