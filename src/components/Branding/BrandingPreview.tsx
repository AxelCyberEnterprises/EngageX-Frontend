import Logo from "@/assets/images/svgs/logo.svg";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { Download, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import EmptyState from "../empty-state";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// SVG icons from SideNav
const icons = {
    Dashboard: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path d="M12.0002 18L12.0002 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path
                d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    ),
    "Public Speaking": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path
                d="M7.00018 6.00049C5.77954 6.00415 5.10401 6.03335 4.54891 6.26634C3.77138 6.59269 3.13819 7.19552 2.76829 7.96158C2.46636 8.58687 2.41696 9.38799 2.31814 10.9902L2.1633 13.5009C1.91757 17.4853 1.7947 19.4775 2.96387 20.7388C4.13303 22 6.10271 22 10.0421 22H13.9583C17.8977 22 19.8673 22 21.0365 20.7388C22.2057 19.4775 22.0828 17.4853 21.8371 13.5009L21.6822 10.9902C21.5834 9.38799 21.534 8.58687 21.2321 7.96158C20.8622 7.19552 20.229 6.59269 19.4515 6.26634C18.8964 6.03335 18.2208 6.00415 17.0002 6.00049"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M17.0002 7L16.1144 4.78543C15.7322 3.82996 15.3996 2.7461 14.4168 2.25955C13.8926 2 13.2618 2 12.0002 2C10.7386 2 10.1078 2 9.58354 2.25955C8.60079 2.7461 8.2682 3.82996 7.88601 4.78543L7.00018 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.2081 14.7476C16.3449 14.3566 16.1388 13.9288 15.7478 13.7921C15.3568 13.6553 14.929 13.8614 14.7922 14.2524L16.2081 14.7476ZM9.20812 14.2524C9.07136 13.8614 8.64354 13.6553 8.25255 13.7921C7.86157 13.9288 7.65548 14.3566 7.79224 14.7476L9.20812 14.2524ZM11.2502 18.5C11.2502 18.9142 11.586 19.25 12.0002 19.25C12.4144 19.25 12.7502 18.9142 12.7502 18.5H11.2502ZM13.0002 11.25V13.25H14.5002V11.25H13.0002ZM11.0002 13.25V11.25H9.50018V13.25H11.0002ZM12.0002 14.25C11.4479 14.25 11.0002 13.8023 11.0002 13.25H9.50018C9.50018 14.6307 10.6195 15.75 12.0002 15.75V14.25ZM13.0002 13.25C13.0002 13.8023 12.5525 14.25 12.0002 14.25V15.75C13.3809 15.75 14.5002 14.6307 14.5002 13.25H13.0002ZM12.0002 10.25C12.5525 10.25 13.0002 10.6977 13.0002 11.25H14.5002C14.5002 9.86929 13.3809 8.75 12.0002 8.75V10.25ZM12.0002 8.75C10.6195 8.75 9.50018 9.86929 9.50018 11.25H11.0002C11.0002 10.6977 11.4479 10.25 12.0002 10.25V8.75ZM14.7922 14.2524C14.3834 15.4213 13.2834 16.25 12.0002 16.25V17.75C13.9487 17.75 15.5981 16.4917 16.2081 14.7476L14.7922 14.2524ZM12.0002 16.25C10.717 16.25 9.617 15.4213 9.20812 14.2524L7.79224 14.7476C8.4023 16.4917 10.0517 17.75 12.0002 17.75V16.25ZM11.2502 17V18.5H12.7502V17H11.2502Z"
                fill="currentColor"
            />
        </svg>
    ),
    "Pitch Practice": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M10 18L5 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14 18L19 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.5 12C2.5 14.8284 2.5 16.2426 3.37868 17.1213C4.25736 18 5.67157 18 8.5 18H15.5C18.3284 18 19.7426 18 20.6213 17.1213C21.5 16.2426 21.5 14.8284 21.5 12V8C21.5 5.17157 21.5 3.75736 20.6213 2.87868C19.7426 2 18.3284 2 15.5 2H8.5C5.67157 2 4.25736 2 3.37868 2.87868C2.5 3.75736 2.5 5.17157 2.5 8V12Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path d="M8 13V10M12 13V7M16 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    "Presentation Practice": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path
                d="M3 21H21M11 16H13M8 11C9.838 8.405 14.119 8.263 16 11M5.409 17.118C5.05 15.602 4.871 14.844 5.106 14.26C5.252 13.897 5.502 13.584 5.826 13.36C6.346 13 7.13 13 8.702 13H15.299C16.869 13 17.654 13 18.174 13.36C18.498 13.584 18.748 13.897 18.894 14.26C19.129 14.844 18.95 15.602 18.591 17.118C18.238 18.612 18.061 19.358 17.621 19.895C17.3436 20.2335 16.9954 20.5073 16.601 20.697C15.973 21 15.199 21 13.652 21H10.348C8.801 21 8.028 21 7.4 20.697C7.00557 20.5073 6.65742 20.2335 6.38 19.895C5.938 19.358 5.762 18.612 5.409 17.118ZM14 5C14 5.53043 13.7893 6.03914 13.4142 6.41421C13.0391 6.78929 12.5304 7 12 7C11.4696 7 10.9609 6.78929 10.5858 6.41421C10.2107 6.03914 10 5.53043 10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    "Session History": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path
                d="M7 18V16M12 18V15M17 18V13M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.99219 11.4863C8.14729 11.5581 13.0341 11.2328 15.8137 6.82132M13.9923 6.28835L15.8678 5.98649C16.0964 5.95738 16.432 6.13785 16.5145 6.35298L17.0104 7.99142"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    "Progress Tracking": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path
                d="M17.1995 2H6.79854C5.34054 2 4.06154 2.985 4.00354 4.404C3.92954 6.189 5.18554 7.374 6.50354 8.487C8.32854 10.027 9.24054 10.797 9.33554 11.771C9.35087 11.9237 9.35087 12.0763 9.33554 12.229C9.24054 13.204 8.32854 13.973 6.50354 15.513C5.14854 16.656 3.92554 17.72 4.00354 19.596C4.06054 21.016 5.33854 22 6.79754 22H17.1985C18.6565 22 19.9355 21.015 19.9945 19.596C20.0405 18.466 19.6215 17.342 18.7325 16.56C18.3275 16.203 17.9065 15.862 17.4925 15.513C15.6685 13.973 14.7565 13.203 14.6615 12.229C14.6463 12.0767 14.6463 11.9233 14.6615 11.771C14.7565 10.796 15.6695 10.027 17.4935 8.487C18.8335 7.356 20.0705 6.258 19.9935 4.404C19.9375 2.984 18.6575 2 17.1995 2Z"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.99854 21.638C8.99854 21.196 8.99854 20.975 9.08654 20.782C9.10035 20.7512 9.1157 20.7212 9.13254 20.692C9.23954 20.509 9.42054 20.38 9.78254 20.121C10.7885 19.402 11.2925 19.043 11.8635 19.005C11.9535 18.999 12.0435 18.999 12.1335 19.005C12.7055 19.043 13.2085 19.402 14.2135 20.121C14.5765 20.38 14.7575 20.509 14.8645 20.692C14.8819 20.722 14.8972 20.752 14.9105 20.782C14.9985 20.975 14.9985 21.196 14.9985 21.638V22H8.99854V21.638Z"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    "Session Comparison": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path
                d="M20.5 5.5H9.5C5.787 5.5 3 8.185 3 12M3.5 18.5H14.5C18.213 18.5 21 15.815 21 12M18.5 3C18.5 3 21 4.841 21 5.5C21 6.159 18.5 8 18.5 8M5.5 16C5.5 16 3 17.841 3 18.5C3 19.159 5.5 21 5.5 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    "Help & Support": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M11.992 17H12.001"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Settings: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path
                d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    ),
    Logout: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#FFFFFF" fill="none">
            <path
                d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
};

