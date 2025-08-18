import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/context/ThemeContext/hook";
import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { PRIMARY_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { Play } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import FeatureWalkthrough from "../dialogs/dialog-contents/FeatureWalkthrough";
import { Button } from "../ui/button";

const TopNav: React.FC = () => {
    const {
        theme: { primaryColor },
    } = useTheme();
    const location = useLocation();
    const dispatch = useDispatch();
    const { data: fullProfile } = useFullUserProfile();
    const { data: profile } = useUserProfile(fullProfile?.results?.[0]?.id);
    const pathnames = location.pathname.split("/").filter((path) => path);
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments.length >= 2 ? pathSegments[1] : "";
    const initials = `${profile?.first_name?.[0] ?? ""}${profile?.last_name?.[0] ?? ""}`.toUpperCase();
    const formatBreadcrumb = (segment: string) =>
        segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    if (location.pathname.includes("settings")) {
        return null;
    }

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-8 md:border-b-1 border-bright-gray">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 hidden md:flex p-5 bg-branding-secondary hover:bg-branding-secondary/90 hover:text-white" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={`/dashboard/${lastSegment}`}>Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {pathnames.slice(2).map((segment, index) => {
                            let routeTo = `/${pathnames.slice(0, index + 3).join("/")}`;
                            const isLast = index === pathnames.slice(2).length - 1;
                            if (segment.toLowerCase() === "organization") {
                                routeTo = "/dashboard/admin/organization/dashboard";
                            }

                            return (
                                <div key={routeTo} className="flex items-center">
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{formatBreadcrumb(segment)}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link to={routeTo}>{formatBreadcrumb(segment)}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="left__top__nav hidden lg:flex items-center">
                <Button
                    onClick={() =>
                        dispatch(
                            openDialog({
                                key: "feature-walkthrough",
                                children: <FeatureWalkthrough />,
                            }),
                        )
                    }
                    className={cn(
                        "flex bg-white text-green-sheen border border-green-sheen hover:bg-green-sheen hover:text-white",
                        {
                            "border-branding-primary hover:bg-branding-primary/90 text-branding-primary":
                                primaryColor !== PRIMARY_COLOR,
                        },
                    )}
                >
                    <Play /> Need help navigating?
                </Button>
                <div className="line h-4.5 mx-3 w-0.5 bg-gray"></div>
                <div className="user__image">
                    <div
                        className={`size-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 ${!profile?.profile_picture && "border border-[#D0D5DD] bg-[#D0D5DD]"}`}
                    >
                        {profile?.profile_picture ? (
                            <img
                                src={profile?.profile_picture}
                                alt={`user image`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="font-medium text-sm leading-none text-[#10161e]">{initials}</span>
                        )}
                    </div>
                </div>
            </div>
            <SidebarTrigger className="md:hidden p-5 bg-branding-secondary hover:bg-branding-secondary/90 hover:text-white" />
        </header>
    );
};

export default TopNav;
