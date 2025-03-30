import React, { useState } from "react";
import userImg from "../../assets/images/pngs/avater.png";
import { useLocation, Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
} from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import walkthroughImage from "../../assets/images/pngs/walkthrough-image.png";

const TopNav: React.FC = () => {
    const [isDialogOneOpen, setDialogOneOpen] = useState(false);
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((path) => path);
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments.length >= 2 ? pathSegments[1] : "";

    const formatBreadcrumb = (segment: string) =>
        segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    if (location.pathname.includes("settings")) {
        return null;
    }

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-8 md:border-b-1 border-bright-gray">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 hidden md:flex p-5" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={`/dashboard/${lastSegment}`}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {pathnames.slice(2).map((segment, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 3).join("/")}`;
                            const isLast = index === pathnames.slice(2).length - 1;

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
                    onClick={() => setDialogOneOpen(true)}
                    className="flex bg-white text-green-sheen border border-green-sheen hover:bg-green-sheen hover:text-white"
                >
                    <Play /> Need help navigating?
                </Button>
                <Dialog open={isDialogOneOpen} onOpenChange={setDialogOneOpen}>
                    <DialogContent className="max-h-1/2-screen">
                        <DialogHeader>
                            <p className="text-green-sheen text-center">Feature Walkthrough Video</p>
                            <img src={walkthroughImage} alt="green image of users" className="w-full h-64 mb-4" />
                            <DialogDescription className="text-auro-metal-saurus">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center cursor-pointer">
                                        <p>Home page/Dashboard</p>

                                        <div className="flex items-center">
                                            <small>1:20</small>
                                            <div className="rounded-full bg-gray w-5 h-5 flex items-center justify-center ms-1">
                                                <Play fill="#FFF" className="bg-gray h-3 w-3 text-gray" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center cursor-pointer">
                                        <p>Goal Setting & Tracking</p>

                                        <div className="flex items-center">
                                            <small>1:20</small>
                                            <div className="rounded-full bg-gray w-5 h-5 flex items-center justify-center ms-1">
                                                <Play fill="#FFF" className="bg-gray h-3 w-3 text-gray" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center cursor-pointer">
                                        <p>Session History</p>

                                        <div className="flex items-center">
                                            <small>1:20</small>
                                            <div className="rounded-full bg-gray w-5 h-5 flex items-center justify-center ms-1">
                                                <Play fill="#FFF" className="bg-gray h-3 w-3 text-gray" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className="line h-4.5 mx-3 w-0.5 bg-gray"></div>
                <div className="user__image">
                    <img src={userImg} alt="user image" />
                </div>
            </div>
            <SidebarTrigger className="md:hidden p-5" />
        </header>
    );
};

export default TopNav;
