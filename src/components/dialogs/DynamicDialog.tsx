import { RootState } from "@/store";
import { closeDialog } from "@/store/slices/dynamicDialogSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

const DynamicDialog = () => {
    const {
        data: { children, description, title },
        isOpen,
    } = useSelector((state: RootState) => state.dynamicDialog);
    const dispatch = useDispatch();

    const handleOpenChange = useCallback(
        (open: boolean) => {
            if (open === false) dispatch(closeDialog());
        },
        [dispatch],
    );

    return (
        <Dialog open={isOpen} onOpenChange={(open) => handleOpenChange(open)}>
            <DialogContent className="w-100 max-w-100 h-72 max-h-72 [&_[data-slot='dialog-close']]:p-0 [&_[data-slot='dialog-close']]:bg-transparent [&_[data-slot='dialog-close']>svg]:text-gunmetal [&_[data-slot='dialog-close']>svg:not([class*='size-'])]:size-5">
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
