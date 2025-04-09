import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "../button";

interface IAction extends HTMLAttributes<HTMLButtonElement> {
    label?: ReactNode;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    onClick?: () => void;
}

interface IErrorToastProps extends HTMLAttributes<HTMLDivElement> {
    heading?: ReactNode;
    description?: ReactNode;
    action?: IAction;
}

const ErrorToast = ({ className, heading, description, action }: IErrorToastProps) => {
    return (
        <div className={cn("size-full flex items-center justify-between gap-x-4", className)}>
            <div className="flex flex-col gap-y-1">
                <h6 className="text-base font-semibold text-destructive">{heading ? heading : "An error occurred"}</h6>
                <p className="text-sm text-gunmetal">{description ? description : "Someting went wrong."}</p>
            </div>
            <Button
                variant={action?.variant ? action.variant : "outline"}
                className={cn(
                    "shrink-0 text-gunmetal hover:text-gunmetal border-gunmetal",
                    action && action.className,
                )}
                onClick={() => (action?.onClick ? action.onClick() : toast.dismiss())}
            >
                {action ? action.label : "Close"}
            </Button>
        </div>
    );
};

export default ErrorToast;
