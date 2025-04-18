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
    slidePreviews: string[];
    numSlides: number;
    setActiveSlideIndex: (numPages: number) => UnknownAction;
    setNumSlides: (numSlides: number) => UnknownAction;
}

const PracticeSetupLayout = ({
    form,
    activeSlideIndex,
    slidePreviews,
    numSlides,
    setActiveSlideIndex,
    setNumSlides,
}: IPracticeSetupLayoutProps) => {
    return (
        <div className="flex items-start">
            <UploadSlideSection
                {...{
                    activeSlideIndex,
                    slidePreviews,
                    sessionType: form.getValues("session_type"),
                    numSlides,
                    setActiveSlideIndex,
                    setNumSlides,
                }}
                className="flex-1 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar px-4 pt-4 lg:pb-[15vh] md:pb-[20vh] pb-[25vh] border-x border-bright-gray"
            />
            <SlideDetailsSection
                {...{ form, activeSlideIndex, slidePreviews, numSlides }}
                className="flex-3 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar lg:pb-[15vh] md:pb-[20vh] pb-[25vh]"
            />
            <SlidePreviewAndSettingsSection
                {...{ form }}
                className="md:flex hidden flex-1 lg:h-[calc(100vh-56.53px)] lg:overflow-y-auto hide-scrollbar px-4 pt-4 lg:pb-[15vh] md:pb-[20vh] pb-[25vh] border-x border-bright-gray"
            />
        </div>
    );
};

export default PracticeSetupLayout;
