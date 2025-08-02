/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "@/assets/images/svgs/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { Input } from "../ui/input";
import { useTheme } from "@/context/ThemeContext/hook";
import { RootState } from "@/store";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoutConfirmation from "../dialogs/dialog-contents/LogoutDialog";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";

const SideNav: React.FC = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const profile = useSelector((state: RootState) => state.profile.data);
    const dispatch = useDispatch();

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments.length >= 2 ? pathSegments[1] : "";
    // Check if user is an enterprise user and get their user type
    const isEnterpriseUser = profile?.is_enterprise_user;
    const enterpriseUserType = profile?.user_type;

    // Helper function to get coaching link based on user type
    const getCoachingLink = () => {
        if (!isEnterpriseUser) return null;

        const coachingIcon = (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="me-5"
                color="#BDBDBD"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13 15C10.708 21 4.292 15 2 21L13 15ZM15.5 15H17.001C19.358 15 20.537 15 21.269 14.268C22.001 13.536 22.001 12.357 22.001 10V8C22.001 5.643 22.001 4.464 21.269 3.732C20.537 3 19.36 3 17.001 3H13.001C10.644 3 9.466 3 8.734 3.732C8.114 4.352 8.018 5.293 8.004 7"
                    fill="currentColor"
                />
                <path
                    d="M7.5 15C8.88071 15 10 13.8807 10 12.5C10 11.1193 8.88071 10 7.5 10C6.11929 10 5 11.1193 5 12.5C5 13.8807 6.11929 15 7.5 15Z"
                    fill="currentColor"
                />
                <path d="M12 7H18H12ZM18 11H15H18Z" fill="currentColor" />
                <path
                    d="M13 15C10.708 21 4.292 15 2 21M15.5 15H17.001C19.358 15 20.537 15 21.269 14.268C22.001 13.536 22.001 12.357 22.001 10V8C22.001 5.643 22.001 4.464 21.269 3.732C20.537 3 19.36 3 17.001 3H13.001C10.644 3 9.466 3 8.734 3.732C8.114 4.352 8.018 5.293 8.004 7M12 7H18M18 11H15M10 12.5C10 13.8807 8.88071 15 7.5 15C6.11929 15 5 13.8807 5 12.5C5 11.1193 6.11929 10 7.5 10C8.88071 10 10 11.1193 10 12.5Z"
                    stroke="currentColor"
                    stroke-width="0.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        );

        if (enterpriseUserType === "general") {
            return {
                name: "Coaching",
                icon: coachingIcon,
                path: "/dashboard/user/the-coaching-room",
            };
        }

        if (enterpriseUserType === "rookie") {
            return {
                name: "Rookie",
                icon: coachingIcon,
                path: "/dashboard/user/the-rookie-room",
            };
        }

        return null;
    };

    const userLinks = [
        {
            name: "Dashboard",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
                    <path d="M12.0002 18L12.0002 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path
                        d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            path: "/dashboard/user",
        },
        getCoachingLink(),
        {
            name: "Public Speaking",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
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
            path: "/dashboard/user/public-speaking",
        },
        {
            name: "Pitch Practice",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-5"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
                    <path
                        d="M12 18V22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
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
            path: "/dashboard/user/pitch-practice",
        },
        {
            name: "Presentation Practice",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-5"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
                    <path
                        d="M3 21H21M11 16H13M8 11C9.838 8.405 14.119 8.263 16 11M5.409 17.118C5.05 15.602 4.871 14.844 5.106 14.26C5.252 13.897 5.502 13.584 5.826 13.36C6.346 13 7.13 13 8.702 13H15.299C16.869 13 17.654 13 18.174 13.36C18.498 13.584 18.748 13.897 18.894 14.26C19.129 14.844 18.95 15.602 18.591 17.118C18.238 18.612 18.061 19.358 17.621 19.895C17.3436 20.2335 16.9954 20.5073 16.601 20.697C15.973 21 15.199 21 13.652 21H10.348C8.801 21 8.028 21 7.4 20.697C7.00557 20.5073 6.65742 20.2335 6.38 19.895C5.938 19.358 5.762 18.612 5.409 17.118ZM14 5C14 5.53043 13.7893 6.03914 13.4142 6.41421C13.0391 6.78929 12.5304 7 12 7C11.4696 7 10.9609 6.78929 10.5858 6.41421C10.2107 6.03914 10 5.53043 10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            path: "/dashboard/user/presentation-practice",
        },
        {
            name: "Session History",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
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
            path: "/dashboard/user/session-history",
        },
        {
            name: "Progress Tracking",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
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
            path: "/dashboard/user/progress-tracking",
        },
        {
            name: "Session Comparison",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
                    <path
                        d="M20.5 5.5H9.5C5.787 5.5 3 8.185 3 12M3.5 18.5H14.5C18.213 18.5 21 15.815 21 12M18.5 3C18.5 3 21 4.841 21 5.5C21 6.159 18.5 8 18.5 8M5.5 16C5.5 16 3 17.841 3 18.5C3 19.159 5.5 21 5.5 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            path: "/dashboard/user/session-comparison",
        },
    ];

    const adminLinks = [
        {
            name: "Home",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
                    <path d="M12.0002 18L12.0002 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path
                        d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            path: "/dashboard/admin",
        },
        // {
        //     name: "User Management",
        //     icon: (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             viewBox="0 0 24 24"
        //             className="me-5"
        //             width="24"
        //             height="24"
        //             color="#bdbdbd"
        //             fill="none"
        //         >
        //             <path
        //                 d="M18.6161 20H19.1063C20.2561 20 21.1707 19.4761 21.9919 18.7436C24.078 16.8826 19.1741 15 17.5 15M15.5 5.06877C15.7271 5.02373 15.9629 5 16.2048 5C18.0247 5 19.5 6.34315 19.5 8C19.5 9.65685 18.0247 11 16.2048 11C15.9629 11 15.7271 10.9763 15.5 10.9312"
        //                 stroke="currentColor"
        //                 strokeWidth="1.5"
        //                 strokeLinecap="round"
        //             />
        //             <path
        //                 d="M4.48131 16.1112C3.30234 16.743 0.211137 18.0331 2.09388 19.6474C3.01359 20.436 4.03791 21 5.32572 21H12.6743C13.9621 21 14.9864 20.436 15.9061 19.6474C17.7889 18.0331 14.6977 16.743 13.5187 16.1112C10.754 14.6296 7.24599 14.6296 4.48131 16.1112Z"
        //                 stroke="currentColor"
        //                 strokeWidth="1.5"
        //             />
        //             <path
        //                 d="M13 7.5C13 9.70914 11.2091 11.5 9 11.5C6.79086 11.5 5 9.70914 5 7.5C5 5.29086 6.79086 3.5 9 3.5C11.2091 3.5 13 5.29086 13 7.5Z"
        //                 stroke="currentColor"
        //                 strokeWidth="1.5"
        //             />
        //         </svg>
        //     ),
        //     path: "/dashboard/admin/user-management",
        // },
        {
            name: "Session History",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#bdbdbd"
                    fill="none"
                >
                    <path
                        d="M4 12.9955L4 14.5404C4 17.7871 4 19.4104 4.88607 20.5099C5.06508 20.732 5.26731 20.9344 5.48933 21.1135C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.8859C12.9044 21.8622 12.9702 21.8349 13.0345 21.8042C13.3436 21.6563 13.593 21.4067 14.0919 20.9076L18.8284 16.1686C19.4065 15.5903 19.6955 15.3011 19.8478 14.9334C20 14.5656 20 14.1567 20 13.3388V9.99394C20 6.2208 20 4.33423 18.8284 3.16206C17.8971 2.23022 16.5144 2.03917 14.0919 2M13 21.4997V20.9995C13 18.1696 13 16.7547 13.8787 15.8756C14.7574 14.9965 16.1716 14.9965 19 14.9965H19.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 9.77273C9.76731 9.77273 11.2 8.30748 11.2 6.5C11.2 4.69252 9.76731 3.22727 8 3.22727M8 9.77273C6.23269 9.77273 4.8 8.30748 4.8 6.5C4.8 4.69252 6.23269 3.22727 8 3.22727M8 9.77273V11M8 3.22727V2M5.0913 4.71488L4.00045 4.04545M12 8.95455L10.9092 8.28512M10.9087 4.71488L11.9996 4.04545M4 8.95455L5.09085 8.28512"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            ),
            path: "/dashboard/admin/session-history",
        },
        // {
        //     name: "Analytics",
        //     icon: (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             viewBox="0 0 24 24"
        //             className="me-5"
        //             width="24"
        //             height="24"
        //             color="#bdbdbd"
        //             fill="none"
        //         >
        //             <path
        //                 d="M7 18V16M12 18V15M17 18V13M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
        //                 stroke="currentColor"
        //                 strokeWidth="1.5"
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //             />
        //             <path
        //                 d="M5.99219 11.4863C8.14729 11.5581 13.0341 11.2328 15.8137 6.82132M13.9923 6.28835L15.8678 5.98649C16.0964 5.95738 16.432 6.13785 16.5145 6.35298L17.0104 7.99142"
        //                 stroke="currentColor"
        //                 strokeWidth="1.5"
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //             />
        //         </svg>
        //     ),
        //     path: "/dashboard/admin/analytics",
        // },
    ];

    const userBottomLinks = [
        {
            name: "Help & Support",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
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
            path: "/dashboard/user/help",
        },
        {
            name: "Settings",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
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
            path: "/dashboard/user/settings",
        },
        {
            name: "Logout",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
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
            path: "/dashboard/user/logout",
            function: (e: any) => {
                e.preventDefault();
                dispatch(
                    openDialog({
                        key: "default",
                        children: <LogoutConfirmation />,
                    }),
                );
            },
        },
    ];
    const adminBottomLinks = [
        // {
        //     name: "Help & Support",
        //     icon: (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             viewBox="0 0 24 24"
        //             className="me-5"
        //             width="24"
        //             height="24"
        //             color="#BDBDBD"
        //             fill="none"
        //         >
        //             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        //             <path
        //                 d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
        //                 stroke="currentColor"
        //                 strokeWidth="1.5"
        //                 strokeLinecap="round"
        //             />
        //             <path
        //                 d="M11.992 17H12.001"
        //                 stroke="currentColor"
        //                 strokeWidth="2"
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //             />
        //         </svg>
        //     ),
        //     path: "/dashboard/user/help",
        // },
        {
            name: "Settings",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
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
            path: "/dashboard/admin/settings",
        },
        {
            name: "Logout",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="me-5"
                    width="24"
                    height="24"
                    color="#BDBDBD"
                    fill="none"
                >
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
            path: "/dashboard/user/logout",
            function: (e: any) => {
                e.preventDefault();
                dispatch(
                    openDialog({
                        key: "default",
                        children: <LogoutConfirmation />,
                    }),
                );
            },
        },
    ];

    return (
        <Sidebar className="side__nav mobile_color bg-branding-secondary text-white py-5 px-4">
            <SidebarHeader className="py-7 bg-branding-secondary lg:py-3 px-4">
                <Link to="/">
                    <img
                        src={theme.logoUrl || logo}
                        alt="EngageX™ Logo"
                        className="w-8/12 max-h-10 object-contain object-left px-3 lg:px-0"
                    />
                </Link>
            </SidebarHeader>

            <SidebarContent className="top__links bg-branding-secondary lg:px-0 px-4">
                {/* <div className="relative my-4 mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="absolute left-2 top-2 w-4.5 h-4.5"
            width="24"
            height="24"
            color="#BDBDBD"
            fill="none"
          >
            <path
              d="M17.5 17.5L22 22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <Input
            type="text"
            tabIndex={-1}
            placeholder="Search"
            className="ps-8 py-3 lg:py-2 rounded-[4px]"
          />
        </div> */}

                {lastSegment === "user" &&
                    userLinks.filter(Boolean).map((link, index) => (
                        <Link
                            to={link?.path ?? ""}
                            key={index}
                            className={`link flex items-center  mobile_links w-full py-2 px-3 mb-0.5 ${
                                location.pathname === link?.path ? "active" : ""
                            }`}
                        >
                            {link?.icon}
                            <p>{link?.name}</p>
                        </Link>
                    ))}
                {lastSegment === "admin" &&
                    adminLinks.map((link, index) => (
                        <Link
                            to={link.path}
                            key={index}
                            className={`link flex mobile_links items-center w-full py-2 px-3 mb-0.5 ${
                                location.pathname === link.path ? "active" : ""
                            }`}
                        >
                            {link.icon}
                            <p>{link.name}</p>
                        </Link>
                    ))}
            </SidebarContent>

            <SidebarFooter className="bottom__links bg-branding-secondary w-full p-0">
                {lastSegment === "user" &&
                    userBottomLinks.map((link, index) => (
                        <Link
                            to={link.path}
                            onClick={link.function}
                            key={index}
                            className={`link flex items-center mobile_links w-full  py-2 px-3 mb-0.5 ${
                                location.pathname === link.path ? "active" : ""
                            }`}
                        >
                            {link.icon}
                            <p>{link.name}</p>
                        </Link>
                    ))}
                {lastSegment === "admin" &&
                    adminBottomLinks.map((link, index) => (
                        <Link
                            to={link.path}
                            onClick={link.function}
                            key={index}
                            className={`link flex items-center mobile_links w-full py-2 px-3 mb-0.5 ${
                                location.pathname === link.path ? "active" : ""
                            }`}
                        >
                            {link.icon}
                            <p>{link.name}</p>
                        </Link>
                    ))}
            </SidebarFooter>
        </Sidebar>
    );
};

export default SideNav;
