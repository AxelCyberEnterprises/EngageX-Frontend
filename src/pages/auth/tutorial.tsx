import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { welcomeMessage } from "@/components/layouts/userAuth";
import { useDispatch } from "react-redux";
import { setAuthPageImage } from "@/store/slices/authSlice";
import authPageImage2 from "@/assets/images/jpegs/authPage-image-2.jpeg";
import VideoPlayer from "@/components/authPageComponents/VideoPlayer";

const Tutorial: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const videoUrl = "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Onboarding.mp4";

    useEffect(() => {
        dispatch(setAuthPageImage(authPageImage2));
    }, [location.pathname, dispatch]);

    return (
        <div className="md:w-10/12 sm:w-3/5 h-[100dvh] flex justify-center sm:mx-auto flex-col overflow-y-auto gap-2 max-md:pl-0 max-lg:pl-5">
            {welcomeMessage()}
            <div className="flex justify-center items-center mt-0 flex-col">
                <p className="text-[#667085] font-[Montserrat] -mt-3 mb-8">
                    A tutorial walkthrough video by AI Jacqueleen
                </p>

                <div className="mb-4 lg:w-4/5 w-full">
                    <VideoPlayer src={videoUrl} width="w-full" className="rounded-lg overflow-hidden shadow-md" />
                </div>

                <button
                    onClick={() => navigate("/dashboard/user")}
                    className="font-[Montserrat] rounded-lg w-full md:py-5 py-4 lg:max-w-4/5 bg-primary hover:bg-primary/90 text-white" // Added text-white for visibility
                >
                    Finish up
                </button>
            </div>
        </div>
    );
};

export default Tutorial;
