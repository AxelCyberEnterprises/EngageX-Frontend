import { cn } from "@/lib/utils";
import { RootState, useAppDispatch } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

const DynamicDialog = () => {
    const {
        data: { children, classMap, description, title },
        isOpen,
    } = useSelector((state: RootState) => state.dynamicDialog);
    const dispatch = useAppDispatch();

    const handleOpenChange = useCallback(
        (open: boolean) => {
            if (open === false) dispatch(closeDialog());
        },
        [dispatch],
    );

    return (
        <Dialog open={isOpen} onOpenChange={(open) => handleOpenChange(open)}>
            <DialogContent
                className={cn(
                    "[&_[data-slot='dialog-close']]:p-0 [&_[data-slot='dialog-close']]:bg-transparent [&_[data-slot='dialog-close']>svg]:text-gunmetal [&_[data-slot='dialog-close']>svg:not([class*='size-'])]:size-5",
                    classMap?.modal,
                )}
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default DynamicDialog;
