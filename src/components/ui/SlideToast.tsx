import React, { useEffect } from "react";
import checkIcon from "@/assets/images/svgs/circle-check.svg";
import errorIcon from "@/assets/images/svgs/error-x.svg";

interface SlideToastProps {
  type: "success" | "error";
  message: string;
  description?: string;
  show: boolean;
  onClose: () => void;
}

const SlideToast: React.FC<SlideToastProps> = ({ type, message, description, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000); // Auto dismiss after 4s
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-700 ease-in-out ${
        show ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <div className="flex items-center gap-4 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-md min-w-[280px] max-w-sm">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === "success" ? "bg-green-100" : "bg-red-100"}`}>
          <img
            src={type === "success" ? checkIcon : errorIcon}
            alt="icon"
            className=""
          />
        </div>
        <div>
          <p className="text-[1rem] font-medium text-gry-900">{message}</p>
          {description && <p className="font-[montserrat] text-sm font-medium text-muted-foreground">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default SlideToast;
