import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ITooltipKeys, tooltipItems } from "@/config/tooltip-template";
import { cn } from "@/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React, { useState } from "react";

interface IDynamicTooltipProps extends React.ComponentProps<typeof TooltipPrimitive.Content> {
    tooltipKey: ITooltipKeys;
    children: React.ReactNode;
}

export const DynamicTooltip = ({ children, className, tooltipKey, ...props }: IDynamicTooltipProps) => {
    const { title, description, warning } = tooltipItems[tooltipKey];
    const [open, setOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(true);
        // Optional: auto-close after 10 seconds
        setTimeout(() => setOpen(false), 10000);
    };

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip open={open} onOpenChange={setOpen}>
                <TooltipTrigger
                    asChild
                    onClick={handleClick}
                    onPointerDown={(e) => e.stopPropagation()} // avoid closing too fast
                >
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className={cn("bg-white max-w-64 space-y-1 p-3 border border-bright-gray", className)}
                    {...props}
                >
                    {title && <h6 className="text-base text-black font-semibold">{title}</h6>}
                    <p className="font-normal text-black text-base">{description}</p>
                    {warning && (
                        <span className="font-normal text-base !text-red-600" style={{ color: "#940803" }}>
                            {warning}
                        </span>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