const navItems = [
    "Dashboard",
    "Public Speaking",
    "Pitch Practice",
    "Presentation Practice",
    "Session History",
    "Progress Tracking",
    "Session Comparison",
];

const bottomLinks = ["Help & Support", "Settings", "Logout"];

const BrandingPreview = () => {
    const {
        previews: { companyLogoPreview, faviconPreview },
        colors: { primaryColor, secondaryColor },
    } = useSelector((state: RootState) => state.branding);

    // Tabs for settings
    const sectionItems = ["Profile", "Notifications & Reminders", "Account & Security", "Credits", "Branding"];
    const activeIndex = 4; // Always show Branding tab as active in preview
    const notificationCount = 4; // Example static value for preview

    return (
        <section className="flex size-full overflow-hidden pointer-events-none">
            {/* Sidebar */}
            <aside className="w-8/25 min-h-[400px] flex flex-col" style={{ backgroundColor: secondaryColor }}>
                <header className="flex items-center px-4 py-3">
                    <img
                        src={companyLogoPreview || Logo}
                        alt="Company Logo"
                        className="w-8/12 max-h-8 object-contain object-left"
                    />
                </header>
                <nav className="flex-1 flex flex-col justify-between">
                    <ul className="space-y-2 px-2 text-white text-base font-medium">
                        {navItems.map((item) => (
                            <li
                                key={item}
                                className="py-1 px-2 flex items-center gap-2 [&_svg]:size-3 [&_svg]:shrink-0"
                            >
                                {icons[item as keyof typeof icons]}
                                <span className="text-xs">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="space-y-2 mt-8 px-2 mb-4 text-white text-base font-medium">
                        {bottomLinks.map((item) => (
                            <li
                                key={item}
                                className="py-1 px-2 flex items-center gap-2 [&_svg]:size-3 [&_svg]:shrink-0 rounded"
                                style={
                                    item === "Settings"
                                        ? { backgroundColor: secondaryColor, color: "#64ba9e" }
                                        : undefined
                                }
                            >
                                {React.cloneElement(icons[item as keyof typeof icons], {
                                    style: item === "Settings" ? { color: "#64ba9e" } : undefined,
                                })}
                                <span className="text-xs">{item}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 flex flex-col h-full">
                <div className="bg-white flex flex-col flex-1">
                    <div className="z-10 sticky top-0 flex justify-between items-center px-2 pt-4 pb-2">
                        <h1 className="text-lg">Settings</h1>
                    </div>
                    <section className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide max-w-[464px] px-2">
                        <div className="relative flex gap-1.5 min-w-max border-b-[1.5px] border-[#E0E0E0]">
                            {sectionItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "relative text-[#6F7C8E] flex items-center gap-1 pb-1 transition-colors duration-600",
                                        { "text-[#252A39]": activeIndex === index },
                                    )}
                                >
                                    <p className="text-[8px]">{item}</p>
                                    {item === "Notifications & Reminders" && (
                                        <span className="rounded-full bg-[#F2F4F7] size-3.5 grid place-content-center text-[7px]">
                                            {notificationCount}
                                        </span>
                                    )}
                                    {activeIndex === index && (
                                        <span
                                            className="absolute -bottom-[2px] left-0 w-full h-[2px]"
                                            style={{ backgroundColor: secondaryColor }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="px-2 py-4">
                        <div className="mb-3">
                            <h2 className="text-[13px] mb-1">Branding & White-Labeling</h2>
                            <p className="text-[8px] text-[#6F7C8E]">
                                Customize your platform's look and feel to match your brand.
                            </p>
                        </div>

                        <div className="w-full p-1">
                            <h3 className="text-[10px] mb-3">Branding Uploads Section</h3>
                            <div className="flex items-center gap-3 mb-5">
                                {/* Company Logo */}
                                <div className="flex flex-col gap-1.5 w-full">
                                    <span className="text-[8px] font-medium">Company Logo: (file type .png/.svg)</span>
                                    <div className="flex flex-col items-center">
                                        <div className="h-15.5 w-full rounded-t-sm border-x border-t border-light-silver overflow-hidden">
                                            {companyLogoPreview ? (
                                                <img
                                                    src={companyLogoPreview}
                                                    alt="Company Logo"
                                                    className="size-full object-contain"
                                                />
                                            ) : (
                                                <EmptyState
                                                    text="Upload company logo"
                                                    className="size-full [&_img]:w-8 p-2 gap-0 text-[8px] rounded-none"
                                                />
                                            )}
                                        </div>
                                        <div className="flex items-center w-full">
                                            <Button
                                                type="button"
                                                className="w-full h-6 bg-transparent hover:bg-transparent font-normal text-[#6F7C8E] text-[8px] gap-1 rounded-none rounded-bl-sm border border-light-silver"
                                            >
                                                <Download className="size-3" />
                                                Change
                                            </Button>
                                            <Button
                                                type="button"
                                                className="w-1/2 h-6 bg-transparent hover:bg-transparent font-normal text-[#6F7C8E] text-[8px] gap-1 rounded-none rounded-br-sm border-y border-r border-light-silver"
                                            >
                                                <Trash2 className="size-3" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                {/* Favicon */}
                                <div className="flex flex-col gap-1.5 w-full">
                                    <span className="text-[8px] font-medium">Favicon: (file type .ico/.png/.svg)</span>
                                    <div className="flex flex-col items-center">
                                        <div className="h-15.5 w-full rounded-t-sm border-x border-t border-light-silver overflow-hidden">
                                            {faviconPreview ? (
                                                <img
                                                    src={faviconPreview}
                                                    alt="Favicon"
                                                    className="size-full object-contain"
                                                />
                                            ) : (
                                                <EmptyState
                                                    text="Upload favicon"
                                                    className="size-full [&_img]:w-8 p-2 gap-0 text-[8px] rounded-none"
                                                />
                                            )}
                                        </div>
                                        <div className="flex items-center w-full">
                                            <Button
                                                type="button"
                                                className="w-full h-6 bg-transparent hover:bg-transparent font-normal text-[#6F7C8E] text-[8px] gap-1 rounded-none rounded-bl-sm border border-light-silver"
                                            >
                                                <Download className="size-3" />
                                                Change
                                            </Button>
                                            <Button
                                                type="button"
                                                className="w-1/2 h-6 bg-transparent hover:bg-transparent font-normal text-[#6F7C8E] text-[8px] gap-1 rounded-none rounded-br-sm border-y border-r border-light-silver"
                                            >
                                                <Trash2 className="size-3" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-2 mb-10">
                                <label htmlFor="domain" className="text-[8px]">
                                    Enter Company Custom Domain
                                </label>
                                <Input
                                    id="domain"
                                    placeholder="portal.yourbrand.com"
                                    className="h-7 rounded-sm focus-visible:ring-0 shadow-none text-gunmetal placeholder:text-[8px] placeholder:text-auro-metal-saurus"
                                />
                                <span
                                    className="text-[8px] underline underline-offset-2"
                                    style={{ color: secondaryColor }}
                                >
                                    How do I set up my CNAME?
                                </span>
                            </div>

                            <div className="mt-8 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    className="h-6 text-[8px] px-3 font-normal bg-transparent border rounded-sm"
                                    style={{ borderColor: secondaryColor, color: secondaryColor }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="h-6 text-[8px] px-3 rounded-sm"
                                    style={{ backgroundColor: secondaryColor }}
                                >
                                    Save Branding
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default BrandingPreview;
