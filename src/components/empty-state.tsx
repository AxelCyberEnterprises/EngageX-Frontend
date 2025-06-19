import NoUploadedSlides from "@/assets/images/svgs/no-uploaded-slides.svg";
import { cn } from "@/lib/utils";

interface IEmptyStateProps extends React.ComponentProps<"div"> {
    text: string;
    icon?: React.ReactNode;
}

const EmptyState = ({ className, text }: IEmptyStateProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 p-4 bg-ghost-white text-sm text-primary-base rounded-lg",
                className,
            )}
        >
            <img src={NoUploadedSlides} alt="" className="object-cover" />
            <span>{text}</span>
        </div>
    );
};

export default EmptyState;
