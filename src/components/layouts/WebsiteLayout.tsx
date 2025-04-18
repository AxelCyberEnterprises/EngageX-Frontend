import { ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FloatingChatbot from "../FloatingChatbot";
import { Toaster } from "sonner";

function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <FloatingChatbot />
      <Footer />
      <Toaster toastOptions={{ classNames: { content: "size-full" } }} />
    </div>
  );
}

export default WebsiteLayout;
