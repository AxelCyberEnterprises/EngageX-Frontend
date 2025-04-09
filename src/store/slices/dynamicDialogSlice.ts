import { dialogDataItems, IDialogTemplateProps } from "@/config/dialog-templates-data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDynamicDialogProps {
    data: IDialogTemplateProps;
    isOpen: boolean;
}

const DEFAULT_DATA: IDialogTemplateProps = {
    key: "default",
    title: "",
    description: "",
    children: "",
};

const initialState: IDynamicDialogProps = {
    data: DEFAULT_DATA,
    isOpen: false,
};

const dynamicDialogSlice = createSlice({
    name: "dynamicDialog",
    initialState,
    reducers: {
        openDialog: (state, action: PayloadAction<IDialogTemplateProps>) => {
            const { payload } = action;
            const dialogDataItem = dialogDataItems.find(({ key }) => key === payload.key);

            if (dialogDataItem) state.data = { ...dialogDataItem, ...payload };
            else state.data = payload;

            state.isOpen = true;
        },
        closeDialog: (state) => {
            state.isOpen = false;
            state.data = DEFAULT_DATA;
        },
    },
});

export const { openDialog, closeDialog } = dynamicDialogSlice.actions;
export default dynamicDialogSlice.reducer;
