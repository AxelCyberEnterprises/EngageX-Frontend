import { ReactNode } from "react";

export interface IDialogTemplateProps {
    key: (typeof dialogKeys)[number];
    title?: string;
    description?: string;
    children?: ReactNode;
    classMap?: { modal?: string; header?: string; trigger?: string };
}

export const dialogKeys = ["default", "start-session", "feature-walkthrough", "floating-chatbot"] as const;

export const dialogDataItems: IDialogTemplateProps[] = [
    {
        key: "start-session",
        classMap: {
            modal: "w-100 max-w-100",
        },
    },
    {
        key: "feature-walkthrough",
    },
    {
        key: "floating-chatbot",
        classMap: {
            modal: "bg-alice-blue border-none sm:max-w-4/5 max-h-4/5 [&_[data-slot='dialog-close']]:hidden",
        },
    },
];
