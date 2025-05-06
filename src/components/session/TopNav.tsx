import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import logo from "../../assets/images/svgs/logo-2.svg";
import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { Play } from "lucide-react";
import FeatureWalkthrough from "../dialogs/dialog-contents/FeatureWalkthrough";

const TopNav: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((path) => path);
    const { data: fullProfile } = useFullUserProfile();
    const { data: profile } = useUserProfile(fullProfile?.results?.[0]?.id);
    const dispatch = useDispatch();
    const initials = `${profile?.first_name?.[0] ?? ""}${profile?.last_name?.[0] ?? ""}`.toUpperCase();

    const formatBreadcrumb = (segment: string) =>
        segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-8 border-b-1">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Engage X logo" className="me-6 hidden lg:inline-block" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/dashboard/user">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {pathnames.map((segment, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;

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
                    className="flex bg-white text-green-sheen border border-green-sheen hover:bg-green-sheen hover:text-white"
                >
                    <Play /> Need help navigating?
                </Button>
                <div className="line h-4.5 mx-3 w-0.5 bg-gray"></div>
                <div className="user__image">
                    <div
                        className={`w-11 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 ${!profile?.profile_picture && "border border-[#D0D5DD] bg-[#D0D5DD]"}`}
                    >
                        {profile?.profile_picture ? (
                            <img
                                src={profile?.profile_picture}
                                alt={`user image`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="font-medium text-sm leading-none mt-1 text-[#10161e]">{initials}</span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNav;
