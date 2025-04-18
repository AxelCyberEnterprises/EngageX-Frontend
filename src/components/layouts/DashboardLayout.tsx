// import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideNav from "../dashboard/SideNav";
import TopNav from "../dashboard/TopNav";
import DynamicDialog from "../dialogs/DynamicDialog";

import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import FloatingChatbot from "../FloatingChatbot";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
          "--sidebar-width-mobile": "21rem",
        } as React.CSSProperties
      }
    >
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <SideNav />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-1 flex-col overflow-y-hidden">
          {/* Top Nav with Breadcrumbs */}
          <TopNav />

          {/* Main Content Area with Outlet */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {children}
            <DynamicDialog />
            <Toaster toastOptions={{ classNames: { content: "size-full" } }} />
          </div>
          <FloatingChatbot />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
