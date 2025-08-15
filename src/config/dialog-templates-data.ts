import { ReactNode } from "react";

export interface IDialogTemplateProps {
    key: (typeof dialogKeys)[number];
    title?: string;
    description?: string;
    children?: ReactNode;
    classMap?: { modal?: string; header?: string; trigger?: string };
}

export const dialogKeys = [
    "default",
    "start-session",
    "feature-walkthrough",
    "cname-setup-help",
    "add-members",
] as const;

export const dialogDataItems: IDialogTemplateProps[] = [
    {
        key: "cname-setup-help",
        classMap: {
            modal: "w-100 max-w-100",
            header: "sr-only",
        },
    },
    { key: "feature-walkthrough" },
    {
        key: "start-session",
        classMap: {
            modal: "w-100 max-w-100",
            header: "sr-only",
        },
    },
    {
        key: "start-session",
        classMap: {
            modal: "w-100 max-w-100",
            header: "sr-only",
        },
    },
    {
        key: "add-members",
        title: "Add Members",
        classMap: {
            modal: "max-h-9/10 sm:max-w-287.5",
            header: "[&_[data-slot='dialog-description']]:sr-only",
        },
    },
];
