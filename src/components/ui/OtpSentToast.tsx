import React, { useEffect } from "react";
import checkIcon from "@/assets/images/svgs/circle-check.svg";

interface OtpSentToastProps {
  show: boolean;
  onClose: () => void;
}

const OtpSentToast: React.FC<OtpSentToastProps> = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
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
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
          <img src={checkIcon} alt="check icon" />
        </div>
        <div>
          <p className="text-[1rem] font-medium text-gray-900">OTP Sent</p>
          <p className="font-[montserrat] text-sm text-muted-foreground">A code has been sent to your email.</p>

        </div>
      </div>
    </div>
  );
};

export default OtpSentToast;
