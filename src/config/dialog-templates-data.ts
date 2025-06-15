import { ReactNode } from "react";

export interface IDialogTemplateProps {
    key: (typeof dialogKeys)[number];
    title?: string;
    description?: string;
    children?: ReactNode;
    classMap?: { modal?: string; header?: string; trigger?: string };
}

export const dialogKeys = ["default", "start-session", "feature-walkthrough"] as const;

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
];
