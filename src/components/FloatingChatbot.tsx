import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { Headset } from "lucide-react";
import { useDispatch } from "react-redux";
import Chatbot from "./dialogs/dialog-contents/Chatbot";
import { Button } from "./ui/button";

function FloatingChatbot() {
    const dispatch = useDispatch();

    return (
        <Button
            className="size-16 shadow-xl rounded-full z-50 bg-primary-blue hover:bg-primary-blue fixed bottom-10 right-10"
            onClick={() =>
                dispatch(
                    openDialog({
                        key: "floating-chatbot",
                        children: <Chatbot />,
                    }),
                )
            }
        >
            <Headset className="size-6 text-white" />
        </Button>
    );
}

export default FloatingChatbot;
