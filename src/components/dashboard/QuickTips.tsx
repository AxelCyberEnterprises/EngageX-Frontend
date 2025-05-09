import { cn } from "@/lib/utils";
import React from "react";

type ITip = {
    heading: string;
    description: string;
}[];
interface IQuickTipsProps extends React.ComponentProps<"div"> {
    tips: ITip;
}

const QuickTips = ({ className, tips }: IQuickTipsProps) => {
    return (
        <div className={cn("p-4 border-1 border-bright-gray rounded-xl space-y-2", className)}>
            <h6 className="text-base">Quick Tips</h6>
            <ul className="list-disc list-outside pl-5 space-y-2">
                {tips.map(({ heading, description }, index) => (
                    <li key={heading + index} className="text-sm">
                        <span className="font-semibold">{heading}:</span>{" "}
                        <span className="text-foreground/90">{description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickTips;
