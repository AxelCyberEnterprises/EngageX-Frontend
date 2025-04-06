import React from "react";
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
import logo from "../../assets/images/svgs/logo-2.svg";

const TopNav: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);

  const formatBreadcrumb = (segment: string) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-8 border-b-1">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Engage X logo"
          className="me-6 hidden lg:inline-block"
        />
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
                      <BreadcrumbPage>
                        {formatBreadcrumb(segment)}
                      </BreadcrumbPage>
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
      <div className="left__top__nav items-center">
        <div className="user__image">
          <img src={userImg} alt="user image" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
