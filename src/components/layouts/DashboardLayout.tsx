import { Outlet } from "react-router-dom";
import SideNav from "../dashboard/SideNav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TopNav from "../dashboard/TopNav";

const DashboardLayout = () => {
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
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
