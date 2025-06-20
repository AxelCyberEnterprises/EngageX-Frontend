/* eslint-disable react-hooks/exhaustive-deps */
import Branding from "@/components/Branding";
import AccountSecurity from "@/components/dashboard/AccountSecurity";
import Credits from "@/components/dashboard/Credits";
import NotificationSettings from "@/components/dashboard/Notification";
import PersonalInfoForm from "@/components/dashboard/ProfileForm";
import ActionModal from "@/components/modals/modalVariants/ActionModal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Arrow from "../../../assets/images/svgs/arrow.svg";
import circleCheck from "../../../assets/images/svgs/circle-check.svg";

const UserSettings: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const sectionFromUrl = searchParams.get("section");
    const notificationCount = 4;
    const sectionItems = ["Profile", "Notifications & Reminders", "Account & Security", "Credits", "Branding"];

    useEffect(() => {
        if (sectionFromUrl) {
            const normalizedUrlSection = sectionFromUrl.toLowerCase().trim();
            const newIndex = sectionItems.findIndex((item) => {
                const normalizedItem = item.toLowerCase().split("&")[0].trim();
                return normalizedItem.includes(normalizedUrlSection) || normalizedUrlSection.includes(normalizedItem);
            });

            if (newIndex !== -1) {
                setActiveIndex(newIndex);
            }
        }
    }, [sectionFromUrl, sectionItems]);

    const handleSectionChange = (index: number) => {
        setActiveIndex(index);
        setSearchParams({ section: sectionItems[index] });
    };
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -150 : 150,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <ActionModal
                show={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                icon={circleCheck}
                head="Settings successfully saved"
                message="Your new settings has been saved successfully."
                cta="Finish"
                ctaClassName="border border-[#D5D7DA] text-[#FFFFFF]"
            />
            <div className="h-screen flex flex-col sm:pt-8 pt-6 sm:px-8 px-4">
                <div className="bg-white z-10 sticky top-0 flex justify-between items-center mb-4">
                    <h1 className="xl:text-4xl lg:text-3xl sm:text-2xl text-xl">Settings</h1>
                    <div className="flex gap-5">
                        <div className="flex sm:hidden gap-2">
                            <button
                                onClick={() => scroll("left")}
                                className="p-2 rounded-[10px] border border-[#E4E7EC] bg-transparent transition"
                            >
                                <img src={Arrow} alt="arrow" className="w-4 h-4 rotate-180" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="p-2 rounded-[10px] border border-[#E4E7EC] bg-transparent transition"
                            >
                                <img src={Arrow} alt="arrow" className="w-4 h-4" />
                            </button>
                        </div>
                        <SidebarTrigger className="-ml-1 p-5" />
                    </div>
                </div>

                <section
                    ref={scrollRef}
                    className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide max-w[464px]"
                >
                    <div className="relative flex gap-4 min-w-max border-b-2 border-[#E0E0E0]">
                        {sectionItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleSectionChange(index)}
                                className={`relative cursor-pointer flex items-center gap-2 py-4 transition-colors duration-600 ${
                                    activeIndex === index ? "text-[#252A39]" : "text-[#6F7C8E]"
                                }`}
                            >
                                {item}
                                {item === "Notifications & Reminders" && (
                                    <p className="rounded-full bg-[#F2F4F7] lg:w-6 lg:h-6 w-5 h-5 grid place-content-center text-xs">
                                        {notificationCount}
                                    </p>
                                )}
                                {activeIndex === index && (
                                    <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-secondary transition-colors duration-700"></span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex-1 overflow-y-auto scrollbar-hide">
                    {activeIndex === 0 && <PersonalInfoForm />}
                    {activeIndex === 1 && <NotificationSettings />}
                    {activeIndex === 2 && <AccountSecurity />}
                    {activeIndex === 3 && <Credits />}
                    {activeIndex === 4 && <Branding />}
                </section>
            </div>
        </>
    );
};

export default UserSettings;
