import { UnknownAction } from "@reduxjs/toolkit";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import SlideDetailsSection from "../form-sections/SlideDetailsSection";
import SlidePreviewAndSettingsSection from "../form-sections/SlidePreviewAndSettingsSection";
import UploadSlideSection from "../form-sections/UploadSlideSection";

interface IPracticeSetupLayoutProps extends HTMLAttributes<HTMLDivElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    activeSlideIndex: number;
    isGeneratingPreview: boolean;
    slidePreviews: string[];
    handleDeleteSlide: () => void;
    setActiveSlideIndex: (numPages: number) => UnknownAction;
}

const PracticeSetupLayout = ({
    form,
    activeSlideIndex,
    isGeneratingPreview,
    slidePreviews,
    handleDeleteSlide,
    setActiveSlideIndex,
}: IPracticeSetupLayoutProps) => {
    return (
        <div className="flex items-start">
            <UploadSlideSection
                {...{
                    activeSlideIndex,
                    isGeneratingPreview,
                    slidePreviews,
                    sessionType: form.getValues("session_type"),
                    handleDeleteSlide,
                    setActiveSlideIndex,
                }}
                className="flex-1 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar px-4 pt-4 lg:pb-[15vh] border-x border-bright-gray"
            />
            <SlideDetailsSection
                {...{ form, activeSlideIndex, slidePreviews, handleDeleteSlide }}
                className="flex-3 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar lg:pb-[15vh] md:pb-[20vh] pb-[25vh]"
            />
            <SlidePreviewAndSettingsSection
                {...{ form }}
                className="md:flex hidden flex-1 lg:h-[calc(100vh-56.53px)] h-full lg:overflow-y-auto hide-scrollbar px-4 pt-4 lg:pb-[15vh] md:pb-[20vh] border-x border-bright-gray"
            />
        </div>
    );
};

export default PracticeSetupLayout;
