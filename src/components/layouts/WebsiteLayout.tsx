import { ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FloatingChatbot from "../FloatingChatbot";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { hide } from "@/store/slices/floatingChatbotSlice";
import ScrollToTop from "../ScrollToTop";

function WebsiteLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(hide())}>
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
