interface IStartSessionProps extends React.ComponentProps<"div"> {
    videoSrc?: string;
}

const StartSession = ({ children, videoSrc }: IStartSessionProps) => {
    return (
        <div className="flex flex-col justify-between gap-8">
            <div className="space-y-2">
                <h6>Start your Session</h6>
                <p>Confirm you're ready to use your session credit.</p>
                <p>
                    Reminder: Remember to record for at least 2 minutes and take pauses to allow the audience to react.
                </p>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-x-4">{children}</div>
                <video className="w-full h-60 object-cover rounded-xl" controls>
                    <source
                        src={
                            videoSrc ||
                            "https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Chatbot+greeting2.mp4"
                        }
                        type="video/mp4"
                    />
                </video>
            </div>
        </div>
    );
};

export default StartSession;
