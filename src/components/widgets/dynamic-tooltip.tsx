import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ITooltipKeys, tooltipItems } from "@/config/tooltip-template";
import { cn } from "@/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface IDynamicTooltipProps extends React.ComponentProps<typeof TooltipPrimitive.Content> {
    tooltipKey: ITooltipKeys;
    children: React.ReactNode;
}

export const DynamicTooltip = ({ children, className, tooltipKey, ...props }: IDynamicTooltipProps) => {
    const { title, description } = tooltipItems[tooltipKey];

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    className={cn("bg-white text-black max-w-64 space-y-1 p-3 border border-bright-gray", className)}
                    {...props}
                >
                    {title && <h6 className="text-lg">{title}</h6>}
                    <p className="font-normal text-base">{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
