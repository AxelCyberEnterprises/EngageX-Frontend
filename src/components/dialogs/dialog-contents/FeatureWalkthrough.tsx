import walkthroughImage from "@/assets/images/pngs/walkthrough-image.png";
import { Play } from "lucide-react";

const FeatureWalkthrough = () => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-green-sheen text-center">Feature Walkthrough Video</p>
            <img src={walkthroughImage} alt="green image of users" className="w-full h-64 mb-4" />
            <div className="flex flex-col gap-3 text-auro-metal-saurus">
                <div className="flex justify-between items-center cursor-pointer">
                    <p>Home page/Dashboard</p>

                    <div className="flex items-center">
                        <small>1:20</small>
                        <div className="rounded-full bg-gray w-5 h-5 flex items-center justify-center ms-1">
                            <Play fill="#FFF" className="bg-gray h-3 w-3 text-gray" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center cursor-pointer">
                    <p>Goal Setting & Tracking</p>

                    <div className="flex items-center">
                        <small>1:20</small>
                        <div className="rounded-full bg-gray w-5 h-5 flex items-center justify-center ms-1">
                            <Play fill="#FFF" className="bg-gray h-3 w-3 text-gray" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center cursor-pointer">
                    <p>Session History</p>

                    <div className="flex items-center">
                        <small>1:20</small>
                        <div className="rounded-full bg-gray w-5 h-5 flex items-center justify-center ms-1">
                            <Play fill="#FFF" className="bg-gray h-3 w-3 text-gray" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureWalkthrough;
