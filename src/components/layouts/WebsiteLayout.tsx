import { ReactNode } from "react";
import { Toaster } from "sonner";
import FloatingChatbot from "../FloatingChatbot";
import Footer from "../Footer";
import Navbar from "../Navbar";
import ScrollToTop from "../ScrollToTop";

function WebsiteLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            <ScrollToTop />
            {children}
            <FloatingChatbot />
            <Footer />
            <Toaster toastOptions={{ classNames: { content: "size-full" } }} />
        </div>
    );
}

export default WebsiteLayout;
